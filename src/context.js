import React, {useContext, useState } from 'react'
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [index, setIndex] = useState(0)
  const [query, setQuery] = useState('music')
  return (
    <AppContext.Provider value={{query,setQuery, index, setIndex}}>
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
