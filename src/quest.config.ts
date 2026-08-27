export type QuestItem = {
  code: string
  word: string
  question: string
  order: number
  plain: string
}

export const questConfig = {
  title: 'Новогодний квест',
  intro:
    'Найди 10 бумажек. На каждой тебя ждёт вопрос-подсказка и код, который нужно ввести на сайте.',
  questHint: 'Найди 10 бумажек с кодами и введи их сюда.',
  cipherKey: 'NOVYI',
  items: [
    { plain: 'S', word: 'С', question: 'Где я начинаю свой рабочий день?', order: 1 },
    { plain: 'NOVYM', word: 'НОВЫМ', question: 'Где обычно появляются новые задачи?', order: 2 },
    { plain: 'GODOM', word: 'ГОДОМ', question: 'Где я храню важные рабочие вещи?', order: 3 },
    { plain: 'MOYA', word: 'МОЯ', question: 'Где можно сделать небольшой перерыв?', order: 4 },
    {
      plain: 'LYUBOV',
      word: 'ЛЮБОВЬ',
      question: 'Где находится моё любимое рабочее место?',
      order: 5,
    },
    { plain: 'TY', word: 'ТЫ', question: 'Где я обычно оставляю личные вещи?', order: 6 },
    { plain: 'SAMAYA', word: 'САМАЯ', question: 'Где можно найти что-то самое нужное?', order: 7 },
    { plain: 'LUCHSHAYA', word: 'ЛУЧШАЯ', question: 'Где я обычно смотрю на время?', order: 8 },
    { plain: 'V', word: 'В', question: 'Где я бываю в течение рабочего дня?', order: 9 },
    { plain: 'MIRE', word: 'МИРЕ', question: 'Где можно найти немного тишины?', order: 10 },
  ],
} as const
