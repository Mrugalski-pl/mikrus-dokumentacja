+++
layout = "single"
+++

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

> 💡 [Tutaj znajdziesz odstawy obsługi Linuxa Alpine](alpine)

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



## Współdzielona baza danych

Każdy użytkownik otrzymuje dostęp do współdzielonej bazy danych MySQL (umowna pojemność to 200MB), która nie zużywa cennej pamięci RAM Twojego serwera. Dane dostępowe znajdziesz w pliku:

**/root/mysql.txt**


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