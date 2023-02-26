import React from 'react';


const Guess = (props) => {

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

  async function validate(e) {
    let index = e.target.selectedIndex
    let id = e.target[index].value
    let name = e.target[index].textContent
    let url = isPerson(id) ? "https://www.imdb.com/name/" : "https://www.imdb.com/title/"
    url = url + id
    let html = await fetchHtml(id)
    let image = getImageUrl(html)
    props.updateGuess(name, id, url, image)
  }


  return (
      <section>
        <div className="mb-8 md:mb-16">
        <select onChange={(e) => validate(e)}>
           <option key='' value=''>
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
      </section>
    );
}

export default Guess
