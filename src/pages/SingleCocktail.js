import React, {useEffect, useState, useCallback} from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const [loading, setLoading] = useState(true)
  const {id} = useParams()
  const [cocktail, setCocktail] = useState(null)

  const getCocktailById = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json()
      const {drinks} = data
      if (drinks) {
        const {strDrink:name, strCategory:category, strAlcoholic:info, strGlass:glass, strInstructions:instructions, 
               strDrinkThumb:image, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5} = drinks[0]
  
        const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5]
  
        const newCocktail = {name, category, info, glass, image, instructions, ingredients}
              
        setCocktail(newCocktail)
      
      } else {
        // setCocktail(null)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  },[id])

  useEffect(() => {
    getCocktailById()
  },[id, getCocktailById])

  if(loading) return <Loading/>
  if (cocktail===null){
    return <h2 className='section-title'>no cocktail to display</h2>
  }else {
    const {name, info, glass, instructions, image, ingredients, category} = cocktail
    console.log(cocktail);
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>back home</Link>
        <h2 className='section-title'>{name} </h2>
        <div className="drink">
          <img src={image} alt={name}/>
          <div className="drink-info">
            <p><span className='drink-data'>name :</span> {name}</p>
            <p><span className='drink-data'>category :</span> {category}</p>
            <p><span className='drink-data'>info :</span> {info}</p>
            <p><span className='drink-data'>glass :</span> {glass}</p>
            <p><span className='drink-data'>instructions :</span> {instructions}</p>
            <p><span className='drink-data'>ingredients :</span>
               {ingredients.map((ingredient, index) =>{return <span key={index}>{ingredient}</span>} )}
            </p>
          </div>
        </div>
      </section>
    )
  } 
}

export default SingleCocktail
