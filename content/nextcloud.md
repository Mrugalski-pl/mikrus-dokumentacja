# NextCloud

Jedną z usług oferowanych w ramach Mikrusa jest współdzielony serwer NextClouda.

Jest to usługa dodatkowo płatna (opłata roczna), dostępna w dwóch rozmiarach:

- 25GB - 30zł/rok
- 50GB - 60zł/rok

Usługę aktywujesz w panelu, w menu **Mikrus Services** → **[NextCloud](https://mikr.us/panel/?a=nextcloud)**.

Na współdzielonej instancji otrzymujesz konto użytkownika i możesz z niej korzystać podobnie jak z samodzielnie postawionej wersji. Logujesz się na stronie [https://nx.mikr.us/](https://nx.mikr.us/).

## Co to jest NextCloud?

To usługa przechowywania plików w chmurze. Coś jak Dropbox czy gDrive. Możesz swoje dane synchronizować za pomocą specjalnego klienta, dostępnego na Windowsa, Linuksa, Maca czy na większość smartfonów. Jeśli nie lubisz instalowania dodatkowych aplikacji, masz także możliwość obsługi NextClouda przez interfejs webowy.

## NextCloud i Mikrus

Te dwie usługi mogą bardzo dobrze ze sobą współpracować. Przestrzeń dostępna w chmurze może być widoczna jako dodatkowy, sieciowy dysk twardy na Twoim serwerze (przez protokół WebDAV).

Aby to osiągnąć, wykonaj następujące kroki:

1. Aktywuj w panelu moduł **[TUN/TAP/FUSE](https://mikr.us/panel/?a=tuntap)** (serwer zostanie zrestartowany)
2. Zainstaluj davfs2:

```bash
apt install davfs2
```

3. Załóż katalog na dane:

```bash
mkdir /mnt/nextcloud
```

4. Zamontuj zasób (podmień `LOGIN` na swój login do NextClouda - polecenie zapyta Cię o login i hasło):

```bash
mount -t davfs -o noexec https://nx.mikr.us/remote.php/dav/files/LOGIN/ /mnt/nextcloud/
```

Gotowe :) Pliki z NextClouda zobaczysz w katalogu `/mnt/nextcloud`.

> 💡 Dysk sieciowy przez WebDAV jest dość powolny. Świetnie nadaje się do przechowywania plików i kopii zapasowych, ale nie uruchamiaj z niego aplikacji ani baz danych.

Oto krótka instrukcja wideo pokazująca jak to osiągnąć 👇 

[https://youtu.be/PPl84z66wSE](https://youtu.be/PPl84z66wSE)

> 💡 Wolisz mieć własną instancję NextClouda? Na swoim Mikrusie możesz ją postawić za pomocą skryptu `chce_nextcloud.sh` z kolekcji [NOOBS](../skrypty_noobs).

[Powrót do strony głównej](/)
