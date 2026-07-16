# **Współdzielona subdomena**

Jeśli nie posiadasz własnej domeny/subdomeny, to do testów aplikacji webowych możesz wykorzystać domenę **wykr.es**. Format adresu wygląda następująco:

- **_serwer_-_numer_portu_.wykr.es**

Jeśli więc Twój serwer VPS jest na maszynie **srv41**, ([jak to sprawdzić?](/faq_najczesciej_zadawane_pytania/#imie-na-srvxx)) a aplikacja webowa słucha na porcie **20100**, to adres Twojej domeny to:

- **srv41-20100.wykr.es**


> 💡 Ta subdomena automatycznie obsługuje protokół HTTPS i wystawia/odnawia dla Ciebie certyfikat. Nie musisz o to samodzielnie dbać. **Twoja aplikacja musi podawać dane jako HTTP (nie HTTPS!).** Nie da się użyć tej domeny do połączeń SSH/FTP itp.


Portem jest jeden z tych 2, które widzisz po zalogowaniu się na swój serwer: “Udostępniliśmy Ci trzy porty na adresacji IPv4 (TCP/UDP)”. Np. dla serwera o ID “123”, będą to:

```bash
http://srv41.mikr.us:20123/ => 192.168.1.123:20123
http://srv41.mikr.us:30123/ => 192.168.1.123:30123
```

> 📢 Nie zadziała tu jednak żaden z domyślnych portów usług, które działają na Twoim VPS, np. 80.


[Powrót do strony głównej](/)