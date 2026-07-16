# Strych (backupy)

Strych to współdzielony **serwer backupowy**, na którym **każdy z użytkowników posiada 200MB** przestrzeni do przechowywania własnych plików. Aby uzyskać do niego dostęp, wystarczy o niego poprosić przez panel, klikając odpowiednią opcję w sekcji "**[Backup](https://mikr.us/panel/?a=backup)**".

Warto efektywnie wykorzystać tę przestrzeń, wykonując tam nie pełne backupy, a jedynie przyrostowe.

### **JAK TO ZROBIĆ?**

Poniższa instrukcja przeznaczona jest dla serwerów z systemem zarządzania pakietami apt, np. Ubuntu.

1. Aktywuj w panelu dostęp do serwera backupowego (menu "Backup")
2. Ściągnij aplikację do backupu:
```bash
wget https://mikr.us/tools/rsnappush -O /usr/bin/rsnappush
```
3. Zainstaluj aplikację, z której korzysta pod spodem rsnappush:
```bash
apt install acl rsync
```
4. Spraw, aby aplikacja do backupu była wykonywalna:
```bash
chmod +x /usr/bin/rsnappush
```
5. Utwórz na swoim mikrusie plik ~/.ssh/config o następującej zawartości (**podmień usera na własnego**)
```
Host strych.mikr.us
     user basia100
     IdentityFile /backup_key
```
6. Backupuj co tylko zechcesz:
```bash
rsnappush /etc strych.mikr.us:~/
```

### **JAK DZIAŁA BACKUP PRZYROSTOWY?**

Jeśli np. katalog /etc/, który backupujesz ma 5MB, to pierwszy jego backup zajmie równe 5MB. Gdy jednak zmienisz w tym katalogu jeden plik, to kolejny backup zajmie tylko tyle miejsca, ile zajmuje edytowany plik (czyli np. 1kb).

> 💡 W ten "magiczny" sposób, bez problemu pomieścisz na 200MB nawet kilkaset backupów małych katalogów z configami czy skryptami.

### **WAŻNE UWAGI NA KONIEC**

1. Warto raz na jakiś czas posprzątać na strychu, aby nie skończyło Ci się na nim miejsce
2. Rób backupy w rozsądnych odstępach czasu i jeśli to możliwe, to najlepiej w nocy.
3. **Prawdopodobnie nie potrzebujesz backupu co godzinę**, a np. jeden dziennie czy nawet kilka tygodniowo w zupełności powinny Ci wystarczyć.
4. Backupuj te pliki, które uważasz za cenne. Katalog /etc to tylko przykład (ale i tak sugeruję go backupować).
5. Jeśli chcesz, aby backupy robiły się automatycznie, to po prostu wrzuć sobie do crona polecenie backupujące, podając przy tym pełną ścieżkę do niego (/usr/bin/rsnappush)
6. Jeśli backupujesz wiele katalogów, to zrób na strychu strukturę w poniższym stylu (załóż je + dopisz na końcu polecenia do backupu)
- `~/etc/`
- `~/moje_pliki/`
- `~/programowanie/`

**Nie wrzucaj backupów wielu katalogów do jednego worka!**

[Powrót do strony głównej](/)
