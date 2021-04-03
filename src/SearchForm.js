import React from 'react'
import { useGlobalContext } from './context'
import { FaSearch } from 'react-icons/fa'
const SearchForm = () => {
  const {query,setQuery,setIndex} = useGlobalContext()
  const handleSubmit = (e) => {
    e.preventDefault()
    setIndex(0)
  }
  return (
    <form className='search-form'>
          <input
            type='text'
            placeholder='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='form-input'
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch/>
          </button>
    </form>
  )
}

export default SearchForm
