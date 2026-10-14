import { LockKeyhole, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { QuestItem } from '../quest.config'
import { ActionButton } from './ActionButton'
import { Snowfall } from './Snowfall'

type OrderedItem = QuestItem & { code: string }
type DecodeScreenProps = {
  codes: string[]
  ordered: OrderedItem[]
  revealed: number[]
  running: boolean
  onDecode: () => void
  onReset: () => void
}

export function DecodeScreen({
  codes,
  ordered,
  revealed,
  running,
  onDecode,
  onReset,
}: DecodeScreenProps) {
  const [displayedCodes, setDisplayedCodes] = useState(codes)
  const startDecode = () => {
    onDecode()
    setTimeout(() => setDisplayedCodes(ordered.map((entry) => entry.code)), 700)
  }
  return (
    <main className="screen-enter winter-page flex min-h-[100svh] flex-col items-center justify-center gap-6 px-3 py-6 sm:px-5 sm:py-10">
      <Snowfall />
      <section className="winter-card w-full max-w-3xl rounded-3xl p-5 text-center sm:p-10">
        <LockKeyhole className="mx-auto mb-4 text-amber-500" size={30} />
        <h1 className="text-2xl font-bold sm:text-4xl">Все коды найдены</h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          Посмотри на них в порядке, в котором ты их находила.
        </p>
        <div className="mt-8 flex w-full flex-wrap justify-center gap-2 overflow-hidden">
          {displayedCodes.map((code, index) => (
            <span
              key={`${code}-${index}`}
              className="code-pill rounded-lg px-3 py-2 font-mono text-sm transition-all duration-700"
            >
              {revealed[index] !== undefined ? ordered[index].word : code}
            </span>
          ))}
        </div>
        {revealed.length === 0 && (
          <ActionButton
            onClick={startDecode}
            disabled={running}
            className="mt-8 w-full px-8 disabled:opacity-60 sm:w-auto"
          >
            🔓 Расшифровать
          </ActionButton>
        )}
        {revealed.length === ordered.length && (
          <p className="mt-8 text-2xl font-bold">{ordered.map((entry) => entry.word).join(' ')}</p>
        )}
      </section>
      <button onClick={onReset} className="flex items-center gap-2 text-sm text-slate-500">
        <RotateCcw size={15} /> Сбросить прогресс
      </button>
    </main>
  )
}
