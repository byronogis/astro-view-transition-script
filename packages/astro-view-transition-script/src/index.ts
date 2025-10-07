import type { TransitionBeforePreparationEvent, TransitionBeforeSwapEvent } from 'astro:transitions/client'

/**
 * A utility function to execute a callback that compatibly with Astro's view transitions.
 *
 * @param callback A callback function that receives the current document object.
 *
 * @see https://docs.astro.build/en/guides/view-transitions/#script-behavior-with-view-transitions
 * @see https://docs.astro.build/en/guides/view-transitions/#lifecycle-events
 */
export function withViewTransition(callbacks: {
  /**
   * Called once immediately when the script is executed.
   */
  initial?: (state: WithViewTransitionState) => void
  beforePreparation?: (state: WithViewTransitionState, event: TransitionBeforePreparationEvent) => void
  afterPreparation?: (state: WithViewTransitionState, event: Event) => void
  beforeSwap?: (state: WithViewTransitionState, event: TransitionBeforeSwapEvent) => void
  afterSwap?: (state: WithViewTransitionState, event: Event) => void
  pageLoad?: (state: WithViewTransitionState, event: Event) => void
  /**
   * Excute while DOM is updated.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/updateCallbackDone
   */
  done?: (state: WithViewTransitionState) => void
} = {}): void {
  const {
    initial,
    beforePreparation,
    afterPreparation,
    beforeSwap,
    afterSwap,
    pageLoad,
    done,
  } = callbacks

  const state: WithViewTransitionState = {
    document,
  }

  initial?.(state)

  state.document.addEventListener('astro:before-preparation', (event) => {
    beforePreparation?.(state, event)
  })

  state.document.addEventListener('astro:after-preparation', (event) => {
    afterPreparation?.(state, event)
  })

  state.document.addEventListener('astro:before-swap', (event) => {
    state.document = event.newDocument
    beforeSwap?.(state, event)

    event.viewTransition.updateCallbackDone.then(() => {
      state.document = document
      done?.(state)
    })
  })

  state.document.addEventListener('astro:after-swap', (event) => {
    afterSwap?.(state, event)
  })

  state.document.addEventListener('astro:page-load', (event) => {
    pageLoad?.(state, event)
  })
}

export interface WithViewTransitionState {
  document: Document
}
