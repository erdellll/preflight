<div align="center">

# ✈️ Preflight

**La tua app creata con il vibe coding è pronta per il lancio? Scoprilo con un comando.**

Preflight analizza il tuo progetto alla ricerca di chiavi trapelate, database aperti, pagamenti non verificati e dei fondamentali del lancio mancanti, e poi ti fornisce una scheda di report con una correzione per ogni risultato.

[![License: MIT](https://img.shields.io/badge/license-MIT-34d399.svg)](../LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A520-38bdf8.svg)](../package.json)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-fbbf24.svg)](../CONTRIBUTING.md)
[![npm version](https://img.shields.io/npm/v/vibe-preflight)](https://www.npmjs.com/package/vibe-preflight)
[![npm downloads](https://img.shields.io/npm/dm/vibe-preflight)](https://www.npmjs.com/package/vibe-preflight)
[![CI](https://github.com/erdellll/preflight/actions/workflows/ci.yml/badge.svg)](https://github.com/erdellll/preflight/actions/workflows/ci.yml)

![Preflight report card](assets/report-card.png)

</div>

```bash
npx vibe-preflight
```

Nessuna installazione, nessun account, nessuna chiamata di rete. Il tuo codice non lascia mai la tua macchina.

## Perché

Gli strumenti di IA rendono facile creare un'app in un fine settimana, e altrettanto facile pubblicarla con la tua chiave segreta Stripe nel bundle del browser o con una tabella Supabase che chiunque può leggere. Preflight verifica gli errori che fanno più male dopo il lancio, prima del lancio.

## Provala prima su un'app rotta

```bash
npx vibe-preflight --demo
```

Scansiona un'app demo deliberatamente rotta (tutti i segreti sono falsi) per vedere come appare un report con errori.

## Cosa verifica

23 verifiche oggi, tra sicurezza, affidabilità e fondamentali del lancio. Vedi [tutte le verifiche](rules.md).

| | |
|---|---|
| 🔑 Segreti attivi nel codice client | 🗄️ Tabelle Supabase senza sicurezza a livello di riga |
| 📄 File `.env` che possono essere committati | 💳 Webhook Stripe senza verifica della firma |
| 🌍 CORS aperto a tutti i siti web | 🚨 Nessun monitoraggio degli errori |
| 🔒 Nessuna informativa sulla privacy | 🔗 Titolo, descrizione o immagine di condivisione mancanti |

## Opzioni

```bash
npx vibe-preflight [path]          # scan a folder (default: current folder)
npx vibe-preflight --html          # also write a shareable preflight-report.html
npx vibe-preflight --json          # machine-readable output ([JSON format](json.md))
npx vibe-preflight --ignore a,b    # skip checks by id
npx vibe-preflight --fail-on warning   # exit code policy: critical (default) | warning | never
```

Imposta NO_COLOR=1 per disattivare l'output colorato.

Per silenziare un risultato che punta a una riga, aggiungi `// preflight-ignore <check-id>` su quella riga o sulla riga sopra. Un risultato che riguarda un intero file (un `.env` committato, un webhook non verificato) richiede lo stesso commento nelle prime cinque righe del file. Tutto ciò che vuoi rimuovere in tutto il progetto, inclusi i risultati senza file, usa `--ignore <check-id>`.

## Usalo in CI

```yaml
- run: npx vibe-preflight --fail-on critical
```

Il comando termina con il codice 1 quando un risultato raggiunge il livello `--fail-on`, quindi una chiave trapelata blocca il merge.
Vedi [ci.md](ci.md) per un flusso di lavoro completo.

## Usalo in Claude Code

Preflight è distribuito come plugin di Claude Code con un comando `/preflight` che esegue la scansione, spiega i risultati e offre di correggere i problemi critici uno alla volta, chiedendo prima di ogni modifica.

In Claude Code, esegui:

```text
/plugin marketplace add erdellll/preflight
/plugin install preflight@preflight
```

Poi digita `/preflight` in qualsiasi progetto.

## Aggiungi una verifica in 10 minuti

Ogni verifica è un piccolo file più due cartelle di esempio, una che deve essere segnalata e una che deve essere lasciata in pace. Nessun passaggio di build, nessuna dipendenza. Leggi [CONTRIBUTING.md](../CONTRIBUTING.md) oppure scegli un issue con l'etichetta [`good first issue`](https://github.com/erdellll/preflight/issues?q=is%3Aopen+label%3A%22good+first+issue%22).

## Non è un audit di sicurezza

Preflight individua errori comuni e ad alto impatto con verifiche rapide basate su modelli. Un report pulito significa che nessuna delle sue verifiche si è attivata, non che la tua app è sicura. Usalo come una cintura di sicurezza, non come sostituto di una revisione.

## Domande frequenti

**Preflight invia il mio codice da qualche parte?**

No. Preflight gira interamente sulla tua macchina locale, non fa chiamate di rete e non raccoglie telemetria. Il tuo codice non lascia mai il tuo computer.

**Un punteggio di 100/100 significa che la mia app è sicura?**

No. Significa solo che nessuna verifica di Preflight ha rilevato un problema. Vedi la sezione [Non è un audit di sicurezza](#non-è-un-audit-di-sicurezza) per maggiori dettagli.

**Come faccio a silenziare un falso positivo?**

Usa `// preflight-ignore <check-id>` sulla riga interessata oppure `--ignore <check-id>` quando esegui Preflight. Apri anche un issue su GitHub con l'etichetta o il titolo "False positive" così la verifica può essere migliorata.

**Quali stack comprende?**

Preflight può scansionare i file di qualsiasi progetto, ma le sue verifiche funzionano meglio con Next.js, Vite, Supabase, Stripe, Express e HTML semplice.

**Perché un file con collegamento simbolico non viene verificato?**

I collegamenti simbolici vengono ignorati di proposito, sia file che cartelle. Seguirli può creare un ciclo — una cartella collegata a sé stessa non finisce mai — e può leggere file al di fuori del progetto che hai chiesto a Preflight di scansionare. Un `.env` che è un collegamento simbolico a un file altrove non viene quindi segnalato; copialo nel progetto oppure punta la verifica alla cartella che lo contiene davvero. Il commento su `walk` in `src/project.js` dice la stessa cosa accanto al codice.

## Licenza

[MIT](../LICENSE). Gratuito per qualsiasi uso.

## Collaboratori

Grazie a tutte le persone che hanno reso Preflight migliore! 💛

<a href="https://github.com/erdellll/preflight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=erdellll/preflight" alt="Preflight contributors" />
</a>
