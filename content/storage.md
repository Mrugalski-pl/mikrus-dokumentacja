# Storage

Pod nazwą “Storage” kryje się dysk sieciowy, na którym oferujemy dodatkową przestrzeń dyskową dla użytkowników Mikrusa.

Przestrzeń ‘Storage’ jest dodatkowo płatna (opłata roczna) i dostępna w czterech pakietach:

- 125GB - 35zł/rok
- 250GB - 70zł/rok
- 500GB - 140zł/rok
- 1000GB - 280zł/rok

Zamówisz ją w panelu, w menu **Mikrus Services** → **[Dysk sieciowy](https://mikr.us/panel/?a=storage)**.

Twoja przestrzeń dyskowa jest zamontowana pod katalog **/storage/**. Każdorazowe podpięcie lub odpięcie (np. gdy skończy Ci się abonament na dysk) wymaga restartu serwera.

> 💡 Dodatkowa przestrzeń **nie zwiększa** Twojego standardowego, systemowego dysku (root). Jeśli potrzebujesz więcej miejsca na system i aplikacje, rozważ upgrade serwera lub [posprzątaj dysk](../sprzatanie_dysku).

## Do czego się nadaje, a do czego nie?

Storage to **dysk sieciowy**. Jest wyraźnie wolniejszy od dysku systemowego, dlatego:

- **dobrze sprawdza się** do składowania plików statycznych: archiwów, zdjęć, plików do pobrania, kopii zapasowych z innych maszyn
- **nie nadaje się** do uruchamiania na nim aplikacji, baz danych, kontenerów Dockera ani do żadnych operacji wymagających intensywnej pracy dysku

> 🔥 Dane na dysku Storage **nie są przez nas backupowane**. Jeśli trzymasz tam coś ważnego, przygotuj kopię zapasową we własnym zakresie - odpowiedzialność za backup spoczywa na Tobie.

## Sprawdzenie dostępnego miejsca

```bash
df -h /storage
```

[Powrót do strony głównej](/)
