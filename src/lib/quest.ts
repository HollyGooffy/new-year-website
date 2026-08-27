import { QuestItem, questConfig } from '../quest.config'

export const STORAGE_KEY = 'questCodes'
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export type Dictionary = Record<string, QuestItem & { code: string }>

export const encrypt = (text: string, key = questConfig.cipherKey): string =>
  [...text]
    .map((char, index) => {
      const value = ALPHABET.indexOf(char)
      if (value < 0) return char
      return ALPHABET[(value + ALPHABET.indexOf(key[index % key.length])) % ALPHABET.length]
    })
    .join('')

export const dictionary: Dictionary = Object.fromEntries(
  questConfig.items.map((item) => {
    const code = encrypt(item.plain)
    return [code, { ...item, code }]
  }),
)

export const allEntries = Object.values(dictionary).sort((a, b) => a.order - b.order)

export const readSavedCodes = (): string[] => {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) && saved.every((code) => typeof code === 'string') ? saved : []
  } catch {
    return []
  }
}
