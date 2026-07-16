# Logowanie na serwery

Aby zalogować się na serwer, należy:

1. zaopatrzyć się w klienta usługi SSH. Może to być np. polecenie `ssh` na Linuksa, Maca lub Windowsa (PowerShell lub command line) lub inny program taki jak PuTTy na Windowsa.
2. W kliencie należy podać odpowiednią nazwę hosta, czyli np. `srv03.mikr.us`, `srv06.mikr.us`, `maluch2.mikr.us` itd. (nazwa podana jest w mailu powitalnym).
3. **Jako numer portu podajemy pięciocyfrową liczbę** będącą sumą liczby 10000 i numeru Twojej maszyny. Czyli **jeśli masz maszynę o numerze 123** to Twój numer portu to **10123**. Numer portu jest też podany w powitalnym mailu.
4. Po nawiązaniu połączenia należy podać hasło (podczas wpisywania, nie widać żadnych gwiazdek!) podane w mailu, lub jeśli nie posiadasz tego hasła, należy ustalić nowe na stronie: [https://mikr.us/panel/](https://mikr.us/panel/) 

> 💡 Gotowe polecenie ssh do połącznia się z VPS-em znajduje się też po zalogowaniu na głównej stronie panelu

Nie próbuj używać portu 22 do łączenia się z serwerem.

Pięciokrotne podanie błędnego hasła na porcie 22 spowoduje wycięcie Twojego numeru IP na firewallu na 24h.

[Powrót do strony głównej](/)