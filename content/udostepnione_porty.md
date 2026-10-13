# Udostępnione porty

Wraz ze swoim serwerem VPS otrzymujesz trzy domyślne porty na współdzielonym adresie IPv4 serwera głównego:

- 10000 + ID
- 20000 + ID
- 30000 + ID

Gdzie ID to numer Twojej maszyny. Przykładowo, dla serwera o ID **123** będą to porty **10123**, **20123** i **30123**.

Pierwszy z portów używany jest do logowania przez SSH, więc raczej nie wykorzystasz go do hostowania innych usług. Dwa pozostałe porty to porty ogólnego przeznaczenia - obsługują zarówno **TCP, jak i UDP**.

## Dodatkowe porty

Jeśli liczba portów okaże się dla Ciebie niewystarczająca, to w panelu użytkownika (menu **Sieć i domeny** → **[Porty TCP IPv4](https://mikr.us/panel/?a=ports)**) możesz wyklikać sobie za darmo dodatkowe porty:

- **5 dodatkowych portów** - standardowo
- **10 dodatkowych portów** - na Mikrusie 3.5
- **35 dodatkowych portów** - z aktywnym [Mikrusem PRO](https://mikr.us/panel/?a=pro)

Nowy port zaczyna działać po około 2-3 minutach. Niepotrzebne porty możesz w każdej chwili usunąć z tej samej zakładki (portów domyślnych nie da się usunąć).

> **Ważne**: porty zamówione w panelu to porty TCP. Jeśli potrzebujesz protokołu UDP (np. dla [Wireguarda](../wireguard) czy serwera DNS), skorzystaj z portów 20000+ID lub 30000+ID!

## Potrzebujesz więcej?

Pamiętaj, że porty na IPv4 potrzebne są tylko usługom, które mają być dostępne ze świata. Na adresacji IPv6 oraz wewnątrz serwera możesz używać dowolnych portów, bez żadnych limitów. Aplikacje webowe najwygodniej jest wystawić przez [darmowe subdomeny](../darmowa_subdomena_dla_vps), które w ogóle nie zużywają portów IPv4.

Więcej o tym, jak to wszystko działa, przeczytasz w artykule [O co chodzi z IPv6?](../o_co_chodzi_z_ipv6)

[Powrót do strony głównej](/)
