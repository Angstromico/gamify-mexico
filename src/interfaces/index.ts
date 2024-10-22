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
