import React, { useState, useContext } from 'react'
import useFetch from './useFetch'
// export const API_ENDPOINT = "https://deezerdevs-deezer.p.rapidapi.com/search?rapidapi-key=0fb5807642mshdb70ba68e07c274p1ca20cjsna090e1309d86"
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('eminem')
  const { isLoading, error, dataMusic } = useFetch(`&q=${query}`)

  return (
    <AppContext.Provider value={{ isLoading, error, dataMusic, query, setQuery }}>
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
