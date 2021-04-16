import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const {cocktails, loading} = useGlobalContext()
  if (loading) {
    return <Loading></Loading>
  }
  if (cocktails.length === 0) {
    return (
      <h2 className='section-title'>No hay resultados para la búsqueda</h2>
    )
  }
  return (
    <section className='section'>
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((cocktail) => {
          const {id} = cocktail
          return (
            <Cocktail key={id} {...cocktail}/>
          )
        })}
      </div>
    </section>
  )
}

export default CocktailList
