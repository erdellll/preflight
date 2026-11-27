<div align="center">

# ✈️ Preflight

**আপনার ভাইব-কোডেড অ্যাপ কি লঞ্চের জন্য প্রস্তুত? একটি কমান্ডেই জেনে নিন।**

Preflight আপনার প্রজেক্ট স্ক্যান করে ফাঁস হওয়া কী, খোলা ডাটাবেস, যাচাই না করা পেমেন্ট এবং লঞ্চের জন্য প্রয়োজনীয় মৌলিক বিষয়গুলো খুঁজে বের করে, তারপর প্রতিটি ত্রুটির সমাধানসহ একটি রিপোর্ট কার্ড দেয়।

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

কোনো ইনস্টল নয়, কোনো অ্যাকাউন্ট নয়, কোনো নেটওয়ার্ক কল নয়। আপনার কোড কখনোই আপনার মেশিন ছাড়ে না।

## কেন

AI টুলগুলো এক সপ্তাহান্তে একটি অ্যাপ বানানো সহজ করে দেয়, আর ঠিক ততটাই সহজ করে দেয় আপনার Stripe সিক্রেট কী ব্রাউজার বান্ডেলে রেখে বা এমন একটি Supabase টেবিল দিয়ে তা লঞ্চ করা যা যে কেউ পড়তে পারে। Preflight লঞ্চের পর সবচেয়ে বেশি ক্ষতি করে এমন ভুলগুলো লঞ্চের আগেই পরীক্ষা করে।

## প্রথমে একটি ভাঙা অ্যাপে চেষ্টা করে দেখুন

```bash
npx vibe-preflight --demo
```

ইচ্ছাকৃতভাবে ভাঙা একটি ডেমো অ্যাপ স্ক্যান করে (প্রতিটি সিক্রেটই ভুয়া), যাতে আপনি দেখতে পান একটি ব্যর্থ রিপোর্ট কেমন দেখায়।

## এটি কী পরীক্ষা করে

23টি পরীক্ষা আজ, নিরাপত্তা, নির্ভরযোগ্যতা এবং লঞ্চের মৌলিক বিষয়গুলো জুড়ে। [সব পরীক্ষা](rules.md) দেখুন।

| | |
|---|---|
| 🔑 ক্লায়েন্ট কোডে লাইভ সিক্রেট | 🗄️ row-level security ছাড়া Supabase টেবিল |
| 📄 কমিট করা যায় এমন `.env` ফাইল | 💳 স্বাক্ষর যাচাই ছাড়া Stripe ওয়েবহুক |
| 🌍 প্রতিটি ওয়েবসাইটের জন্য খোলা CORS | 🚨 কোনো এরর মনিটরিং নেই |
| 🔒 কোনো গোপনীয়তা নীতি নেই | 🔗 শিরোনাম, বর্ণনা বা শেয়ার ছবি অনুপস্থিত |

## অপশন

```bash
npx vibe-preflight [path]          # scan a folder (default: current folder)
npx vibe-preflight --html          # also write a shareable preflight-report.html
npx vibe-preflight --json          # machine-readable output ([JSON format](json.md))
npx vibe-preflight --ignore a,b    # skip checks by id
npx vibe-preflight --fail-on warning  # exit code policy: critical (default) | warning | never
```

রঙিন আউটপুট বন্ধ করতে NO_COLOR=1 সেট করুন।

একটি লাইনের দিকে নির্দেশ করা ত্রুটি বন্ধ করতে সেই লাইনে বা তার উপরের লাইনে `// preflight-ignore <check-id>` লিখুন। একটি পুরো ফাইল সম্পর্কে ত্রুটি (কমিট করা একটি `.env`, যাচাই না করা একটি ওয়েবহুক) ফাইলের প্রথম পাঁচ লাইনে একই মন্তব্য পায়। প্রজেক্টজুড়ে যা কিছু সরাতে চান, ফাইল ছাড়া ত্রুটিসহ, তা `--ignore <check-id>` দিয়ে করুন।

## CI-তে ব্যবহার করুন

```yaml
- run: npx vibe-preflight --fail-on critical
```

একটি ত্রুটি `--fail-on` স্তরে পৌঁছালে কমান্ডটি এক্সিট কোড 1 দিয়ে শেষ হয়, তাই একটি ফাঁস হওয়া কী মার্জ আটকে দেয়।

সম্পূর্ণ ওয়ার্কফ্লো দেখতে [docs/ci.md](ci.md) দেখুন।

## Claude Code-এর ভিতরে ব্যবহার করুন

Preflight একটি Claude Code প্লাগইন হিসেবে আসে, যার `/preflight` কমান্ড স্ক্যান চালায়, ফলাফল ব্যাখ্যা করে এবং প্রতিটি পরিবর্তনের আগে জিজ্ঞেস করে গুরুতর সমস্যাগুলো একে একে ঠিক করার প্রস্তাব দেয়।

Claude Code-এ চালান:

```text
/plugin marketplace add erdellll/preflight
/plugin install preflight@preflight
```

তারপর যেকোনো প্রজেক্টে `/preflight` টাইপ করুন।

## 10 মিনিটে একটি পরীক্ষা যোগ করুন

প্রতিটি পরীক্ষা একটি ছোট ফাইল এবং দুটি উদাহরণ ফোল্ডার: একটি যেটিকে পরীক্ষাটি ফ্ল্যাগ করতেই হবে এবং একটি যেটিকে সে ছেড়ে দেবে। কোনো বিল্ড ধাপ নেই, কোনো ডিপেন্ডেন্সি নেই। [CONTRIBUTING.md](../CONTRIBUTING.md) পড়ুন, অথবা [`good first issue`](https://github.com/erdellll/preflight/issues?q=is%3Aopen+label%3A%22good+first+issue%22) লেবেলযুক্ত একটি ইস্যু বেছে নিন।

## এটি কোনো নিরাপত্তা অডিট নয়

Preflight দ্রুত প্যাটার্ন পরীক্ষা দিয়ে সাধারণ, বড় প্রভাবের ভুলগুলো ধরে। একটি পরিষ্কার রিপোর্ট মানে এর কোনো পরীক্ষাই কিছু পায়নি, আপনার অ্যাপ নিরাপদ তা নয়। এটিকে রিভিউয়ের বিকল্প হিসেবে নয়, সিটবেল্ট হিসেবে ব্যবহার করুন।

## প্রায়শই জিজ্ঞাসিত প্রশ্ন

**Preflight কি আমার কোড কোথাও পাঠায়?**

না। Preflight সম্পূর্ণভাবে আপনার নিজের মেশিনে চলে, কোনো নেটওয়ার্ক কল করে না এবং কোনো টেলিমেট্রি সংগ্রহ করে না। আপনার কোড কখনোই আপনার কম্পিউটার ছাড়ে না।

**100/100 স্কোর কি আমার অ্যাপ নিরাপদ বোঝায়?**

না। এর মানে শুধু এই যে Preflight-এর কোনো পরীক্ষাই সমস্যা পায়নি। আরও বিস্তারিত জানতে [এটি কোনো নিরাপত্তা অডিট নয়](#এটি-কোনো-নিরাপত্তা-অডিট-নয়) বিভাগটি দেখুন।

**আমি কীভাবে একটি false positive নীরব করব?**

প্রভাবিত লাইনে `// preflight-ignore <check-id>` ব্যবহার করুন বা Preflight চালানোর সময় `--ignore <check-id>` ব্যবহার করুন। এছাড়া "False positive" লেবেল বা শিরোনাম দিয়ে একটি GitHub ইস্যু খুলুন, যাতে পরীক্ষাটি উন্নত করা যায়।

**এটি কোন স্ট্যাকগুলো বোঝে?**

Preflight যেকোনো প্রজেক্টের ফাইল স্ক্যান করতে পারে, তবে এর পরীক্ষাগুলো Next.js, Vite, Supabase, Stripe, Express এবং সাধারণ HTML-এর সাথে সবচেয়ে ভালো কাজ করে।

**একটি সিমলিংক করা ফাইল কেন পরীক্ষা করা হয় না?**

সিম্বলিক লিংক (symbolic link) ইচ্ছাকৃতভাবে এড়িয়ে যাওয়া হয়, ফাইল এবং ফোল্ডার উভয়ই। এগুলো অনুসরণ করলে লুপে পড়তে পারে — নিজের সাথে লিংক করা একটি ফোল্ডার কখনো শেষ হয় না — এবং আপনি Preflight-কে যে প্রজেক্ট স্ক্যান করতে বলেছেন তার বাইরের ফাইল পড়তে পারে। তাই অন্য কোথাও থাকা একটি ফাইলের সিমলিংক হওয়া `.env` রিপোর্ট করা হয় না; এটি ভিতরে কপি করুন, অথবা পরীক্ষাটিকে সেই ফোল্ডারের দিকে নির্দেশ করুন যেখানে এটি আসলে আছে। `src/project.js`-এ `walk`-এর পাশের মন্তব্যটি কোডের পাশেই একই কথা বলে।

## লাইসেন্স

[MIT](../LICENSE)। যেকোনো ব্যবহারের জন্য বিনামূল্যে।

## অবদানকারী

Preflight-কে আরও ভালো করতে যারা সাহায্য করেছেন, সবাইকে ধন্যবাদ! 💛

<a href="https://github.com/erdellll/preflight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=erdellll/preflight" alt="Preflight contributors" />
</a>
