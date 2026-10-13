# Skrypty NOOBS

NOOBS (New Out Of the Box System) to zestaw skryptów do szybkiego stawiania usług na Mikrusie. Jest to projekt otwartoźródłowy i każdy z użytkowników może rozbudować kolekcje o własne skrypty.

[https://github.com/unkn0w/noobs/](https://github.com/unkn0w/noobs/)

Dzięki przygotowanym skryptom łatwo zainstalujesz Dockera, LAMP/LEMP, WordPressa, PostgreSQL, MongoDB, Jenkinsa, Webmina, OpenVPN, Wireguarda, Zerotier, Tailscale i kilkadziesiąt innych usług.

Na nowo zainstalowanym serwerze, skrypty NOOBS wrzucane są automatycznie do /opt/noobs i dla wygody użytkownika linkowane do /root/noobs

> 💡 Skrypty przygotowane są z myślą o systemach Ubuntu/Debian. Na innych dystrybucjach (oraz na serwerach [FROG](../frog) z Alpine) mogą nie działać.

## Jak z nich korzystać?

Wejdź do katalogu ze skryptami i uruchom ten, który odpowiada za wybraną usługę:

```bash
cd /opt/noobs/scripts
ls
./chce_dockera.sh
```

Skrypty instalujące usługi mają nazwy w stylu `chce_COŚTAM.sh` (np. `chce_wordpress.sh`, `chce_wireguard.sh`). W katalogu `/opt/noobs/actions/` znajdziesz z kolei skrypty wykonujące przydatne akcje systemowe, np. `chce_usera.sh` (założenie nowego użytkownika) czy `chce_aliasy.sh`.

## Brakuje skryptów na Twoim serwerze?

Jeśli katalogu /opt/noobs nie ma (np. po reinstalacji na inną dystrybucję lub gdy go usunąłeś), możesz pobrać skrypty ponownie:

```bash
git clone https://github.com/unkn0w/noobs /opt/noobs
```

Aktualizację do najnowszej wersji wykonasz poleceniem:

```bash
cd /opt/noobs && git pull
```

## Mikrusowe narzędzia

Oprócz skryptów instalacyjnych, na Mikrusie dostępne są gotowe polecenia (pochodzące z tego samego repozytorium), które możesz wywołać z dowolnego miejsca w systemie:

- `start` - kreator wstępnej konfiguracji nowego serwera (np. ustawienie polskiej strefy czasowej)
- `domena` - [szybkie podpięcie subdomeny](../szybka_subdomena) do aplikacji działającej na Twoim serwerze
- `n8n_install`, `n8n_install_postgres`, `n8n_update`, `n8n_backup`, `n8n_password` - [instalacja i zarządzanie N8N](../n8n_na_mikrusie)
- `rozpakuj` - rozpakowanie archiwum dowolnego popularnego formatu (zip, tar.gz, rar itp.)

[Powrót do strony głównej](/)
