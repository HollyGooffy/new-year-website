# Новогодний квест

Мобильный праздничный веб-квест на React, TypeScript и Tailwind CSS.

Пользователь находит бумажки с кодами по вопросам-подсказкам, вводит коды в любом порядке, а затем проходит отдельный экран расшифровки. Коды выстраиваются в правильной последовательности и постепенно превращаются в итоговое послание.

## Запуск

Требуется Node.js и pnpm.

```bash
pnpm install
pnpm dev
```

Для production-сборки:

```bash
pnpm build
pnpm preview
```

## Проверка кода

```bash
pnpm lint
pnpm run format
pnpm run format:check
```

## Настройка нового квеста

Весь контент квеста находится в одном файле:

```text
src/quest.config.ts
```

Там можно изменить:

- название праздника;
- вступительный текст;
- текст подсказки;
- ключ шифра;
- вопросы;
- слова итогового сообщения;
- порядок слов.

Пример элемента:

```ts
{
  plain: 'S',
  word: 'С',
  question: 'Где я начинаю свой рабочий день?',
  order: 1,
}
```

Код бумажки генерируется автоматически из поля `plain` с помощью шифра Виженера. Для каждой новой бумажки нужно использовать уникальное значение `plain`, состоящее из латинских букв A–Z.

## Структура проекта

```text
src/
├── components/
│   ├── ActionButton.tsx  # Общая кнопка
│   ├── CodeInput.tsx     # Поле ввода кода
│   ├── DecodeScreen.tsx  # Экран расшифровки
│   ├── QuestScreen.tsx   # Вопросы и ввод кодов
│   ├── Snowfall.tsx      # Canvas-анимация снега
│   └── StartScreen.tsx   # Стартовый экран
├── lib/
│   └── quest.ts          # Шифрование, словарь и localStorage
├── index.css             # Tailwind и праздничные стили
├── main.tsx              # Состояние приложения и flow экранов
└── quest.config.ts       # Настройки конкретного квеста
```

## Технологии

- React
- TypeScript / TSX
- Vite
- Tailwind CSS
- ESLint
- Prettier
- Canvas API для падающего снега
- Google Fonts: Mountains of Christmas и Cormorant Garamond

Прогресс сохраняется в `localStorage` под ключом `questCodes`.
