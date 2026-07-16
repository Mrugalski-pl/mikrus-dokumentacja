# Ograniczenie adresów IP które mają dostęp serwera w NGINX
W NGINX można w łatwy sposób ograniczyć adresy klientów którzy mają dostę do serwera ale Serwery Mikrus działają w oparciu o IPv6 i ruch od klienta przechodzi przez PROXY zmieniając adres IP w zapytaniu. Odtworzenie adresu klienta wymaga dodatkowej konfiguracji wykorzystującej [ngx_http_realip_module](https://nginx.org/en/docs/http/ngx_http_realip_module.html). 

1. Sprawdź czy masz zainstalowany moduł **ngx_http_realip_module** do NGINX
```bash
nginx -V 2> >(grep http_realip_module)
```

2. Dodaj konfigurację modułu `ngx_http_realip_module`
```
/etc/nginx/conf.d/nginx-realip.conf
```

w pliku ustaw listę zaufanych adresów IP dla których chcesz rozwiąc reczywisty adres klienta:
```
# adresy dla Cloudflare na podstawie https://www.cloudflare.com/ips/
set_real_ip_from 2606:4700::/32;
set_real_ip_from 2803:f800::/32;
set_real_ip_from 2405:b500::/32;
set_real_ip_from 2405:8100::/32;
set_real_ip_from 2a06:98c0::/29;
set_real_ip_from 2c0f:f248::/32;
set_real_ip_from 2a01:4f90::/32;

# pula któej użwa mikrus?
set_real_ip_from 2a01:04f9::/32;

real_ip_recursive on;
real_ip_header X-Forwarded-For;
```

Upewnij się się plik `/etc/nginx/nginx.conf` zawiera wpis:
```
include /etc/nginx/conf.d/*.conf;
```

3. Dodaj konfigurację strony do której chcesz ograniczyć dostęp (w tym przykładze to reverse proxy):
```
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_pass http://localhost:8888;

        allow XX.XX.XX.XX; # dozwolone adresy
        deny all;          # zabroń wszystkie adresy poza dozwolonymi
    }
}
```

> *Poradnik napisany przez [Zygfryda Wieszoka](https://github.com/zygfrydw) i można go znaleźć [tutaj](https://gist.github.com/zygfrydw/f5504a3c67f1eb5087c683a2d8c0e144)*

[Powrót do strony głównej](/)