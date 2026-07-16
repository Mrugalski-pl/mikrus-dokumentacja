# Podpięcie domeny przez tunel CloudFlare (cloudflared)

## 1. Konfiguracja domeny w cloudflare

Dodajemy domenę w serwisie cloudflare

Usuwamy wszystkie wpisy związane ze starym serwerem

Upewniamy się, że wszystkie wpisy typu A i AAAA są usunięte

## 2. Instalacja cloudflared na VPSie

Instalujemy program `cloudflared` na VPSie

```
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
rm cloudflared-linux-amd64.deb
```

Możemy upewnić się, że program jest zainstalowany za pomocą polecenia

```
cloudflared --version
```

## 3. Instalacja cloudflared lokalnie

Instalujemy `cloudflared` lokalnie w komputerze (ścieżka zależy od lokalnego systemu).

Na macOS będzie to:

```
brew install cloudflared
```

Upewniamy się, że program jest zainstalowany:

```
cloudflared --version
```

## 4. Tworzenie certyfikatu lokalnie

Na własnym komputerze (NIE VPSie) logujemy się za pomocą polecenia

```
cloudflared tunnel login
```

Autoryzujemy się przeglądarce dla wybranej domeny

Utworzy się certyfikat w katalogu

```
~/.cloudflared/cert.pem
```

## 5. Przenoszenie certyfikatu na VPS

Kopiujemy ten certyfikat (jako text) z własnego komputera i tworzymy go w analogicznej ścieżce na VPSie

```
/root/.cloudflared/cert.pem
```

## 6. Utworzenie tunelu cloudflared

Wykonujemy polecenie (my-app możemy zastąpić nazwą naszej aplikacji)

```
cloudflared tunnel create my-app
```

Powinniśmy zobaczyć odpowiedź

```
Created tunnel my-app with id <TUNNEL-UUID>
```

Wykonujemy polecenie (my-domain.pl możemy zastąpić nazwą naszej domeny)

```
cloudflared tunnel route dns my-app my-domain.pl
```

Program powinien automatycznie utworzyć wpis CNAME w konfiguracji DNS w cloudflare, gdzie w polu content na końcu będzie domena `cfargotunnel.com` .

## 7. Przygotowanie konfiguracji cloudflared na VPS

Tworzymy konfigurację `/etc/cloudflared/config.yml`:

```yaml
tunnel: <TUNNEL_UUID>
credentials-file: /root/.cloudflared/<TUNNEL_UUID>.json

ingress:
  - hostname: my-domain.pl
    service: http://localhost:20245
  - service: http_status:404
```

`20245` to port, na którym działa nasza aplikacja. Jeżeli działa ona na innym porcie, to należy ustawić właściwy

## 8. Uruchomienie usługi

```
sudo cloudflared service install
sudo systemctl enable --now cloudflared
sudo journalctl -u cloudflared -f
```

Jeżeli nasza aplikacja jest uruchomiona na porcie `20245` na serwerze VPS, po wpisaniu nazwy domeny w przeglądarce powinna się załadować ta aplikacja. HTTPS powinien być aktywny automatycznie.

## 9. Ustawienie www

Jeżeli chcemy, aby nasza aplikacja była dostępna również gdy wpiszemy w adresie domeny prefix www. należy dodać dodatkowy tunel:

```
cloudflared tunnel route dns my-app www.my-domain.pl
```

Otwórz plik `/etc/cloudflared/config.yml` i upewnij się, że masz coś takiego:

```yaml
tunnel: <TUNNEL_UUID>
credentials-file: /root/.cloudflared/<TUNNEL_UUID>.json

ingress:
  - hostname: my-domain.pl
    service: http://localhost:20245
  - hostname: www.my-domain.pl
    service: http://localhost:20245
  - service: http_status:404
```

Zapisz i przeładuj usługę:

```
sudo systemctl restart cloudflared
```

# Wycofanie całej konfiguracji

Jeżeli już nie chcemy udostępniać naszej aplikacji pod wybraną domeną za pomocą cloudflared, możemy wycofać powyższy proces.

## 1. Zatrzymanie usługi cloudflared

Zatrzymujemy usługę cloudflared

```
sudo systemctl stop cloudflared
sudo systemctl disable cloudflared
```

Sprawdzamy, czy nie działa

```
ps aux | grep cloudflared
```

Jeśli coś jeszcze działa - kończymy proces

```
sudo killall cloudflared
```

## 2. Usuwanie tunelu cloudflare

Sprawdzamy listę tuneli:

```
cloudflared tunnel list
```

zobaczymy coś w tym stylu:

```
ID                                   NAME        CREATED
12345678-abcd-1234-efgh-56789abcd123 my-app   2025-10-06T18:42:10Z
```

Usuwamy tunel po nazwie id:

```
cloudflared tunnel delete my-app
# lub
cloudflared tunnel delete 12345678-abcd-1234-efgh-56789abcd123
```

Sprawdzamy, czy już go nie ma:

```yaml
cloudflared tunnel list
```

## 3. Usuwanie powiązanych rekordów DNS

Wchodzimy do panelu cloudflare → DNS i usuwamy rekordy:

```
CNAME my-domain.pl -> <UUID>.cfargotunnel.com
CNAME www.my-domain.pl -> <UUID>.cfargotunnel.com
```

Można to też zrobić z poziomu CLI

```
cloudflared tunnel route dns remove my-domain.pl
```

## 4. Usuwanie plików tunelu

Usuwamy pliki tunelu (w tym plik `config.yml`, który jest katalogu `/etc/cloudflared`:

```
sudo rm -rf /etc/cloudflared
sudo rm -rf /root/.cloudflared
```

## 5. (Opcjonalnie) Usuwanie binarki cloudflared

Jeżeli nie planujemy używać `cloudflared`, odinstalowujemy go:

```
sudo apt remove cloudflared -y
```

## 6. (Opcjonalnie) Usuwanie rekordu DNS do serwera VPS

Jeśli chcesz wrócić do klasycznego hostowania (np. bezpośrednio przez IP VPS-a):

- dodaj z powrotem rekord A my-domain.pl wskazujący na IP Twojego VPS-a,
- włącz proxy (pomarańczowa chmurka),
- i skonfiguruj port 80/443 (np. przez nginx).