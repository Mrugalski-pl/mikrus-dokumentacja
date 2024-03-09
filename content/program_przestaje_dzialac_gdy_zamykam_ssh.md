# Program przestaje działać gdy zamykam ssh!

Twoja aplikacja którą uruchamiasz po przez SSH, na przykład:
```bash
flask --app webapp run
```
to masz kilka opcji:

- [screen](#screen)
- [systemd](#systemd)
- [pm2](#pm2)

### screen
Zainstaluj `screen`
```bash
sudo apt update && sudo apt install screen -y
```

```bash
screen
# tutaj otwiera się wirtualny terminal, wygląda tak samo
flask --app webapp run
# ^a d - czyli wciśnij (i trzymaj) Ctrl i naciśnij kolejno "a" oraz "d" (taraz `możesz puścić Ctrl)
```
Teraz twój wirtualny terminal został 'odłączony' i możesz się normalnie rozłączyć wpisując exit, wciskając Ctrl+D lub zamykając okno.

> Przy tej konfiguracji po restarcie systemu twoja aplikacja **NIE** zostanie ponownie uruchomiona automatycznie!

Gdy chcesz wrócić do aplikacji wystarczy wpisać `screen -r -d` by wrócić do ostatniej sesji.

Poleceniem `screen -list` możesz wyświetlić aktywne wirtualne ekrany. Pamiętaj, pokazane zostanę tylko ekrany uruchomione przez tego samego użytkownika!

Screen ma wiele więcej opcji które można znaleźć pod poleceniem [`man screen`](https://linux.die.net/man/1/screen)

### systemd
Systemd to menadżer systemu i usług od którego możesz dodać swoją aplikację. Ma to przewagę nad screen pozwalając na większą automatyzację, automatycznie uruchamianie, restartowanie oraz skryptowalność.

Umieść w pliku `/usr/lib/systemd/system/mojaaplikacja.service` zamieniając `mojaaplikacja` na nazwę swojej aplikacji.

```
[Unit]
Description=Foo

[Service]
WorkingDirectory=/root/mojaapkawpython
; aplikacja znajduje się w /root/mojaapkawpython
ExecStart=/bin/env flask --app webapp run
; aplikacja uruchamiana przez flask, zmień na swoją

[Install]
WantedBy=multi-user.target

```
Gdy uruchamiasz swoją aplikację napisaną w innej technologi zmień `ExecStart=` na polecenie którego chcesz użyć.

Aby uruchomić swoją aplikację użyj
```bash
systemctl start mojaaplikacja
```
Jeżeli chcesz by aplikacja uruchamiała się automatycznie podczas startu systemu możesz to włączyć poleceniem
```bash
systemctl enable mojaaplikacja
```

> Warto zaznaczyć że w przypadku Pythona z flask powinno się użyć [serwera WSGI](https://peps.python.org/pep-3333/), na przykład [Gunicorn](https://gunicorn.org/). Użycie zostało pominięte dla jasności przekazu oraz możliwością na użycie innej technologii niż Python
### pm2
PM2 to menedżer procesów dla aplikacji Node.js. Pozwala na utrzymanie aplikacji przy życiu na zawsze, ponowne ich ładowanie bez przestojów i ułatwia wykonywanie typowych zadań administracyjnych systemu. [\(Z oficjalnej dokumentacji\)](https://www.npmjs.com/package/pm2)

Instalacja (wymaga `npm`):
```bash
npm install pm2 -g
```

Następnie można uruchomić swoją aplikację za pomocą

```bash
pm2 start app.js
```

Listę działających aplikacji oraz ich status można sprawdzić za pomocą:
```bash
pm2 list
```

[Pełna dokumentacja PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)

[Powrót do strony głównej](/)