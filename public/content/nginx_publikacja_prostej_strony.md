# NGINX - publikacja prostej strony na serwerze

> 💡 Autorem poradnika jest **[Ozelot](https://ozelot.ovh)**.

W tym poradniku pokażę ci jak opublikować na serwerze swoją pierwszą stronę przy użyciu **Nginx**. Zajmiemy się tutaj statyczną stroną. Jeżeli szukasz informacji o reverse proxy [znajdziesz je tutaj](/reverse_proxy_na_nginx/), natomiast informacje o instalacji i konfiguracji PHP [znajdziesz tutaj](/nginx_php_mysql).

Zakładam, że [posiadasz swoją domenę i podpiąłeś(-aś) ją prawidłowo aby wskazywała na twój serwer](/podpiecie_domeny_przez_cloudflare) lub [dodałeś(-aś) darmową subdomenę (nie dotyczy Froga) wskazującą na dowolny port](/darmowa_subdomena_dla_vps), bądź [chcesz użyć współdzielonej subdomeny Froga](/frog/#wsp%C3%B3%C5%82dzielona-subdomena).

### Przykładowa strona

Strona którą chcemy opublikować może być zbudowana w mniej więcej taki sposób. Oto przykład naszej strony:

```
.
├── index.html
├── style.css
└── pages
    ├── about.html
    └── contact.html
```

Nie będzie tutaj backendu ani bazy danych - prosta strona-wizytówka.

### Instalacja NGINX

Na dystrybucjach bazujących na Debianie (w tym Ubuntu) zainstalujemy za pomocą **apt**.

```bash
apt install nginx
```

Natomiast w dystrybucjach takich jak Alpine (dotyczy serwerów **Frog**) zrobimy to za pomocą **apk**.

```bash
apk add nginx
```

_W dalszej części poradnika przy wyszczególnianiu poszczególnych opcji dla wyżej wymienionych grup dystrybucji będę posługiwał się nazwami Debian i Alpine._

### Umieszczenie plików strony

Po udanej instalacji możemy przejść do konfiguracji. Jednak zanim to zrobimy, najpierw umieścimy pliki strony na serwerze. Można wybrać dowolny katalog, jednak najczęściej używa się do tego `/var/www`. 

Na potrzeby tego poradnika umieścimy naszą stronę w `/var/www/pierwszastrona`:

```
/
└── var
    └── www
        └── pierwszastrona
            ├── index.html
            ├── style.css
            └── pages
                ├── about.html
                └── contact.html
```

Kolejnym krokiem będzie ustawienie uprawnień do folderu naszej strony tak, aby NGINX mógł go odczytać. Aby to zrobić musimy znać nazwę użytkownika jakim posługuje się NGINX. Domyślnie w przypadku Debiana jest to `www-data`, a Alpine - `nginx`. Możemy to sprawdzić lub zmienić w `/etc/nginx/nginx.conf`. Uprawnienia `755` będą odpowiednie.

Dla Debiana:

```bash
chown -R www-data:www-data /var/www/pierwszastrona
chmod -R 755 /var/www/pierwszastrona
```

Dla Alpine:

```bash
chown -R nginx:nginx /var/www/pierwszastrona
chmod -R 755 /var/www/pierwszastrona
```

### Przygotowanie pliku konfiguracyjnego strony

Teraz możemy przejść do właściwej konfiguracji webserwera.

Główny katalog z plikami konfiguracyjnymi znajdziemy w `/etc/nginx`. Stworzymy teraz plik konfiguracyjny dla naszej strony.

**Dla Debiana:**

W katalogu `/etc/nginx` znajdują się między innymi dwa podkatalogi - `sites-available` i `sites-enabled`. Przejdź do `sites-available` i utwórz plik o dowolnej nazwie. Na potrzeby poradnika będzie to `pierwszastrona.conf`. Bezwzględna ścieżka do tego pliku powinna więc wyglądać tak:

```
/etc/nginx/sites-available/pierwszastrona.conf
```

Zanim przejdziemy do pisania treści pliku konfiguracyjnego, należy stworzyć jego skrót w katalogu `sites-enabled`.

W tym celu użyj:

```bash
ln -s /etc/nginx/sites-available/pierwszastrona.conf /etc/nginx/sites-enabled/
```


**Dla Alpine:**

W katalogu `/etc/nginx` znajduje się między innymi podkatalog `http.d`. Przejdź do niego i utwórz plik o dowolnej nazwie. Na potrzeby poradnika będzie to `pierwszastrona.conf`. Bezwzględna ścieżka do tego pliku powinna więc wyglądać tak:

```
/etc/nginx/http.d/pierwszastrona.conf
```

### Właściwa konfiguracja strony

Teraz zajmiemy się stworzeniem właściwej konfiguracji. Wykorzystamy do tego plik utworzony w poprzednim kroku. 

Otwórz go i wklej następującą treść:

```bash
server {
    listen [::]:80; # twój port
    server_name example.com; # twoja domena
    root /var/www/pierwszastrona; # ścieżka do plików strony
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}
```

Należy tu zwrócić uwagę na kilka rzeczy, które musisz zmienić:

- **listen [::]:80;** - Numer oznacza port na którym serwer ma nasłuchiwać.
  - Jeśli planujesz wystawić stronę na [własnej domenie](/podpiecie_domeny_przez_cloudflare), zostaw bez zmian.
  - Jeśli chcesz użyć [darmowej subdomeny (nie dotyczy Froga)](/darmowa_subdomena_dla_vps) możesz podać tutaj dowolny, wolny port (uwaga: **nie musi** być to jeden z portów IPv4 przypisanych do twojego serwera, gdyż operujemy tu na IPv6 i masz do dyspozycji wszystkie porty. Może to też być domyślny port 80. Jeśli chcesz skorzystać z tej opcji, pamiętaj żeby przy dodawaniu darmowej subdomeny wybrać ten sam port, który będzie w konfiguracji.
  - Jeśli chcesz użyć [współdzielonej subdomeny Froga](/frog/#wsp%C3%B3%C5%82dzielona-subdomena) musisz użyć jednego z portów IPv4 przypisanych do twojego Froga. W tym przypadku powinno to wyglądać w ten sposób: `listen XXXX;`.
- **server_name example.com;** - Zamień `example.com` na twoją domenę lub darmową subdomenę.
- **root /var/www/pierwszastrona;** - Katalog wskazujący na pliki twojej strony.

Już prawie gotowe. Kolejną czynnością będzie sprawdzenie poprawności konfiguracji:

```bash
nginx -t
```

Jeśli polecenie nie zwróciło żadnych błędów, możemy zrestartować NGINX aby nasze zmiany zaczęły obowiązywać.

Dla Debiana:

```bash
systemctl restart nginx
```

Dla Alpine:

```bash
service nginx restart
```

Jeśli wszystko przebiegło prawidłowo, twoja strona powinna być już widoczna pod wskazaną domeną.

[Powrót do strony głównej](/)
