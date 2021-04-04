import React from 'react'
import Form from './SearchForm'
import Musics from './Musics'
import { Helmet } from 'react-helmet'
const Home = () => {
  return (
    <main>
      <Helmet>
          <title>ElongeDev | Search music and show details with track preview</title>
      </Helmet>
      <Form />
      <Musics/>
    </main>
  )
}

export default Home
