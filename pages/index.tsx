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
import StartGame from '../components/start-game'
import gamePairs from '../public/assets/pairs.js';
import React, {useState} from 'react';


export default function Index() {

  const [start, setStart] = useState(null)
  //useState({"startName": "Natalie Portman", "startUrl": "https://www.imdb.com/name/nm0000204" , "startImageUrl": "https://m.media-amazon.com/images/M/MV5BYzU0ZGRhZWItMGJlNy00YzlkLWIzOWYtNDA2NzlhMDg3YjMwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg" });
  const [end, setEnd] = useState(null)
  //useState({"endName": "Mila Kunis" , "endUrl": "https://www.imdb.com/name/nm0005109" , "endImageUrl": "https://m.media-amazon.com/images/M/MV5BODQyNTQyNzY4MV5BMl5BanBnXkFtZTcwODg5MDA3MQ@@._V1_FMjpg_UX1000_.jpg" });
  const [ready, setReady] = useState(false);

  function getPair() {
      let ran = Math.floor(Math.random() * 6976);
      let arr = gamePairs.pairs[ran].split(" ");
      getActor(arr[0], true);
      getActor(arr[1], false);
  }

  function generateData() {
    getPair();
    setReady(true);
  }

  function noImage(imageUrl) {
    return imageUrl.includes("imdb_logo.png");
  }

  function getActor(actor, isStart) {
    let url = "https://www.imdb.com/name/" + actor; 
    fetch(url, {
          mode: 'no-cors',
          headers: {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'Origin, Content-Type, Accept'}
        }).then(response => { 
          return response.text();
        }).then(html => { 
          console.log(hmtl)
          let n = getName(html);
          let i = getImage(html);
          if (n && i) {
            if (isStart) {
              setStart({"startName": n, "startUrl": url, "startImageUrl": i});
            } else {
              setEnd({"endName": n, "endUrl": url, "endImageUrl": i});
            }
          }
        })
  }

  function getName(html) {
    // <meta property="og:title" content="Elizabeth Bower - IMDb"/>
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, 'text/html');
      const myMetaElement = dom.querySelector("head meta[property='og:title'][content]");
      if (myMetaElement && myMetaElement instanceof HTMLMetaElement) {
        return (myMetaElement.content.replace(" - IMDb", ""))
      } else {
        console.log('No matching element found');
        console.log(myMetaElement);
        return null;
      }
    }

    function getImage(html) {
      //<meta property="og:image" content="https://m.media-amazon.com/images/M/MV5BZDRhMDZiYzEtZWM2YS00ZTU0LWE4Y2QtMTNmODRiYTc0ZmIxXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_FMjpg_UX1000_.jpg"/>
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, 'text/html');
      const myMetaElement = dom.querySelector("head meta[property='og:image'][content]");
      if (myMetaElement && myMetaElement instanceof HTMLMetaElement) {
        return (myMetaElement.content)
      } else {
        console.log('No matching element found');
        console.log(myMetaElement);
        return null;
      }
    }

  return (
    <>
      <Layout>
        <Head>
          <title>IMDB w/ friends</title>
        </Head>
        <Container>
          <Intro />
          { (ready && start && end) &&
              <span>
              <Game startName={start["startName"]} 
                startUrl={start["startUrl"]} 
                startImageUrl={start["startImageUrl"]} 
                endName={end["endName"]} 
                endUrl={end["endUrl"]} 
                endImageUrl= {end["endImageUrl"]} />
              <GuessesBoard startName={start["startName"]} 
                startUrl={start["startUrl"]} 
                startImageUrl={start["startImageUrl"]} 
                endName={end["endName"]} 
                endUrl={end["endUrl"]} 
                endImageUrl= {end["endImageUrl"]} />
               </span>
         }
         { !ready && <StartGame onClick={generateData} /> }
        </Container>
      </Layout>
    </>
  )
}


