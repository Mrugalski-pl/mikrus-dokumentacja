# Reverse Proxy na nginX

Jeśli chciałbyś na porcie 80 lub 443 swojego Mikrusa wystawić aplikację działającą na innym, niestandardowym porcie, to potrzebujesz wynalazku jakim jest Reverse Proxy.

Zakładam, że [postawiłeś już u siebie nginX](../nginx_php_mysql).

Znajdź wirtualny host, który chcesz edytować - domyślnie będzie to:

```bash
/etc/nginx/sites-enabled/default
```

Znajdź tam sekcję `location /` (jeśli jej nie ma, to dopisz) i spraw, aby wyglądała w następujący sposób:

```
location / {
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $remote_addr;
	proxy_pass http://123.123.123.123:3000;
}
```

W miejscu **123.123.123.123** wstaw oczywiście adres IP lub domenę na której stoi Twoja usługa.

Pod "**3000**" podstaw numer portu na którym ona słucha. Jeśli usługa wystawia połaczenie po HTTPS, to zmień oczywiście protokół w powyższym configu na właściwy.

Po wprowadzeniu powyższych zmian, przeładuj konfigurację nginxa:

```bash
nginx -s reload
```

P.S. Jeśli chcesz osiągnąć to samo szybciej, możesz użyć [Cytrusa](../cytrus).

[Powrót do strony głównej](/)