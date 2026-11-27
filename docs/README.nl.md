<div align="center">

# ✈️ Preflight

**Is je met vibe-coding gebouwde app klaar voor de lancering? Ontdek het met één commando.**

Preflight scant je project op gelekte sleutels, open databases, niet-geverifieerde betalingen en ontbrekende lanceringsbasics, en geeft je daarna een rapportkaart met een oplossing voor elke bevinding.

[![License: MIT](https://img.shields.io/badge/license-MIT-34d399.svg)](../LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-38bdf8.svg)](../package.json)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-fbbf24.svg)](../CONTRIBUTING.md)
[![npm version](https://img.shields.io/npm/v/vibe-preflight)](https://www.npmjs.com/package/vibe-preflight)
[![npm downloads](https://img.shields.io/npm/dm/vibe-preflight)](https://www.npmjs.com/package/vibe-preflight)
[![CI](https://github.com/erdellll/preflight/actions/workflows/ci.yml/badge.svg)](https://github.com/erdellll/preflight/actions/workflows/ci.yml)

![Preflight report card](assets/report-card.png)

</div>

```bash
npx vibe-preflight
```

Geen installatie, geen account, geen netwerkverkeer. Je code verlaat je machine nooit.

## Waarom

AI-tools maken het makkelijk om in een weekend een app te bouwen, en net zo makkelijk om die te lanceren met je Stripe-geheime sleutel in de browserbundel of een Supabase-tabel die iedereen kan lezen. Preflight controleert op de fouten die na de lancering het meeste pijn doen, vóór je lanceert.

## Probeer het eerst op een kapotte app

```bash
npx vibe-preflight --demo
```

Scant een bewust kapotte demo-app (elk geheim is nep), zodat je kunt zien hoe een falend rapport eruitziet.

## Wat het controleert

23 controles vandaag, op het gebied van beveiliging, betrouwbaarheid en lanceringsbasics. Zie [alle controles](rules.md).

| | |
|---|---|
| 🔑 Livegeheimen in clientcode | 🗄️ Supabase-tabellen zonder row-level security |
| 📄 `.env`-bestanden die gecommit kunnen worden | 💳 Stripe-webhooks zonder handtekeningcontrole |
| 🌍 CORS open voor elke website | 🚨 Geen foutmonitoring |
| 🔒 Geen privacybeleid | 🔗 Ontbrekende titel, beschrijving of deelafbeelding |

## Opties

```bash
npx vibe-preflight [path]          # scan a folder (default: current folder)
npx vibe-preflight --html          # also write a shareable preflight-report.html
npx vibe-preflight --json          # machine-readable output ([JSON format](json.md))
npx vibe-preflight --ignore a,b    # skip checks by id
npx vibe-preflight --fail-on warning  # exit code policy: critical (default) | warning | never
```

Stel NO_COLOR=1 in om gekleurde uitvoer uit te schakelen.

Schakel een bevinding die naar een regel wijst uit met `// preflight-ignore <check-id>` op die regel of de regel erboven. Een bevinding over een heel bestand (een gecommitte `.env`, een niet-geverifieerde webhook) krijgt dezelfde opmerking in de eerste vijf regels van het bestand. Alles wat je projectbreed kwijt wilt, inclusief bevindingen zonder bestand, gaat via `--ignore <check-id>`.

## Gebruiken in CI

```yaml
- run: npx vibe-preflight --fail-on critical
```

Het commando eindigt met exitcode 1 wanneer een bevinding het `--fail-on`-niveau bereikt, zodat een gelekte sleutel de merge blokkeert.

Zie [docs/ci.md](ci.md) voor een volledige workflow.

## Gebruiken in Claude Code

Preflight wordt geleverd als een Claude Code-plugin met een `/preflight`-commando dat de scan uitvoert, de resultaten uitlegt en aanbiedt om kritieke problemen één voor één op te lossen, waarbij vóór elke wijziging wordt gevraagd.

Voer in Claude Code uit:

```text
/plugin marketplace add erdellll/preflight
/plugin install preflight@preflight
```

Typ daarna `/preflight` in elk project.

## Voeg een controle toe in 10 minuten

Elke controle is één klein bestand plus twee voorbeeldmappen: één die de controle moet markeren en één die hij met rust moet laten. Geen buildstap, geen afhankelijkheden. Lees [CONTRIBUTING.md](../CONTRIBUTING.md), of kies een issue met het label [`good first issue`](https://github.com/erdellll/preflight/issues?q=is%3Aopen+label%3A%22good+first+issue%22).

## Geen beveiligingsaudit

Preflight spoort veelvoorkomende fouten met grote impact op met snelle patrooncontroles. Een schoon rapport betekent dat geen van de controles iets heeft gevonden, niet dat je app veilig is. Gebruik het als een veiligheidsgordel, niet als vervanging voor een review.

## Veelgestelde vragen

**Stuurt Preflight mijn code ergens heen?**

Nee. Preflight draait volledig op je eigen machine, doet geen netwerkverkeer en verzamelt geen telemetrie. Je code verlaat je computer nooit.

**Betekent een score van 100/100 dat mijn app veilig is?**

Nee. Het betekent alleen dat geen van de controles van Preflight een probleem heeft gevonden. Zie de sectie [Geen beveiligingsaudit](#geen-beveiligingsaudit) voor meer details.

**Hoe schakel ik een false positive uit?**

Gebruik `// preflight-ignore <check-id>` op de betreffende regel of `--ignore <check-id>` bij het uitvoeren van Preflight. Open ook een GitHub-issue met het label of de titel "False positive", zodat de controle verbeterd kan worden.

**Welke stacks begrijpt het?**

Preflight kan de bestanden van elk project scannen, maar de controles werken het best met Next.js, Vite, Supabase, Stripe, Express en gewone HTML.

**Waarom wordt een gesymlinkt bestand niet gecontroleerd?**

Symbolische links worden bewust overgeslagen, zowel bestanden als mappen. Ze volgen kan in een lus terechtkomen — een map die naar zichzelf linkt eindigt nooit — en kan bestanden buiten het project lezen dat je Preflight vroeg te scannen. Een `.env` die een symlink is naar een bestand elders wordt daarom niet gemeld; kopieer het naar binnen, of wijs de controle naar de map waar het echt staat. De opmerking bij `walk` in `src/project.js` zegt hetzelfde naast de code.

## Licentie

[MIT](../LICENSE). Gratis voor elk gebruik.

## Bijdragers

Bedankt aan iedereen die Preflight beter heeft gemaakt! 💛

<a href="https://github.com/erdellll/preflight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=erdellll/preflight" alt="Preflight contributors" />
</a>
