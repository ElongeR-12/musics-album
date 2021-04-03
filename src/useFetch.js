import { useState, useEffect } from 'react'
const mainUrl = `https://api.deezer.com/search?redirect_uri=http%253A%252F%252Fguardian.mashape.com%252Fcallback&rapidapi-key=${process.env.REACT_APP_DEEZER_API_KEY}&q=music&index=0`
const searchUrl = `https://api.deezer.com/search?redirect_uri=http%253A%252F%252Fguardian.mashape.com%252Fcallback&rapidapi-key=${process.env.REACT_APP_DEEZER_API_KEY}`
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [musics, setMusics] = useState([])
  const [index, setIndex] = useState(0)
  const [query, setQuery] = useState('')
  const fetchMusics = async () => {
    setIsLoading(true)
    let url
    let urlPage = `&index=${index}`
    let urlQuery = `&q=${query}`
    if (query) {
      url = `${searchUrl}${urlQuery}${urlPage}`
    } else {
      url = `${mainUrl}`
    }
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${url}`)}`)
      const datas = await response.json();
      const finalData = JSON.parse(datas.contents);
      setMusics((oldMusics) => {
        if (query && index === 0) {
          return finalData.data
        } else if (query) {
          return [...oldMusics, ...finalData.data]
        } else {
          return [...oldMusics, ...finalData.data]
        }
      })
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchMusics()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        (!isLoading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setIndex((oldPage) => {
          return oldPage + 25
        })
      }
    })
    return () => window.removeEventListener('scroll', event)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { isLoading,query,setQuery,setIndex, musics }
}
export default useFetch
