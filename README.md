# Peak Finder

## Kjøring av appen
Først sjekk at en befinner seg i /prosjekt2.
For å kjøre appen så må en skrive 

```
npm install
```

For deretter å kjøre
```
npm run dev
```

## Beskrivelse av appen
Peak Finder skal gi brukere en bedre måte sjekke ut ulike destinasjoner på. Når en først går inn på siden så ser en logoen til siden samt et søkefelt. For nå kan en skrive in hva som helst før en blir sendt til en statisk resultat side. På denne siden kan en velge mellom ulike destinasjoner og filtrere mellom dem. Når en klikker på et av resultatene blir en sendt til en side om den spesifikke destinasjonen. Her vises mer informasjon om stedet. Det er også her en kan legge igjen en anmeldelse på stedet. Anmeldelsen er på mellom 1 og 5 stjerner.

## Valg vi har tatt
Vi har antatt at en kan presentere ett og ett kort i en grid (en form for liste) der scrolling er muligheten til å bla seg frem eller tilbake. En kan hoppe til en spesifikk ressurs ved å trykke på kortet en ønsker.
Vi har et filter der en kan sortere skisteder etter blant annet høyde, høydeforskjell og om det har kveldskjøring.
Siden er responsiv som gjør at appen kan brukes på store skjermen og mindre smarttelefoner.
Et godt eksempel av ryddig utforming er utdypete informasjonen på en spesifikk destinasjonside. Hvis en er på mobil så endres presentasjonen av tabellen drastisk for å beholde ryddig utforming.

## Tilgjengelighet
Peak Finder er optimalisert for tilgjengelighet. Alle sidene har skjermleserstøtte og kan derfor brukes av mennesker med synstap.


## Kjøring av linter

For å sjekke etter linting error i prosjektet så kjør kommandoen under. Pass på at en befinner seg i /prosjekt2.

```
npx eslint . --ext .js,.jsx,.ts,.tsx
```

For å fikse problemene kjør:

```
npx eslint . --ext .js,.jsx,.ts,.tsx --fix
```

## Kjøring av prettier

For å se formatterings feil i prosjektet, kjør den følgende kommandoen:
```
npx prettier . --check
```

For å fikse dem kjør:

```
npx prettier . --write
```
