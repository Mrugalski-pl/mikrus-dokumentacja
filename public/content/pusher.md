# Pusher

Pusher jest prostym narzędziem pozwalającym Ci wysyłać maile do samego siebie, bez konieczności instalowania serwera mailowego.

Wywołuje się go poleceniem "pusher" np. tak:

```bash
cat /etc/passwd | pusher
```

Przykładowe zastosowania:

- Przesyłanie wyniku polecenia na maila
    
    ```bash
    polecenie | pusher
    ```
    
- Powiadomienie o sukcesie wykonania crona
    
    ```bash
    polecenie && pusher cron01_uruchomiony
    ```
    
- Powiadomienie o awarii crona
    
    ```bash
    polecenie || pusher cron02_awaria
    ```
    

Powiadomienie o logowaniu na serwer (dorzuć do ~/.bash_profile):

```bash
pusher logowanie_roota
```

Pusher czyta ze standardowego wejścia. Jeśli chcesz zmienić **temat maila** wysyłanego przez pushera, podaj go jako pierwszy parametr (podkreślenia będą traktowane jak spacje).

Jeśli z jakiegoś powodu na Twoim serwerze nie ma pushera, to:

- Zainstaluj narzędzie CURL
- Ściągnij pushera z adresu [https://mikr.us/tools/pusher](https://mikr.us/tools/pusher)
- skopiuj pushera do np. /usr/bin/pusher
- spraw, aby pusher był wykonywalny:

```bash
chmod +x /usr/bin/pusher
```

[Powrót do strony głównej](/)
