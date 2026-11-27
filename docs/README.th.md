<div align="center">

# ✈️ Preflight

**แอปที่สร้างด้วย vibe coding ของคุณพร้อมเปิดตัวหรือยัง? หาคำตอบได้ด้วยคำสั่งเดียว**

Preflight สแกนโปรเจกต์ของคุณเพื่อหาคีย์ที่หลุดออกมา ฐานข้อมูลที่เปิดอยู่ การชำระเงินที่ยังไม่ได้ยืนยัน และพื้นฐานการเปิดตัวที่ขาดหายไป จากนั้นจะให้รายงานพร้อมวิธีแก้ไขสำหรับทุกข้อที่พบ

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

ไม่ต้องติดตั้ง ไม่ต้องมีบัญชี ไม่มีการเรียกเครือข่าย โค้ดของคุณไม่เคยออกจากเครื่องของคุณ

## ทำไม

เครื่องมือ AI ทำให้สร้างแอปได้ในหนึ่งสุดสัปดาห์ และก็ทำให้เผลอปล่อยคีย์ลับ Stripe ไว้ในบันเดิลของเบราว์เซอร์ หรือตาราง Supabase ที่ใครก็อ่านได้ง่ายพอ ๆ กัน Preflight ตรวจสอบข้อผิดพลาดที่สร้างความเสียหายมากที่สุดหลังเปิดตัว ก่อนที่คุณจะเปิดตัว

## ลองใช้กับแอปที่เสียก่อน

```bash
npx vibe-preflight --demo
```

สแกนแอปสาธิตที่ตั้งใจทำให้เสีย (ความลับทุกอย่างเป็นของปลอม) เพื่อให้คุณเห็นว่ารายงานที่ล้มเหลวมีหน้าตาอย่างไร

## ตรวจสอบอะไรบ้าง

23 การตรวจสอบในวันนี้ ครอบคลุมความปลอดภัย ความน่าเชื่อถือ และพื้นฐานการเปิดตัว ดู [การตรวจสอบทั้งหมด](rules.md)

| | |
|---|---|
| 🔑 คีย์ลับที่ใช้งานจริงในโค้ดฝั่งไคลเอนต์ | 🗄️ ตาราง Supabase ที่ไม่มี row-level security |
| 📄 ไฟล์ `.env` ที่อาจถูกคอมมิตได้ | 💳 เว็บฮุก Stripe ที่ไม่มีการตรวจสอบลายเซ็น |
| 🌍 CORS ที่เปิดให้ทุกเว็บไซต์ | 🚨 ไม่มีการตรวจสอบข้อผิดพลาด |
| 🔒 ไม่มีนโยบายความเป็นส่วนตัว | 🔗 ไม่มีชื่อ คำอธิบาย หรือภาพสำหรับแชร์ |

## ตัวเลือก

```bash
npx vibe-preflight [path]          # scan a folder (default: current folder)
npx vibe-preflight --html          # also write a shareable preflight-report.html
npx vibe-preflight --json          # machine-readable output ([JSON format](json.md))
npx vibe-preflight --ignore a,b    # skip checks by id
npx vibe-preflight --fail-on warning   # exit code policy: critical (default) | warning | never
```

ตั้งค่า NO_COLOR=1 เพื่อปิดการแสดงผลสี

ปิดเสียงข้อที่พบซึ่งชี้ไปที่บรรทัดหนึ่งด้วย `// preflight-ignore <check-id>` บนบรรทัดนั้นหรือบรรทัดข้างบน ข้อที่พบเกี่ยวกับไฟล์ทั้งไฟล์ (ไฟล์ `.env` ที่ถูกคอมมิต เว็บฮุกที่ยังไม่ได้ยืนยัน) ใช้คอมเมนต์เดียวกันนี้ในห้าบรรทัดแรกของไฟล์ สิ่งใดก็ตามที่คุณต้องการเอาออกทั้งโปรเจกต์ รวมถึงข้อที่พบที่ไม่มีไฟล์เลย ให้ใช้ `--ignore <check-id>`

## ใช้ใน CI

```yaml
- run: npx vibe-preflight --fail-on critical
```

คำสั่งจะจบด้วยรหัสออก 1 เมื่อข้อที่พบถึงระดับ `--fail-on` ดังนั้นคีย์ที่หลุดจะบล็อกการเมิร์จ

ดู [docs/ci.md](ci.md) สำหรับเวิร์กโฟลว์ฉบับเต็ม

## ใช้ใน Claude Code

Preflight มาพร้อมปลั๊กอิน Claude Code ที่มีคำสั่ง `/preflight` ซึ่งรันการสแกน อธิบายผลลัพธ์ และเสนอแก้ไขปัญหาสำคัญทีละข้อ โดยถามก่อนทุกการเปลี่ยนแปลง

ใน Claude Code ให้รัน:

```text
/plugin marketplace add erdellll/preflight
/plugin install preflight@preflight
```

จากนั้นพิมพ์ `/preflight` ในโปรเจกต์ใดก็ได้

## เพิ่มการตรวจสอบใน 10 นาที

การตรวจสอบแต่ละรายการคือไฟล์เล็ก ๆ หนึ่งไฟล์บวกโฟลเดอร์ตัวอย่างสองโฟลเดอร์ โฟลเดอร์หนึ่งที่ต้องถูกแจ้งเตือน และอีกโฟลเดอร์หนึ่งที่ต้องปล่อยไว้ ไม่ต้องมีขั้นตอนบิลด์ ไม่ต้องมี dependencies อ่าน [CONTRIBUTING.md](../CONTRIBUTING.md) หรือเลือก issue ที่มีป้าย [`good first issue`](https://github.com/erdellll/preflight/issues?q=is%3Aopen+label%3A%22good+first+issue%22)

## ไม่ใช่การตรวจสอบความปลอดภัย

Preflight จับข้อผิดพลาดที่พบบ่อยและส่งผลกระทบสูงด้วยการตรวจสอบรูปแบบที่รวดเร็ว รายงานที่สะอาดหมายความว่าไม่มีการตรวจสอบใดของ Preflight ทำงาน ไม่ได้หมายความว่าแอปของคุณปลอดภัย ใช้มันเป็นเข็มขัดนิรภัย ไม่ใช่สิ่งทดแทนการตรวจสอบ

## คำถามที่พบบ่อย

**Preflight ส่งโค้ดของฉันไปที่ไหนหรือไม่?**

ไม่ Preflight ทำงานทั้งหมดบนเครื่องของคุณ ไม่มีการเรียกเครือข่าย และไม่เก็บข้อมูลการใช้งาน โค้ดของคุณไม่เคยออกจากคอมพิวเตอร์ของคุณ

**คะแนน 100/100 หมายความว่าแอปของฉันปลอดภัยหรือไม่?**

ไม่ หมายความเพียงว่าไม่มีการตรวจสอบใดของ Preflight ตรวจพบปัญหา ดูหัวข้อ [ไม่ใช่การตรวจสอบความปลอดภัย](#ไม่ใช่การตรวจสอบความปลอดภัย) สำหรับรายละเอียดเพิ่มเติม

**ฉันจะปิดเสียง false positive ได้อย่างไร?**

ใช้ `// preflight-ignore <check-id>` บนบรรทัดที่ได้รับผลกระทบ หรือ `--ignore <check-id>` เมื่อรัน Preflight โปรดเปิด issue บน GitHub ที่มีป้ายหรือชื่อ "False positive" ด้วย เพื่อให้สามารถปรับปรุงการตรวจสอบได้

**มันเข้าใจสแต็กใดบ้าง?**

Preflight สามารถสแกนไฟล์ของโปรเจกต์ใดก็ได้ แต่การตรวจสอบของมันทำงานได้ดีที่สุดกับ Next.js, Vite, Supabase, Stripe, Express และ HTML ธรรมดา

**ทำไมไฟล์ที่มี symlink จึงไม่ถูกตรวจสอบ?**

ลิงก์สัญลักษณ์จะถูกข้ามโดยเจตนา ทั้งไฟล์และโฟลเดอร์ การติดตามลิงก์อาจวนซ้ำ — โฟลเดอร์ที่ลิงก์มาที่ตัวมันเองไม่มีวันจบ — และอาจอ่านไฟล์นอกโปรเจกต์ที่คุณขอให้ Preflight สแกน ไฟล์ `.env` ที่เป็น symlink ไปยังไฟล์ที่อื่นจึงไม่ถูกรายงาน ให้คัดลอกเข้ามา หรือชี้การตรวจสอบไปยังโฟลเดอร์ที่มีไฟล์นั้นจริง ๆ คอมเมนต์บน `walk` ใน `src/project.js` กล่าวเช่นเดียวกันข้างโค้ด

## สัญญาอนุญาต

[MIT](../LICENSE) ใช้ได้ฟรีทุกกรณี

## ผู้ร่วมพัฒนา

ขอบคุณทุกคนที่ทำให้ Preflight ดีขึ้น! 💛

<a href="https://github.com/erdellll/preflight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=erdellll/preflight" alt="Preflight contributors" />
</a>
