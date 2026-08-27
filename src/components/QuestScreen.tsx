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
    <main className="screen-enter winter-page landing-shell mx-auto min-h-screen max-w-xl px-5 py-10 sm:py-16">
      <Snowfall />
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{questConfig.title}</h1>
        <p className="mt-3 text-lg text-slate-600">{questConfig.questHint}</p>
      </div>
      <section className="winter-card postcard-card rounded-3xl p-5 sm:p-8">
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
        <div className="mt-6 flex items-center justify-between">
          <span className="font-semibold text-lg">Найдено кодов: {codes.length} / 10</span>
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
                className="quest-row flex items-center justify-between gap-4 rounded-xl bg-slate-100 px-4 py-3"
              >
                <div className="text-lg text-slate-700">{entry.question}</div>
                <span
                  className={`code-pill shrink-0 rounded-lg px-3 py-2 font-mono text-sm ${foundCode ? 'font-bold' : 'opacity-60'}`}
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
