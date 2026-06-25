# 🚀 CodzHub Unified Vercel Deployment Guide | دليل الرفع الموحد على فيرسل

هذا الدليل يشرح كيفية رفع موقع **CodzHub** (الفرونت إند والباك إند معاً كشروع واحد موحد) على منصة **Vercel** دون تعقيدات أو حاجة لقواعد بيانات خارجية، حيث تم تبسيط الباك إند بالكامل ليكون عديم الحالة (Stateless) ومهمته إرسال الإيميلات فورياً.

---

## 📋 1. هيكلية المشروع (Monorepo Structure)
المشروع مبني كـ Monorepo يحتوي على:
*   `apps/web`: تطبيق الفرونت إند (React + Vite + TypeScript).
*   `apps/api`: تطبيق الباك إند (Express + Node + Nodemailer) - بدون قاعدة بيانات.
*   `packages/shared`: الحزمة المشتركة للأنواع والنماذج (TypeScript Shared Models).
*   `vercel.json`: ملف التهيئة الموحد في المجلد الرئيسي لربط الفرونت إند والباك إند في مسار واحد.

---

## 🌐 2. كيفية الرفع الموحد على Vercel (One-Click Deployment)

بفضل ملف `vercel.json` الموجود في الجذر، سيقوم Vercel ببناء الفرونت إند ورفع الباك إند كـ Serverless Function وتوجيه مسارات الـ API تلقائياً تحت نفس الدومين (دون أي مشاكل في الـ CORS أو مشاركة المسارات).

### **خطوات الرفع:**
1. اربط حساب GitHub الخاص بك بمنصة [Vercel](https://vercel.com).
2. اختر **Import Project** وحدد هذا المستودع (Repository).
3. في صفحة الإعدادات قبل الرفع:
   *   **Root Directory:** اتركه فارغاً (الجذر الرئيسي للمستودع `./`). لا تقم باختيار مجلد فرعي.
   *   **Framework Preset:** اختر `Other` أو اتركه يكتشفه تلقائياً.
   *   **Environment Variables:** أضف متغيرات البيئة التالية لإرسال الإيميلات بأمان (انظر القسم 3 بالأسفل).
4. اضغط **Deploy**.
5. بمجرد الانتهاء، ستحصل على رابط واحد يعمل عليه الموقع بالكامل (الفرونت إند، وعند استدعاء `/api/*` يتم توجيهه للباك إند تلقائياً).

---

## 🔑 3. تهيئة متغيرات البيئة (Environment Variables Setup)

يجب عليك إضافة المتغيرات التالية في لوحة تحكم Vercel (تبويب **Settings -> Environment Variables**) لإعداد خادم البريد الصادر:

```env
# 💻 SMTP Server Configuration (إعدادات خادم البريد الصادر)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# 📧 SMTP Authentication (بيانات تسجيل الدخول للبريد الصادر)
# إذا كنت تستخدم Gmail، يجب تفعيل 2-Step Verification وإنشاء App Password واستخدامه هنا
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here

# 📬 Email Routing Config (وجهة البريد الإلكتروني للرسائل القادمة)
# البريد الذي سيظهر كمرسل للرسالة
EMAIL_SENDER="CodzHub Contact Form" <your_email@gmail.com>
# البريد الذي تريد استقبال طلبات العملاء عليه
EMAIL_RECEIVER=receiver_email@gmail.com
```

---

## 🛠️ 4. التشغيل المحلي للمشروع (Local Development)

لتشغيل المشروع بالكامل محلياً للتأكد والمراجعة:

1. قم بتثبيت المكونات من المجلد الرئيسي للمشروع:
   ```bash
   npm install
   ```
2. لتشغيل الفرونت إند والباك إند معاً في بيئة التطوير:
   ```bash
   # تشغيل الفرونت إند على البورت 3000
   npm run dev:web
   
   # تشغيل الباك إند على البورت 3001
   npm run dev:api
   ```
3. لبناء المشروع بالكامل للإنتاج والتأكد من سلامة الأكواد:
   ```bash
   npm run build
   ```

---

## 🔒 5. نصائح أمنية وإرشادية (Production Best Practices)
*   **Gmail SMTP:** لا تضع كلمة مرور بريدك الشخصي الأساسي في متغير `SMTP_PASS`. قم بزيارة [أمان حساب Google](https://myaccount.google.com/security)، وقم بإنشاء **كلمة مرور للتطبيق (App Password)** مخصصة للموقع لتفادي أي مشاكل في تسجيل الدخول من خلال Vercel.
*   **بدون قاعدة بيانات:** الباك إند الآن لا يحتاج لأي مساحة تخزين أو SQLite؛ وبذلك تخلصت تماماً من مشاكل الـ Read-Only وسيرفرات الـ Serverless، وسيتم توجيه الرسائل مباشرة إلى بريدك الإلكتروني بنجاح.
"# CodzHub" 
