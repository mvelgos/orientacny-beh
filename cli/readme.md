# Konzolový klient

Jednoduchý konzolový klient.


## Inštalácia

Pred spustením treba nainštalovať balíky `figlet` a `bc`, pokiaľ sa nenachádzajú vo vašom systéme.

Treba taktiež nastaviť príznak na spúšťanie:

```bash
chmod +x client.sh
```


## Spustenie

Použitie:

```bash
./client.sh
```


## Nastavenie

Súbor `config.sh` slúži ako konfiguračný súbor. Správanie programu je možné nastaviť pomocou nasledovných premenných:

* `REPO` - Umiestnenie priečinka, do ktorého sa budú sťahovať záznamy z internetu. Tento priečinok sa nemaže a teda stiahnuté súbory v ňom zostávajú.
* `URL` - URL adresa, z ktorej sa stiahne CSV súbor s výsledkami.
* `HEADER` - Zoznam položiek hlavičky.
* `DELAY` - Čas v sekundách, ako dlho sa bude zobrazovať jedna stránka výsledkov.
* `CATEGORIES` - Zoznam kategórií, ktoré majú byť vypísané.
* `TOP_LINES` - V prípade stránkovania cez viacero stránok sa na každej ďalšej stránke vždy zobrazí prvých `N` najlepších bežcov.


## Screenshot

![Screenshot](screenshot.png)
