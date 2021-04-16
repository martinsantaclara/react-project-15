import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState([])

  const getDrinks = useCallback(async () => {
    setLoading(true)
    const response = await fetch(`${url}${searchTerm}`)
    const data = await response.json()
    const {drinks} = data // destructuracion - dame el atributo drinks de data, que es un array de objetos
    try {
      if (drinks){
        const newCocktails = drinks.map((drink) => {
          const {
            idDrink:id, strDrink:name, strAlcoholic:info, strGlass:glass, strDrinkThumb:image} = drink
          return {id, name, info, glass, image}
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  },[searchTerm])

  useEffect(() => {
    getDrinks()
  }, [searchTerm, getDrinks])

  return <AppContext.Provider value={{loading,setLoading,cocktails,searchTerm,setSearchTerm}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
