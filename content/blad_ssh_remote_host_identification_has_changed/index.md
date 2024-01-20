# Błąd SSH (Remote Host Identification has changed!)

Klient SSH chce obronić Cię przed atakami man-in-the-middle (MITM). Realizuje to w ten sposób, że przy każdym połączeniu z wybranym przez Ciebie serwerem, sprawdzany jest "odcisk palca" (fingerprint) serwera. Jeśli ulegnie on zmianie, to oznacza, że ktoś majstrował przy Twoim serwerze lub nie jest to ten serwer, którego się spodziewasz.

Jest jednak zupełnie naturalna sytuacja, w której odcisk palca serwera się zmienia i nie jest to niebezpieczne. Dzieje się tak przy każdej reinstalacji systemu.

**Jeśli zainstalowałeś na nowo system na swoim VPSie**, to Twoim oczom ukaże się komunikat podobny do poniższego.

![Błąd SSH - Zmieniono klucz](ssh-host-key-error.png)

Twój klient nie wie, czy zmiana fingerprinta nastąpiła na skutek ataku hackerskiego, czy na skutek reinstalacji systemu, więc prewencyjnie nie pozwala Ci na połączenie z serwerem.

## Rozwiązanie

Problem możemy rozwiązać na dwa sposoby — ręczny i w pełni automatyczny.

**Metoda ręczna** polega na otworzeniu w dowolnym edytorze (np. VIM, nano, mcedit) pliku wskazanego w komunikacie z błędem (to ta ścieżka z **known_hosts**) i usunięciu linii, która powoduje błąd (na powyższym screenie jest to linia 410).

**Metoda automatyczna** polega na wpisaniu poniższego polecenia, podstawiając pod serwer i port te dane, które widoczne są w komunikacie z błędem (przedostatnia linia komunikatu).

```bash
ssh-keygen -R "[[srv08.mikr.us](http://srv08.mikr.us/)]:10100"
```

[Powrót do strony głównej](/)