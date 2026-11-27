<div align="center">

# ✈️ Preflight

**Ứng dụng vibe-coded của bạn đã sẵn sàng ra mắt chưa? Tìm hiểu chỉ với một lệnh.**

Preflight quét dự án của bạn để tìm khóa bị rò rỉ, cơ sở dữ liệu mở, thanh toán chưa được xác minh và các bước cơ bản còn thiếu trước khi ra mắt, rồi đưa ra một phiếu báo cáo kèm cách khắc phục cho mỗi phát hiện.

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

Không cần cài đặt, không cần tài khoản, không gọi mạng. Mã của bạn không bao giờ rời khỏi máy của bạn.

## Tại sao

Các công cụ AI giúp bạn dễ dàng xây dựng một ứng dụng trong một cuối tuần, và cũng dễ dàng phát hành nó với khóa bí mật Stripe nằm trong bundle trình duyệt hay một bảng Supabase mà ai cũng đọc được. Preflight kiểm tra những lỗi gây thiệt hại lớn nhất sau khi ra mắt, trước khi bạn ra mắt.

## Thử trước trên một ứng dụng bị lỗi

```bash
npx vibe-preflight --demo
```

Quét một ứng dụng demo bị cố tình làm hỏng (mọi bí mật đều là giả) để bạn thấy một báo cáo lỗi trông như thế nào.

## Preflight kiểm tra gì

23 kiểm tra cho đến nay, bao gồm bảo mật, độ tin cậy và các bước cơ bản trước khi ra mắt. Xem [tất cả các kiểm tra](rules.md).

| | |
|---|---|
| 🔑 Khóa live trong mã client | 🗄️ Bảng Supabase không có row-level security |
| 📄 Tệp `.env` có thể bị commit | 💳 Webhook Stripe không kiểm tra chữ ký |
| 🌍 CORS mở cho mọi trang web | 🚨 Không có giám sát lỗi |
| 🔒 Không có chính sách bảo mật | 🔗 Thiếu tiêu đề, mô tả hoặc ảnh chia sẻ |

## Tùy chọn

```bash
npx vibe-preflight [path]          # scan a folder (default: current folder)
npx vibe-preflight --html          # also write a shareable preflight-report.html
npx vibe-preflight --json          # machine-readable output ([JSON format](json.md))
npx vibe-preflight --ignore a,b    # skip checks by id
npx vibe-preflight --fail-on warning  # exit code policy: critical (default) | warning | never
```

Đặt NO_COLOR=1 để tắt đầu ra có màu.

Tắt một phát hiện trỏ tới một dòng bằng `// preflight-ignore <check-id>` trên dòng đó hoặc dòng phía trên. Một phát hiện về cả một tệp (một `.env` đã commit, một webhook chưa được xác minh) dùng cùng chú thích đó trong năm dòng đầu của tệp. Mọi thứ bạn muốn loại bỏ trên toàn dự án, kể cả các phát hiện không có tệp, dùng `--ignore <check-id>`.

## Dùng trong CI

```yaml
- run: npx vibe-preflight --fail-on critical
```

Lệnh kết thúc với mã thoát 1 khi một phát hiện đạt mức `--fail-on`, vì vậy một khóa bị rò rỉ sẽ chặn merge.

Xem [docs/ci.md](ci.md) để biết quy trình đầy đủ.

## Dùng trong Claude Code

Preflight được cung cấp dưới dạng plugin Claude Code với lệnh `/preflight` chạy quá trình quét, giải thích kết quả và đề nghị sửa từng vấn đề nghiêm trọng một, hỏi trước mỗi thay đổi.

Trong Claude Code, hãy chạy:

```text
/plugin marketplace add erdellll/preflight
/plugin install preflight@preflight
```

Sau đó gõ `/preflight` trong bất kỳ dự án nào.

## Thêm một kiểm tra trong 10 phút

Mỗi kiểm tra là một tệp nhỏ cộng với hai thư mục ví dụ: một thư mục mà kiểm tra phải gắn cờ và một thư mục mà nó phải để yên. Không có bước build, không có dependency. Hãy đọc [CONTRIBUTING.md](../CONTRIBUTING.md), hoặc chọn một issue được gắn nhãn [`good first issue`](https://github.com/erdellll/preflight/issues?q=is%3Aopen+label%3A%22good+first+issue%22).

## Không phải là kiểm toán bảo mật

Preflight phát hiện các lỗi phổ biến, có tác động lớn bằng các kiểm tra mẫu nhanh. Một báo cáo sạch có nghĩa là không có kiểm tra nào phát hiện vấn đề, chứ không phải ứng dụng của bạn an toàn. Hãy dùng nó như dây an toàn, không phải thay cho việc review.

## Câu hỏi thường gặp

**Preflight có gửi mã của tôi đi đâu không?**

Không. Preflight chạy hoàn toàn trên máy cục bộ của bạn, không thực hiện cuộc gọi mạng nào và không thu thập telemetry. Mã của bạn không bao giờ rời khỏi máy tính của bạn.

**Điểm 100/100 có nghĩa là ứng dụng của tôi an toàn không?**

Không. Nó chỉ có nghĩa là không có kiểm tra nào của Preflight phát hiện vấn đề. Xem phần [Không phải là kiểm toán bảo mật](#không-phải-là-kiểm-toán-bảo-mật) để biết thêm chi tiết.

**Làm thế nào để tắt một false positive?**

Dùng `// preflight-ignore <check-id>` trên dòng bị ảnh hưởng hoặc `--ignore <check-id>` khi chạy Preflight. Hãy mở thêm một issue GitHub được gắn nhãn hoặc có tiêu đề "False positive" để kiểm tra có thể được cải thiện.

**Nó hiểu những stack nào?**

Preflight có thể quét tệp của bất kỳ dự án nào, nhưng các kiểm tra của nó hoạt động tốt nhất với Next.js, Vite, Supabase, Stripe, Express và HTML thuần.

**Tại sao một tệp symlink không được kiểm tra?**

Các liên kết tượng trưng (symbolic link) được bỏ qua một cách có chủ đích, cả tệp và thư mục. Theo dõi chúng có thể gây vòng lặp — một thư mục liên kết tới chính nó sẽ không bao giờ kết thúc — và có thể đọc các tệp ngoài dự án mà bạn yêu cầu Preflight quét. Do đó, một `.env` là symlink tới một tệp ở nơi khác sẽ không được báo cáo; hãy sao chép nó vào, hoặc trỏ kiểm tra tới thư mục thực sự chứa nó. Chú thích về `walk` trong `src/project.js` cũng nói điều tương tự ngay bên cạnh mã.

## Giấy phép

[MIT](../LICENSE). Miễn phí cho mọi mục đích sử dụng.

## Những người đóng góp

Cảm ơn tất cả mọi người đã giúp Preflight tốt hơn! 💛

<a href="https://github.com/erdellll/preflight/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=erdellll/preflight" alt="Preflight contributors" />
</a>
