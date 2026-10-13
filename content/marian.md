# M.A.R.I.A.N

Marian, to oczywiście skrót od:

**M**anually **A**ctivated **R**ecovery of **I**nfrastructure, **A**pplications and **N**etworking

To narzędzie do automatycznego diagnozowania i naprawy problemów z serwerem. Jeśli Twój serwer z jakiegoś powodu nie działa tak, jak powinien lub połączenie się z nim nie jest możliwe, to MARIAN Ci w tym pomoże.

Warto uruchomić Mariana przed zgłoszeniem problemu do adminów.

## Jak uruchomić Mariana?

1. Zaloguj się do [panelu Mikrusa](https://mikr.us/panel/)
2. Wybierz menu **Pomoc i diagnostyka** → **[M.A.R.I.A.N](https://mikr.us/panel/?a=marian)**
3. Wyślij Mariana do pracy
4. Po kilku minutach na tej samej stronie pojawi się raport z wykonanych prac

## Co sprawdza Marian?

Marian przechodzi przez listę najczęstszych usterek i - tam, gdzie to możliwe - od razu je naprawia:

- **VPS** - czy Twój serwer w ogóle istnieje i jest uruchomiony
- **Pamięć RAM** - czy pamięć nie jest przepełniona (co może np. blokować logowanie przez SSH)
- **Dysk** - czy dysk nie jest zapełniony. Marian potrafi zwolnić trochę miejsca, ale warto też przejść przez [poradnik o sprzątaniu dysku](../sprzatanie_dysku)
- **Firewall** - czy zapora ogniowa na VPS-ie nie odcina Cię od serwera
- **Sieć** - czy pingi z serwera głównego do Twojego VPS-a (i w drugą stronę) przechodzą poprawnie oraz czy na serwerze głównym są wszystkie potrzebne reguły przekierowania portów
- **SSH** - czy usługa SSH działa poprawnie. W razie potrzeby Marian poprawia kilka ustawień w jej konfiguracji

Jeśli Marian wykryje problem, którego nie umie naprawić sam, to w raporcie podpowie Ci, jakie polecenia wykonać lub kiedy zgłosić się do supportu.

## Własne polecenia

Dodatkową zaletą Mariana jest możliwość uruchomienia dowolnej listy poleceń dostarczonych przez użytkownika. Wpisujesz je w formularzu przed wysłaniem Mariana, a on wykona je na Twoim serwerze jako root.

Umożliwia to np. wyczyszczenie reguł firewalla w przypadku odcięcia się od serwera:

```bash
iptables -F
ufw disable
```

czy ponowne uruchomienie usługi SSH, jeśli padła:

```bash
systemctl restart ssh
```

> 🛑 Polecenia muszą zakończyć się w ciągu **4 minut**, inaczej proces zostanie przerwany. Nie uruchamiaj w ten sposób długotrwałych operacji.

> 💡 Jeśli nie możesz zalogować się na serwer przez SSH, a potrzebujesz coś na nim sprawdzić, wypróbuj też **WebSSH** (menu **Mój VPS**) lub **Tryb Rescue** (menu **Pomoc i diagnostyka**).

[Powrót do strony głównej](/)
