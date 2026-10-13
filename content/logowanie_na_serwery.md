# Logowanie na serwery

Aby zalogować się na serwer, należy:

1. zaopatrzyć się w klienta usługi SSH. Może to być np. polecenie `ssh` na Linuksa, Maca lub Windowsa (PowerShell lub command line) lub inny program taki jak PuTTy na Windowsa.
2. W kliencie należy podać odpowiednią nazwę hosta, czyli np. `srv20.mikr.us`, `srv41.mikr.us`, `maluch2.mikr.us` itd. (nazwa podana jest w mailu powitalnym).
3. **Jako numer portu podajemy pięciocyfrową liczbę** będącą sumą liczby 10000 i numeru Twojej maszyny. Czyli **jeśli masz maszynę o numerze 123** to Twój numer portu to **10123**. Numer portu jest też podany w powitalnym mailu.
4. Po nawiązaniu połączenia należy podać hasło (podczas wpisywania, nie widać żadnych gwiazdek!) podane w mailu, lub jeśli nie posiadasz tego hasła, należy ustalić nowe na stronie: [https://mikr.us/panel/](https://mikr.us/panel/) 

> 💡 Gotowe polecenie ssh do połączenia się z VPS-em znajduje się też po zalogowaniu na głównej stronie panelu

Przykładowo, dla maszyny o numerze 123 stojącej na serwerze srv20, polecenie wygląda tak:

```bash
ssh root@srv20.mikr.us -p 10123
```

> 💡 Jeśli nie masz pod ręką klienta SSH (np. jesteś na cudzym komputerze), możesz zalogować się na serwer bezpośrednio z przeglądarki - w panelu wybierz menu **Mój VPS** → **[WebSSH](https://mikr.us/panel/?a=webssh)**.

Nie próbuj używać portu 22 do łączenia się z serwerem - na nim słucha serwer główny, a nie Twój VPS.

Pięciokrotne podanie błędnego hasła na porcie 22 spowoduje wycięcie Twojego numeru IP na firewallu na 24h.

Gdy już uda Ci się zalogować, koniecznie [skonfiguruj logowanie kluczem SSH](../uzywaj_kluczy_ssh) zamiast hasłem.

Coś nie działa? Zajrzyj do artykułów o błędach [Remote Host Identification has changed](../blad_ssh_remote_host_identification_has_changed) i [Too many authentication failures](../too_many_authentication_failures_preauth), a jeśli to nie pomoże - uruchom [Mariana](../marian).

[Powrót do strony głównej](/)