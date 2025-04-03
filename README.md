# Notes-app

## Tämä on Web-sovellus, jonka avulla käyttäjä voi hallita muistiinpanoja opintojaksoittain terminaalityyppisessä käyttöliittymässä.

## 📦 Asennus ja käynnistys

1. Asenna riippuvuudet:

npm install **

2. Käynnistä kehitysympäristö:

npm run dev

## 🔧 Ohjelman toiminnallisuus

- Käyttöliittymä on rakennettu **tekstipohjaiseksi terminaaliksi**, joka vastaanottaa komentoja kuten:
- 
- `HELP`, `ADD`, `LIST`, `DELETE`, `DELCOURSE`, `CLEAR`, `EXIT`, `ADDNEW` ja paljon muita.
- 
- Jokainen näkymä toimii oman terminaalin logiikalla ja navigointi tapahtuu komentojen avulla.
- 
- **Kurssit ja muistiinpanot haetaan määritellystä REST APIsta** ja tallennetaan Zustand-tilaan.
- 
- Kursseille voi lisätä muistiinpanoja sessiomuotoisesti. Jokainen muistiinpano sisältää aikaleiman.
- 
- Kurssit ja muistiinpanot voidaan listata, ja niitä voi poistaa.
- 
- Jos muistiinpanoja ei ole, näytetään "Ei muistiinpanoja!" -teksti.

## 🧠 Keinotekoinen äly – AI-työkalujen käyttö

Olen käyttänyt ChatGPT:tä apuna mm:

- Käyttöliittymän suunnitteluun terminaalimäiseksi (Tailwind-tyylien hienosäätö).

- Koodin siistimiseen ja pieniin virheiden korjausehdotuksiin.

- Ja kivojen emojien lisäyksessä README.md:ssä.

Kaikki toteutettu logiikka, rakenteet ja komponentit on kuitenkin 

**itse suunniteltu, ymmärretty ja kirjoitettu**

Tekoälyä olen käytetänyt tukena oppimisessa ja teknisessä selkeytyksessä.

## ❓ Poikkeustapaus: alasvetovalikko

Tehtävänannossa mainitaan alasvetovalikko muistiinpanojen suodatukseen. 

Mutta koska sovelluksen käyttöliittymä on täysin tekstipohjainen terminaalityyliin

ei perinteistä graafista alasvetovalikkoa vonut hyödyntää tässä työssä.

**Toteutus perustuu komentopohjaiseen käyttöön:**

- Komento `LIST` näyttää kaikki kurssit ID:llä.

- Käyttäjä valitsee kurssin kirjoittamalla sen ID:n komentona (esim. `2`).

- Sovellus listaa vain valitun kurssin muistiinpanot.

- Tämä vastaa toiminnallisesti alasvetovalikon käyttöä, mutta sopii paremmin tekstipohjaiseen ympäristöön.

## 📁 Rakenne

- `App.jsx`: Reititys eri terminaalinäkymiin

- `Terminal.jsx`: Etusivu ja pääterminaali

- `AddNew.jsx`: Kurssin lisäysnäkymä

- `Course.jsx`: Muistiinpanon lisäysnäkymä

- `List.jsx`: Muistiinpanojen ja kurssien listaaminen ja poisto

- `coursedata.js`: Zustand-store kurssitiedolle

- `userdata.js`: Zustand-store muistiinpanoille

- `styles/`: CSS- ja Tailwind-tyylit