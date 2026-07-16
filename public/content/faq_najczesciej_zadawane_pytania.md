# FAQ - najczęściej zadawane pytania

## Sprawy przed zakupem

- Czy otrzymam fakturę?
    
    Oczywiście! Podczas składania zamówienia podaj dane do niej. Automat prześle Ci fakturę godzinę po opłaceniu zamówienia. Mikrus obsługiwany jest przez legalnie działającą w Polsce firmę, więc płacimy podatki :) 
    
- Cena podana na stronie to netto, czy brutto?
    
    Jest to kwota ostateczna, jaką płacisz (brutto)
    
- Ile będzie kosztował serwer po pierwszym roku?
    
    Cena po roku nie zmienia się. Koszt serwera po upływie abonamentu będzie wynosił tyle samo, co w momencie kupna VPSa.
    
- Kwota na stronie to opłata za miesiąc, czy kwartał?
    
    Jest to opłata **ROCZNA**. Nie oferujemy możliwości płatności miesięcznej, kwartalnej, ani ratalnej ;)
    
- Czy będę mógł przejść z oferty 1.0 na 2.x lub 3.x? A z wersji 2.x na 3.x?
    
    Tak. Dla migracji 2.x → 3.x ten proces jest automatyczny. Po zalogowaniu się do panelu znajdziesz taką opcję. Natomiast wersja 1.0 wiąże się ze zmianą serwera odpowiedniego pod daną wersję. Należy wtedy zgłosić taką prośbę poprzez system ticketów lub na “pomoc@mikr.us”.
    Koszty migracji wynoszą tyle, co zakup serwera docelowego, a pozostałe dni abonamentu są przelewane na nowy serwer (z zachowaniem proporcji wartości serwera).
    
- Jak poradzę sobie bez adresu IPv4?
    
    Otrzymasz na start 2 przekierowane porty na IPv4 + jeden do połączenia przez SSH. Docelowo możesz mieć aż 7 przekierowanych portów na swój serwer. Posiadasz także adres IPv6, na którym możesz postawić tyle usług, ile zechcesz. [Przeczytaj także koniecznie ten artykuł](../o_co_chodzi_z_ipv6).
    
- Czy do serwera otrzymam jakiś panel sterowania?
    
    Tak. Posiadamy autorski panel pozwalający na wykonanie podstawowych operacji na serwerze (reinstalacja, restart, zmiana hasła roota i wiele innych).
    

## Sprawy techniczne

- Czy na Mikrusie można postawić stronę na Wordpressie?
    
    Tak, jest to bezproblemowe. Mikrus hostuje setki blogów na Wordpressie :) 
    
- Czy na serwerze mogę hostować kilka stron internetowych?
    
    Możesz ich mieć tyle, ile zechcesz i na ile pozwolą Ci zasoby serwera. Wielu użytkowników hostuje u nas po 2-4 strony na VPS.
    
- Czy Mikrus nadaje się do aplikacji pisanych w Node, Python, Java, .NET?
    
    Tak, ale ze względu na zaawansowanie tych technologii, sugerowane jest stawianie ich na Mikrusie 2.1, aby działały płynnie. Możesz oczywiście pobawić się w optymalizację zasobów i spróbować postawić takie usługi na wersji 1.0, ale nie jest to zalecane.
    
- Czy otrzymam dostęp ROOT do serwera?
    
    Tak! Masz pełen dostęp do serwera i sam decydujesz, co chcesz na nim zainstalować
    
- Czy mogę postawić FreeBSD, OpenBSD lub NetBSD?
    
    Nie jest to technicznie możliwe. VPS, którego otrzymujesz to kontener LXC ze współdzielonym kernelem. Nie da się więc na nim postawić Unixa
    
- Czy do serwera można podpiąć własną domenę?
    
    Tak. Można to zrobić na kilka sposobów. Jednym z nich jest użycie [darmowej usługi CloudFlare](../podpiecie_domeny_przez_cloudflare), a drugi to użycie [naszych wewnętrznych mechanizmów](../cytrus).

- Czy na Mikrusie można postawić własny serwer poczty?

    Nie. Ze względu na współdzielony adres IPv4 nie jest możliwe uruchomienie własnej poczy przychodzącej. Na [Outsiderze](../outsider) możesz skonfigurować współdzielony serwer poczty. 

- Jakie dystrybucje Linuxa są dostępne na Mikrusie?
    
    Pełna lista dystrybucji dostępna jest [tutaj](../dystrybucje_linuxa)

- <h4 id="imie-na-srvxx"> Skąd mam wiedzieć na jakim serwerze głównym (`srvXX`) jest mój serwer? </h4><a href="#imie-na-srvxx" class="anchor" hidden>#</a>

    Przykładowo, dla serwera `monika100` otwórz stronę http://monika100.mikrus.xyz i przeczytaj adres (będzie większą czcionką zakończony na `.mikr.us`). Jeżeli przeglądarka wyświetli błąd lub problem z certyfikatem należy upewnić się że wchodzimy na adres przez http (nie http**s**).
## Co wolno, a czego nie wolno

- Czy na Mikrusie można postawić serwer Minecrafta?
    
    Po pierwsze, technicznie byłoby to bardzo trudne (do wygodnej gry potrzebujesz około 4GB RAM), a po drugie, regulamin Mikrusa zabrania stawiania serwerów gier.
    
- Czy Mikrus nadaje się do serwera TeamSpeak lub bota muzycznego na Discord?
    
    Technicznie się nadaje, ale regulamin zabrania stawiania tego typu softu. Mieliśmy niezliczone ilości ataków DDoS na serwery TeamSpeaka, więc nie są one mile u nas widziane.
    
- Czy używanie Torrenta i innych aplikacji P2P jest dozwolone?
    
    Jest to zabronione
    

## Pytania na temat głównych serwerów

- Gdzie fizycznie stoją serwery Mikrusa?
    
    Wszystkie serwery Mikrusa stoją fizycznie w serwerowni Hetznera w Finlandii (Helsinki).
    
- Jakie są parametry głównych serwerów, na których stoją VPSy?
    
    Obecnie, serwery Mikrusa to maszyny EX52-NVMe oraz AX-41 z oferty Hetznera (128GB RAM, dyski SSD NVMe, CPU i7-8700 lub AMD Ryzen 5) 
    
- Na jakim łączu stoją serwery?
    
    Serwery Mikrusa posiadają łącze 1Gbps

- Czy adresy IPv4 serwerów są stałe?

    Tak. W przypadku ewentualnej zmiany *(mało prawdopodobne lecz nie niemożliwe)* wszyscy właściciele VPS-ów zostaną poinformowani
    

## Zdobądź swojego Mikrusa na 👇

## [https://mikr.us/](https://mikr.us/)
