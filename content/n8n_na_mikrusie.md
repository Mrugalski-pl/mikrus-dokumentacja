# Zarządzanie usługą N8N na Mikrusie

> 🚨 Uwaga! Wszystkie porady zawarte w tym poradniku mają zastosowanie jedynie na infrastrukturze [Mikrusa](https://mikr.us/). Nie da się ich zastosować u innych dostawców serwerów VPS. 

### SQLite vs PostgreSQL

N8N na Mikrusie dostępna jest w dwóch wersjach. Pierwsza domyślna korzysta z bazy SQLite, a druga z bazy Postgres. Jeśli jesteś początkującym użytkownikiem, to zdecydowanie lepszym wyborem dla Ciebie jest ta pierwsza opcja. 

- SQlite — domyślny wybór, właściwy dla 95% wszystkich użytkowników
- PostgreSQL — jeśli masz niesamowicie dużo, złożonych scenariuszy, które często nakładają się na siebie z wykonaniem i SQLite stał się dla Ciebie wąskim gardłem w automatyzacji


### Instalacja N8N

> 🛑 N8N wymaga minimum **1GB pamięci RAM**, więc nie uruchomisz go na Mikrusie 1.0 (instalator sam to sprawdzi i przerwie instalację). Do podstawowych zastosowań wystarczy Mikrus 2.1, a przy większej liczbie automatyzacji lub wersji z PostgreSQL polecamy minimum Mikrusa 3.0.

Instalacja aplikacji N8N na Mikrusie odbywa się za pomocą jednego polecenia. Jedyne, co musisz zrobić, to podjąć decyzję, czy chcesz skorzystać z wersji bazującej na bazie danych SQLite, czy też używać bardziej wydajnej bazy PostgreSQL. 

Instalacja wersji wykorzystującej bazę SQLite (zalecane):

```bash
n8n_install
```

Instalacja wersji wykorzystującej bazę PostgreSQL:

```bash
n8n_install_postgres
```

Jeśli nie masz jeszcze zainstalowanego Dockera, instalator zrobi to za Ciebie.

### Wymuszenie aktualizacji

Jeśli z jakiegoś powodu chcesz natychmiast (bez czekania na automat) zaktualizować swoją instancję do najnowszej stabilnej wersji, możesz wpisać polecenie:

```bash
n8n_update
```

Polecenie samo rozpozna, czy korzystasz z wersji z SQLite, czy z PostgreSQL. Twoje dane (workflowy, dane logowania) zostaną zachowane.

### Reset hasła do N8N

Jeśli zapomnisz hasła do swojej instancji N8N, możesz je zresetować poleceniem:

```bash
n8n_password
```


### Co automatycznie ogarnia instalator?

Na wielu hostingach samodzielnie musisz dbać o aktualizację aplikacji do najnowszej wersji oraz backupowanie jej bazy danych. W przypadku naszego rozwiązania te działania są obsługiwane w pełni automatycznie. 

Po zainstalowaniu N8N na Mikrusie:

- oprogramowanie samoczynnie aktualizuje się do najnowszej wersji nie częściej jak raz na 3 dni (o ile nowa wersja jest dostępna)
- codziennie (w nocy, około godziny 4:00) w katalogu /backup/n8n/ wykonywana jest kopia bazy danych Twojej instancji. Przechowywane są kopie z ostatnich 7 dni
- Twoja instancja otrzymuje automatyczną subdomenę w domenie "wykr.es"

> 💡 Kopie w /backup/n8n/ leżą na tym samym serwerze co N8N. Jeśli zależy Ci na bezpieczeństwie danych, kopiuj je dodatkowo w inne miejsce, np. na [Strych](/strych_backupy). Backup możesz też wykonać ręcznie w dowolnym momencie poleceniem `n8n_backup RUN`.

### Automatyczna subdomena

Każda instancja N8N na Mikrusie otrzymuje automatyczną subdomenę z obsługą HTTPS w domenie wykr.es. Ta domena tworzona jest dynamicznie, więc nie można jej ani założyć, ani wyłączyć. Po prostu istnieje w momencie wpisania tego adresu. Domena składa się z dwóch części. Pierwsza to nazwa Twojego serwera, a druga to numer portu, na którym uruchomiła się aplikacja. 

Jeśli Twój serwer nazywa się "emil100", a aplikacja działa na porcie 20100, to adres Twojej instancji to:

- emil100-20100.wykr.es

### Zmiana numeru portu i domeny dla N8N

Instalator N8N przyjmuje dwa parametry, które możesz wykorzystać, aby zdefiniować inny niż domyślny (20000 + ID VPS-a) numer portu lub zdefiniować inną domenę/subdomenę dla swojej instancji.

Pamiętaj, że definicja domeny nie powoduje jej utworzenia, a jedynie wpisuje ją do konfiguracji aplikacji. Musisz samodzielnie zadbać o jej konfigurację np. za pomocą [platformy Cloudflare](/podpiecie_domeny_przez_cloudflare) - niekiedy może to wymagać [zmiany domyślnego portu](/zmiana_portu_domeny_w_cloudflare/) w tej usłudze.

Zmiana numeru portu:

```bash
n8n_install 30123
```

Ustalenie numeru portu i nowej domeny

```bash
n8n_install 30123 cokolwiek.domena.com
```

### Problemy z przekroczeniem limitów na Docker Hub

Sporadycznie podczas instalacji N8N może pojawić się błąd podobny do poniższego:

```
https://www.docker.com/increase-rate-limit
Error response from daemon: toomanyrequests: You have reached your unauthenticated pull rate limit.
```

Możesz go rozwiązać korzystając z naszego serwera proxy dla obrazów dockerowych. Aby przekonfigurować swój serwer wpisz polecenie poniżej:

```bash
docker_proxy
```

[Powrót do strony głównej](/)
