import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from './useFetch'
const Musics = () => {
  const { musics, isLoading } = useFetch()
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
