# Ograniczenia techniczne Mikrusa

Istnieją rzeczy, których nie da się zrobić na VPSach Mikrusa.

Poniżej lista tych ograniczeń 👇 

- **Mikrusy to kontenery**, a nie VPSy z pełną wirtualizacją. Nie da się więc zmienić wersji kernela oraz **niemożliwe jest postawienie na nich innych systemów operacyjnych** takich jak Unix czy Windows
- Mikrusy działają na adresacji IPv6 i posiadają kilka wystawionych portów na IPv4. Są to jednak losowe numery portów, przez co **niemożliwe jest postawienie własnego serwera pocztowego** (do poczty przychodzącej) **czy serwera DNS**, jak i każdej usługi, której numer portu nie może być zmieniony.
- Ze względu na zabezpieczenia Mikrusa, **niemożliwy jest bezpośredni dostęp do urządzeń blokowych**. Oznacza to, że nie możesz utworzyć własnego obrazu dysku i **nie możesz przepartycjonować swojego dysku**.
- Ze względu na używaną technologię, **niemożliwe jest dodanie (w sposób stabilny) pamięci SWAP w pliku**.
- Ze względu na używany współdzielony kernel, **niemożliwe jest podmontowanie zasobów NFS w klasyczny sposób**. Możesz jednak [wykorzystać rozwiązanie bazujące na FUSE](https://github.com/sahlberg/fuse-nfs).

[Powrót do strony głównej](/)