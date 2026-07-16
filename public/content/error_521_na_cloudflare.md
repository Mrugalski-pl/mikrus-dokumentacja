# Error 521 na CloudFlare

Jeśli otrzymujesz ten błąd, to sprawdź następujące przypadki

- Czy zainstalowałeś u siebie dowolny serwer WWW i słucha on na adresacji IPv6 (nie ipv4!)?
- sprawdź, czy nie ustawiłeś firewalla blokującego port 80
- w ustawieniach CloudFlare prawdopodobnie masz ustawiony tryb połączenia na **FULL** lub **STRICT**. Zmień na **FLEXIBLE**.

[Powrót do strony głównej](/)