# Cytrus nie podaje stron

Istnieje kilka przyczyn tego problemu

- czy reinstalowałeś swój serwer lub przenosiłeś go na inną maszynę? Jeśli tak było, aktywuj Cytrusa ponownie - w panelu wejdź w menu **Cytrus — hosting WWW** → **[Opis działania](https://mikr.us/panel/?a=hosting_pomoc)** i kliknij odpowiedni przycisk w sekcji "Reinstalowałeś serwer?"
- czy katalog **/cytrus/** w ogóle istnieje? Musisz go założyć samodzielnie (`mkdir /cytrus/`)
- czy wszystkie pliki i katalogi w /cytrus/ posiadają ownera i grupę ustawionego na "cytrus"? Naprawisz to poleceniem `chown -R cytrus:cytrus /cytrus/`
- sprawdź chmody na katalogi w /cytrus/ - czy mają ustawiony bit wykonywalności (x)?
- czy w konfiguracji domeny nie wskazujesz na symlink prowadzący poza /cytrus/? Cytrus działa na osobnej maszynie i nie podąża za takimi symlinkami
- jeśli domena ma przekierowywać ruch na port Twojego serwera, sprawdź, czy aplikacja na tym porcie faktycznie działa

Jeśli problem nie został rozwiązany, uruchom [Mariana](../marian), a następnie skontaktuj się z kimś z adminów (menu **Pomoc i diagnostyka** → **Nowe zgłoszenie**).

[Powrót do strony głównej](/)
