# Połączenie z Mikrusa do lokalnego serwera

> 💡 Autorem poradnika jest ***[Krzysztof Romanowski](http://krzysztofromanowski.pl)***

Serwer Mikrusa możesz wykorzystać do połączenia się do swojego lokalnego serwera i nie potrzebujesz w tym celu  stawiać usługi typu VPN.

Jeśli masz dynamiczne IP, to wiesz, że nie możesz polegać na adresie IP. Wtedy przyda Ci się tzw. tunelowanie SSH.

Rozwiązanie jest proste: to Twój serwer czeka na nawiązanie połączenia z konkretnym portem, a Twój domowy komputer (ze zmiennym IP) łączy się do Mikrusa (który ma stałe IP).

Jest wiele opcji tunelowania SSH, możesz o nich poczytać w artykule podlinkowanym w [Bibliotece wiedzy](../biblioteka_mikrusa), tutaj omówię tylko jedną z nich; **Remote port forwarding.**

Wyszczególnijmy trzech “aktorów”:

- **mikrus** - Twój serwer VPS
- local server - Twój lokalny serwer, **do którego** chcesz się dostać za pośrednictwem Mikrusa
- remote machine - maszyna w sieci, **z której** chcesz się połączyć do lokalnego serwera, przez Mikrusa

Wygląda to tak:

remote 💻  →  mikrus →  local 🖥️

# Klucze SSH

Po pierwsze musisz posiadać dwa klucze SSH:

- do połączenia się do Mikrusa
- do połączenia się do Lokalnego serwera

Możesz je wygenerować poleceniem:

```bash
ssh-keygen -t rsa
```

Dla ułatwienia połączenia możesz pominąć ustawianie hasła dla tych kluczy.

Zapisz je pod nazwami `mikrus` i `local_server`.

## Wgraj klucze na serwery

Przygotowane wcześniej klucze zapisz w odpowiednie miejsca:

| mikrus | local server | remote machine |
| --- | --- | --- |
| Klucz `mikrus.pub` wgraj przez https://mikr.us/panel w sekcji Klucze SSH | Klucz mikrus (prywatny) zapisz w `~/.ssh`, a klucz `local_server.pub` dodaj do `~/.ssh/authorized_keys` | Klucz `local_server` (prywatny) zapisz w `~/.ssh` |

# Zmiany na Mikrusie

Na początku trzeba dodać parę opcji w konfiguracji serwera ssh. Możesz użyć do tego `nano`:

```bash
nano /etc/ssh/sshd_config
```

Dodaj (albo odnajdź i odkomentuj) te linijki:

```bash
GatewayPorts yes
ClientAliveInterval 30
ClientAliveCountMax 3
```

Po tej zmianie zrestartuj serwer SSH:

```bash
systemctl restart sshd
```

# Zmiany na lokalnym serwerze

Jeśli masz wgrane klucze SSH, to sprawa jest prosta, jedna linijka w terminalu:

```bash
ssh -NR [jeden_z_dodatkowych_portów]:localhost:22 root@[adres_mikrusa] -p [podstawowy_port_ssh] -i ~/.ssh/mikrus

# Przykład
ssh -NR 20310:localhost:22 root@srv16.mikr.us -p 10310 -i ~/.ssh/mikrus
```

gdzie:

- ***[jeden_z_dodatkowych_portów]*** - Mikrus daje Ci do dyspozycji dwa dodatkowe porty TCP/UDP, możesz je odnaleźć w swoim panelu w sekcji “Porty TCP”
- ***[adres_mikrusa]*** - to nazwa serwera, na którym znajduje się VPS, czyli np. srv16.mikr.us
- ***[podstawowy_port_ssh]*** - podstawowy port SSH, jaki dostałeś po kupnie Mikrusa

## Utrzymywanie połączenia

Jedną z rzeczy, które możesz zrobić, aby jak najdłużej podtrzymać połączenie, jest dodanie dwóch linijek w konfiguracji klienta ssh (**nie serwera**! inny plik niż na Mikrusie!):

```bash
sudo nano /etc/ssh/ssh_config
```

Dodaj (albo odnajdź i odkomentuj) te linijki:

```bash
ServerAliveInterval 30
ServerAliveCountMax 3
```

Po tej zmianie zrestartuj serwer SSH:

```bash
sudo systemctl restart sshd
```

## Automatyczne utrzymywanie połączenia

O ile to, co ustawiłeś dotychczas, powinno utrzymać połączenie na długo, o tyle jak zrestartujesz serwer, to wszystko będziesz musiał zaczynać od nowa. Jest na to sposób, [autossh](https://github.com/Autossh/autossh), który utrzymuje połączenie i wznawia je, jeśli jest taka potrzeba.

Po zainstalowaniu aplikacji **autossh** możesz użyć polecenia:

```bash
sudo autossh -M 0 -o "UserKnownHostsFile /dev/null" -o "StrictHostKeyChecking no" -NR [jeden_z_dodatkowych_portów]:localhost:22 root@[adres_mikrusa] -p [podstawowy_port_ssh] -i ~/.ssh/mikrus

# Przyklad
sudo autossh -M 0 -o "UserKnownHostsFile /dev/null" -o "StrictHostKeyChecking no" -NR 20310:localhost:22 root@srv16.mikr.us -p 10310 -i /home/admin/.ssh/mikrus
```

Dodatkowo, jeśli dodasz opcję `-f`, `autossh` wejdzie w “background”.

Dobrą opcją jest skonfigurowanie `autossh` tak, żeby startował razem z systemem. Aby to zrobić, kieruj się [tym artykułem](https://www.everythingcli.org/ssh-tunnelling-for-fun-and-profit-autossh/).

# Zmiany na komputerze zdalnym

Jeśli wszystko skonfigurowałeś poprawnie, powinieneś móc połączyć się do Twojego lokalnego serwera w ten sposób:

```bash
ssh [nazwa_usera_na_lokalnym_serwerze]@[adres_mikrusa] -p [jeden_z_dodatkowych_portów] -i ~/.ssh/local_server

# Przyklad
ssh admin@srv16.mikr.us -p 20310 -i ~/.ssh/local_server
```

gdzie:

- ***[nazwa_usera_na_lokalnym_serwerze]*** - np. admin
- ***[adres_mikrusa]*** - jak w poprzednim paragrafie
- ***[jeden_z_dodatkowych_portów]*** - port, który wybrałeś do tunelowania

[Powrót do strony głównej](/)