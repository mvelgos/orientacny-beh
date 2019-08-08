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
./client.sh config.sh
```


## Konfiguračný súbor 

Súbor `config.sh` slúži ako konfiguračný súbor. Správanie programu je možné nastaviť pomocou nasledovných premenných:

* `REPO` - Umiestnenie priečinka, do ktorého sa budú sťahovať záznamy z internetu. Tento priečinok sa nemaže a teda stiahnuté súbory v ňom zostávajú.
* `URL` - URL adresa, z ktorej sa stiahne CSV súbor s výsledkami.
* `HEADER` - Zoznam položiek hlavičky.
* `DELAY` - Čas v sekundách, ako dlho sa bude zobrazovať jedna stránka výsledkov.
* `CATEGORIES` - Zoznam kategórií, ktoré majú byť vypísané.
* `TOP_LINES` - V prípade stránkovania cez viacero stránok sa na každej ďalšej stránke vždy zobrazí prvých `N` najlepších bežcov.


## Nastavenie systému v prípade spúšťania v konzole

V prípade spúšťania programu v konzole, je potrebné nastaviť správny font, aby sa dobre zobrazovali písmená s diakritikou. Preto je potrebné:

### Vveriť nastavenie prostredia 

To je možné vykonať pomocou príkazu `locale`:

```bash
$ locale
LANG=sk_SK.UTF-8
LC_CTYPE="sk_SK.UTF-8"
LC_NUMERIC="sk_SK.UTF-8"
LC_TIME="sk_SK.UTF-8"
LC_COLLATE="sk_SK.UTF-8"
LC_MONETARY="sk_SK.UTF-8"
LC_MESSAGES="sk_SK.UTF-8"
LC_PAPER="sk_SK.UTF-8"
LC_NAME="sk_SK.UTF-8"
LC_ADDRESS="sk_SK.UTF-8"
LC_TELEPHONE="sk_SK.UTF-8"
LC_MEASUREMENT="sk_SK.UTF-8"
LC_IDENTIFICATION="sk_SK.UTF-8"
LC_ALL=
```

### Nastaviť správny font

Nastavenie záleží od systému, kde sa klient spúšťa. V prípade _Debian_-u a jeho derivátov (_Raspbian_, _Ubuntu_, ...) je možné spustiť:

```bash
sudo dpkg-reconfigure console-setup
```

a postupne vybrať:
* kódovanie _UTF-8_
* znakovú sadu _Latin2_
* font _Terminus_
* veľkosť písma _8x16_

Samozrejme s nastavením sa dá experimentovať. Výsledok nastavení sa prejaví ihneď, čo znamená, že aktuálne zobrazené znaky s diakritikou začnú vyzerať ináč. To treba ignorovať a nastavenie je dobré zhodnotiť spustením vlastnej aplikácie.

Výsledok nastavení sa uloží do súrobu `/etc/default/console-setup`:

```
ACTIVE_CONSOLES="/dev/tty[1-6]"

CHARMAP="UTF-8"

CODESET="Lat2"
FONTFACE="Terminus"
FONTSIZE="8x16"

VIDEOMODE=
```

Úpravy v súbore sa však prejavia až po reštarte.


## Screenshot

![Screenshot](screenshot.png)
