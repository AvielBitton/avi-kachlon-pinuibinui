# עו״ד אבי כחלון - אתר פינוי בינוי

אתר שיווקי לעורך דין המתמחה בליווי בעלי דירות בפרויקטי פינוי-בינוי והתחדשות עירונית.

## 🛠️ טכנולוגיות

- **React 19** + TypeScript
- **Vite** - build tool
- **Tailwind CSS 4** - styling
- **React Router** - routing (HashRouter for GitHub Pages compatibility)

## 📦 התקנה

```bash
# התקנת תלויות
pnpm install
```

## 🔧 פיתוח

```bash
# הרצת סביבת פיתוח
pnpm dev
```

האתר יהיה זמין בכתובת: http://localhost:5173/avi-kachlon-pinuibinui/

## 🔍 סקריפט סריקת פרויקטים

הסקריפט מוריד את רשימת הפרויקטים מאתר קבוצת בראשית ושומר אותם כקובץ JSON:

```bash
# הרצת הסקריפט
pnpm scrape
```

הפלט נשמר ב: `src/data/projects.json`

**הערה:** הסקריפט מבצע parsing מיטבי (best-effort). ייתכן שחלק מהשדות יהיו `null` אם לא נמצאו בעמוד הפרויקט.

### שדות הפרויקט

| שדה | תיאור |
|-----|--------|
| `id` | מזהה ייחודי |
| `slug` | כתובת URL |
| `name` | שם הפרויקט |
| `city` | עיר (אם זוהתה) |
| `address` | כתובת |
| `category` | סוג: פינוי בינוי / הריסה ובנייה / חיזוק ותוספת |
| `status` | סטטוס הפרויקט |
| `apartments_before` | מספר דירות לפני |
| `apartments_after` | מספר דירות אחרי |
| `short_description` | תיאור קצר |
| `raw_details_text` | טקסט גולמי לעריכה עתידית |
| `images` | רשימת תמונות |
| `external_link` | קישור לעמוד המקורי |

## 🏗️ בנייה

```bash
# בניית האתר
pnpm build
```

הפלט נשמר בתיקיית `dist/`.

## 🚀 פריסה ל-GitHub Pages

### הגדרה חד-פעמית

1. **צרו repository ב-GitHub** בשם `avi-kachlon-pinuibinui`

2. **העלו את הקוד:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/avi-kachlon-pinuibinui.git
   git push -u origin main
   ```

3. **הפעילו GitHub Pages:**
   - לכו ל-Settings > Pages
   - תחת "Build and deployment":
     - Source: **GitHub Actions**

4. **ודאו שה-workflow רץ:**
   - לכו ל-Actions
   - ודאו שה-workflow "Deploy to GitHub Pages" הסתיים בהצלחה

### עדכון הקישור (אם שם ה-repo שונה)

אם שם ה-repo שונה מ-`avi-kachlon-pinuibinui`, עדכנו את:

1. `vite.config.ts` - שנו את `base`:
   ```ts
   base: '/YOUR-REPO-NAME/',
   ```

2. `index.html` - עדכנו את הנתיב ל-favicon:
   ```html
   <link rel="icon" type="image/svg+xml" href="/YOUR-REPO-NAME/favicon.svg" />
   ```

### כתובת האתר

לאחר הפריסה, האתר יהיה זמין ב:
```
https://YOUR_USERNAME.github.io/avi-kachlon-pinuibinui/
```

## 📁 מבנה הפרויקט

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   └── favicon.svg             # Favicon
├── scripts/
│   └── scrape-bereshit-projects.ts  # סקריפט סריקה
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Header עם ניווט
│   │   ├── Footer.tsx          # Footer
│   │   └── Layout.tsx          # Layout wrapper
│   ├── data/
│   │   └── projects.json       # נתוני פרויקטים
│   ├── pages/
│   │   ├── HomePage.tsx        # דף הבית
│   │   ├── ProjectsPage.tsx    # רשימת פרויקטים
│   │   └── ProjectDetailsPage.tsx  # דף פרויקט
│   ├── types/
│   │   └── project.ts          # TypeScript types
│   ├── App.tsx                 # Router setup
│   ├── index.css               # Tailwind + custom styles
│   └── main.tsx                # Entry point
├── index.html                  # HTML template
├── package.json
├── tsconfig.json
└── vite.config.ts              # Vite config with base path
```

## 🎨 התאמה אישית

### צבעים
הצבעים מוגדרים ב-`src/index.css` תחת `@theme`. ניתן לשנות את:
- `primary-*` - צבע ראשי (כתום)
- `surface-*` - צבעי רקע (אפור כהה)

### פרטי קשר
עדכנו את פרטי הקשר ב:
- `src/pages/HomePage.tsx` - סקשן Contact
- `src/components/Footer.tsx`

### טופס יצירת קשר
הטופס משתמש ב-[Formspree](https://formspree.io) לקבלת הודעות. כדי לעדכן את כתובת הטופס, שנו את ה-`action` ב-`src/pages/HomePage.tsx`.

### תוכן
כל התוכן בעברית נמצא ב-`src/pages/HomePage.tsx`.

## 📝 רישיון

כל הזכויות שמורות © עו״ד אבי כחלון
