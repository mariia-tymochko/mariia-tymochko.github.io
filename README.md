## Сайт лікаря інтегративної медицини Марії Тимочко

Цей проєкт — статична візитівка, що розгортається на GitHub Pages (`mariia-tymochko.github.io`). Контент редагується через Markdown, логіка — на TypeScript.

### Структура
- `index.html` — каркас сторінки та секції.
- `styles/` — стилі сайту.
- `src/` — TypeScript (збірка у `dist/`).
- `content/` — Markdown-файли, що підтягуються у секції.
- `images/` — зображення.

### Розробка
1. Встановіть залежності: `npm install`
2. Збірка: `npm run build`
3. Локальний перегляд: відкрийте `index.html` у Live Server або будь-якому статичному сервері.
4. Редагуйте Markdown у папці `content/`.

### Деплой на GitHub Pages
Гілка `main` автоматично публікується як сторінка: Settings → Pages → Source: `Deploy from a branch`, Branch: `main` (root).

### Редагування контенту
Кожна секція має атрибут `data-md-src` із шляхом до `.md`. Достатньо оновити відповідний файл у `content/`. Зображення кладіть у `images/` і використовуйте у Markdown як `![](./images/...)` або абсолютним `/images/...`.


