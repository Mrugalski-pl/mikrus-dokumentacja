# Darmowa subdomena dla VPS

Serwery VPS na Mikrusie nie posiadają własnych adresów IPv4, a jedynie udostępnione porty TCP. Adres w stylu "mojastrona:12345" (gdzie 12345 to Twój numer portu TCP) nie wygląda zbyt profesjonalnie.

Na szczęście masz do dyspozycji **darmowe subdomeny Mikrusa**, które możesz podpiąć na dwa sposoby:

## Metoda 1: Subdomena dynamiczna (automatyczna)

Subdomeny dynamiczne działają same (bez żadnej konfiguracji) według ustalonego schematu - wystarczy, że uruchomisz aplikację na odpowiednim porcie. Masz do wyboru **dwie domeny**, w zależności od potrzeb:

### wykr.es - dla aplikacji na portach z puli Twoich portów IPv4

Format: **serwer-numer_portu.wykr.es**

Przykłady:
- **frog01-20100.wykr.es** (dla serwera frog01, port 20100)
- **srv55-30999.wykr.es** (dla serwera srv55, port 30999)

**Ważne ograniczenia:**
- Możesz używać **tylko portów z puli dostępnej w panelu** (tych, które masz przydzielone)
- Umożliwia hostowanie **do kilku aplikacji** (tyle, ile masz portów w puli)
- Subdomena obsługuje ruch HTTP oraz HTTPS
- Obsługa SSL jest automatyczna - nie konfiguruj własnych certyfikatów, nie instaluj certbota itp.
- **NIE działa dla SSH** ani innych protokołów - tylko HTTP/HTTPS

### mikrus.cloud - dla zaawansowanych użytkowników (do portów IPv6)

Format: **serwer-numer_portu.mikrus.cloud**

**Zalety:**
- Możesz użyć **dowolnego numeru portu** (teoretycznie do kilkudziesięciu tysięcy aplikacji)
- Większa elastyczność w konfigurowaniu

**Wymagania:**
- Aplikacja **musi słuchać na adresacji IPv6** (nie IPv4!)
- Twoja aplikacja może podawać ruch jako HTTP (plaintext) - użytkownik zawsze dostanie szyfrowaną treść (HTTPS).

Przykładowo, dla serwera `adam100` z aplikacją działającą na porcie `[::]:8000` poprawnym adresem będzie `https://adam100-8000.mikrus.cloud/`. 
Możesz to przetestować na własnym serwerze używając polecenia 
```bash
python3 -m http.server -b :: 8000
```
Ważne jest w tym wypadku (oraz w twpjej aplikacji) by słuchała ona na IPv6. Zapis `::` (lub `[::]`) oznacza bindowanie do portu na IPv6.


## Metoda 2: Subdomena dedykowana (wyklikiwana w panelu)

Oprócz subdomen dynamicznych, możesz również **skonfigurować własną subdomenę dedykowaną** bezpośrednio w panelu użytkownika Mikrusa.

**Zalety:**
- Możesz wybrać własną, łatwą do zapamiętania nazwę (np. mojaplikacja.bieda.it)
- Większa kontrola nad konfiguracją
- Bardziej profesjonalny wygląd niż automatycznie generowana nazwa

**Jak to działa:**
1. Wchodzisz do panelu Mikrusa do działu z [subdomenami](https://mikr.us/panel/?a=domain)
2. Wyklikujesz nową subdomenę w odpowiedniej sekcji
3. Przypisujesz ją do swojego serwera VPS i wybranego portu

**Uwagi:**
- Subdomena dedykowana również wymaga, aby aplikacja słuchała na IPv6
- Automatyczna obsługa SSL działa tak samo, jak w przypadku subdomen dynamicznych
- Twoja aplikacja może podawać ruch jako HTTP (plaintext) lub HTTPS (szyfrowany) - zaznacz odpowiednią opcję w panelu
- niezależnie czy Twoja aplikacja podaje ruch szyfrowany, czy nie, to użytkownik zawsze dostanie szyfrowaną treść.

[Powrót do strony głównej](/)
