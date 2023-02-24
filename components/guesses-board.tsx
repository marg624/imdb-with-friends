import CoverImage from './cover-image'
import Link from 'next/link'
import Guess from './guess'
import React, { Component } from "react";


interface Props {
  startName: string,
  startUrl: string,
  startImageUrl: string,
  endName: string,
  endUrl: string,
  endImageUrl: string
}

interface ActorData {
  name: string,
  imdbUrl: string,
  imageUrl: string,
};

interface GuessState {
  guesses: Array<ActorData>,
  options: Array<String>,
  start: ActorData,
  end: ActorData
};

class GuessesBoard extends React.Component<Props, GuessState> {
  constructor(props: Props) {

    super(props);
    this.state = {guesses: [], options: [],
                               start: {name: props.startName, imdbUrl: props.startUrl, imageUrl: props.startImageUrl},
                               end: {name: props.endName, imdbUrl: props.endUrl, imageUrl: props.endImageUrl}  }
    
    this.updateGuess = this.updateGuess.bind(this)
    this.fetchHtml = this.fetchHtml.bind(this)
    this.getOptions = this.getOptions.bind(this)
    this.getId = this.getId.bind(this)
    this.getTitles = this.getTitles.bind(this)
    this.getCast = this.getCast.bind(this)
    this.isPerson = this.isPerson.bind(this)
  }


  updateGuess(name1, id1, imdbUrl1, imageurl1) {
    const { guesses } = this.state;
    let newArr = [ ... guesses, {name: name1, imdbUrl: imdbUrl1, imageUrl: imageurl1} ]

    let newState = Object.assign(this.state, { guesses: newArr });

    this.getOptions(imdbUrl1);
    this.setState(newState);
  }

  async fetchHtml(url) {
    const response = await fetch(url, {
        mode: 'no-cors',
        headers: {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'Origin, Content-Type, Accept'}
      });
    const htmlText = await response.text();
    return htmlText;
  }

  async getOptions(url) {
    let id = this.getId(url)
    let html = await this.fetchHtml(url);
    let arr = this.isPerson(id) ? this.getTitles(html) : this.getCast(html);
    let newState = Object.assign(this.state, { options: arr });

    this.setState(newState)
  }

  isPerson(id) {
    return id.includes("nm")
  }

  getId(url) {
    let str = url.split("/")
    for (const x of str) { 
      if(x.startsWith("nm") || x.startsWith("tt")) {
        return x
      }
    }
    return null
  }

  getCast(html) {
    // <script id="__NEXT_DATA__" type="application/json">
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');
    const myMetaElement = dom.querySelector("body script[id='__NEXT_DATA__'][type='application/json']");
    if (myMetaElement) {
      const myContent = myMetaElement.textContent;
      var myObject = JSON.parse(myContent);
      var cast = myObject.props.pageProps.mainColumnData.cast.edges;
      var arr = {};
      cast.forEach(function (item, index) {
        arr[item.node.name.id] = item.node.name.nameText.text;
      });
      return arr;
    } else {
      console.log('No matching element found');
      return null;
    }
  }

  getTitles(html) {
    // <script id="__NEXT_DATA__" type="application/json">
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html');
    const myMetaElement = dom.querySelector("body script[id='__NEXT_DATA__'][type='application/json']");
    if (myMetaElement) {
      const myContent = myMetaElement.textContent;
      var myObject = JSON.parse(myContent);
      var titles = myObject.props.pageProps.mainColumnData.knownFor.edges;
      var titles2 = myObject.props.pageProps.mainColumnData.releasedPrimaryCredits[0].credits.edges;
      var arr = {};
      titles.forEach(function (item, index) {
        arr[item.node.title.id] = item.node.title.originalTitleText.text;
      });
      titles2.forEach(function (item, index) {
        arr[item.node.title.id] = item.node.title.originalTitleText.text;
      });
      return arr;
    } else {
      console.log('No matching element found');
      return null;
    }
  }

   render() {
     const {guesses, start} = this.state;
     const lastGuess = guesses.length == 0 ? start : guesses[guesses.length - 1] 
     if (guesses.length == 0) {
      const { imdbUrl } = lastGuess;
        this.getOptions(imdbUrl);
      }

     if (guesses.length > 0 &&
        this.state.guesses[this.state.guesses.length - 1].imdbUrl == this.state.end.imdbUrl) {
        alert("You WIN!!!")
     }

     return (
      <section className="flex justify-center">
        <div className="mb-8 md:mb-16">
            {Object.keys(this.state.guesses).map((key, index) => {
              let state1 = this.state.guesses[key]
              return (<span> 
                  <Link href={state1.imdbUrl} className="hover:underline">{state1.name}</Link>
                  <img src={state1.imageUrl} width="75px" /> 
                </span>
                 );
            })}
          <br/>  
          <Guess updateGuess={this.updateGuess} options={this.state.options} />
        </div>
      </section>
    )}
}

export default GuessesBoard;
