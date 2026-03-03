# O co chodzi z IPv6?

Serwery Mikrusa działają w trybie “głównie IPv6”. Nie są to serwery “IPv6-only”. Brzmi to dość skomplikowanie, ale już tłumaczę, o co chodzi i jak to działa.

**Spis treści**

- [Czym jest IPv6?](#czym-jest-ipv6)
- [Istnieje pewien problem z IPv6](#istnieje-pewien-problem-z-ipv6)
- [Dlaczego IPv6-mostly na Mikrusie?](#dlaczego-ipv6-mostly-na-mikrusie)
- [Jak Mikrus rozwiązuje problemy z brakiem IPv4?](#jak-mikrus-rozwiązuje-problemy-z-brakiem-ipv4)
- [Jak to działa w praktyce? 🤔](#jak-to-działa-w-praktyce-)
- [🌎 Aplikacje webowe](#-aplikacje-webowe)
- [Częste komentarze i pytania](#częste-komentarze-i-pytania--)

## Czym jest IPv6?

Komputery podłączone do internetu posiadają swoje adresy IP, dzięki czemu mogą być widoczne w sieci i mogą porozumiewać się z innymi komputerami. Przykładowo, możesz posiadać adres np. 1.2.3.4. Taka adresacja nazywana jest “Internet Protocol version 4” albo w skrócie IPv4.

Protokół IPv6 został wprowadzony, ponieważ liczba urządzeń potrzebujących dostępu do internetu stale rosła, a liczba dostępnych adresów IP w protokole IPv4 była ograniczona.

IPv4 pozwala na użycie maksymalnie 4,3 miliarda adresów IP, co mogło wydawać się wystarczające w momencie, gdy protokół ten został opracowany. Jednak wraz z rozwojem internetu i pojawieniem się coraz większej liczby urządzeń potrzebujących dostępu do sieci, stało się jasne, że konieczne jest opracowanie nowego protokołu internetowego, który pozwoli na użycie większej liczby adresów IP.

W obecnych czasach adresacja IPv4 już się skończyła, w rozumieniu: została cała rozdysponowana. Z tego powodu nie da się już zdobyć własnego adresu IPv4 z tzw. ‘rynku pierwotnego’. Można te adresy jedynie od kogoś odkupić (co jest skrajnie drogie) lub wynająć.

Aby zaradzić temu problemowi, powstała nowa, ulepszona i bardziej pojemna adresacja IPv6. Uwierz mi na słowo, że liczba adresów obsługiwana w ramach tej adresacji jest na tyle duża, że nie grozi nam jej wyczerpanie.

Adresy IPv6 są więc łatwo dostępne, skrajnie tanie, ale…

## Istnieje pewien problem z IPv6

Ta adresacja jest “nowa” z punktu widzenia dostawców internetu (sama adresacja ma już ponad 20 lat), ponieważ od zawsze obsługiwali oni jedynie wersję czwartą adresacji i nie za bardzo mają powody, aby przerzucać się na nowszą wersję.

Z tego powodu wsparcie dla IPv6 w Polsce i na świecie jest obecnie słabe.

Według [statystyk Google](https://www.google.com/intl/en/ipv6/statistics.html#tab=per-country-ipv6-adoption), na świecie około 40% komputerów obsługuje ten protokół. Jednak w naszym kraju, w chwili, gdy piszę te słowa, jest to zaledwie 18%. To niestety oznacza, że jeśli postawisz np. swoją stronę WWW na adresacji IPv6, to masz 82% szans, że u Twojego kolegi nie będzie ona działać.

Ta statystyka poprawia się z roku na rok, ale niestety na obecną chwilę, użycie IPv6 do profesjonalnych zastosowań związanych z hostingiem jest praktycznie niemożliwe.

> 🚀 Na Mikrusie jednak wprowadziliśmy rozwiązanie, które sprawia, że możemy korzystać z tańszej adresacji IPv6, bez jednoczesnego utrudniania życia naszym użytkownikom.

## Dlaczego IPv6-mostly na Mikrusie?

“Jeśli nie wiesz, o co chodzi, to chodzi o pieniądze”. Celem Mikrusa jest oferowanie możliwie taniej infrastruktury IT do hostowania hobbystycznych projektów. Niestety, adresacja IPv4 dostępna jest już jedynie na rynku wtórnym, a jej ceny - jak wszystkiego, co jest ograniczone - tylko rosną, a nie spadają.

Przeważnie za wynajem jednego adresu IPv4 płaci się obecnie od 4zł do 15zł miesięcznie. Najtańszy serwer na Mikrusie kosztuje 35zł/rok. Koszty utrzymania jednego adresu IPv4 to minimum 48zł rocznie. Jak widzisz, matematyka nam się tutaj trochę nie spina. Do tego trzeba jeszcze doliczyć VAT, więc realnie najtańszy IPv4 wyjdzie na poziomie około 60zł/rok (przyjmując 0zł zysku).

Zakładając powyższy scenariusz, koszt Mikrusa 1.0 na adresacji IPv4 musiałby wynosić nie mniej jak 95zł za rok. Oczywiście znajdą się ludzie, którzy powiedzą, że to nadal jest super cena i chętnie zapłacą - ich jest jednak mniejszość.

Problem z IPv4 jest jeszcze taki, że prawie nikt nie sprzedaje tych adresów na sztuki, a sprzedaje się je na paczki, najczęściej po 255 sztuk. 255\*60 daje nam wydatek roczny nie mniejszy niż 15000zł za samą adresację. Kolejny problem polega na tym, że Mikrus nie potrzebuje jednej takiej paczki, a w chwili, gdy piszę te słowa (grudzień 2022), byłoby to minimum 10 paczek. Roczne koszty utrzymania adresacji wyniosłyby nie mniej jak 150 tysięcy złotych przy założeniu zerowego zysku ze sprzedaży adresów. Model biznesowy Mikrusa nie sprawdziłby się przy takich kosztach.

## Jak Mikrus rozwiązuje problemy z brakiem IPv4?

Typowy użytkownik Mikrusa potrzebuje adresacji IPv4 do dwóch rzeczy:

- do nawiązania połączenia z serwerem po SSH (Twoja sieć domowa na 82% nie wspiera IPv6)
- do wystawienia swoich aplikacji na zewnątrz, aby inni użytkownicy mogli z nich korzystać

Oznacza to, że musisz mieć adres IPv4 i bez tego nie będziesz w stanie funkcjonować. Nie musisz mieć jednak ”własnego adresu IPv4”. Wystarczy Ci współdzielony.

I na tym polega sekret Mikrusa. Współdzielimy adresację IPv4, co drastycznie obniża koszty infrastruktury. Zamiast przypisywać każdemu serwerowi oddzielny adres, przypisujemy jeden adres do np. 300 maszyn. Jak się domyślasz, obniża to koszty utrzymania adresacji kilkaset razy. To pozwala utrzymywać niskie ceny VPS-ów.

### Jak to działa w praktyce? 🤔

Każdy użytkownik Mikrusa otrzymuje VPS-a z nadanym numerem ID, który jest trzycyfrowy. Niech to będzie w Twoim przypadku np. “123”. Twój VPS umieszczony zostaje na jednej z naszych maszyn. Najczęściej maszyny mają prefix ‘srv’ i kolejny numer w nazwie np. “srv20”.

Otrzymujesz od nas na start (później możesz to zwiększyć) trzy numery portów:

- 10000 + ID = port SSH
- 20000 + ID = port do dowolnego wykorzystania
- 30000 + ID = port do dowolnego wykorzystania

Oznacza to, że chcąc połączyć się z serwerem VPS o numerze “123” na maszynie srv20 przez SSH, musisz wpisać polecenie:

```bash
ssh root@srv20.mikr.us -p10123
```

Aplikację będącą serwerem dowolnych usług możesz umieścić za to na portach 20123 oraz 30123. Oba porty nasłuchują zarówno komunikacji TCP, jak i UDP, więc bez problemu postawisz tam zarówno serwery webowe, jak i np. aplikacje typu OpenVPN czy Wireguard.

### 🌎 Aplikacje webowe

O ile hostowanie np. serwera OpenVPN na porcie 20123 nie jest problemem, to hostowanie tam serwera webowego już nie jest takie fajne. Chyba nie chcesz, aby adres np. Twojego bloga na Wordpressie wyglądał tak:

http://srv20.mikr.us:20123/

Aby temu zaradzić, wprowadziliśmy dwa rozwiązania. Jeśli posiadasz własną, wykupioną przez Ciebie domenę (u dowolnego dostawcy, bo Mikrus nie sprzedaje domen), to namawiamy użytkowników do używania darmowej usługi Cloudflare do podłączenia tej domeny do VPS-a. Firma Cloudflare poza tym, że obsługuje domeny, świadczy także usługę tunelowania IPv4→IPv6.

Nie martw się, taka konfiguracja jest dziecinnie prosta (zero poleceń w terminalu, wszystko wyklikuje się w interfejsie webowym). Mamy nawet oddzielny poradnik jak to zrobić:

[Poradnik na temat konfiguracji usługi Cloudflare na Mikrusie](../podpiecie_domeny_przez_cloudflare)

Jeśli nie posiadasz własnej domeny, to także nie jest problemem. **Mikrus oferuje [darmowe subdomeny](/darmowa_subdomena_dla_vps) dla każdego**. Możesz więc hostować swoją stronę pod klasyczną nazwą domenową, bez podawania dziwnych i niewygodnych numerów portów. Mało tego! Jeszcze zadbamy za Ciebie o obsługę HTTPS (nie musisz robić absolutnie niczego, aby wspierać ruch po HTTPS).

### Dwa dodatkowe porty to mało!

W panelu zupełnie bezpłatnie możesz wyklikać sobie dodatkowe 5 portów TCP. Oznacza to, że w praktyce możesz nasłuchiwać na aż 7 portach.

Nasze statystyki pokazują, że przeciętny użytkownik Mikrusa zużywa jeden dodatkowy port. Kilkadziesiąt procent użytkowników wykorzystuje dwa podstawowe porty, a liczbę użytkowników wykorzystujących wszystkie 7 dostępnych portów można zliczyć na palcach obu rąk.

Może Ci się wydawać, że 7 portów to nadal mało, bo przecież Ty chcesz postawić na serwerze np. 20 kontenerów Dockera. Śmiało stawiaj! Zastanów się tylko, czy wszystkie 20 potrzebuje dostępu ze świata? Przeważnie konfiguracja takiej infrastruktury wygląda tak, że jeden z kontenerów wystawia usługę na świat, a pozostałe z nich komunikują się tylko między sobą. Oznacza to, że najprawdopodobniej Twoja infrastruktura zbudowana z 20 kontenerów będzie zużywać 1-2 porty TCP.

Nie limitujemy, ile portów zużyjesz na adresacji prywatnej oraz ile wykorzystasz na adresacji IPv6. Oznacza to, że na Mikrusie możesz postawić nieograniczoną liczbę usług. Realnym limitem jest jedynie ilość pamięci RAM, bo Twoje usługi muszą się jednak zmieścić w pamięci serwera.

[Powrót do strony głównej](/)

## Częste komentarze i pytania  ⬇️

- **Czy mogę jednak dopłacić i otrzymać adres IPv4?**
    
    **Nie możesz**. Tak jak wspomina tekst, adresy IPv4 sprzedawane są na paczki, więc chcąc sprzedać Ci jedną sztukę, musimy kupić/wynająć ich najczęściej 255 sztuk, aby to było opłacalne cenowo. Nijak się to nie będzie opłacało ani nam, ani Tobie.
    
- **Jakim cudem IP kosztuje 4-15zł? Przecież OVH daje je za darmo!**
    
    Tak, dają po 16 sztuk darmowych adresów do każdego zakupionego serwera dedykowanego (dotyczy to niektórych ofert). Tylko my nie potrzebujemy 16 sztuk, tylko nie mniej jak 2500 (stan na grudzień 2022). Oznacza to, że aby korzystać z “darmowych IP”, musielibyśmy u nich kupić minimum 157 serwerów dedykowanych, a one nie są darmowe, a koszt zakupu dedyków musielibyśmy przerzucić i tak na użytkowników. Nikomu by się to nie opłacało.
    
- **Zamiast wynajmować IPv4, można je przecież kupić. Wyjdzie taniej.**
    
    Problemy są tutaj dwa. Koszt kupna adresu IPv4 to około 57 USD za sztukę (stan na grudzień 2022). Chcąc kupić 2500 sztuk, wychodzi to niecałe 630 tysięcy PLN. Aktualnie nie posiadamy tylu drobnych w portfelu. Drugi problem to zainteresowanie adresacją IPv4 wśród użytkowników Mikrusa. Nauczyliśmy naszych użytkowników, jak żyć w świecie IPv6-mostly i podoba im się to. Regularnie przeprowadzane ankiety pokazują, że większość użytkowników nie wykazuje zainteresowania posiadaniem własnego adresu IPv4. Wprowadzanie takiej adresacji do sprzedaży mogłoby tylko bezcelowo podbić cenę VPS-ów, bez zysku dla użytkowników. Wolimy utrzymywać niskie ceny.
    
- **Cała konkurencja oferuje własne adresy IPv4. Wygryzą Was z rynku!**
    
    Mikrus skierowany jest do zupełnie innego segmentu rynku. Profesjonaliści mający bardzo wywindowane wymagania powinni zdecydowanie kupić VPS-y u naszej konkurencji. Zapłacą za to prawdopodobnie 5-10 razy więcej, ale zyskają dzięki temu adresację IPv4, mocniejsze parametry i otrzymają mniej rygorystyczny regulamin usługi (np. na Mikrusie nie wolno stawiać serwerów gier oraz aplikacji audio/streaming w stylu TeamSpeak, Shoutcast, Icecast, Plex itp.). Mikrus nie jest idealnym rozwiązaniem dla każdego.