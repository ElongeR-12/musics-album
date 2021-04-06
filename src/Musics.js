import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from './context'
import useFetch from './useFetch'
const Musics = () => {
  const { musics, isLoading } = useFetch()
  const {isError} = useGlobalContext()
  if(isError){
    return(<h2 className='musics-loading'>ERROR</h2>)
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
      </section>
  )
}

export default Musics
