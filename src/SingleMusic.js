import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useGlobalContext } from './context'
const API_ENDPOINT_TRACK = "https://deezerdevs-deezer.p.rapidapi.com/track/"
const REACT_APP_DEEZER_API = process.env.REACT_APP_DEEZER_API_KEY
const SingleMusic = () => {
  const {setIndex} = useGlobalContext()
  const history = useHistory()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [dataSingleMusic, setDataSingleMusic] = useState(null)
  function handleClick() {
    history.push("/")
    window.scrollTo(0,0);
    setIndex(0)
  }
  const fetchMusic = async (url) => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const datas= await response.json()
      let finalData = JSON.parse(datas.contents)
      if (finalData.id) {
        setDataSingleMusic([finalData])
        setError({ show: false, msg: '' })
      } else {
        setError({ show: true, msg: finalData.Error })
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
      fetchMusic(`https://api.allorigins.win/get?url=${encodeURIComponent(`${API_ENDPOINT_TRACK}${id}/?rapidapi-key=${REACT_APP_DEEZER_API}`)}`)
  }, [id])
  if (isLoading) {
    return(
        <h2 className='musics-loading single-music-loading'>Loading...</h2>
    )
  }
  if (error.show) {
    return(
        <div className="error-showed">
          <h4>Server error, we are sorry for that...</h4>
          <button className='btn' onClick={handleClick}>
            Back home
          </button>
        </div>
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
        <button className='btn' onClick={handleClick}>
            Back home
        </button>
      </div>
    </section>
  )
}

export default SingleMusic
