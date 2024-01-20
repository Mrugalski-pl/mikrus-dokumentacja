# Apache + PHP + MySQL

Postawienie tzw. LAMP (Linux + Apache + PHP + MySQL) jest skrajnie proste i ogranicza się do wydania dosłownie kilku poleceń.

Po pierwsze, zaktualizuj repozytorium pakietów

```bash
apt update
```

Następnie zainstaluj niezbędne pakiety

```bash
apt install apache2 mariadb-server mariadb-client php libapache2-mod-php
```

Pliki swojej strony wrzuć do katalogu **/var/www/html**

Aby przetestować działanie PHP, wpisz poniższe polecenie, a następnie odwołaj się do pliku test.php przez przeglądarkę.

```bash
echo "<?php phpinfo(); " >**/var/www/html/**test.php
```

To w zasadzie wszystko - teraz wypadałoby tylko [podpiąć własną domenę przez Cloudflare](../podpiecie_domeny_przez_cloudflare), [wyklikać sobie darmową w panelu](https://mikr.us/panel/?a=domain) lub [szybko uzyskać ją z VPS-a](../szybka_subdomena).

- Do postawienia bazy danych użyj [oddzielnego poradnika](../konfiguracja_mysql_mariadb)
 - Przeczytaj także o tym [jak wysyłać pliki na Mikrusa](../jak_wysylac_pliki_na_mikrusa) 

[Powrót do strony głównej](/)