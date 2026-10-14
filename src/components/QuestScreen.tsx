import { FormEvent } from 'react'
import { LockKeyhole, RotateCcw } from 'lucide-react'
import { questConfig } from '../quest.config'
import { allEntries, dictionary } from '../lib/quest'
import { ActionButton } from './ActionButton'
import { CodeInput } from './CodeInput'
import { Snowfall } from './Snowfall'

type QuestScreenProps = {
  codes: string[]
  input: string
  running: boolean
  onInput: (value: string) => void
  onAdd: (event: FormEvent<HTMLFormElement>) => void
  onNext: () => void
  onReset: () => void
}

export function QuestScreen({
  codes,
  input,
  running,
  onInput,
  onAdd,
  onNext,
  onReset,
}: QuestScreenProps) {
  return (
    <main className="screen-enter winter-page landing-shell mx-auto min-h-[100svh] max-w-xl px-3 py-6 sm:px-5 sm:py-12">
      <Snowfall />
      <div className="mb-6 text-center sm:mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{questConfig.title}</h1>
        <p className="mt-2 text-base text-slate-600 sm:mt-3 sm:text-lg">{questConfig.questHint}</p>
      </div>
      <section className="winter-card postcard-card rounded-3xl p-4 sm:p-8">
        <form onSubmit={onAdd} className="flex gap-2">
          <CodeInput
            value={input}
            onChange={(event) => onInput(event.target.value)}
            placeholder="Введи код"
            disabled={codes.length === 10 || running}
          />
          <ActionButton
            type="submit"
            className="px-4 font-semibold disabled:opacity-40"
            disabled={codes.length === 10 || running}
          >
            Добавить
          </ActionButton>
        </form>
        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-base font-semibold sm:text-lg">
            Найдено кодов: {codes.length} / 10
          </span>
          <LockKeyhole className="text-amber-500" size={18} />
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-500"
            style={{ width: `${codes.length * 10}%` }}
          />
        </div>
        <div className="mt-6 space-y-3">
          {allEntries.map((entry) => {
            const foundCode = codes.find((code) => dictionary[code]?.order === entry.order)
            return (
              <div
                key={entry.order}
                className="quest-row flex flex-col items-start justify-between gap-2 rounded-xl bg-slate-100 px-3 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-4"
              >
                <div className="text-base leading-snug text-slate-700 sm:text-lg">
                  {entry.question}
                </div>
                <span
                  className={`code-pill shrink-0 self-end rounded-lg px-3 py-2 font-mono text-sm sm:self-auto ${foundCode ? 'font-bold' : 'opacity-60'}`}
                >
                  {foundCode || '—'}
                </span>
              </div>
            )
          })}
        </div>
        {codes.length === 10 && (
          <ActionButton onClick={onNext} className="mt-8 w-full">
            Далее →
          </ActionButton>
        )}
      </section>
      <button
        onClick={onReset}
        className="mx-auto mt-6 flex items-center gap-2 text-sm text-slate-500"
      >
        <RotateCcw size={15} /> Сбросить прогресс
      </button>
    </main>
  )
}
