import { questConfig } from '../quest.config'
import { ActionButton } from './ActionButton'
import { Snowfall } from './Snowfall'

type StartScreenProps = { onStart: () => void }

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <main className="screen-enter landing-shell flex min-h-[100svh] items-center justify-center">
      <Snowfall />
      <section className="landing-card w-full max-w-6xl">
        <div className="landing-hero grid min-h-[100svh] content-center items-center gap-4 px-5 py-8 sm:grid-cols-2 sm:gap-8 sm:px-[8vw] sm:py-14">
          <div className="relative z-10 text-center sm:flex sm:h-[25rem] sm:flex-col sm:justify-end sm:text-left">
            <p className="landing-red mb-3 text-xl font-bold uppercase tracking-[.2em] sm:mb-4 sm:text-3xl sm:tracking-[.25em]">
              Christmas quest
            </p>
            <p className="landing-red mt-3 text-xl font-bold sm:mt-4 sm:text-2xl">
              10 секретных находок
            </p>
            <p className="mx-auto mt-3 max-w-sm text-lg leading-relaxed text-slate-600 sm:mx-0 sm:mt-4 sm:text-xl">
              {questConfig.intro}
            </p>
            <div className="mt-8 hidden sm:block">
              <ActionButton onClick={onStart} className="w-full max-w-sm py-3 md:w-auto md:px-6">
                НАЧАТЬ
              </ActionButton>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center sm:items-end">
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
            <ActionButton onClick={onStart} className="mt-8 w-full py-3 sm:hidden">
              НАЧАТЬ
            </ActionButton>
          </div>
        </div>
      </section>
    </main>
  )
}
