# Współdzielone bazy danych

Pamięć RAM to jeden z cenniejszych zasobów na Twoim serwerze. Istnieje jednak szansa, że będziesz potrzebować do projektu bazy MySQL, czy PostgreSQL. Nie musisz jednak samodzielnie jej stawiać.

Posiadamy współdzielone serwery baz danych, na których możesz założyć bazę jednym kliknięciem i używać jej "w granicach przyzwoitości". Taka baza nie zużywa ani pamięci RAM, ani miejsca na dysku Twojego Mikrusa.

Umawiamy się na **limit 200MB danych na bazę**. Staraj się go nie przekraczać.

## Dostępne bazy

| Baza | Serwer | Dostępność |
| --- | --- | --- |
| MySQL | `mysql.mikr.us` | wszystkie płatne Mikrusy |
| PostgreSQL 12 | `psql01.mikr.us` | wszystkie płatne Mikrusy |
| MongoDB | podany w logach operacji | od Mikrusa 2.1 wzwyż |

> 💡 Użytkownicy darmowych serwerów [FROG](../frog) również otrzymują współdzieloną bazę MySQL - dane dostępowe znajdziesz w pliku `/root/mysql.txt` na swoim serwerze.

## Jak założyć bazę?

1. Zaloguj się do [panelu Mikrusa](https://mikr.us/panel/)
2. W menu **Bazy danych** wybierz interesujący Cię typ bazy (MySQL, PostgreSQL lub MongoDB)
3. Kliknij przycisk z prośbą o nowe dane dostępowe
4. Dane dostępowe znajdziesz w **logach operacji** na stronie głównej panelu

Dla baz MySQL i PostgreSQL loginem jest nazwa Twojego serwera (np. `adam123`), a baza nazywa się `db_` + nazwa serwera (np. `db_adam123`).

> 🛑 Ponowne kliknięcie przycisku zakładającego bazę **zmienia hasło dostępowe**, ale nie usuwa danych. Pamiętaj wtedy o aktualizacji hasła w konfiguracji swoich aplikacji.

## Jak połączyć się z bazą?

Z poziomu swojego Mikrusa połączysz się z bazą MySQL np. tak:

```bash
mysql -h mysql.mikr.us -u adam123 -p db_adam123
```

A z bazą PostgreSQL tak:

```bash
psql -h psql01.mikr.us -U adam123 db_adam123
```

W konfiguracji aplikacji (np. w pliku `wp-config.php` WordPressa) podajesz po prostu powyższy adres serwera, login, hasło i nazwę bazy.

## Zarządzanie bazą przez przeglądarkę

Jeśli wolisz klikać niż pisać zapytania w konsoli, skorzystaj z gotowych narzędzi (linki znajdziesz także w menu **Bazy danych** w panelu):

- MySQL - [phpMyAdmin](https://pma.mikr.us) lub Adminer
- PostgreSQL - [phpPgAdmin](https://pga.mikr.us)

## Ważne uwagi

- Baza współdzielona idealnie nadaje się do zastosowań hobbystycznych. Jeśli chcesz postawić poważną usługę, to pomyśl o [własnej bazie danych na swoim serwerze](../konfiguracja_mysql_mariadb)
- Jak w przypadku wszystkich współdzielonych zasobów Mikrusa, **sam jesteś odpowiedzialny za wykonywanie kopii zapasowych** przechowywanych tam danych (np. za pomocą `mysqldump` lub `pg_dump`)
- Dzięki współdzielonej bazie MySQL nawet na Mikrusie 1.0 postawisz WordPressa

[Powrót do strony głównej](/)
