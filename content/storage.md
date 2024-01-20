# Storage

Pod nazwą “Storage” kryje się dysk sieciowy, na którym oferujemy dodatkową przestrzeń dyskową dla użytkowników Mikrusa.

Przestrzeń ‘Storage’ jest dodatkowo płatna i dostępna w czterech pakietach:

- 125GB
- 250GB
- 500GB
- 1000GB

## Storage na Mikrusach 1.0 - 3.0

W przypadku wspomnianych wersji Mikrusa, Twoja przestrzeń dyskowa jest zamontowana pod katalog **/storage/**. Każdorazowe podpięcie lub odpięcie (np. gdy skończy Ci się abonament na dysk) wymaga restartu serwera.

Storage na Mikrusie 4.0

Przy tym modelu Mikrusa, dodatkowy dysk twardy nie jest katalogiem, a fizycznym urządzeniem, najczęściej widzianym w systemie jako **/dev/sdb**.

Zamontowanie i odmontowanie dysku nie wymaga restartu serwera. Nowy zasób widziany jest w systemie natychmiast, ale nie jest on nigdzie zamontowany.

Aby rozpocząć pracę ze storage na Mikrusie 4.0, musisz:

1. Utworzyć partycje (jedną lub wiele) na dysku /dev/sdb
2. Sformatować nowe partycje poleceniem np. mkfs.ext4 (lub inny [mkfs.XXX](http://mkfs.XXX) jaki preferujesz)
3. Utworzyć katalog/katalogi na nowe partycje np. /storage
4. Zamontować nowe partycje (np. /dev/sdb1, /dev/sdb2) do katalogów docelowych np:
mount /dev/sdb1 /storage
5. Krok opcjonalny: dodaj montowanie nowych partycji do /etc/fstab, aby były aktywne także po restarcie serwera

Pełny zestaw komend potrzebnych do uruchomienia storage na Mikrusie 4.0, może wyglądać tak:

```bash
cfdisk /dev/sdb
mkfs.ext4 /dev/sdb1
mount /dev/sdb1 /storage/
```