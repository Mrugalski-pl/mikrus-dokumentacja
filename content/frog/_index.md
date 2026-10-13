+++
layout = "single"
+++

# Mikrus Frog

Serwery ‘Frog’ to VPS-y z darmowej oferty Mikrusa (<https://frog.mikr.us/>). To małe (malutkie!) serwery przeznaczone do nauki administracji serwerami, hostingu prostych aplikacji (np. checki, crony) i hostowania niewielkich stron WWW.

Usługa przeznaczona jest dla użytkowników z **Polski** 🇵🇱.

Możesz posiadać **JEDEN** taki serwer. Potrzebujesz więcej? Od tego jest [oferta płatna](https://mikr.us/).

> Zobacz też na [częste pytania i odpowiedzi](faq).

## Aktywacja serwera

Serwer aktywujesz na stronie <https://frog.mikr.us/>.

Do aktywacji serwera konieczne jest wykonanie “opłaty aktywacyjnej”. Nie jest to opłata abonamentowa (bo nie posiadasz żadnego abonamentu), a jedynie **jednorazowy** przelew weryfikujący Twoją tożsamość.

Przelew może opiewać na dowolną kwotę, ale **minimum 5zł**. Wpłatę możesz dobrowolnie powiększyć, jeśli chcesz się dorzucić do utrzymania serwera.

> 🛑 Serwery, na które nikt nie logował się przez **3 miesiące**, są **usuwane**. Loguj się na swojego Froga co jakiś czas!

Korzystając z serwera, akceptujesz [regulamin i politykę prywatności usługi FROG](https://sklep.mikr.us/page/regulamin-frog).

## Frog to nie Mikrus

Projekt FROG **nie jest połączony z infrastrukturą Mikrusa** i nie korzysta z żadnych znanych na Mikrusie usprawnień. Oznacza to, że na Frogu nie znajdziesz m.in. [Cytrusa](../cytrus), [Amfetaminy](../amfetamina), [Outsidera](../outsider), [Strychu](../strych_backupy) ani [darmowych subdomen z panelu](../darmowa_subdomena_dla_vps). Część artykułów z tej dokumentacji nie będzie więc miała do Froga zastosowania.

Serwery FROG **nie mają dostępu do panelu administracyjnego Mikrusa**. Posiadają własny portal **[SSP](https://ssp.mikr.us/)**, w którym możesz:

- przeinstalować system
- zresetować hasło do konta systemowego `frog`
- zrestartować serwer

Wszystko inne robisz samodzielnie, przez SSH.

> 👉🏻 Loginem do portalu jest **adres e-mail przypisany do konta Froga** (ten, na który dostałeś mail powitalny).

> 🔥 Serwery FROG nie mają szans udźwignąć rozwiązań typu N8N, Claude Code, Codex, Hermes Agent itp. Jeśli chcesz z nich korzystać, rozejrzyj się za [płatnym Mikrusem](https://mikr.us/) (N8N wymaga minimum 1GB RAM).


## Parametry serwera

- **256MB** RAM + **3GB** dysku
- Dostęp root (możliwość instalowania paczek systemowych)
- Technologia LXC
- System operacyjny: Linux Alpine (brak możliwości zmiany!)
- Własny adres IPv6
- Współdzielony adres IPv4  (a na nim port SSH + 3 porty TCP/UDP do dowolnego wykorzystania)
- Lokalizacja serwera: Finlandia 🇫🇮, Helsinki
- Łącze: 1Gbps

## Wsparcie techniczne

Serwery “Frog” posiadają ’wsparcie społecznościowe’ świadczone w dwojaki sposób:

- [Na grupie na Facebooku](https://mikr.us/facebook)
- [Na Discordzie](https://mikr.us/discord)

Ze względu na to, że jest to oferta bezpłatna, wsparcie techniczne dla tych serwerów (świadczone przez Administratorów) ogranicza się jedynie do reinstalacji systemu oraz udostępnienia backupu systemu w razie zupełnego uszkodzenia serwera przez Użytkownika. W razie poważnych problemów możesz pisać na frog@mikr.us. Reinstalacje możesz wykonać sam w [SSP](https://ssp.mikr.us/).

> 💡 [Tutaj znajdziesz podstawy obsługi Linuxa Alpine](alpine)

## Ograniczenia

- Ruch wychodzący możliwy jest jedynie na porty:
    
    80, 443, 3306, 53, 20, 21, 22, 110, 143, 465, 1883, 7844, 51820, 27018.
    
    ~~Potrzebujesz więcej? Napisz do supportu prośbę (z uzasadnieniem!) -~~ NIEDOSTĘPNE PRZEZ NADUŻYCIA
    
- **Zabronione jest stawianie wszelkich serwerów gier i głosowych!**
- **Skanowanie portów prowadzi do szybkiego bana i bezpowrotnego usunięcia VPS-a!**
- Ze względu na zastosowaną technologię (LXC unprivileged), niemożliwe jest:
    - zainstalowanie własnego kernela + ładowanie własnych modułów
    - montowanie urządzeń, w tym zasobów NFS
    - dodanie własnej pamięci SWAP
- Ruch sieciowy ‘do’ oraz ‘z’ pewnych krajów (m.in. azjatyckich) został wycięty na Frogu (względy bezpieczeństwa). Z tego powodu prosimy osoby z Azji o nieaktywowanie konta.



## Współdzielona baza danych

Każdy użytkownik otrzymuje dostęp do współdzielonej bazy danych MySQL (umowna pojemność to 200MB), która nie zużywa cennej pamięci RAM Twojego serwera. Dane dostępowe znajdziesz w pliku:

**/root/mysql.txt**

> 💡 Panel PHP My Admin dla froga dostępny jest tutaj => https://frog01.mikr.us/pma/
> 🛑 Uwaga: hasło dostępowe zmienia się po każdej reinstalacji serwera, ale reinstalacja serwera NIE usuwa danych w bazie.


## **Współdzielona subdomena**

Jeśli nie posiadasz własnej domeny/subdomeny, to do testów aplikacji webowych możesz wykorzystać domenę **wykr.es**. Format adresu wygląda następująco:

- **serwer-numer_portu.wykr.es**

Jeśli więc Twój serwer VPS jest na maszynie **frog01**, a aplikacja webowa słucha na porcie **20100**, to adres Twojej domeny to:

- **frog01-20100.wykr.es**


> 💡 Ta subdomena automatycznie obsługuje protokół HTTPS i wystawia/odnawia dla Ciebie certyfikat. Nie musisz o to samodzielnie dbać. **Twoja aplikacja musi podawać dane jako HTTP (nie HTTPS!).** Nie da się użyć tej domeny do połączeń SSH/FTP itp.


Portem jest jeden z tych 3, które widzisz po zalogowaniu się na swój serwer: “Udostępniliśmy Ci trzy porty na adresacji IPv4 (TCP/UDP)”. Np. dla serwera o ID “123”, będą to:

```bash
http://frog01.mikr.us:20123/ => 192.168.1.100:20123
http://frog01.mikr.us:30123/ => 192.168.1.100:30123
http://frog01.mikr.us:40123/ => 192.168.1.100:40123
```

> 📢 Nie zadziała tu jednak żaden z domyślnych portów usług, które działają na Twoim VPS, np. 80.

Masz jeszcze pytania? To świetnie! Zobacz [często zadawane pytania](faq) na temat serwerów frog! :)

[Powrót do strony głównej](/)
