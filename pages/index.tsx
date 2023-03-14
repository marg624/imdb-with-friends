import Container from '../components/container'
import OptionsButton from '../components/options-button'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import GuessesBoard from '../components/guesses-board'
import Game from '../components/game'
import StartGame from '../components/start-game'
import gamePairs from '../public/assets/pairs.js';
import React, {useState} from 'react';
import { Rings, MutatingDots } from 'react-loader-spinner';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

export default function Index() {

  const { promiseInProgress } = usePromiseTracker();

  const [start, setStart] = useState(null)
  //useState({"startName": "Natalie Portman", "startUrl": "https://www.imdb.com/name/nm0000204" , "startImageUrl": "https://m.media-amazon.com/images/M/MV5BYzU0ZGRhZWItMGJlNy00YzlkLWIzOWYtNDA2NzlhMDg3YjMwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg" });
  const [end, setEnd] = useState(null)
  //useState({"endName": "Mila Kunis" , "endUrl": "https://www.imdb.com/name/nm0005109" , "endImageUrl": "https://m.media-amazon.com/images/M/MV5BODQyNTQyNzY4MV5BMl5BanBnXkFtZTcwODg5MDA3MQ@@._V1_FMjpg_UX1000_.jpg" });
  const [ready, setReady] = useState(false);

  const validIds = 6327;

  function getPair() {
      const searchParams = new URLSearchParams(window.location.search)

      let ran = Math.floor(Math.random() * validIds);
      let arr = gamePairs.pairs[ran].split(" ");
      let start = arr[0];
      let end = arr[1];

      if (searchParams.get('start') && searchParams.get('end')) {
        start = searchParams.get('start');
        end = searchParams.get('end');
      }

      getActor(start, true);
      getActor(end, false);
  } 

 function getPairById(id) {
      if (!gamePairs.pairs[id]) {
        return false;
      } 
      let arr = gamePairs.pairs[id].split(" ");
      getActor(arr[0], true);
      getActor(arr[1], false);
      return true;
  }

  function generateData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let enteredId = urlParams.get('game');
    if (enteredId) {
      let id = parseInt(enteredId)
      if (id && getPairById(id)) {
        setReady(true);
      } else {
        alert("Invalid game id: " + enteredId + "\nEnter a valid game URL or go to home page for a random game.");
      }
    } else {
      getPair();
      setReady(true);
    }
  }

  function getActor(actor, isStart) {
    let urlGet = "https://ymlzz52dhqb2nqddsogjrstrnu0ygnyn.lambda-url.us-west-2.on.aws/?id=" + actor;
    let url = "https://www.imdb.com/name/" + actor; 

    trackPromise ( 
      fetch(urlGet).then(response => { 
            return response.text();
          }).then(html => { 
            let n = getName(html);
            let i = getImage(html);
            if (n && i) {
              if (isStart) {
                setStart({"startName": n, "startUrl": url, "startImageUrl": i, "startId":actor });
              } else {
                setEnd({"endName": n, "endUrl": url, "endImageUrl": i, "endId":actor });
              }
            }
        }));
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
        return null;
      }
    }

  const Loading = () => (
    <div className="flex justify-center items-center ">
      <MutatingDots 
  height="100"
  width="100"
  color="#5A5A5A"
  secondaryColor= '#5A5A5A'
  radius='12.5'
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
 />
      
    </div>
);

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
                endImageUrl= {end["endImageUrl"]}
                 />
              <GuessesBoard startName={start["startName"]} 
                startUrl={start["startUrl"]} 
                startImageUrl={start["startImageUrl"]} 
                startId={start["startId"]}
                endName={end["endName"]} 
                endUrl={end["endUrl"]} 
                endImageUrl= {end["endImageUrl"]} 
                endId= {end["endId"]} />
               </span>
         }
         { !ready && <StartGame onClick={generateData} /> }
         { promiseInProgress && <Loading />  }
         <OptionsButton />
        </Container>
      </Layout>
    </>
  )
}


