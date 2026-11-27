<div align="center">

# ✈️ Preflight

**क्या आपका vibe-coded ऐप लॉन्च के लिए तैयार है? सिर्फ़ एक कमांड में जानें।**

Preflight आपके प्रोजेक्ट को स्कैन करता है और लीक हुई API keys, खुले डेटाबेस, बिना सत्यापन वाले पेमेंट और लॉन्च से जुड़ी ज़रूरी कमियों की जाँच करता है। इसके बाद यह हर समस्या के समाधान के साथ एक रिपोर्ट कार्ड देता है।

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

इसे इंस्टॉल करने, अकाउंट बनाने या नेटवर्क कनेक्शन की ज़रूरत नहीं है। आपका कोड कभी भी आपके कंप्यूटर से बाहर नहीं जाता।

## यह क्यों ज़रूरी है?

AI टूल्स की मदद से अब एक वीकेंड में ऐप बनाना आसान हो गया है। लेकिन उतनी ही आसानी से Stripe की secret key ब्राउज़र कोड में या Supabase की ऐसी टेबल में जा सकती है जिसे कोई भी पढ़ सकता है।

Preflight ऐसी गलतियों की जाँच करता है जो ऐप लॉन्च होने के बाद बड़ी समस्याएँ पैदा कर सकती हैं, ताकि आप लॉन्च से पहले उन्हें ठीक कर सकें।

## पहले किसी खराब ऐप पर इसे आज़माएँ

```bash
npx vibe-preflight --demo
```

यह जानबूझकर खराब बनाए गए एक डेमो ऐप को स्कैन करता है। इसमें सभी secrets नकली हैं। इससे आप देख सकते हैं कि समस्याओं वाली रिपोर्ट कैसी दिखाई देती है।

## यह किन चीज़ों की जाँच करता है?

आज इसमें सुरक्षा, विश्वसनीयता और लॉन्च की बुनियादी बातों से जुड़ी कुल 23 जाँचें हैं। [सभी जाँचें यहाँ देखें](rules.md)।

| | |
|---|---|
| 🔑 Client-side कोड में मौजूद Live Secrets | 🗄️ Row-Level Security के बिना Supabase Tables |
| 📄 ऐसी `.env` फाइलें जिन्हें Git में Commit किया जा सकता है | 💳 Signature Verification के बिना Stripe Webhooks |
| 🌍 सभी वेबसाइटों के लिए खुला CORS | 🚨 Error Monitoring का न होना |
| 🔒 Privacy Policy का न होना | 🔗 Title, Description या Share Image का न होना |

## विकल्प

```bash
npx vibe-preflight [path]          # scan a folder (default: current folder)
npx vibe-preflight --html          # also write a shareable preflight-report.html
npx vibe-preflight --json          # machine-readable output ([JSON format](json.md))
npx vibe-preflight --ignore a,b    # skip checks by id
npx vibe-preflight --fail-on warning   # exit code policy: critical (default) | warning | never
```

रंगीन आउटपुट बंद करने के लिए `NO_COLOR=1` सेट करें।

किसी लाइन की ओर इशारा करने वाली finding को उस लाइन पर या उसके ठीक ऊपर `// preflight-ignore <check-id>` लिखकर शांत करें। पूरी फ़ाइल से जुड़ी finding (कमिट की गई `.env`, बिना सत्यापन वाला webhook) के लिए वही टिप्पणी फ़ाइल की पहली पाँच लाइनों में लिखें। प्रोजेक्ट में हर जगह हटाने के लिए, बिना फ़ाइल वाली findings सहित, `--ignore <check-id>` का उपयोग करें।

## CI में इसका उपयोग करें

```yaml
- run: npx vibe-preflight --fail-on critical
```

जब कोई Finding निर्धारित `--fail-on` स्तर तक पहुँचती है, तो कमांड Exit Code 1 देता है। इसका मतलब है कि अगर कोई Secret Leak होता है, तो Merge रुक सकता है। पूरा वर्कफ़्लो देखने के लिए [docs/ci.md](ci.md) देखें।

## Claude Code के अंदर इसका उपयोग करें

Preflight एक Claude Code प्लगइन के रूप में आता है, जिसमें `/preflight` कमांड है जो स्कैन चलाता है, परिणाम समझाता है और हर बदलाव से पहले पूछकर, एक-एक करके गंभीर समस्याओं को ठीक करने की पेशकश करता है।

Claude Code में ये कमांड चलाएँ:

```text
/plugin marketplace add erdellll/preflight
/plugin install preflight@preflight
```

इसके बाद किसी भी प्रोजेक्ट में `/preflight` टाइप करें।

## 10 मिनट में एक नई जाँच जोड़ें

हर जाँच एक छोटी फ़ाइल और दो उदाहरण फ़ोल्डरों से बनती है — एक जिसे उसे फ़्लैग करना चाहिए और एक जिसे उसे छोड़ देना चाहिए। कोई बिल्ड स्टेप नहीं, कोई डिपेंडेंसी नहीं।

[CONTRIBUTING.md](../CONTRIBUTING.md) पढ़ें या [`good first issue`](https://github.com/erdellll/preflight/issues?q=is%3Aopen+label%3A%22good+first+issue%22) लेबल वाले Issues में से कोई एक चुनें।

## यह Security Audit नहीं है

Preflight तेज़ Pattern Checks की मदद से सामान्य और अधिक प्रभाव डालने वाली गलतियों को पकड़ता है।

अगर रिपोर्ट में कोई समस्या नहीं दिखाई देती, तो इसका मतलब केवल इतना है कि इसकी किसी जाँच में समस्या नहीं मिली। इसका यह मतलब नहीं है कि आपका ऐप पूरी तरह सुरक्षित है।

इसे एक Seatbelt की तरह इस्तेमाल करें, न कि Security Review के विकल्प के रूप में।

## अक्सर पूछे जाने वाले प्रश्न

**क्या Preflight मेरा कोड कहीं भेजता है?**

नहीं। Preflight पूरी तरह आपकी लोकल मशीन पर चलता है, कोई नेटवर्क कॉल नहीं करता और कोई टेलीमेट्री इकट्ठा नहीं करता। आपका कोड कभी आपके कंप्यूटर से बाहर नहीं जाता।

**क्या 100/100 स्कोर का मतलब है कि मेरा ऐप सुरक्षित है?**

नहीं। इसका मतलब सिर्फ़ इतना है कि Preflight की किसी जाँच में कोई समस्या नहीं मिली। अधिक जानकारी के लिए [यह Security Audit नहीं है](#यह-security-audit-नहीं-है) अनुभाग देखें।

**मैं किसी गलत पॉज़िटिव (false positive) को कैसे शांत करूँ?**

प्रभावित लाइन पर `// preflight-ignore <check-id>` लिखें या Preflight चलाते समय `--ignore <check-id>` का उपयोग करें। कृपया GitHub पर "False positive" लेबल या शीर्षक वाला issue भी खोलें, ताकि जाँच को सुधारा जा सके।

**यह किन स्टैक्स को समझता है?**

Preflight किसी भी प्रोजेक्ट की फ़ाइलों को स्कैन कर सकता है, लेकिन इसकी जाँचें Next.js, Vite, Supabase, Stripe, Express और सादे HTML के साथ सबसे अच्छी तरह काम करती हैं।

**सिमलिंक वाली फ़ाइल की जाँच क्यों नहीं होती?**

सिम्बॉलिक लिंक्स को जानबूझकर छोड़ दिया जाता है — फ़ाइलें और फ़ोल्डर दोनों। उन्हें फ़ॉलो करने से लूप बन सकता है — अपने आप से लिंक किया गया फ़ोल्डर कभी खत्म नहीं होता — और इससे उस प्रोजेक्ट के बाहर की फ़ाइलें पढ़ी जा सकती हैं जिसे आपने स्कैन करने को कहा है। इसलिए किसी दूसरी जगह की फ़ाइल की ओर इशारा करने वाली `.env` सिमलिंक रिपोर्ट नहीं की जाती; उसे प्रोजेक्ट में कॉपी करें, या जाँच को उस फ़ोल्डर की ओर इशारा करवाएँ जहाँ वह फ़ाइल वास्तव में है। `src/project.js` में `walk` पर टिप्पणी कोड के पास यही बात कहती है।

## लाइसेंस

[MIT](../LICENSE)। किसी भी उपयोग के लिए निःशुल्क।

## योगदानकर्ता

Preflight को बेहतर बनाने वाले सभी लोगों को धन्यवाद! 💛

<a href="https://github.com/erdellll/preflight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=erdellll/preflight" alt="Preflight contributors" />
</a>
