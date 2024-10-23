export type Lang = 'en' | 'es'

export interface LangText {
  es: string
  en: string
}

export interface BingoGame {
  id: number
  dateGame: string
  day: string
  hour: string
  week: number
  year: number
  description: string
  quantity_cartons: number
  figure_1: boolean
  amount_figure_1: number
  winner_1: boolean
  figure_2: boolean
  amount_figure_2: number
  winner_2: boolean
  figure_3: boolean
  amount_figure_3: number
  winner_3: boolean
  figure_4: boolean
  amount_figure_4: number
  winner_4: boolean
  figure_5: boolean
  amount_figure_5: number
  winner_5: boolean
  figure_6: boolean
  amount_figure_6: number
  winner_6: boolean
  player_cartons: number
  finished: boolean
  points_to_distribute: number
  started: boolean
  idRQ: string | null
  advertising: string | null
  ballot_advertising: number
  all_trivia: boolean
  trivia_category: string | null
  users: unknown[]
  trivias: unknown[]
}

interface Game {
  id: number
  dateGame: string // ISO date string format
  day: string // Day of the week
  hour: string // Time in 'HH:mm:ss' format
  week: number
  year: number
  title: string
  points: number
  start: boolean
  end: boolean
  level: string
  idRQ: string | null // Nullable field
  startVideo: string
  created_at: string // ISO date string format
  category: string | null // Nullable field
}

// This would represent an array of games
export type Games = Game[]
