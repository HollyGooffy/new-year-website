import { questConfig } from '../quest.config'
import { ActionButton } from './ActionButton'
import { Snowfall } from './Snowfall'

type StartScreenProps = { onStart: () => void }

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <main className="screen-enter landing-shell flex min-h-screen items-center justify-center">
      <Snowfall />
      <section className="landing-card w-full max-w-6xl">
        <div className="landing-hero grid min-h-screen items-center px-7 py-10 sm:grid-cols-2 sm:px-[10vw] sm:py-14">
          <div className="relative z-10 text-center sm:text-left">
            <p className="landing-red mb-4 font-bold uppercase tracking-[.25em] text-3xl">
              Christmas quest
            </p>
            <p className="landing-red mt-4 text-2xl font-bold">10 секретных находок</p>
            <p className="mt-4 max-w-sm text-xl leading-relaxed text-slate-600">
              {questConfig.intro}
            </p>
            <ActionButton onClick={onStart} className="mt-7 px-8 py-3">
              НАЧАТЬ
            </ActionButton>
          </div>
          <div className="flex justify-center sm:justify-end">
            <div className="tree">
              <span className="tree-star">✦</span>
              <div className="tree-layer one" />
              <div className="tree-layer two" />
              <div className="tree-layer three" />
              <div className="tree-garland one" />
              <div className="tree-garland two" />
              <div className="tree-garland three" />
              <div className="tree-trunk" />
              <div className="present left" />
              <div className="present right" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
