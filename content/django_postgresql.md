# Django + PostgreSQL

Autorem artykułu jest Seweryn Jagusiak

W tym artykule opiszę jak postawić aplikację Django (nie wykorzystując w tym celu Dockera), której możemy używać w wersji produkcyjnej na pojedynczym Mikrusie (nawet w wersji 1.0), używając dystrybucji Ubuntu.

### Współdzielony PostgreSQL

Przed zmianami, uzyskajmy dostęp do współdzielonego serwera PostgreSQL.

Pod linkiem [https://mikr.us/panel/?a=postgres](https://mikr.us/panel/?a=postgres) możesz poprosić o dane dostępowe do współdzielonej bazy danych.

W panelu głównym ([https://mikr.us/panel/](https://mikr.us/panel/)) po kliknięciu w logi bazy powinniśmy otrzymać dane dostępowe w następującym formacie:

```
Server: postgres_server
login: postgres_login
Haslo: postgres_password
Baza: postgres_db
```

### Nowy użytkownik

Zaloguj się MIKRUSie i stwórz nowego użytkownika pod aplikację (zakładam, że jesteś rootem, jeśli nie, poprzedź komendę słowem **sudo**), używając komendy:

```bash
useradd -m django
```

(opcja **-m**  utworzy katalog domowy dla tego użytkownika)

Dodajmy możliwość wykonania polecenia root'a przez użytkownika **django**.

```bash
usermod -aG sudo django
```

oraz wyłączmy potrzebę podawania hasła (przy używaniu sudo przez użytkownika **django**)  - w tym celu należy uruchomić komendę, która włączy edycję pliku. 

```bash
visudo
```

Dodaj następujący wpis do otworzonego pliku i zapisz:

```
django     ALL=(ALL) NOPASSWD:ALL
```

Przeloguj się na użytkownika **django** (jeśli nie jesteś rootem, użyj słowo **sudo** przed)

```bash
su - django -s /bin/bash
```

Kolejne kroki bedą odbywały się w kontekście zalogowanego użytkownika **django**.

### Instalacja bibliotek pythona i wirtualnego środowiska

Na początek zaktualizujemy informacje o pakietach:

```bash
sudo apt update
```

i instalujemy potrzebne bilioteki

```bash
sudo apt -y install python3-pip python3-dev libpq-dev
```

(dodałem opcję **-y**, dzięki niej system nie zapyta, czy chcemy zainstalować wybrane pakiety, opcja często użwana w skyptach)

Zainstalujmy moduł, który umożliwia tworzenie środowiska wirtualnego dla python'a.

```bash
sudo pip3 install virtualenv
```

Przejdźmy do katalogu domowego, używając komendy (domyślnie użytkownik powinien znaleźć się w tym katalogu):

```bash
cd
```

Utwórzmy środowisko wirtualne (o nazwie py3-env) używając następującej komendy.

```bash
virtualenv py3-env
```

i aktywujmy je komendą:

```bash
source py3-env/bin/activate
```

(w obecnej sesji używane jest wirtualne środowisko Pythona, jest one odrębne od systemowego, stąd zainstalowane biblioteki Pythonowe nie pojawią się na poziomie systemowych. Aby opuścić środowisko wirtualne, należy użyć komendy **deactivate** — ale nie rób tego teraz)

Na koniec sekcji, zainstalujmy potrzebne później biblioteki Pythona:

```bash
pip install django psycopg2 gunicorn
```

(zainstalowaliśmy Django, bibliotekę do łączenia z postgresem oraz gunicorn'a)

### Uruchomienie Django

Tworzymy aplikacje django o nazwie **myapp** (możesz zmienić nazwę, pamiętaj o aktualizacji nazwy w kolejnych komendach i edycjach plików)

```bash
django-admin startproject myapp
```

Dokonajmy edycji ustawień aplikacji poprzez:

```bash
nano myapp/myapp/settings.py
```

(użyłem edytora **nano**, ponieważ jest prosty w użyciu, możesz użyć innego)

Zaktualizujmy hosty dostępowe na początek:

```python
ALLOWED_HOSTS = ['127.0.0.1', 'twojadomena.pl']
CSRF_TRUSTED_ORIGINS = ['http://0.0.0.0:8000', 'https://twojadomena.pl']
```

(jeśli aplikacja ma być dostępna publicznie pod domeną, dodaj odpowiedni wpis, dla przykładu  dodałem **twojadomena.pl**)

Uzupełnijmy konfigurację o dostępy do bazy w następujący sposób (wykorzystując dane z sekcji **Współdzielony PostgreSQL,** zamień wszystkie wartości rozpoczynające się od **postgres_** na te z logów w panelu zarządzania):

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres_db',
        'USER': 'postgres_login',
        'PASSWORD': 'postgres_password',
        'HOST': 'postgres_server',
        'PORT': '5432',
    }
}
```

Dodajemy główną ścieżkę do tworzenia plików statycznych (tak, aby znalazła się w katalogu aplikacji **myapp**):

```python
import os
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
```

Po tym wszystkim zapiszmy plik. (Warto jeszcze zwrócić uwagę na bezpieczeństwo aplikacji: jeśli wystawimy ją publicznie, parametr **DEBUG** w pliku powinien zostać przestawiony na False, dodatkowo, warto umieścić wrażliwe wartości, jak hasło do bazy poza plikiem, używając do tego np. modułu djangowego o nazwie environ [https://django-environ.readthedocs.io/en/latest/](https://django-environ.readthedocs.io/en/latest/) — dla początkujących proponuję na razie jednak ominąć tę akcję i wrócić po wykonaniu całości).

Zobacz w sekcji **[Uwagi](#uwagi)**, z czym się wiąże przestawienie parametru **DEBUG**. 

Następnie migrujemy bazę danych następującymi komendami:

```bash
python ~/myapp/manage.py makemigrations
python ~/myapp/manage.py migrate
```

(należy pamiętać, aby wirtualne środowisko było aktywne)

Kolejnym krokiem jest wygenerowanie statycznych plików komendą:

```bash
python ~/myapp/manage.py collectstatic
```

Ostatnim krokiem jest utworzenie admina w aplikacji (tutaj pełna dowolność po stronie tworzącego - wybory nie wpływają na dalsze części instrukcji — w ostateczności można pominąć ten krok i dodać admina później). Robimy to następują komendą:

```bash
python ~/myapp/manage.py createsuperuser
```

Zostaniemy poproszeni kolejno o nazwę użytkownika (pominięcie utworzy użytkownika o nazwie **django**), email (można pominąć i zostawić puste) oraz hasła i jego powtórzenia.

Ostatnim krokiem jest uruchomienie aplikacji za pomocą komendy:

```bash
python ~/myapp/manage.py runserver 0.0.0.0:8000
```

Powinniśmy zobaczyć coś takiego:

System check identified no issues (0 silenced).
Django version *X.X.X*, using settings 'myapp.settings'
Starting development server at [http://0.0.0.0:8000/](http://0.0.0.0:8000/)
Quit the server with CONTROL-C.

Jeśli mamy połączenie z MIKRUSem poprzez VPN albo tunel, to wchodząc na url [http://0.0.0.0:8000/](http://0.0.0.0:8000/) powinniśmy zobaczyć działającą aplikację (tutaj nie będę opisywał jak to zrobić).

Jednak uruchamianie aplikacje w ten sposób jest uciążliwe, w następnych krokach uruchomimy ją jako usługę systemu (systemmd) i użyjemy nginxa oraz gunicorna, aby efektywnie serwować aplikację z użyciem protokołu HTTP. Dlatego za pomocą Control + C, kończymy działanie domyślnego serwera i przechodzimy do kolejnych kroków.

### Konfiguracja serwisu

Od tego momentu nie trzeba już być w wirtualnym środowisku python, można je zdezaktywować (komenda **deactivate**).

Aby opakować działanie naszej aplikacji, jako serwis w systemie  stwórzmy następujący plik:

```bash
sudo nano /etc/systemd/system/gunicorn.service
```

Jego treść powinna być następująca:

```
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=django
Group=www-data
WorkingDirectory=/home/django/myapp
ExecStart=/home/django/py3-env/bin/gunicorn --access-logfile - --workers 2 --bind unix:/home/django/myapp/myapp.sock myapp.wsgi:application

[Install]
WantedBy=multi-user.target
```

Zapisujemy plik i uruchamiamy usługę komendami:

```bash
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
```

Aby sprawdzić stan usługi, możemy użyć komendy:

```bash
sudo systemctl status gunicorn
```

Jeśli pojawią się/pojawiły się błędy w usłudze, podejrzymy je za pomocą komendy:

```bash
sudo journalctl -u gunicorn
```

Jeśli zmienimy coś w kodzie aplikacji i chcemy aby zmiany pojawiły się na serwerze, uruchamiamy komendę restartującą usługę:

```bash
sudo systemctl restart gunicorn
```

### Nginx i proxy

Ostatnia cześć, tutaj podłączymy nginxowe proxy pod gunicorna (pozbędziemy się oznaczenia portu **8000** z url'a).

Na początek zainstalujmy nginx'a:

```bash
sudo apt -y install nginx
```

Następnie dodajmy plik o nazwie myapp do konfiguracji nginx'a:

```bash
sudo nano /etc/nginx/sites-available/myapp
```

i dodajmy następującą treść:

```
server {
    listen [::]:80;
    server_name twojadomena.pl;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/django/myapp;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/django/myapp/myapp.sock;
    }
}
```

Zastąp [twojadomena.pl](http://twojadomena.pl) adresem ip, jeśli chcesz, aby aplikacja działała lokalnie lub domeną, aby była dostępna publicznie. Jeśli chcesz, aby aplikacja działa pod twoją domeną, musisz ją przekierować na MIKRUSa (np. z użyciem [CloudFlare](../podpiecie_domeny_przez_cloudflare)).

Na koniec, tworzymy link do stron udostępnionych (nginx sugeruje zarządzanie serwerami w taki sposób, aby rozdzielić wszystkie możliwe konfiguracje stron od tych rzeczywiście włączonych):

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled
```

Aby sprawdzić poprawność konfiguracji, używamy komendy:

```bash
sudo nginx -t
```

Jeśli wszystko jest w porządku, przeładowujemy nginx'a.

```bash
sudo systemctl restart nginx
```

Teraz, można wejść na adres podany w konfiguracji nginxa (server name) i oczom powinna pokazać się bazowa aplikacja Django.

Aplikacja powinna działać nawet po restarcie MIKRUSa. Na koniec możemy wylogować się z użytkownika (komenda **exit**)

[Powrót do strony głównej](/)

### Uwagi

Jeśli od razu przestawisz ustawienie **DEBUG** na **False**, to po wpisaniu URLa (składającego się z samej domeny) nie zobaczysz żadnej strony, ponieważ takowej nie dodano. Domyślnie DJANGO udostępnia panel admina, wiec swoją konfigurację możesz sprawdzić pod adresem: twojadomena.pl/admin.

### Notatki

Nie będę ukrywał, w większości opierałem się na instrukcji z: [https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04) . Oryginał jest obszerniejszy, ale podana instrukcja jest dostosowana do środowiska Mikrusowego oraz posiada drobne poprawki. 

W podanym przykładzie uruchomiłem 2 workery obsługujące ruch HTTP, dla większego ruchu proponuję uruchomić więcej — ale nie wiem ile zniesie MIKRUS.

Po wszystkim, dla bezpieczeństwa, można ograniczyć usunąć wpis umożliwiający na wykonywanie sudo bez hasła przez użytkownika **django** ( akcja przy komendzie **sudo visudo**), restart nginx można dokonywać z poziomu roota lub innego użytkownika z uprawnieniami.