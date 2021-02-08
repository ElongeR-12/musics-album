import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'
const Musics = () => {
  const { dataMusic, isLoading } = useGlobalContext()
  if (isLoading) {
    return <div className='loading'></div>
  }
  return (
    <section className='musics'>
      {dataMusic.map((music) => {
        const { id,title_short,album} = music
        return (
          <Link to={`/musics/${id}`} key={id} className='music'>
            <article>
              <img src={album.cover} alt={title_short} />
              <div className='music-info'>
                <h4 className='title'>{title_short}</h4>
              </div>
            </article>
          </Link>
        )
      })}
    </section>
  )
}

export default Musics
