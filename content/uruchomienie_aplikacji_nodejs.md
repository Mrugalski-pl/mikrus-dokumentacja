# Uruchomienie aplikacji Node.js

> 💡 **Autorem poradnika jest [Ozelot](https://ozelot.fyi)**
> *(Sformatowane i zmodyfikowane przez [MilexinTeam](https://github.com/MilexinTeam) / Shyphire na Discordzie).*

W tym poradniku dowiesz się, jak uruchomić na serwerze swoją aplikację napisaną w środowisku **Node.js**. Skupimy się na podstawowym przykładzie prostej aplikacji działającej stale w tle – takiej jak bot Discord czy worker przetwarzający zadania w tle.

---

## Przykładowa struktura aplikacji

Aplikacja, którą chcemy uruchomić, zazwyczaj posiada strukturę zbliżoną do poniższej:

```text
.
├── node_modules
├── index.js
├── package.json
└── package-lock.json
```

---

## Umieszczenie plików aplikacji na serwerze

Na początku musisz umieścić pliki aplikacji w wybranym katalogu na serwerze (np. \`/srv/app\`). Możesz to zrobić, korzystając z [naszego poradnika o wysyłaniu plików na serwer](/jak_wysylac_pliki_na_mikrusa).

> ⚠️ **Ważne:** Przesyłając pliki, **pomiń** katalog \`node_modules\`. Plik \`package-lock.json\` również możesz pominąć, jeśli nie korzystasz z npm ci (jeśli nie wiesz, co to oznacza – po prostu go nie przenoś). Zostaną one wygenerowane bezpośrednio na serwerze.

---

## Instalacja Node.js

Kolejnym krokiem jest instalacja środowiska **Node.js** oraz wybranego menedżera pakietów (**NPM**, **YARN** lub **PNPM**). W tym poradniku będziemy korzystać z najpopularniejszego rozwiązania – **NPM**.

### Systemy bazujące na Debianie (w tym Ubuntu)
Instalację przeprowadzamy za pomocą menedżera **apt**:

```bash
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash - 
sudo apt update && sudo apt install -y nodejs make gcc g++
```
> *W razie potrzeby podmień wersję \`22.x\` na taką, której wymaga Twoja aplikacja.*

### Systemy bazujące na Alpine Linux (np. serwery Frog)
Instalację przeprowadzamy za pomocą menedżera **apk**:

```bash
sudo apk add --update nodejs npm
```

### Weryfikacja instalacji
Aby upewnić się, że środowisko zostało zainstalowane poprawnie, sprawdź wersje zainstalowanych narzędzi:

```bash
node -v
npm -v
```
Jeśli w konsoli wyświetliły się numery wersji, wszystko przebiegło pomyślnie!

---

## Instalacja zależności aplikacji

Po udanej instalacji środowiska przechodzimy do przygotowania samej aplikacji. Wejdź do katalogu ze swoją aplikacją i zainstaluj wymagane pakiety:

```bash
cd /srv/app
npm install
```
> *Alternatywnie możesz użyć polecenia \`npm ci\` (wymaga ono jednak obecności pliku \`package-lock.json\` na serwerze).*

Powyższe polecenie zadziała poprawnie pod warunkiem, że w pliku \`package.json\` zostały wcześniej zdefiniowane wszystkie wymagane zależności. Jeśli tak nie jest, zainstaluj brakujące pakiety ręcznie za pomocą:

```bash
npm install NAZWA_PAKIETU
```

---

## Testowe uruchomienie aplikacji

Będąc cały czas w katalogu aplikacji, uruchom ją testowo, aby upewnić się, że nie zawiera błędów:

```bash
node index.js
```
> *Jeśli Twój główny plik uruchomieniowy nazywa się inaczej (np. \`app.js\` lub \`main.js\`), podmień nazwę.*

W tym momencie na ekranie powinny pojawić się logi startowe aplikacji. 
* Aby wyłączyć aplikację, użyj kombinacji klawiszy **CTRL + C**.

> ⚠️ **Uwaga:** Uruchomienie aplikacji w ten sposób jest dobre tylko do testów. Po zamknięciu sesji SSH (zamknięciu terminala) Twoja aplikacja natychmiast przestanie działać. Aby działała nieprzerwanie, skorzystaj z jednej z poniższych metod.

---

## Uruchomienie aplikacji w tle (3 sposoby)

Przedstawiamy trzy najpopularniejsze metody na uruchomienie aplikacji w tle. Wybierz tę, która najbardziej Ci odpowiada.
> Sposób 3 jest najlepszy i najprostszy 
### Sposób 1: Systemowy program \`nohup\`

**nohup** (no hangup) to proste narzędzie systemowe, które pozwala na ignorowanie sygnału rozłączenia sesji SSH. 

#### 1. Instalacja
W większości dystrybucji (np. Debian/Ubuntu) narzędzie to jest zainstalowane fabrycznie. Na systemie Alpine Linux musisz doinstalować pakiet \`coreutils\`:

```bash
sudo apk add coreutils
```

#### 2. Podstawowe uruchomienie
> ⚠️ **Uwaga:** Ta podstawowa komenda uruchamia proces w tle, ale nie zapisuje jego identyfikatora PID. Może to utrudnić jego późniejsze wyłączenie.

```bash
nohup node index.js &
```

#### 3. Przydatne parametry i opcje

* **Zapisywanie logów do pliku (czyszczenie pliku przy każdym starcie):**
  ```bash
  nohup node index.js > ścieżka/do/pliku.log 2>&1 &
  ```
* **Zapisywanie logów do pliku (dopisywanie nowych logów na końcu):**
  ```bash
  nohup node index.js >> ścieżka/do/pliku.log 2>&1 &
  ```
* **Zapisanie PID (identyfikatora procesu) do pliku:**
  Umożliwi to łatwe kontrolowanie i wyłączenie aplikacji w przyszłości.
  ```bash
  echo \$! > pid.txt
  ```
* **Zatrzymanie aplikacji:**
  ```bash
  kill \$(cat pid.txt)
  ```
* **Sprawdzenie statusu aplikacji:**
  ```bash
  ps -p \$(cat pid.txt)
  ```

#### 4. Gotowy skrypt zarządzający (service.sh)
Możesz utworzyć w folderze aplikacji plik o nazwie \`service.sh\`, wkleić do niego poniższą zawartość i nadać mu uprawnienia do uruchamiania (\`chmod +x service.sh\`). Pozwoli on na wygodne zarządzanie aplikacją za pomocą \`nohup\`.

```bash
#!/usr/bin/env bash

PACKAGE_JSON="package.json"
LOG_FILE="logi.log"
PID_FILE="pid.txt"

# Funkcja: odczytanie głównego pliku z package.json
get_main_file() {
    if [ ! -f "\$PACKAGE_JSON" ]; then
        echo "Brak pliku package.json w bieżącym katalogu."
        exit 1
    fi

    MAIN_FILE=\$(grep '"main"' "\$PACKAGE_JSON" | head -n 1 | sed 's/.*"main"[[:space:]]*:[[:space:]]*"//;s/".*//')

    if [ -z "\$MAIN_FILE" ]; then
        echo "Nie znaleziono pola \\"main\\" w package.json."
        exit 1
    fi

    echo "\$MAIN_FILE"
}

# Komenda: start
start_app() {
    MAIN=\$(get_main_file)

    if [ ! -f "\$MAIN" ]; then
        echo "Plik główny \\"\$MAIN\\" nie istnieje."
        exit 1
    fi

    if [ -f "\$PID_FILE" ]; then
        PID=\$(cat "\$PID_FILE")
        if ps -p "\$PID" > /dev/null; then
            echo "Aplikacja już działa (PID: \$PID)."
            exit 0
        fi
    fi

    echo "Uruchamiam aplikację Node.js z pliku: \$MAIN"

    nohup node "\$MAIN" > "\$LOG_FILE" 2>&1 &
    echo \$! > "\$PID_FILE"

    echo "Aplikacja uruchomiona."
    echo "Logi: \$LOG_FILE"
    echo "PID zapisany w: \$PID_FILE"
}

# Komenda: stop
stop_app() {
    if [ ! -f "\$PID_FILE" ]; then
        echo "Brak pliku PID. Aplikacja prawdopodobnie nie działa."
        exit 1
    fi

    PID=\$(cat "\$PID_FILE")

    if kill "\$PID" 2>/dev/null; then
        echo "Zatrzymano proces o PID: \$PID"
        rm "\$PID_FILE"
    else
        echo "Nie udało się zatrzymać procesu. Być może już nie działa."
        rm "\$PID_FILE"
    fi
}

# Komenda: status
status_app() {
    if [ ! -f "\$PID_FILE" ]; then
        echo "Aplikacja nie jest uruchomiona."
        exit 0
    fi

    PID=\$(cat "\$PID_FILE")

    if ps -p "\$PID" > /dev/null; then
        echo "Aplikacja działa. PID: \$PID"
    else
        echo "PID istnieje, ale proces nie działa."
    fi
}

# Komenda: restart
restart_app() {
    echo "Restartuję aplikację..."
    stop_app
    start_app
}

# Komenda: help
show_help() {
    echo "Dostępne komendy:"
    echo "  ./service.sh start    – uruchamia aplikację"
    echo "  ./service.sh stop     – zatrzymuje aplikację"
    echo "  ./service.sh status   – pokazuje status aplikacji"
    echo "  ./service.sh restart  – restartuje aplikację"
    echo "  ./service.sh help     – pokazuje tę pomoc"
}

# Router komend
case "\$1" in
    start) start_app ;;
    stop) stop_app ;;
    status) status_app ;;
    restart) restart_app ;;
    help|"") show_help ;;
    *)
        echo "❌ Nieznana komenda: \$1"
        show_help
        ;;
esac
```

---

### Sposób 2: Narzędzie \`screen\`

**screen** to menedżer terminali pozwalający na tworzenie niezależnych sesji, od których można się odłączyć i do których można wrócić w dowolnym momencie.

#### 1. Instalacja
Jeśli polecenie \`screen\` nie jest dostępne w Twoim systemie, zainstaluj je:

* **Debian / Ubuntu:**
  ```bash
  sudo apt install screen
  ```
* **Alpine Linux:**
  ```bash
  sudo apk add screen
  ```

#### 2. Tworzenie nowej sesji
Aby utworzyć nową sesję o wybranej nazwie, wpisz:
```bash
screen -S moja_aplikacja
```
Zostaniesz przeniesiony do nowego, pustego okna terminala. Uruchom tam swoją aplikację:
```bash
node index.js
```

#### 3. Odłączanie się od sesji (zostawienie w tle)
Aby wyjść z sesji i pozostawić aplikację działającą w tle, naciśnij na klawiaturze sekwencję:
* **CTRL + A**, a następnie klawisz **D** (od *detach*).

#### 4. Powrót do sesji (podgląd logów i kontrola)
Jeśli chcesz wrócić do działającej aplikacji, wpisz:
```bash
screen -r moja_aplikacja
```

#### 5. Zarządzanie sesjami screen
* **Lista aktywnych sesji:**
  ```bash
  screen -ls
  ```
* **Całkowite wyłączenie danej sesji (i zatrzymanie aplikacji):**
  ```bash
  screen -S moja_aplikacja -X quit
  ```
* **Zabicie wszystkich sesji screen na serwerze:**
  ```bash
  pkill screen
  ```

---

### Sposób 3: Zaawansowany menedżer \`pm2\` (Zalecane)

**pm2** to produkcyjny, dedykowany menedżer procesów dla Node.js. Posiada wbudowany system automatycznego restartu po awarii, monitorowania zużycia zasobów oraz łatwego zarządzania logami.

#### 1. Instalacja globalna
```bash
npm install -g pm2
```

#### 2. Uruchomienie aplikacji
```bash
pm2 start index.js --name "moja-aplikacja"
```
> *Zastąp \`"moja-aplikacja"\` dowolną nazwą, która ułatwi Ci jej identyfikację.*

#### 3. Monitorowanie i status aplikacji
* **Lista uruchomionych procesów:**
  ```bash
  pm2 list
  ```
* **Podgląd logów na żywo:**
  ```bash
  pm2 logs moja-aplikacja
  ```
  *(Aby wyjść z podglądu logów, naciśnij **CTRL + C** – aplikacja nadal będzie działać w tle).*

#### 4. Kontrola procesu
* **Zatrzymanie aplikacji:**
  ```bash
  pm2 stop moja-aplikacja
  ```
* **Ponowne uruchomienie (restart):**
  ```bash
  pm2 restart moja-aplikacja
  ```
* **Usunięcie aplikacji z listy pm2:**
  ```bash
  pm2 delete moja-aplikacja
  ```

#### 5. Automatyczny start po restarcie serwera
PM2 potrafi automatycznie uruchomić Twoje aplikacje po niespodziewanym reboocie serwera. Aby to skonfigurować, wpisz:
```bash
pm2 startup
```
*(Konsola wyświetli komendę, którą musisz skopiować i uruchomić w terminalu z uprawnieniami roota).*

Po wykonaniu tej konfiguracji zapisz aktualną listę procesów:
```bash
pm2 save
```

---

## Podsumowanie

Twoja aplikacja została pomyślnie uruchomiona na serwerze i działa bezpiecznie w tle! Bez względu na to, czy zamkniesz terminal, czy odłączysz się od sieci, proces będzie realizował swoje zadania. Korzystając z narzędzi takich jak **screen** czy **pm2**, zyskałeś pełną kontrolę nad logami, stabilnością i cyklem życia swojej aplikacji.

[Powrót do strony głównej](/)