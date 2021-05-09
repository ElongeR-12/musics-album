import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from './context'
import {FaArrowAltCircleUp} from 'react-icons/fa'
import useFetch from './useFetch'
const Musics = () => {
  const { musics, isLoading } = useFetch()
  const {isError,isMatch,upTo} = useGlobalContext()
  if(isError){
    return(
      <div className="error-showed">
          <h4>error found, we are sorry for that...</h4>
          <h5>Please retry later</h5>
      </div>
    )
  }
  if(!isMatch){
    return(<h3 className='musics-loading'>No results match your search criteria...</h3>)
  }
  return (
    <section className='musics'>
      {musics.map((music, index) => {
        const { id,title_short,album} = music
        return (
          <Link to={`/musics/${id}`} key={index} className='music'>
            <article>
              <img src={album.cover} alt={title_short} />
              <div className='music-info'>
                <h4 className='title'>{title_short}</h4>
              </div>
            </article>
          </Link>
        )
      })}
      {isLoading && <h2 className='musics-loading'>Loading...</h2>}
      <button className='arrow' onClick={upTo}>
        <FaArrowAltCircleUp size={28}></FaArrowAltCircleUp>
      </button>
      </section>
  )
}

export default Musics
