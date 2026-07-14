# Uruchomienie aplikacji Node.js

> 💡 Autorem poradnika jest **[Ozelot](https://ozelot.fyi)**.

W tym poradniku pokażę ci jak uruchomić na serwerze swoją aplikację napisaną w technologii **Node.js**. Zajmiemy się tutaj bardzo podstawowym przykładem prostej aplikacji takiej jak np. boty Discord, process workery itp.

## Przykładowa aplikacja

Aplikacja którą chcemy uruchomić może być zbudowana w mniej-więcej taki sposób. Oto przykład naszej aplikacji:
```
.
├── node_modules
├── index.js
├── package.json
└── package-lock.json
```

## Umieszczenie plików aplikacji na serwerze

Na początku umieścimy wszystkie pliki aplikacji (pomijając katalog `node_modules` i plik `package-lock.json`) na serwerze [na przykład w ten sposób](/jak_wysylac_pliki_na_mikrusa), w wybranym katalogu. Na potrzeby poradnika użyjemy katalogu `/srv/app`.

## Instalacja Node.js

Kolejnym krokiem będzie zainstalowanie **Node.js** wraz z **NPM** na naszym serwerze. 

Na dystrybucjach bazujących na Debianie (w tym Ubuntu) zainstalujemy za pomocą **nvm**, co jest sposobem [zalecnaym przez producenta](https://nodejs.org/en/download).

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 24
```

> _Podmień numer wersji jeśli jest taka potrzeba._

Natomiast w dystrybucjach takich jak Alpine (dotyczy serwerów **Frog**) zrobimy to za pomocą **apk**.

```bash
sudo apk update
sudo apk add --update nodejs npm
```

> _W dalszej części poradnika przy wyszczególnianiu poszczególnych opcji dla wyżej wymienionych grup dystrybucji będę posługiwał się nazwami Debian i Alpine._

Następnie możemy zweryfikować poprawność instalacji w ten sposób:

```bash
node -v
npm -v
```

Jeśli zwróciło nam wersję to oznacza, że wszystko zostało zainstalowane prawidłowo.

## Instalacja zależności

Po udanej instalacji możemy przejść do przygotowania naszej aplikacji do uruchomienia. W tym celu, będąc w katalogu naszej aplikacji (`cd /srv/app`) musimy zainstalować pakiety wymagane przez naszą aplikację:

```bash
npm install
```

Powyższe zadziała tylko wtedy, gdy w pliku `package.json` zostały wcześniej uwzględnione wszystkie wymagane zależności. Jeśli tak nie jest, konieczne będzie ręczne doinstalowanie brakujących pakietów za pomocą `npm install NAZWA` (gdzie `NAZWA` to nazwa pakietu).

Jeśli wszystkie pakiety zostały zainstalowane prawidłowo możemy przejść dalej.

## Testowe uruchomienie aplikacji

Pozostajemy w katalogu naszej aplikacji. Nadszedł czas na jej uruchomienie. W tym celu używamy polecenia `node PLIK_URUCHAMIAJACY.js`, na naszym przykładzie będzie to:

```bash
node index.js
```

> _`index.js` to plik uruchamiający aplikację, jeśli ma inną nazwę, podmień ją._

Aplikacja powinna zostać uruchomiona, a my powinniśmy zobaczyć jej logi.

> _Aby w tym momencie zabić aplikację używamy kombinacji klawiszy **Ctrl + C**._

Aplikację można w ten sposób uruchomić testowo, jednak jej działanie zostanie przerwane po zamknięciu sesji SSH. W celu uruchomienia aplikacji w sposób trwały, odpowiedni dla środowiska produkcyjnego, należy wykonać dodatkowe kroki opisane w kolejnym punkcie.

## Uruchomienie aplikacji w tle

W tym poradniku przedstawię **2 narzędzia** pozwalające na osiągnięcie tego. Dla ułatwienia nadal pozostajemy w katalogu aplikacji.

### Sposób 1 - screen

**screen** to prosty menedżer sesji terminalowych, który pozwala uruchomić proces w osobnej sesji, odłączyć ją i wrócić do niej później.

#### Instalacja screen

Na nowszych wersjach dystrybucji narzędzie **screen** może nie być domyślnie zainstalowane (sprawdzisz to wpisując `screen`). Jeśli nie jest - należy je zainstalować:

Dla Debiana:

```bash
apt install screen
```

Dla Alpine:

```bash
sudo apk add screen
```

#### Utworzenie nowej sesję screen

```bash
screen -S NAZWA
```

> _W miejscu `NAZWA` wprowadź dowolną nazwę kojarzoną z twoją aplikacją._

Zostaniemy przeniesieni do nowej sesji. Tam uruchamiamy aplikację, podobnie jak wcześniej:

```bash
node index.js
```

> _`index.js` to plik uruchamiający aplikację, jeśli ma inną nazwę, podmień ją._

Aby opuścić sesję bez zabijania procesu, możemy użyć **CTRL + A + D**.

Natomiast aby zatrzymać aplikację (np. aby ją zrestartować) możemy wewnątrz sesji użyć **CTRL + C**.

#### Powrót do istniejącej sesji

Jeśli chcemy powrócić do sesji, np. aby przejrzeć logi aplikacji, możemy to zrobić w następujący sposób:

```bash
screen -r NAZWA
```

> _W miejscu `NAZWA` wprowadź wcześniej ustawioną nazwę twojej sesji._

#### Wyświetlenie listy aktywnych sesji

Jeśli chcemy sprawdzić listę aktywnych sesji, wraz z nazwami, możemy zrobić to w następujący sposób:

```bash
screen -ls
```

#### Zabicie sesji

Jeśli chcemy zabić sesję (całkowicie usunąć ją), możemy zrobić to w następujący sposób:

```bash
screen -S NAZWA -X quit
```

> _W miejscu `NAZWA` wprowadź wcześniej ustawioną nazwę twojej sesji._

Alternatywnie, możemy także zabić wszystkie sesje:
```bash
pkill screen
```

### Sposób 2 - pm2

**pm2** to zaawansowany menedżer procesów dedykowany aplikacjom Node.js. Pozwala na automatyczny restart aplikacji, monitorowanie jej działania oraz logowanie.

#### Instalacja pm2

**pm2** instalujemy w następujący sposób:

```bash
npm install -g pm2
```

#### Uruchomienie aplikacji

Możemy uruchomić aplikację za pomocą pm2 w następujący sposób:

```bash
pm2 start index.js --name NAZWA
```

> _`index.js` to plik uruchamiający aplikację, jeśli ma inną nazwę, podmień ją. _W miejscu `NAZWA` wprowadź dowolną nazwę kojarzoną z twoją aplikacją._

#### Lista uruchomionych aplikacji

Możemy wyświetlić listę uruchomionych za pomocą pm2 aplikacji

```bash
pm2 list
```

Aby opuścić podgląd logów używamy **CTRL + C**.

### Podgląd logów aplikacji

Aby wyświetlić podgląd logów aplikacji, wykonujemy:

```bash
pm2 logs NAZWA
```

> _W miejscu `NAZWA` wprowadź wcześniej ustawioną nazwę kojarzoną z twoją aplikacją._

#### Restart, zatrzymywanie, ponowne uruchomienie aplikacji

Aplikację możemy zrestartować za pomocą polecenia:

```bash
pm2 restart NAZWA
```

Możemy ją także łatwo zatrzymać:

```bash
pm2 stop NAZWA
```

A także ponownie uruchomić:

```bash
pm2 start NAZWA
```

> _W miejscu `NAZWA` wprowadź wcześniej ustawioną nazwę kojarzoną z twoją aplikacją._

### Usunięcie aplikacji

Aby usunąć aplikację z pm2 możemy zrobić to następującym poleceniem:

```bash
pm2 delete NAZWA
```

> _W miejscu `NAZWA` wprowadź wcześniej ustawioną nazwę kojarzoną z twoją aplikacją._

### Automatyczne uruchomienie aplikacji po reboocie systemu

pm2 pozwala na **automatyczne uruchomienie aplikacji po restarcie całego systemu**. W tym celu, po skonfigurowaniu i uruchomieniu aplikacji należy wykonać:

```bash
pm2 startup
pm2 save
```

## Podsumowanie

Nasza aplikacja została uruchomiona na serwerze i działa w tle — niezależnie od aktywności terminala czy sesji SSH. Dzięki takim narzędziom jak screen lub pm2 możemy w prosty sposób zarządzać jej działaniem, monitorować logi, restartować ją, a nawet zapewnić jej automatyczne uruchomienie po restarcie serwera.

[Powrót do strony głównej](/)