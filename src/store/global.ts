import { create } from 'zustand'

type State = {
    html: string
    css: string
    js: string
    specificityExplanation: string
}
type Action = {
    updateHtml: (html: string) => void
    updateCss: (css: string) => void
    updateJs: (js: string) => void
    updateSpecificityExplanation: (specificityExplanation: string) => void
}

export const globalStore = create<State & Action>((set) => ({
    html: '',
    css: '',
    js: '',
    specificityExplanation: '',
    updateHtml: (html) => set(() => ({ html: html })),
    updateCss: (css) => set(() => ({ css: css })),    
    updateJs: (js) => set(() => ({ js: js })),
    updateSpecificityExplanation: (specificityExplanation) => set(() => ({ specificityExplanation: specificityExplanation })),
  }))
