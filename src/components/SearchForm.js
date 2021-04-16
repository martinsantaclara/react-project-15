import React, {useRef, useEffect} from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext()
  const refSearch = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const searchCocktail = () => {
    setSearchTerm(refSearch.current.value) // no controlled inputs
  }

  useEffect(() => {
    refSearch.current.focus()
    setSearchTerm(refSearch.current.value) // no controlled inputs
  })

  return (
    <section className='section-search'>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search you favorite cocktail</label>
          <input  type="text"
                  name='name'
                  id='name'
                  ref={refSearch}
                  onChange={searchCocktail}/> 
          {/* <input  type="text"
                  name='name'
                  id='name'
                  ref={refSearch}
                  value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value)}}/>  */}
        </div>
      </form>
    </section>
  )
}

export default SearchForm
