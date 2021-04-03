import React, {useContext } from 'react'
import useFetch from './useFetch'
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const {  isLoading,query,setQuery, setIndex, musics } = useFetch()
  return (
    <AppContext.Provider value={{  isLoading,query,setQuery, setIndex, musics }}>
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
