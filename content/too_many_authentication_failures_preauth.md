# Too many authentication failures [preauth]

Błąd podany w tytule może wystąpić podczas łączenia się do serwera i to niezależnie od tego, czy logujesz się hasłem, czy kluczem SSH.

Winę ponoszą jednak klucze - dlaczego tak się dzieje?

Najczęstszym powodem takiej sytuacji jest **zbyt duża liczba kluczy załadowanych do agenta SSH** (ssh-agent). Jest szansa, że masz tam wpisanych np. 7-8 kluczy. Domyślna konfiguracja SSH zezwala jedynie na 5-6 (zależnie od systemu) następujących po sobie błędnych logowań, a następnie odrzuca kolejne próby połączenia.

Jeśli chcesz zalogować się do nowego serwera hasłem, ale jednocześnie masz załadowane w ssh-keychain np. 7 kluczy, to procedura logowania z punktu widzenia klienta SSH wygląda tak:

1. Klient próbuje zalogować się pierwszym kluczem
2. Klient próbuje z drugim kluczem
3. …
4. Klient próbuje z kluczem nr 6
5. Otrzymujesz błąd “**Too many authentication failures [preauth]**”

Klucze od 6 w górę nie są nawet brane pod uwagę, a do pytania o hasło klient już nie dociera.

Serwer odrzucił połączenie.

## Rozwiązanie

Ten problem rozwiązać możesz w sposób tymczasowy, jak i permanentny.

**Metoda 1:**

Zmniejsz liczbę kluczy w łańcuchu uwierzytelniania. Możesz to zrobić, np. usuwając WSZYSTKIE klucze z pamięci (nie znikają one z dysku - są tylko usuwane z pamięci SSH).

```bash
ssh-add -D
```

Po tej operacji zaloguj się do serwera hasłem lub dodaj do keychain tylko jeden, wymagany dla serwera klucz:

```bash
ssh-add /sciezka/do/klucza_ssh
```

**Metoda 2:**

Możesz połączyć się do swojego serwera z pominięciem kluczy z keychain (bez jednoczesnego usuwania ich z tej lokalizacji):

```bash
ssh -o IdentitiesOnly=yes root@serwer
```

Ta opcja sprawia, że do połączenia używane będą jedynie klucze zdefiniowane w linii poleceń lub w konfiguracji SSH.

Aby wskazać konkretny klucz, możesz użyć polecenia:

```bash
ssh -o IdentitiesOnly=yes -i /sciezka/do/klucza_ssh root@serwer
```

**Metoda 3:**

Zaloguj się na serwer docelowy jako root i edytuj plik **/etc/ssh/sshd_config**.

Znajdź w nim linię zawierającą wpis “**MaxAuthTries**” (jest szansa, że będzie zakomentowana, wtedy usuń “**#**” z początku linii) i zamień ją np. na:

```bash
MaxAuthTries 10
```

Wartość ”10” jest przykładem. Dostosuj tę wartość do swoich potrzeb, tak aby współgrała z liczbą używanych przez Ciebie kluczy (najlepiej ustaw ją na liczbę kluczy + 1).

Oczywiście, aby zastosować trzecią metodę, najpierw musisz jakoś dostać się na serwer, a w tym pomogą Ci dwie wcześniejsze metody 🙂

> 💡 Pamiętaj, że jeden klucz SSH możesz wykorzystywać na wielu serwerach jednocześnie. Zazwyczaj nie potrzebujesz tworzyć jednego klucza per serwer, więc posiadanie ich załadowanych np. 15 w keychain może świadczyć o kiepskim zarządzaniu tymi kluczami.

[Powrót do strony głównej](/)