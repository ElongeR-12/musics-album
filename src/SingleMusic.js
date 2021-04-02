import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
const API_ENDPOINT_TRACK = "https://deezerdevs-deezer.p.rapidapi.com/track/"
const REACT_APP_DEEZER_API = "0fb5807642mshdb70ba68e07c274p1ca20cjsna090e1309d86"
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
      if (datas.id) {
        setDataSingleMusic([datas])
        setError({ show: false, msg: '' })
      } else {
        setError({ show: true, msg: datas.Error })
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  function refreshpage() {
    window.location.reload()
  }
  useEffect(() => {
      fetchMusic(`${API_ENDPOINT_TRACK}${id}/?rapidapi-key=${REACT_APP_DEEZER_API}`)
  }, [id])
  if (isLoading) {
    return <div className='loading'></div>
  }
  if (error.show) {
    return (
      <section className='single-music'>
          <div className="loading" onLoad={refreshpage()}></div>
      </section>
          
    )
  }
  const {title_short, artist, duration, album, preview } = dataSingleMusic[0]
  return (
    <section className='single-music'>
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
