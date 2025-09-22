# Jak zwolnić więcej miejsca na dysku?

Jeśli na Twoim serwerze VPS zaczyna brakować miejsca, możesz wykonać kilka operacji, które pozwolą Ci odzyskać zajęte miejsce.

### Rotacja i przycięcie logów

Jeśli wiesz, co robisz i nie potrzebujesz przetrzymywać archiwalnych logów na serwerze, możesz na początek wykonać rotację dziennika systemowego

```bash
journalctl --vacuum-size=10M
```

Jeśli miejsca nadal brakuje, możesz wymusisz rotację aktualnych logów systemowych. W zależności od Twoich ustawień może to zwolnić miejsce, ale nie musi.

```bash
logrotate -f /etc/logrotate.conf
```

### Zbyteczne paczki systemowe (Ubuntu/Debian)

Podczas instalacji i aktualizacji pakietów system przechowuje sporo plików .deb w katalogu cache.
Możesz je usunąć poleceniami:

```bash
apt clean
apt autoremove
```

### Docker - kontenery i obrazy

Jeśli intensywnie korzystasz z Dockera, może się zdarzyć, że na Twoim serwerze są dziesiątki nieużywanych obrazów.

Takie zbyteczne obrazy (niepowiązane z żadnym kontenerem) możesz usunąć poleceniem:

```bash
docker rmi $(docker images -f "dangling=true" -q)
```

Jeśli często budujesz własne obrazy kontenerów, może pomóc Ci wyczyszczenie cache dla buildera.

```bash
docker builder prune
```

Możesz też postąpić bardziej drastycznie i usunąć z Dockera wszystko (zatrzymane kontenery, nieużywane obrazy itp) jednym poleceniem:

```bash
docker system prune -a
```

### Jeśli korzystasz z N8N

Domyślna konfiguracja oprogramowania N8N chomikuje niezwykle dużo zbytecznych danych. Są to przede wszystkim pełne logi z operacji — zarówno tych udanych, jak i nieudanych. Jeśli cyklicznie wykonujesz setki/tysiące scenariuszy, to Twoje logi mogą zajmować nawet kilka GB.

Domyślna baza danych N8N to baza SQLite. Aby ją zmniejszyć poprzez usunięcie logów operacji, wykonaj następujące kroki:

```
sqlite3 ~/.n8n/database.sqlite

# już wewnątrz sqlite:

delete from execution_data;
vacuum;
```

> 💡 To zupełnie naturalne, że zarówno operacja delete, jak i vacuum mogą zając od kilku do kilkunastu minut. Nie przerywaj tego procesu!

Warto po tej operacji zrestartować kontener z N8N

```bash
docker restart n8n
```

W razie jakichkolwiek problemów ze startem N8N warto wydać Mikrusowe polecenie:

```bash
n8n_update
```

[Powrót do strony głównej](/)
