import React, {useState} from 'react';
import { Rings, MutatingDots } from 'react-loader-spinner';
import guessWho from '../public/assets/guess-who.png';
import {isMobile} from 'react-device-detect';


const Guess = (props) => {
  const [inProgress, setInProgress] = useState(false)

  async function fetchHtml(id) {
    let urlGet = "https://ymlzz52dhqb2nqddsogjrstrnu0ygnyn.lambda-url.us-west-2.on.aws/?id=" + id;
    const response = await fetch(urlGet);
    const htmlText = await response.text();
    return htmlText;
  }

  function isPerson(id) {
    return id.includes("nm")
  }

  function getUrl(id) {
    let url = isPerson(id) ? "https://www.imdb.com/name/" : "https://www.imdb.com/title/"
    return url;
  }

  function getImageUrl(html) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');
    const myMetaElement = dom.querySelector("head meta[property='og:image'][content]");

    // Use the properties of the element to access its attributes and content
    if (myMetaElement) {
      const myContent = myMetaElement.getAttribute('content');
      return myContent;
    } else {
      console.log('No matching meta element found');
      return null;
    }
  }


  async function onChoose(id, name) {
    setInProgress(true)
    await validate(id, name)
    setInProgress(false)
  }

  async function validate(id, name) {
      let url = isPerson(id) ? "https://www.imdb.com/name/" : "https://www.imdb.com/title/"
      url = url + id
      let html = await fetchHtml(id)
      let image = getImageUrl(html)
      props.updateGuess(name, id, url, image)
  }  

  const Loading = () => (
    <div className="flex justify-center items-center ">
      <MutatingDots 
        height="80"
        width="80"
        color="#5A5A5A"
        secondaryColor= '#5A5A5A'
        radius='8'
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />
      
    </div>
  );

  const classExtra = (isMobile? "mb-8 md:mb-16 gap-4 border-separate p-4 grid grid-cols-2 flex justify-center" : "mb-8 md:mb-16 gap-4 border-separate p-4 grid grid-cols-4 flex justify-center" )


  return (
      <section className="flex justify-center">
      { !inProgress && 

            <div className={classExtra}>
              {Object.keys(props.options).map((key, index) => {
              let name = props.options[key]
              let url = getUrl(key)
              if (!(key == '0')) {
                return ( <div onClick={(e) => onChoose(key, name)} className="text-center inline-block align-middle border-dashed border-2 cursor-pointer text-slate-500 hover:text-black hover:border-black flex justify-center rounded-md drop-shadow-md" key={key} >
                  <strong>{name}</strong>
                  </div> );
            }
      })}
            </div>
      }
      <br/>
     {inProgress && <Loading />}

      </section>
    );
}

export default Guess
