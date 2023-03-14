import React, {useState} from 'react';
import { Rings, MutatingDots } from 'react-loader-spinner';

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

  async function onChoose(e) {
    setInProgress(true)
    await validate(e)
    setInProgress(false)
  }

  async function validate(e) {
    let index = e.target.selectedIndex
    if (index != 0) {
      let id = e.target[index].value
      let name = e.target[index].textContent
      let url = isPerson(id) ? "https://www.imdb.com/name/" : "https://www.imdb.com/title/"
      url = url + id
      let html = await fetchHtml(id)
      let image = getImageUrl(html)
      props.updateGuess(name, id, url, image)
    }
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

  return (
      <section>
      { !inProgress && 
          <div className="mb-8 md:mb-16">
          <select onChange={(e) => onChoose(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
             <option value="">
                --- choose ---
             </option>
            {Object.keys(props.options).map((key, index) => {
              let name = props.options[key]
              return (
                <option key={key} value={key}>
                  {name}
                 </option>
                 );
            })}
          </select>
          </div>
      }
      {inProgress && <Loading />}

      </section>
    );
}

export default Guess
