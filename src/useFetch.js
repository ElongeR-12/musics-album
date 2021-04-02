import { useState, useEffect } from 'react'
const API_ENDPOINT_SEARCH = `https://deezerdevs-deezer.p.rapidapi.com/search?rapidapi-key=${process.env.REACT_APP_DEEZER_API_KEY}`
const useFetch = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [dataMusic, setDataMusic] = useState(null)
  const fetchMusics = async (url) => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const datas = await response.json()
      if (datas.total) {
        setDataMusic(datas.data || datas)
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
    if(urlParams.length>3){
      fetchMusics(`${API_ENDPOINT_SEARCH}${urlParams}`)
    }
  }, [urlParams])
  return { isLoading, error, dataMusic }
}
export default useFetch
