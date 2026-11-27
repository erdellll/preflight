<div align="center">

# ✈️ Preflight

**Czy Twoja aplikacja stworzona przy użyciu vibe codingu jest gotowa do uruchomienia? Dowiedz się jednym poleceniem.**

Preflight skanuje Twój projekt w poszukiwaniu wycieków kluczy, otwartych baz danych, niezweryfikowanych płatności i brakujących podstaw uruchomienia, a następnie daje kartę raportu z poprawką dla każdego znaleziska.

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

Bez instalacji, bez konta, bez wywołań sieciowych. Twój kod nigdy nie opuszcza Twojego komputera.

## Dlaczego

Narzędzia AI ułatwiają zbudowanie aplikacji w weekend, i równie łatwo opublikować ją z tajnym kluczem Stripe w pakiecie przeglądarki albo z tabelą Supabase, którą może czytać każdy. Preflight sprawdza błędy, które najbardziej bolą po uruchomieniu, jeszcze przed uruchomieniem.

## Wypróbuj najpierw na uszkodzonej aplikacji

```bash
npx vibe-preflight --demo
```

Skanuje celowo uszkodzoną aplikację demo (wszystkie sekrety są fałszywe), żebyś mógł zobaczyć, jak wygląda raport z błędami.

## Co sprawdza

23 kontrole dzisiaj, w zakresie bezpieczeństwa, niezawodności i podstaw uruchomienia. Zobacz [wszystkie kontrole](rules.md).

| | |
|---|---|
| 🔑 Aktywne sekrety w kodzie klienckim | 🗄️ Tabele Supabase bez zabezpieczeń na poziomie wierszy |
| 📄 Pliki `.env`, które można zatwierdzić | 💳 Webhooki Stripe bez weryfikacji podpisu |
| 🌍 CORS otwarty dla wszystkich witryn | 🚨 Brak monitorowania błędów |
| 🔒 Brak polityki prywatności | 🔗 Brak tytułu, opisu lub obrazu udostępniania |

## Opcje

```bash
npx vibe-preflight [path]          # scan a folder (default: current folder)
npx vibe-preflight --html          # also write a shareable preflight-report.html
npx vibe-preflight --json          # machine-readable output ([JSON format](json.md))
npx vibe-preflight --ignore a,b    # skip checks by id
npx vibe-preflight --fail-on warning   # exit code policy: critical (default) | warning | never
```

Ustaw NO_COLOR=1, aby wyłączyć kolorowe wyjście.

Aby wyciszyć znalezisko wskazujące na wiersz, dodaj `// preflight-ignore <check-id>` w tym wierszu lub w wierszu powyżej. Znalezisko dotyczące całego pliku (zatwierdzony `.env`, niezweryfikowany webhook) wymaga tego samego komentarza w pierwszych pięciu wierszach pliku. Wszystko, co chcesz usunąć w całym projekcie, w tym znaleziska bez pliku, używa `--ignore <check-id>`.

## Użycie w CI

```yaml
- run: npx vibe-preflight --fail-on critical
```

Polecenie kończy się kodem 1, gdy znalezisko osiągnie poziom `--fail-on`, więc wyciek klucza blokuje scalenie.
Zobacz [ci.md](ci.md), aby poznać pełny przepływ pracy.

## Użycie w Claude Code

Preflight jest dostarczany jako wtyczka Claude Code z poleceniem `/preflight`, które uruchamia skanowanie, wyjaśnia wyniki i oferuje naprawianie krytycznych problemów po jednym, pytając przed każdą zmianą.

W Claude Code uruchom:

```text
/plugin marketplace add erdellll/preflight
/plugin install preflight@preflight
```

Następnie wpisz `/preflight` w dowolnym projekcie.

## Dodaj kontrolę w 10 minut

Każda kontrola to jeden mały plik plus dwa przykładowe foldery, jeden, który trzeba oznaczyć, i jeden, który trzeba zostawić w spokoju. Bez kroku budowania, bez zależności. Przeczytaj [CONTRIBUTING.md](../CONTRIBUTING.md) lub wybierz issue oznaczone [`good first issue`](https://github.com/erdellll/preflight/issues?q=is%3Aopen+label%3A%22good+first+issue%22).

## To nie jest audyt bezpieczeństwa

Preflight wykrywa typowe błędy o dużym wpływie za pomocą szybkich kontroli opartych na wzorcach. Czysty raport oznacza, że żadna z jego kontroli się nie uruchomiła, a nie że Twoja aplikacja jest bezpieczna. Używaj go jak pasa bezpieczeństwa, a nie zamiennika przeglądu.

## Najczęściej zadawane pytania

**Czy Preflight wysyła mój kod gdzieś?**

Nie. Preflight działa w całości na Twoim lokalnym komputerze, nie wykonuje wywołań sieciowych i nie zbiera telemetrii. Twój kod nigdy nie opuszcza Twojego komputera.

**Czy wynik 100/100 oznacza, że moja aplikacja jest bezpieczna?**

Nie. Oznacza tylko, że żadna z kontroli Preflight nie wykryła problemu. Więcej szczegółów znajdziesz w sekcji [To nie jest audyt bezpieczeństwa](#to-nie-jest-audyt-bezpieczeństwa).

**Jak wyciszyć fałszywy alarm?**

Użyj `// preflight-ignore <check-id>` w odpowiednim wierszu lub `--ignore <check-id>` podczas uruchamiania Preflight. Otwórz też issue na GitHubie oznaczone lub zatytułowane "False positive", aby kontrolę można było poprawić.

**Jakie stosy rozumie?**

Preflight może skanować pliki dowolnego projektu, ale jego kontrole najlepiej działają z Next.js, Vite, Supabase, Stripe, Express i zwykłym HTML.

**Dlaczego plik z dowiązaniem symbolicznym nie jest sprawdzany?**

Dowiązania symboliczne są pomijane celowo — zarówno pliki, jak i foldery. Podążanie za nimi może zapętlić się — folder połączony sam ze sobą nigdy się nie kończy — i może odczytać pliki spoza projektu, który poprosiłeś Preflight o przeskanowanie. Dlatego `.env`, który jest dowiązaniem symbolicznym do pliku w innym miejscu, nie jest zgłaszany; skopiuj go do projektu lub skieruj kontrolę na folder, w którym naprawdę się znajduje. Komentarz do `walk` w `src/project.js` mówi to samo obok kodu.

## Licencja

[MIT](../LICENSE). Bezpłatne do dowolnego użytku.

## Współtwórcy

Dziękujemy wszystkim, którzy sprawili, że Preflight jest lepszy! 💛

<a href="https://github.com/erdellll/preflight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=erdellll/preflight" alt="Preflight contributors" />
</a>
