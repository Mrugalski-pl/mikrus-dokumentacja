# Podstawy obsługi Linuxa Alpine


Do pracy z paczkami używa się aplikacji “**APK**” (to coś jak APT z Debiana/Ubuntu). Uruchomisz ją z roota lub przez sudo.

- **Logowanie na konto root (wydaj to polecenie jako frog)**
    - `sudo su -`
- **Aktualizacja listy paczek**
    - `apk update`
- **Aktualizacja systemu**
    - `apk upgrade`
- **Poszukiwanie konkretnej paczki (np. apache2)**
    - `apk search apache2`
- **Instalacja konkretnej paczki**
    - `apk add apache2`
- **Usunięcie konkretnej paczki**
    - `apk del apache2`
- **Dodanie aplikacji do autostartu**
    - `rc-update add apache2`
- **Usunięcie aplikacji z autostartu**
    - `rc-update del apache2`
- **Podgląd logów (wszystkie są w jednym pliku)**
    - `tail -f /var/log/messages`
- **Zarządzanie usługami**
    - `service apache2 start|stop|restart`
- **Sprawdzenie konfiguracji sieci (w tym adresów IP)**
    - `ip a`

[Wróć](..)