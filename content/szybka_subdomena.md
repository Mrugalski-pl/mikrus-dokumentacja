# Szybka subdomena

Jeśli chcesz podpiąć tymczasową, darmową subdomenę do swojej aplikacji postawionej na Mikrusie, możesz zrobić to za pomocą naszego narzędzia o nazwie “domena”. Działa ono bezpośrednio z terminala Twojego serwera, więc nie musisz nawet logować się do panelu.

Oto wideo instrukcja:

{{< vimeo id="901911932" image="/uploads/resizeallimages.png" >}}

## Podpięcie losowej subdomeny do wybranego portu

```bash
domena 555
```

## Podpięcie wybranej subdomeny do portu

```bash
domena testuje123.byst.re 1234
```

Możesz wybrać subdomenę w jednej z naszych darmowych domen: **byst.re**, **bieda.it** lub **toadres.pl**.

## Podpięcie wybranej subdomeny do portu 80

Jeśli pominiesz numer portu, subdomena zostanie skierowana na port 80 (na adresacji IPv6):

```bash
domena testuje123.byst.re
```

## Ważne uwagi

- Możesz użyć absolutnie dowolnego portu TCP. Nie musi to być jeden z dostępnych dla Ciebie portów
- Twoja aplikacja musi słuchać na adresacji IPv6
- Przed utworzeniem subdomeny narzędzie sprawdza, czy na wskazanym porcie cokolwiek odpowiada. Najpierw uruchom aplikację, a dopiero później podpinaj domenę
- Jeśli nasz serwer nie będzie mógł połączyć się z Twoją aplikacją lub gdy aplikacja będzie zwracać błąd 50x, to subdomena nie zostanie utworzona
- Obsługa HTTPS jest automatyczna - nie musisz instalować certbota ani konfigurować certyfikatów
- Polecenie korzysta z Twojego klucza API zapisanego w pliku `/klucz_api` na serwerze. Plik ten wgrywamy automatycznie (m.in. przy reinstalacji systemu). Jeśli wygenerujesz w panelu nowy klucz API (menu **Automatyzacja** → **API**), wpisz go do tego pliku samodzielnie

> 💡 Wolisz klikać? Darmowe subdomeny wyklikasz także w panelu, w menu **Sieć i domeny** → **[Subdomeny](https://mikr.us/panel/?a=domain)**. Więcej przeczytasz w artykule [Darmowa subdomena dla VPS](../darmowa_subdomena_dla_vps).

[Powrót do strony głównej](/)
