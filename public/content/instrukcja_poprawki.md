# Instrukcja poprawki

Chcesz poprawić coś w dokumentacji? A może coś dodać? Tu masz pełną instrukcję!



> Do tego sposobu musisz posiadać zainstalowany Vite (wraz z Node.js i npm) oraz najlepiej Git.

## Pobierz repozytorium

Zrobisz to tak:

```bash
git clone https://github.com/Mrugalski-pl/mikrus-dokumentacja.git
```

> Możesz to też osiągnąć przez pobranie pliku ZIP z repozytorium.

Powinno to utworzyć folder o nazwie `mikrus-dokumentacja`.

## Wejdź w folder i wykonaj

```bash
npm install
```

Ta komenda instaluje wszystkie zasoby.

## Zbuduj projekt

Zrobisz to tak:

```bash
npm run build
```

> **Uwaga:** Pliki źródłowe nie działają bez serwera. Jeśli chcesz mieć reload, użyj:

```bash
npm run dev
```

## Pliki Markdown

Pliki `.md` znajdują się w katalogu `./public/content`.

> Wszystkie obrazy i filmy powinny znajdować się w `./public/assets`. Odnoś się do nich jako `/NAZWA` lub `NAZWA`.

> Resolver nie wspiera audio, co oznacza, że wszystkie nagrania nie będą działać.

> Aby dodać film, użyj tagu HTML.

> W Markdown można osadzać HTML.

> Hiperłącza do innych dokumentów zrobisz przez /NAZWA
> Hiperłącza do stron zewnętrznych muszą się zaczynać od https://