# Error 521 na CloudFlare

Błąd 521 ("Web server is down") oznacza, że CloudFlare nie był w stanie połączyć się z Twoim serwerem WWW. Jeśli otrzymujesz ten błąd, to sprawdź następujące przypadki

- Czy zainstalowałeś u siebie dowolny serwer WWW i słucha on na adresacji IPv6 (nie ipv4!)?
- sprawdź, czy nie ustawiłeś firewalla blokującego port 80
- w ustawieniach CloudFlare prawdopodobnie masz ustawiony tryb połączenia na **FULL** lub **STRICT**. Zmień na **FLEXIBLE**.
- czy rekord **AAAA** w CloudFlare wskazuje na właściwy adres IPv6 Twojego serwera? Adres mógł się zmienić np. po przeniesieniu serwera na inną maszynę

## Jak to sprawdzić?

Sprawdź, czy serwer WWW nasłuchuje na porcie 80 na IPv6:

```bash
ss -tlnp | grep ':80 '
```

W wyniku powinna pojawić się linia z adresem `[::]:80` (lub `*:80`). Jeśli widzisz tylko `0.0.0.0:80`, to Twój serwer słucha wyłącznie na IPv4 i CloudFlare się z nim nie połączy. W konfiguracji nginx dodaj wtedy linijkę `listen [::]:80;`, a w Apache upewnij się, że masz wpis `Listen 80` (bez podawania adresu IPv4).

Sprawdź swój aktualny adres IPv6 (musisz użyć tego, który **nie** zaczyna się od `fe80`):

```bash
ip -6 a s
```

Jeśli nadal nie wiesz, co jest nie tak, uruchom [Mariana](../marian) - sprawdzi on m.in. firewall i połączenie sieciowe Twojego serwera.

Zobacz też: [Podpięcie domeny przez CloudFlare](../podpiecie_domeny_przez_cloudflare)

[Powrót do strony głównej](/)
