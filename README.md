# Dokumentacja projektu Mikrus
To repozytorium zawiera pliki źródłowe dla wiki znajdującej się pod adresem [wiki.mikr.us](https://wiki.mikr.us/)

# Chcę coś dodać od siebie!
Wspaniale! Pliki wiki (w formacie Markdown) znajdują się w katalogu `/content`

Aby pobrać i zbudować dokumentację użyj
```bash
git clone git@github.com:unkn0w/mikrus-dokumentacja.git --recursive
```
lub po http
```bash
git clone https://github.com/unkn0w/mikrus-dokumentacja.git --recursive
```
następnie przejdź do katalogu
```bash
cd mikrus-dokumentacja
```
zbuduj za pomocą, wymaga [hugo](https://gohugo.io/categories/installation/) 
```bash
hugo
```
gotowe pliki są w `/public`

Jeżeli chcesz widzieć zmiany na żywo użyj
```bash
hugo server
```