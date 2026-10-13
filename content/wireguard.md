# Wireguard

Wireguard to nowoczesny, szybki i prosty w konfiguracji VPN. Na Mikrusie możesz z niego skorzystać na dwa sposoby:

- [Współdzielona instancja Wireguarda](#współdzielona-instancja-wireguarda) - jedno kliknięcie w panelu i gotowe. Nie zużywa zasobów Twojego serwera.
- [Własny serwer Wireguarda na Mikrusie](#własny-serwer-wireguarda-na-mikrusie) - pełna kontrola nad konfiguracją, ale zużywa (niewielką) część RAM-u Twojego VPS-a.

## Współdzielona instancja Wireguarda

Posiadacze Mikrusów **od wersji 2.1 wzwyż** mają dostęp do bezpłatnej, współdzielonej instancji Wireguarda, utrzymywanej przez adminów Mikrusa.

> 🛑 Współdzielony Wireguard **nie jest dostępny dla Mikrusa 1.0**. Jeśli masz taki serwer, możesz [postawić własny serwer VPN](#własny-serwer-wireguarda-na-mikrusie).

### Jak uzyskać dostęp?

1. Zaloguj się do [panelu Mikrusa](https://mikr.us/panel/)
2. W menu **Sieć i domeny** wybierz **[Wireguard VPN](https://mikr.us/panel/?a=wireguard)**
3. Kliknij **Poproszę o dostęp**
4. Odczekaj około 5 minut i wejdź do tej zakładki ponownie

Na tej samej stronie zobaczysz gotową konfigurację klienta (plik tekstowy) oraz kod QR. Konfigurację możesz wkleić do dowolnego klienta Wireguarda (Windows, Linux, macOS), a kod QR zeskanować aplikacją Wireguard na telefonie (Android/iOS).

> 💡 Jeśli zgubisz konfigurację lub podejrzewasz, że ktoś inny ją poznał, kliknij **Wygeneruj ponownie**. Stara konfiguracja przestanie wtedy działać.

### Parametry i zasady korzystania

- serwer wyjściowy fizycznie znajduje się w Finlandii (Helsinki) i stoi na łączu 1Gbps
- ruch z VPN-a wychodzi do internetu z fińskiego adresu IP
- instancja jest **współdzielona** - nie oczekuj gwarantowanej przepustowości

> 🔥 Korzystanie z tej instancji do ściągania nielegalnych plików (Torrent i inne sieci P2P) czy oglądania wideo strumieniowego (Netflix itp.) jest zabronione. Uruchomienie Torrenta na współdzielonym VPN-ie kończy się **blokadą VPN-a i serwera**.

## Własny serwer Wireguarda na Mikrusie

Jeśli masz Mikrusa 1.0, potrzebujesz VPN-a z własną konfiguracją (np. dostęp do sieci domowej, kilku klientów, własna adresacja) lub po prostu chcesz się czegoś nauczyć, to możesz postawić Wireguarda na swoim VPS-ie.

Mikrusy to kontenery LXC ze współdzielonym kernelem, więc nie załadujesz na nich modułu kernela Wireguarda. Zamiast niego użyjemy **wireguard-go**, czyli implementacji Wireguarda działającej w przestrzeni użytkownika. Wymaga ona dostępu do urządzenia TUN.

### Krok 1: włącz TUN/TAP

Wejdź na stronę **[TUN/TAP/FUSE](https://mikr.us/panel/?a=tuntap)** w panelu i kliknij **Włącz TUN/TAP/FUSE**.

> 🛑 Aktywacja tej opcji **restartuje Twój serwer**. Po 3-5 minutach zaloguj się ponownie i sprawdź, czy urządzenie TUN jest dostępne:

```bash
ls -l /dev/net/tun
```

Jeśli zobaczysz plik `/dev/net/tun`, możesz przejść dalej.

### Krok 2 (metoda szybka): skrypt NOOBS

Najprostsza metoda instalacji to skrypt z kolekcji [NOOBS](../skrypty_noobs), który znajdziesz na swoim serwerze (Ubuntu/Debian):

```bash
/opt/noobs/scripts/chce_wireguard.sh
```

Skrypt zainstaluje wszystkie wymagane narzędzia, skompiluje wireguard-go, wygeneruje klucze oraz konfigurację serwera i klienta, a następnie uruchomi usługę. Na koniec wyświetli konfigurację klienta (zapisaną także w pliku `/etc/wireguard/wg-client1.conf`) oraz kod QR do zeskanowania telefonem.

> 💡 Jeśli katalogu `/opt/noobs` nie ma na Twoim serwerze, pobierz skrypty poleceniem `git clone https://github.com/unkn0w/noobs /opt/noobs`

Domyślnie serwer VPN słucha na porcie **20000 + ID** Twojego serwera (np. 20123 dla serwera o ID 123).

### Krok 2 (metoda ręczna): instalacja krok po kroku

Jeśli chcesz zrozumieć, co się dzieje pod spodem, możesz wykonać wszystkie kroki samodzielnie.

**Zainstaluj wymagane pakiety:**

```bash
apt update
apt install -y wireguard-tools qrencode iptables git make golang-go
```

**Skompiluj i zainstaluj wireguard-go:**

```bash
git clone https://git.zx2c4.com/wireguard-go /tmp/wireguard-go
cd /tmp/wireguard-go
make
make install
```

> 💡 wireguard-go wymaga dość świeżej wersji języka Go. Jeśli kompilacja zakończy się błędem o zbyt starej wersji Go, zainstaluj aktualną wersję ze strony [go.dev/dl](https://go.dev/dl/) (możesz użyć do tego skryptu `/opt/noobs/scripts/chce_go.sh`).

**Wygeneruj klucze dla serwera i klienta:**

```bash
cd /etc/wireguard
umask 077
wg genkey | tee server.key | wg pubkey > server.pub
wg genkey | tee client1.key | wg pubkey > client1.pub
```

**Wybierz port.** Wireguard działa po protokole **UDP**, więc musisz użyć jednego z dwóch domyślnych portów: **20000 + ID** lub **30000 + ID**. Porty dodatkowe, wyklikane w panelu, obsługują tylko TCP i z Wireguardem nie zadziałają ([więcej o portach](../udostepnione_porty)).

**Utwórz konfigurację serwera** w pliku `/etc/wireguard/wg0.conf` (podmień klucze na zawartość plików `server.key` i `client1.pub`, a port na swój):

```ini
[Interface]
Address = 10.5.0.1/24
ListenPort = 20123
PrivateKey = TUTAJ_ZAWARTOSC_server.key
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
PublicKey = TUTAJ_ZAWARTOSC_client1.pub
AllowedIPs = 10.5.0.2/32
```

**Włącz przekazywanie pakietów** (bez tego klient połączy się z VPN-em, ale nie wyjdzie przez niego do internetu):

```bash
echo "net.ipv4.ip_forward=1" > /etc/sysctl.d/99-wireguard.conf
sysctl -p /etc/sysctl.d/99-wireguard.conf
```

**Uruchom usługę** i dodaj ją do autostartu. Zmienna `WG_I_PREFER_BUGGY_USERSPACE_TO_POLISHED_KMOD` jest potrzebna, bo wireguard-go domyślnie odmawia pracy, gdy w kernelu hosta dostępny jest moduł Wireguarda.

```bash
mkdir -p /etc/systemd/system/wg-quick@.service.d
cat > /etc/systemd/system/wg-quick@.service.d/userspace.conf <<EOF
[Service]
Environment=WG_I_PREFER_BUGGY_USERSPACE_TO_POLISHED_KMOD=1
EOF
systemctl daemon-reload
systemctl enable --now wg-quick@wg0
```

Sprawdź, czy usługa działa:

```bash
wg show
```

### Krok 3: konfiguracja klienta

Utwórz na serwerze plik `/etc/wireguard/client1.conf`. Pod `Endpoint` podaj nazwę swojego serwera głównego (np. `srv20.mikr.us`) oraz port wybrany wcześniej:

```ini
[Interface]
PrivateKey = TUTAJ_ZAWARTOSC_client1.key
Address = 10.5.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = TUTAJ_ZAWARTOSC_server.pub
Endpoint = srv20.mikr.us:20123
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
```

Taką konfigurację wczytasz do klienta Wireguarda na komputerze. Na telefonie najwygodniej będzie zeskanować kod QR:

```bash
qrencode -t ansiutf8 < /etc/wireguard/client1.conf
```

> 💡 `AllowedIPs = 0.0.0.0/0` kieruje **cały** ruch klienta przez VPN. Jeśli chcesz przez VPN dostać się tylko do swojego Mikrusa (i np. usług słuchających na 10.5.0.1), wpisz tam `10.5.0.0/24`.

Kolejnych klientów dodajesz analogicznie: generujesz nową parę kluczy, dopisujesz w `wg0.conf` sekcję `[Peer]` z kolejnym adresem (np. `10.5.0.3/32`) i restartujesz usługę poleceniem `systemctl restart wg-quick@wg0`.

### Coś nie działa?

- sprawdź, czy używasz portu **20000+ID lub 30000+ID** (tylko one obsługują UDP)
- upewnij się, że plik `/dev/net/tun` istnieje (Krok 1)
- jeśli masz włączony firewall (np. UFW), zezwól na ruch UDP na porcie VPN-a
- przejrzyj logi usługi poleceniem `journalctl -u wg-quick@wg0`

> 🔥 Własny VPN na Mikrusie również podlega [regulaminowi](https://mikr.us/polityka-prywatnosci/). Nie używaj go do P2P/Torrentów ani do skanowania sieci - takie działania kończą się blokadą serwera.

[Powrót do strony głównej](/)
