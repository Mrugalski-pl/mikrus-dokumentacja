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
    
- Czy mogę zmienić plan (np. z 2.1 na 3.5)?
    
    Tak. Migracje między wersjami 2.1, 3.0 i 3.5 są zazwyczaj automatyczne i wykonywane 'w miejscu', bez przestoju serwera - opcję znajdziesz w panelu (menu **Mój VPS** → **Upgrade serwera**). Upgrade z wersji 1.0 wymaga przeniesienia VPS-a na inny, mocniejszy serwer dedykowany, co wiąże się z krótkim przestojem. Podobnie jest z migracją na wersje 4.x - wymaga ona interwencji administratora. W takich przypadkach zgłoś prośbę przez system ticketów w panelu lub na “pomoc@mikr.us”.
    Koszty migracji wynoszą tyle, co zakup serwera docelowego, a pozostałe dni abonamentu są przelewane na nowy serwer (z zachowaniem proporcji wartości serwera).
    
- Jak poradzę sobie bez adresu IPv4?
    
    Otrzymasz na start 2 przekierowane porty TCP/UDP na IPv4 + jeden do połączenia przez SSH. W panelu możesz za darmo dobrać kolejne 5 portów TCP (na Mikrusie 3.5 - 10, a z Mikrusem PRO - 35), więc standardowo możesz mieć łącznie do 7 portów usługowych. [Więcej o portach](../udostepnione_porty). Posiadasz także adres IPv6, na którym możesz postawić tyle usług, ile zechcesz. [Przeczytaj także koniecznie ten artykuł](../o_co_chodzi_z_ipv6).
    
- Czy do serwera otrzymam jakiś panel sterowania?
    
    Tak. Posiadamy autorski panel pozwalający na wykonanie podstawowych operacji na serwerze (reinstalacja, restart, zmiana hasła roota i wiele innych).
    

## Sprawy techniczne

- Czy na Mikrusie można postawić stronę na Wordpressie?
    
    Tak, jest to bezproblemowe. Mikrus hostuje tysiące blogów na Wordpressie :) Do prostej strony wystarczy Mikrus 2.1, a do cięższych zastosowań (np. WooCommerce) polecamy minimum wersję 3.0. Jeśli skorzystasz z [darmowej, współdzielonej bazy MySQL](../wspoldzielone_bazy_danych) zamiast stawiać własną, WordPress ruszy nawet na Mikrusie 1.0.
    
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

- {{<rawhtml>}}<h4 id="imie-na-srvxx">{{</rawhtml>}} Skąd mam wiedzieć na jakim serwerze głównym (`srvXX`) jest mój serwer? {{<rawhtml>}}</h4><a href="#imie-na-srvxx" class="anchor" hidden>#</a>{{</rawhtml>}}

    Nazwę serwera głównego znajdziesz w mailu powitalnym oraz na stronie głównej panelu (w gotowym poleceniu `ssh`). Możesz też skorzystać ze sztuczki: dla serwera `monika100` otwórz stronę http://monika100.mikrus.xyz - zostaniesz przekierowany na adres serwera głównego (np. `srv16.mikr.us`). Upewnij się, że wchodzisz na ten adres przez http (nie http**s**).
## Co wolno, a czego nie wolno

- Czy na Mikrusie można postawić serwer Minecrafta?
    
    Nie. Regulamin Mikrusa zabrania stawiania serwerów gier. Wyjątkiem jest sytuacja, w której jesteś developerem, rozwijasz własną grę i potrzebujesz serwera do testów.
    
- Czy Mikrus nadaje się do serwera TeamSpeak lub bota muzycznego na Discord?
    
    Technicznie się nadaje, ale regulamin zabrania stawiania tego typu softu. Mieliśmy niezliczone ilości ataków DDoS na serwery TeamSpeaka, więc nie są one mile u nas widziane.
    
- Czy używanie Torrenta i innych aplikacji P2P jest dozwolone?
    
    Rozpowszechnianie treści objętych prawami autorskimi (Torrent i inne aplikacje do wymiany nielegalnych plików) jest zabronione i grozi natychmiastową blokadą konta. Jeśli Twój soft do backupu korzysta z technologii P2P (np. Syncthing), to jest to dopuszczalne.

- Czy mogę skanować porty lub robić testy penetracyjne?

    Nie. Wszelkie działania związane z testowaniem zabezpieczeń serwerów, sieci czy usług są na Mikrusie zabronione. W przypadku wykrycia skanowania portów (np. aplikacją nmap) automat czuwający nad stabilnością serwerów może bez ostrzeżenia wyłączyć Twojego VPS-a. To zasady obowiązujące w serwerowni, z której korzystamy.
    

## Pytania na temat głównych serwerów

- Gdzie fizycznie stoją serwery Mikrusa?
    
    Wszystkie serwery Mikrusa stoją fizycznie w serwerowni Hetznera w Finlandii (Helsinki).
    
- Jakie są parametry głównych serwerów, na których stoją VPSy?
    
    Obecnie Mikrusy stoją na serwerach dedykowanych z oferty Hetznera wyposażonych w 128GB lub 256GB RAM i dyski SSD NVMe (procesory Intel Core i7, AMD Ryzen, a w przypadku Mikrusów 4.x - AMD EPYC).
    
- Na jakim łączu stoją serwery?
    
    Serwery Mikrusa posiadają łącze 1Gbps, współdzielone między użytkowników konkretnego serwera dedykowanego. Twój VPS wychodzi do sieci z fińskiego adresu IP.

- Czy adresy IPv4 serwerów są stałe?

    Tak. W przypadku ewentualnej zmiany *(mało prawdopodobne lecz nie niemożliwe)* wszyscy właściciele VPS-ów zostaną poinformowani
    

## Zdobądź swojego Mikrusa na 👇

## [https://mikr.us/](https://mikr.us/)
