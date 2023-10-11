# Peak Finder

## Kjøring av appen

For å kjøre appen bør en først sjekke at en befinner seg i /prosjekt2, for deretter å skrive:

```
npm install
```

Heretter kjør

```
npm run dev
```

## Beskrivelse av appen

Peak Finder skal gi brukere en bedre måte sjekke ut ulike skidestinasjoner på. Når en først går inn på siden så ser en Peak Finder logoen samt et søkefelt. For nå kan en skrive inn hva som helst før en blir sendt til en statisk resultatside. På denne siden kan en velge mellom ulike destinasjoner og filtrere mellom dem. Når en klikker på et av resultatene blir en sendt til en ny side om den spesifikke destinasjonen. Her vises mer informasjon om stedet. Det er også her en kan legge igjen en anmeldelse. Anmeldelsen er på mellom 1 og 5 stjerner.

## Valg vi har tatt

Vi har antatt at en kan presentere ett og ett kort i en grid (en form for liste) der scrolling er muligheten til å bla seg frem eller tilbake. En kan hoppe til en spesifikk ressurs ved å trykke på kortet en ønsker.
Vi har et filter der en kan sortere skisteder etter blant annet høyde, høydeforskjell og om det har kveldskjøring.
Siden er responsiv som gjør at appen kan brukes på store skjermer og mindre smarttelefoner.
Et godt eksempel av ryddig utforming er den utdypete informasjonen på en spesifikk destinasjonside. Hvis en er på mobil så endres presentasjonen av tabellen drastisk for å bevare den ryddig utformingen.
Dataen som vises på de ulike sidene kommer til å hentes fra datasettet «European Ski Resorts» fra nettstedet Kaggle. Lenken til datasettet ser slik ut: https://www.kaggle.com/datasets/thomasnibb/european-ski-resorts

## Tilgjengelighet

Peak Finder er optimalisert for tilgjengelighet. Alle sidene har skjermleserstøtte og kan derfor brukes av mennesker med synstap.

## Kjøring av linter

For å sjekke om det finnes linting error i prosjektet, så kjør kommandoen under. Pass på at en befinner seg i /prosjekt2.

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

For å fikse dem, kjør:

```
npx prettier . --write
```
