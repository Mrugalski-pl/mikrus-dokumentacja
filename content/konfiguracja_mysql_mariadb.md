# Konfiguracja MySQL/MariaDB

Chcąc postawić na Mikrusie własną bazę danych (możesz także [skorzystać ze współdzielonej](Wspo%CC%81%C5%82dzielone%20bazy%20danych%20139d979d5105492282aef2eb20bfc208.md) jeśli chcesz), wykonaj poniższe kroki.

Zaktualizuj pakiety w systemie

```bash
apt update
```

Zainstaluj odpowiednie pakiety - my polecamy bazę MariaDB, która jest w 100% kompatybilna z MySQL

```bash
apt install mariadb-server mariadb-client
```

Po tych operacjach masz działającą bazę, nasłuchującą na porcie 3306 na localhost.

## Zakładanie bazy danych

Na początek zaloguj się do bazy poniższym poleceniem (nie potrzebujesz hasła)

```bash
mysql
```

Następnie wydaj polecenie do założenia bazy - niech baza nazywa się np. 'kwiaty'

```sql
create database kwiaty;
```

## Dodanie nowego użytkownika

Wpisz w konsoli MySQL polecenie zakładające użytkownika 'roman' z hasłem 'banan' (to przykład - podaj własne).

```sql
grant all privileges on kwiaty.* to 'roman'@'%' identified by 'banan';
```

Przeładuj jeszcze prawa dostępu tak, aby Twoje zmiany były natychmiast widoczne

```sql
flush privileges;
```

## Umożliwienie połączenia z zewnątrz

Domyślnie, baza danych słucha na lokalnym adresie IP, więc połączenie z nią z innego komputera jest niemożliwe. Aby to zmienić, możesz w pliku **/etc/mysql/mariadb.conf.d/50-server.cnf** zmienić linijkę z bind-adres na:

```bash
bind-address = 0.0.0.0
```

Konieczna będzie także zmiana numeru portu, bo port 3306 nie jest na Mikrusie widoczny z zewnątrz. Znajdź więc linijkę z tekstem "port = 3306" i wpisz tam jeden z portów, które należą do Ciebie. Przykładowo

```bash
port = 20355
```

Po tych zmianach musisz zrestartować bazę

```bash
service mysql restart
```

## Importowanie danych do bazy

Jeśli masz zrzut danych w formacie pliku SQL np. z poprzedniego hostingu, to wykonaj poniższe instrukcje, aby go zaimportować na Mikrusa do własnej bazy

- Wrzuć plik SQL gdzieś na serwer, np. do **/tmp/baza.sql**
- Połącz się z mysql za pomocą polecenia

```bash
mysql
```

- Połącz się z bazą, do której chcesz zaimportować dane (u nas się zwie ona 'kwiaty')

```sql
use kwiaty;
```

Wydaj polecenie importujące dane

```sql
source /tmp/baza.sql;
```

Gotowe :)

## Dodatkowe uwagi

To jest poradnik dla początkujących. Niektóre rzeczy dałoby się zrobić lepiej. Można dodać do tego firewalla, nowemu użytkownikowi dać tyle praw ile faktycznie potrzebuje (a nie wszystkie), czy ograniczyć hosty użytkowników do konkretnych IP/domen zamiast "%".

Nie wspominam tutaj także o optymalizacji ustawień MySQL. To temat zbyt szeroki i zbyt trudny dla kogoś, kto po prostu chce mieć działającą bazę.

Usprawnień jest wiele, ale na poziomie początkującego użytkownika, powyższy tutorial będzie dla Ciebie w zupełności wystarczający.

[Powrót do strony głównej](/)