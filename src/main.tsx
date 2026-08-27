/* eslint-disable react-refresh/only-export-components */
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { StartScreen } from './components/StartScreen'
import { QuestScreen } from './components/QuestScreen'
import { DecodeScreen } from './components/DecodeScreen'
import { dictionary, readSavedCodes, STORAGE_KEY } from './lib/quest'
import './index.css'

function App() {
  const [codes, setCodes] = useState<string[]>(readSavedCodes)
  const [started, setStarted] = useState(() => readSavedCodes().length > 0)
  const [input, setInput] = useState('')
  const [revealed, setRevealed] = useState<number[]>([])
  const [running, setRunning] = useState(false)
  const [screen, setScreen] = useState<'quest' | 'decode'>('quest')
  const ordered = useMemo(
    () =>
      codes
        .map((code) => dictionary[code])
        .filter(Boolean)
        .sort((a, b) => a.order - b.order),
    [codes],
  )

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(codes)), [codes])

  const addCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const code = input.trim().toUpperCase()
    if (!code) return
    if (codes.includes(code)) return alert('Такой код уже добавлен')
    if (!dictionary[code]) return alert('Код не найден в словаре')
    setCodes((current) => [...current, code])
    setInput('')
  }

  const decode = () => {
    setRunning(true)
    setRevealed([])
    setTimeout(() => {
      ordered.forEach((entry, index) =>
        setTimeout(() => setRevealed((current) => [...current, index]), index * 650),
      )
      setTimeout(() => setRunning(false), ordered.length * 650 + 500)
    }, 1500)
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    location.reload()
  }
  if (!started) return <StartScreen onStart={() => setStarted(true)} />
  if (screen === 'decode')
    return (
      <DecodeScreen
        codes={codes}
        ordered={ordered}
        revealed={revealed}
        running={running}
        onDecode={decode}
        onReset={reset}
      />
    )
  return (
    <QuestScreen
      codes={codes}
      input={input}
      running={running}
      onInput={setInput}
      onAdd={addCode}
      onNext={() => setScreen('decode')}
      onReset={reset}
    />
  )
}

createRoot(document.getElementById('root')!).render(<App />)
