import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import api from '../services/api'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

interface GamesContextData {
  games: Game[]
}

const GamesContext = createContext({} as GamesContextData)

interface GamesProviderProps {
  children: ReactNode
}

export function GamesProvider({ children }: GamesProviderProps) {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const getGames = async () => {
      try {
        const { data } = await api.get<Game[]>('/games')
        setGames(data)
      } catch (error) {
        setGames([])
      }
    }
    getGames()
  }, [])

  return <GamesContext.Provider value={{ games }}>{children}</GamesContext.Provider>
}

export const useGames = (): GamesContextData => {
  const { games } = useContext(GamesContext)
  return { games }
}
