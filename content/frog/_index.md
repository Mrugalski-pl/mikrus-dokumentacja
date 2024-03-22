# Mikrus Frog

Serwery ‘Frog’ to VPS-y z darmowej oferty Mikrusa ([http://mikr.us](https://mikr.us)).

Możesz posiadać **JEDEN** taki serwer.

Do aktywacji serwera konieczne jest wykonanie “opłaty aktywacyjnej”. Nie jest to opłata abonamentowa (bo nie posiadasz żadnego abonamentu), a jedynie przelew weryfikacyjny.

Przelew taki wynosi **5zł**, ale wpłatę możesz dobrowolnie powiększyć, jeśli chcesz się dorzucić do utrzymania serwera.


> 🆘 Reinstalacja lub odzyskanie hasła? Sprawdź nasz portal: [https://ssp.frog01.mikr.us/](https://ssp.frog01.mikr.us/login)

> 👉🏻 Loginem do portalu jest 3-cyfrowy ID, czyli jak Twój Frog ma w nazwie f1**853**, to Twoim ID jest 853.


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

- [Na grupie na Facebooku](https://www.facebook.com/groups/mikrusy)
- [Na Discordzie](https://discord.gg/a7aZPGEQAZ)

Ze względu na to, że jest to oferta bezpłatna, wsparcie techniczne dla tych serwerów (świadczone przez Administratorów) ogranicza się jedynie do reinstalacji systemu oraz udostępnienia backupu systemu w razie zupełnego uszkodzenia serwera przez Użytkownika. W razie poważnych problemów możesz pisać na frog@mikr.us. Reinstalacje możesz wykonać sam w [SSP](https://ssp.frog01.mikr.us/login)

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
- Ruch sieciowy ‘do’ oraz ‘z’ pewnych krajów (m.in. azjatyckich) został wycięty na Frogu (względy bezpieczeństwa).

## Podstawy obsługi Linuxa Alpine

Do pracy z paczkami używa się aplikacji “**APK**” (to coś jak APT z Debiana/Ubuntu). Uruchomisz ją z roota lub przez sudo.

- **Logowanie na konto root (wydaj to polecenie jako frog)**
    - sudo su -
- **Aktualizacja listy paczek**
    - apk update
- **Aktualizacja systemu**
    - apk upgrade
- **Poszukiwanie konkretnej paczki (np. apache2)**
    - apk search apache2
- **Instalacja konkretnej paczki**
    - apk add apache2
- **Usunięcie konkretnej paczki**
    - apk del apache2
- **Dodanie aplikacji do autostartu**
    - rc-update add apache2
- **Usunięcie aplikacji z autostartu**
    - rc-update del apache2
- **Podgląd logów (wszystkie są w jednym pliku)**
    - tail -f /var/log/messages
- **Zarządzanie usługami**
    - service apache2 start|stop|restart
- **Sprawdzenie konfiguracji sieci (w tym adresów IP)**
    - ip a

## Współdzielona baza danych

Każdy użytkownik otrzymuje dostęp do współdzielonej bazy danych MySQL (umowna pojemność to 200MB), która nie zużywa cennej pamięci RAM Twojego serwera. Dane dostępowe znajdziesz w pliku:

**/root/mysql.txt**

<aside>
🛑 Uwaga: hasło dostępowe zmienia się po każdej reinstalacji serwera, ale reinstalacja serwera NIE usuwa danych w bazie.

</aside>

## **Współdzielona subdomena**

Jeśli nie posiadasz własnej domeny/subdomeny, to do testów aplikacji webowych możesz wykorzystać domenę **wykr.es**. Format adresu wygląda następująco:

- **serwer-numer_portu.wykr.es**

Jeśli więc Twój serwer VPS jest na maszynie **frog01**, a aplikacja webowa słucha na porcie **20100**, to adres Twojej domeny to:

- **frog01-20100.wykr.es**

<aside>
💡 Ta subdomena automatycznie obsługuje protokół HTTPS i wystawia/odnawia dla Ciebie certyfikat. Nie musisz o to samodzielnie dbać. **Twoja aplikacja musi podawać dane jako HTTP (nie HTTPS!).** Nie da się użyć tej domeny do połączeń SSH/FTP itp.

</aside>

Portem jest jeden z tych 3, które widzisz po zalogowaniu się na swój serwer: “Udostępniliśmy Ci trzy porty na adresacji IPv4 (TCP/UDP)”. Np. dla serwera o ID “123”, będą to:

```bash
http://frog01.mikr.us:20123/ => 192.168.1.100:20123
http://frog01.mikr.us:30123/ => 192.168.1.100:30123
http://frog01.mikr.us:40123/ => 192.168.1.100:40123
```

<aside>
📢 Nie zadziała tu jednak żaden z domyślnych portów usług, które działają na Twoim VPS, np. 80.

</aside>

## Częste pytania i odpowiedzi

- **Czy mogę zmienić system operacyjny np. na Ubuntu/Debian?**
    
    Nie ma takiej możliwości. Jeśli chcesz mieć dostęp do kilkunastu różnych systemów operacyjnych, [przejdź na płatną ofertę Mikrusa](https://mikr.us).
    
- **Dlaczego Linux Alpine?**
    
    Ze względu na minimalny narzut na zasoby, system ten pozwala nam świadczyć usługę większej liczbie użytkowników. Z naszego doświadczenia wynika także, że Alpine powinien nadawać się do większości codziennych zastosowań. Masz nietypowe potrzeby? [Rzuć okiem na ofertę płatną](https://mikr.us).
    
- **Jeśli to oferta DARMOWA, to po co opłata aktywacyjna?**
    
    Jak się domyślasz, opłata aktywacyjna nijak nie wystarczy na pokrycie nawet kilku procent wartości serwera. Po odliczeniu VAT-u i PIT-u zostaje tyle, co nic. Opłata ta służy do weryfikacji użytkownika. Posiadając Twoje dane z przelewu (nawet z Blika) możemy w razie problemów dochodzić swoich praw, a (gdy będzie to konieczne) z pomocą organów ścigania dojść do tego, kim jesteś. Niestety oferta darmowa to niezły wabik na mało rozgarniętych sieciowych wandali i trolli. Stąd to zabezpieczenie.
    
- **Czy mogę przenieść się na płatną ofertę?**
    
    Tak, jest taka możliwość. Po prostu kup odpowiedni (docelowy) serwer na stronie Mikrusa, a następnie wyślij maila do supportu (frog@mikr.us) z prośbą o migrację wszelkich danych na nową maszynę. Pamiętaj jednak, że adres IPv6, nazwa serwera i Twoje numery portów ulegną zmianie. Nie da się ich przenieść na płatną ofertę. Przeniesione zostaną jedynie dane i konfiguracja serwera.
    
- **Jak mam się połączyć z serwerem?**
    
    Potrzebujesz do tego dowolnego klienta SSH. Twoja nazwa użytkownika to **frog**, hasło jest w mailu powitalnym, a **najważniejsza rzecz, to numer portu - każdy użytkownik ma inny**.
    
- **Czy na serwerze dostępna jest aplikacja X?**
    
    To Ty jesteś adminem. Gdy ją zainstalujesz, to będzie dostępna 🙂
    
- **Czy na ofercie FROG działają dockery?**
    
    Tak. Pamiętaj jednak, że na początku musisz zainstalować Dockera (z repozytorium!) i uruchomić jego daemona.
    
- **Czy mogę postawić na FROG-u bota Discorda?**
    
    Tak! **O ile nie jest to bot muzyczny**, bo one podpadają pod usługi dźwiękowe/streamingowe, które są u nas zabronione. Boty tekstowe są w pełni OK.
    
- **Czy mogę skanować porty SWOICH maszyn? 🔥**
    
    **Absolutnie wszystkie skany portów są zakazane i powodują natychmiastowe usunięcie serwera. Zupełnie nie obchodzi nas, czy skanujesz swoją sieć, serwer kolegi, czy sieciowego CTF-a.**
    
- **Co się stanie, gdy założę drugi darmowy serwer?**
    
    Twój nowy serwer zostanie dość szybko usunięty. Jeśli sytuacja będzie się powtarzać, otrzymasz bana na usługi Mikrusa.
    
- **Z czego utrzymuje się ten projekt?**
    
    Mikrus w wersji darmowej nie zarabia na siebie i zarabiać nigdy nie będzie. Jest to usługa w 100% sponsorowana z prywatnych pieniędzy [Jakuba Mrugalskiego](https://mrugalski.pl). Celem projektu jest ułatwienie przyszłym adminom rozwoju w branży sysops/devops, a nie zarobek.
    
- **Jak długo będzie istniał projekt?**
    
    Projekt nie ma ustalonego czasu życia. Prawda jednak jest taka, że oferowanie darmowych usług to zajęcie skrajnie niebezpieczne, więc tak długo, jak żaden szaleniec nie zrobi czegoś naprawdę złego z darmowymi serwerami, tak długo planowane jest ich utrzymywanie.
    
- **Czy serwer FROG nadaje się do postawienia sesji/bota na IRC?**
    
    Sieć IRC jest niedostępna na darmowych serwerach.
    
- **Skąd nazwa FROG?**
    
    Nie wiem. Żaby są małe i fajne 🐸
    
- **Na jak długo dostanę darmowy serwer?**
    
    Serwer dostajesz dożywotnio (tak długo, jak projekt ‘Frog’ będzie istniał), ale **VPS-y, na które nikt nie logował się przez minimum 3 miesiące, będą usuwane (po uprzednim wysłaniu przypomnienia do właściciela).** Pojemność serwerów dedykowanych jest ograniczona, a docelowo zależy nam na obsłużeniu możliwie dużej liczby użytkowników. Nie możemy pozwolić sobie na hostowanie nieużywanych, **darmowych** VPS-ów. **Serwery z [oferty płatnej](https://mikr.us) nie są nigdy usuwane**, jeśli tylko opłacasz abonament.