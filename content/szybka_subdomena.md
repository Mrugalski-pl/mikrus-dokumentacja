# Szybka subdomena

Jeśli chcesz podpiąć tymczasową, darmową subdomenę do swojej aplikacji postawionej na Mikrusie, możesz zrobić to za pomocą naszego narzędzia o nazwie “domena”.

Oto wideo instrukcja:

[https://vimeo.com/901911932](https://vimeo.com/901911932?share=copy)

## Podpięcie losowej subdomeny do wybranego portu

```bash
domena 555
```

## Podpięcie wybranej subdomeny do portu

```bash
domena testuje123.byst.re 1234
```

## Ważne uwagi

- Możesz użyć absolutnie dowolnego portu TCP. Nie musi to być jeden z dostępnych dla Ciebie portów
- Twoja aplikacja musi słuchać na adresacji IPv6
- Jeśli nasz serwer nie będzie mógł połączyć się z Twoją aplikacją lub gdy aplikacja będzie zwracać błąd 50x, to subdomena nie zostanie utworzona

[Powrót do strony głównej](/)