import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import GuessesBoard from '../components/guesses-board'
import Game from '../components/game'


export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>IMDB w/ friends</title>
        </Head>
        <Container>
          <Intro />
          <Game startName="Natalie Portman" 
            startUrl="https://www.imdb.com/name/nm0000204" 
            startImageUrl="https://m.media-amazon.com/images/M/MV5BYzU0ZGRhZWItMGJlNy00YzlkLWIzOWYtNDA2NzlhMDg3YjMwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg" 
            endName="Mila Kunis" 
            endUrl="https://www.imdb.com/name/nm0005109" 
            endImageUrl="https://m.media-amazon.com/images/M/MV5BODQyNTQyNzY4MV5BMl5BanBnXkFtZTcwODg5MDA3MQ@@._V1_FMjpg_UX1000_.jpg" />
          <GuessesBoard startName="Natalie Portman" 
            startUrl="https://www.imdb.com/name/nm0000204" 
            startImageUrl="https://m.media-amazon.com/images/M/MV5BYzU0ZGRhZWItMGJlNy00YzlkLWIzOWYtNDA2NzlhMDg3YjMwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg" 
            endName="Mila Kunis" 
            endUrl="https://www.imdb.com/name/nm0005109" 
            endImageUrl="https://m.media-amazon.com/images/M/MV5BODQyNTQyNzY4MV5BMl5BanBnXkFtZTcwODg5MDA3MQ@@._V1_FMjpg_UX1000_.jpg"  />
        </Container>
      </Layout>
    </>
  )
}


