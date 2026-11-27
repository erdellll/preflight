<div align="center">

# ✈️ Preflight

**هل تطبيقك الذي بنيته بمساعدة الذكاء الاصطناعي جاهز للإطلاق؟ اكتشف ذلك بأمر واحد.**

يفحص Preflight مشروعك بحثا عن المفاتيح المسربة وقواعد البيانات المفتوحة والمدفوعات غير المتحقق منها وأساسيات الإطلاق الناقصة، ثم يعطيك بطاقة تقرير مع إصلاح لكل نتيجة.

[![License: MIT](https://img.shields.io/badge/license-MIT-34d399.svg)](../LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A520-38bdf8.svg)](../package.json)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-fbbf24.svg)](../CONTRIBUTING.md)
[![npm version](https://img.shields.io/npm/v/vibe-preflight)](https://www.npmjs.com/package/vibe-preflight)
[![npm downloads](https://img.shields.io/npm/dm/vibe-preflight)](https://www.npmjs.com/package/vibe-preflight)
[![CI](https://github.com/erdellll/preflight/actions/workflows/ci.yml/badge.svg)](https://github.com/erdellll/preflight/actions/workflows/ci.yml)

![بطاقة تقرير Preflight](assets/report-card.png)

</div>

```bash
npx vibe-preflight
```

بدون تثبيت، بدون حساب، بدون أي اتصال بالشبكة. لا يغادر كودك جهازك أبدا.

## لماذا

أدوات الذكاء الاصطناعي تجعل بناء تطبيق في عطلة نهاية أسبوع أمرا سهلا، وتجعل شحنه بمفتاح Stripe السري داخل حزمة المتصفح أو بجدول Supabase يستطيع أي شخص قراءته أمرا سهلا بالقدر نفسه. يفحص Preflight الأخطاء التي تؤلم أكثر بعد الإطلاق، قبل أن تطلق.

## جرّبه أولا على تطبيق معطّل

```bash
npx vibe-preflight --demo
```

يفحص تطبيقا تجريبيا معطّلا عمدا (كل الأسرار فيه مزيفة) لترى كيف يبدو تقرير فاشل.

## ماذا يفحص

23 فحصا اليوم، عبر الأمن والموثوقية وأساسيات الإطلاق. انظر [كل الفحوصات](rules.md).

| | |
|---|---|
| 🔑 أسرار نشطة في كود العميل | 🗄️ جداول Supabase بدون أمان على مستوى الصف |
| 📄 ملفات `.env` قابلة للتثبيت في المستودع | 💳 ويبهوكات Stripe بدون التحقق من التوقيع |
| 🌍 CORS مفتوح لكل المواقع | 🚨 لا مراقبة للأخطاء |
| 🔒 لا سياسة خصوصية | 🔗 عنوان أو وصف أو صورة مشاركة ناقصة |

## الخيارات

```bash
npx vibe-preflight [path]          # scan a folder (default: current folder)
npx vibe-preflight --html          # also write a shareable preflight-report.html
npx vibe-preflight --json          # machine-readable output ([JSON format](json.md))
npx vibe-preflight --ignore a,b    # skip checks by id
npx vibe-preflight --fail-on warning   # exit code policy: critical (default) | warning | never
```

عيّن `NO_COLOR=1` لإيقاف الإخراج الملون.

أسكت نتيجة تشير إلى سطر بوضع `// preflight-ignore <check-id>` على ذلك السطر أو السطر الذي فوقه. أما النتيجة التي تخص ملفا كاملا (ملف `.env` مثبّت، ويبهوك غير متحقق منه) فتأخذ التعليق نفسه في الأسطر الخمسة الأولى من الملف. وأي شيء تريد إزالته على مستوى المشروع كله، بما فيه النتائج التي لا ملف لها، فيستخدم `--ignore <check-id>`.

## استخدامه في CI

```yaml
- run: npx vibe-preflight --fail-on critical
```

ينتهي الأمر برمز الخروج 1 عندما تبلغ نتيجة مستوى `--fail-on`، فيمنع مفتاح مسرب الدمج.
انظر [docs/ci.md](ci.md) للاطلاع على سير عمل كامل.

## استخدامه داخل Claude Code

يأتي Preflight كإضافة لـ Claude Code مع أمر `/preflight` يشغّل الفحص، ويشرح النتائج، ويعرض إصلاح المشكلات الحرجة واحدة تلو الأخرى، ويسأل قبل كل تغيير.

في Claude Code، نفّذ:

```text
/plugin marketplace add erdellll/preflight
/plugin install preflight@preflight
```

ثم اكتب `/preflight` في أي مشروع.

## أضف فحصا في 10 دقائق

كل فحص هو ملف صغير واحد مع مجلدي مثال، أحدهما يجب الإبلاغ عنه والآخر يجب تركه. لا خطوة بناء، لا تبعيات. اقرأ [CONTRIBUTING.md](../CONTRIBUTING.md)، أو اختر قضية تحمل الوسم [`good first issue`](https://github.com/erdellll/preflight/issues?q=is%3Aopen+label%3A%22good+first+issue%22).

## ليس تدقيقا أمنيا

يلتقط Preflight الأخطاء الشائعة عالية الأثر بفحوصات سريعة تعتمد على الأنماط. التقرير النظيف يعني أن أيا من فحوصاته لم يُطلق، لا أن تطبيقك آمن. استخدمه كحزام أمان، لا بديلا عن المراجعة.

## الأسئلة الشائعة

**هل يرسل Preflight كودي إلى أي مكان؟**

لا. يعمل Preflight بالكامل على جهازك المحلي، ولا يجري أي اتصال بالشبكة ولا يجمع أي بيانات قياس. لا يغادر كودك جهازك أبدا.

**هل تعني نتيجة 100/100 أن تطبيقي آمن؟**

لا. تعني فقط أن أيا من فحوصات Preflight لم يكتشف مشكلة. انظر قسم [ليس تدقيقا أمنيا](#ليس-تدقيقا-أمنيا) لمزيد من التفاصيل.

**كيف أسكت نتيجة إيجابية كاذبة؟**

استخدم `// preflight-ignore <check-id>` على السطر المتأثر أو `--ignore <check-id>` عند تشغيل Preflight. وافتح أيضا قضية على GitHub تحمل الوسم أو العنوان "False positive" ليتم تحسين الفحص.

**ما الحزم التقنية التي يفهمها؟**

يستطيع Preflight فحص ملفات أي مشروع، لكن فحوصاته تعمل أفضل مع Next.js وVite وSupabase وStripe وExpress وHTML العادي.

**لماذا لا يُفحص ملف مرتبط رمزيا؟**

تُتخطى الروابط الرمزية عمدا، ملفات ومجلدات. فاتباعها قد يدخل في حلقة لا تنتهي — مجلد مرتبط بنفسه لا ينتهي أبدا — وقد يقرأ ملفات خارج المشروع الذي طلبت من Preflight فحصه. لذلك لا يُبلَّغ عن ملف `.env` مرتبط رمزيا بملف في مكان آخر؛ انسخه إلى المشروع، أو وجّه الفحص إلى المجلد الذي يحويه فعلا. والتعليق على `walk` في `src/project.js` يقول الشيء نفسه بجانب الكود.

## الترخيص

[MIT](../LICENSE). مجاني لأي استخدام.

## المساهمون

شكرا لكل من جعل Preflight أفضل! 💛

<a href="https://github.com/erdellll/preflight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=erdellll/preflight" alt="Preflight contributors" />
</a>
