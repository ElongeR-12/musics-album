import React, {useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'
import { useParams, Link } from 'react-router-dom'
const API_ENDPOINT_TRACK = "https://deezerdevs-deezer.p.rapidapi.com/track/"
const REACT_APP_DEEZER_API = process.env.REACT_APP_DEEZER_API_KEY
const SingleMusic = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [dataSingleMusic, setDataSingleMusic] = useState(null)
  const fetchMusic = async (url) => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const datas= await response.json()
      if (datas) {
        setDataSingleMusic(datas.data || datas)
        setError({ show: false, msg: '' })
      } else {
        setError({ show: true, msg: datas.Error })
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
      fetchMusic(`${API_ENDPOINT_TRACK}${id}/?rapidapi-key=${REACT_APP_DEEZER_API}`)
  }, [id])

  if (isLoading) {
    return <div className='loading'></div>
  }
  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to='/' className='btn'>
          back to musics
        </Link>
      </div>
    )
  }
  const {title_short, artist, duration, album, preview } = dataSingleMusic
  return (
    <section className='single-music'>
      <Helmet>
        <title>ElongeDev | {title_short} by {artist} details with {duration} of preview</title>
      </Helmet>
      <div>
        <h2> Music details</h2>
        <img src={album.cover} alt={title_short} />
      </div>
      
      <div className='single-music-info'>
        <h3>{title_short}</h3>
        <h4>Artist: {artist.name}</h4>
        <h4>Album: {album.title}</h4>
        <h5>Duration: {duration} s</h5>
        <figure>
            <figcaption>Track preview :</figcaption>
            <audio
                controls
                src={preview}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
        </figure>
        <Link to='/' className='btn'>
          back home
        </Link>
      </div>
    </section>
  )
}

export default SingleMusic
