# Używaj kluczy SSH!

Uzyskując dostęp do Mikrusa po raz pierwszy, w mailu powitalnym dostajesz hasło dla użytkownika root. Możesz wykorzystać je do pierwszego zalogowania się, lub możesz wygenerować nowe hasło za pośrednictwem panelu sterowania.

Zachęcam jednak do tego, abyś przestał używać haseł, a zaczął pracę z kluczami SSH. Znacząco podniesie to bezpieczeństwo Twojego serwera.

Aby zacząć używać kluczy, wydaj następujące polecenie **na Twoim komputerze** (nie na Mikrusie!):

```bash
ssh-keygen -t rsa -b 4096 -C mikrus -f ~/.ssh/mikrus
```

Następnie skopiuj do schowka **zawartość** pliku: 

```plaintext
~/.ssh/mikrus.pub
```
> 💡
> Na windowsie możesz łatwo wyświetlić zawartość tego pliku używając polecenia 
> ```
> notepad %USERPROFILE%\.ssh\mikrus.pub 
> ``` 

Teraz musisz przystosować Mikrusa do logowania bez hasła:

1. zaloguj się na swoją maszynę przez SSH

wykonaj kolejno polecenia:
```bash
mkdir ~/.ssh/
chmod 700 ~/.ssh/
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

2. wklej swój klucz (masz go w schowku) do pliku:~/.ssh/authorized_keys

> 💡 Jeśli nie wiesz jak wkleić klucz, użyj edytora dla początkujących - np. 'nano'
>
>```bash
>nano ~/.ssh/authorized_keys
>```
> 
> Następne naciśnij (CTRL+V lub CTRL+SHIFT+V), po czym naciśnij CTRL+X, wpisz literę 'y' i naciśnij enter.

Jeśli w swoim systemie masz dostęp do polecenia 'ssh-copy-id', to wykonaj następującą instrukcję zamiast ręcznej edycji pliku:

```bash
ssh-copy-id -i ~/.ssh/mikrus -p **NUMER_PORTU_SSH** root@**srvX**.mikr.us
```

Wróć na swój prywatny komputer i wpisz:
```bash
ssh-add ~/.ssh/mikrus
```

Od tej chwili możesz logować się na swojego Mikrusa bez podawania hasła.

Na niektórych systemach da się to wszystko osiągnąć szybciej i sprawniej, ale instrukcja napisana jest tak, aby bez modyfikacji działała na Linuksie, Windowsie i Macu.

> Jeśli na Linuxie/Macu komenda ssh wymaga hasła po skonfigurowania klucza ssh:

edytuj plik `~/.ssh/config`, utwórz w nim konfigurację dla swojego serwera mikrusa (srvX) oraz wskaż ścieżkę do klucza na dysku:

```
Host srvX.mikr.us
  PubkeyAuthentication yes
  IdentityFile ~/.ssh/mikrus
```

Od teraz łączenie z serwerem nie będzie wymagać podania hasła root'a (jeśli ustawiłeś hasło klucza ssh, będzie ono wymagane)

> 💡 **Uwaga**
> Jeśli używasz Windowsa i dostajesz komunikaty z błędami przy "**ssh-add**", oznacza to, że nie aktywowałeś usługi "OpenSSH Authentication Agent". W menu "usługi" w systemie zmień jej tryb na "Automatyczny" i to rozwiąże problem

[Powrót do strony głównej](/)