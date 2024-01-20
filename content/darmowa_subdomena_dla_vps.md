# Darmowa subdomena dla VPS

Serwery VPS na Mikrusie nie posiadają własnych adresów IPv4, a jedynie udostępnione porty TCP. Nie za fajnie byłoby jednak mieć adres strony w stylu mojastrona:12345 ☹️

Masz do dyspozycji jednak adres IPv6, dzięki czemu podpinając swoją domenę w usłudze CloudFlare, możesz przetunelować ruch IPv4 na IPv6 i bez najmniejszych problemów pokazać swoją stronę czytelnikom. Tylko... na początek musisz mieć/kupić domenę.

Tak się składa, że w panelu Mikrusa możesz wyklikać sobie darmową subdomenę w naszej domenie i podpiąć ją do swojego serwera.

Ważne uwagi:

- subdomena obsługuje ruch HTTP oraz HTTPS
- obsługę SSL masz w komplecie. Nie konfiguruj żadnego certyfikatu, Let's Encrypta itp po swojej stronie. Jest to zbyteczne.
- Domena wskazuje na Twój adres IPv6, więc Twój serwer webowy (np. Apache czy nginX) musi słuchać na tej adresacji (domyślnie słuchają na IPv4!)
- **domeny NIE da się użyć do logowania przez SSH** czy do łączenia się z portami innymi niż 80/443

[Powrót do strony głównej](/)