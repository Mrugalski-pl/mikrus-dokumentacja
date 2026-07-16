# Cytrus

Cytrus jest usługą współdzielonego serwera WWW (jest to Nginx), dzięki któremu bez konieczności instalacji serwera WWW jesteś w stanie hostować strony internetowe.

Usługa ta natywnie wspiera strony statyczne oraz te tworzone w języku PHP (np. Wordpress).

> 💡 Jeśli chcesz dodać własną DOMENĘ do Cytrusa, musisz wycelować jej wpis “A” w IP:
> **135.181.95.85**

> 💡 Jeśli chcesz dodać własną SUBDOMENĘ do Cytrusa, musisz wycelować jej wpis “CNAME” w:
> **backend.strony.me**

**Dodatkowe zalety Cytrusa, to:**

- możliwość przekierowania domeny na dowolny adres IP oraz port (usługa WWW nie musi słuchać na porcie 80)
- możliwość dostępu do serwera za pomocą współdzielonego serwera FTP
- obsługa dowolnej liczby domen

**Ograniczenia:**
- Cytrus jest współdzielony więc aby zapewnić komfortowe działanie wszystkim użytkownikom, utrzymuj rozmiar wszystkich plików  poniżej 3 GB
- Ze względu na to że cytrus jest na osobnej, mocniejszej maszynie podążanie za symlinkami na VPS-a nie jest możliwe

**Ciekawostki**

- jeśli zamiast katalogu docelowego podasz adres domenowy lub adres IP serwera wraz z numerem portu, to Cytrus przekieruje na niego ruch (podaj np: http://1.2.3.4:3000)
- jako ‘katalog docelowy’ możesz podać adres URL strony w Notion. Zyskasz wtedy możliwość hostowania stron z Notion we własnej domenie/subdomenie.

Cytrus NIE jest konieczny, aby hostować własne strony na Mikrusie.

Jest on jedynie opcjonalnym ułatwieniem.

[Powrót do strony głównej](/)
