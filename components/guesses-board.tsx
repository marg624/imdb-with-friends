import Link from 'next/link'
import Guess from './guess'
import React, { Component } from "react";
import arrow from '../public/assets/arrow-icon.png';
import InfoOverlay from './info-overlay'


interface Props {
  startName: string,
  startUrl: string,
  startImageUrl: string,
  startId: string,
  endName: string,
  endUrl: string,
  endImageUrl: string,
  endId: string
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
  end: ActorData,
  win: boolean,
  winMsg?: string,
};

class GuessesBoard extends React.Component<Props, GuessState> {
  constructor(props: Props) {

    super(props);
    this.state = {win: false, guesses: [], options: [],
                               start: {name: props.startName, imdbUrl: props.startUrl, imageUrl: props.startImageUrl},
                               end: {name: props.endName, imdbUrl: props.endUrl, imageUrl: props.endImageUrl}  }
    
    this.updateGuess = this.updateGuess.bind(this)
    this.fetchHtml = this.fetchHtml.bind(this)
    this.getOptions = this.getOptions.bind(this)
    this.getId = this.getId.bind(this)
    this.getTitles = this.getTitles.bind(this)
    this.getCast = this.getCast.bind(this)
    this.isPerson = this.isPerson.bind(this)
    this.clearMsgFunc = this.clearMsgFunc.bind(this)

  }


  updateGuess(name1, id1, imdbUrl1, imageurl1) {
    let newState = Object.assign(this.state);
    if (imdbUrl1 == this.state.end.imdbUrl) {
      let guessLength = this.state.guesses.length + 1;
      let msg = ""
      if (guessLength <= 6) {
          let plural = (guessLength == 1) ? " connection." : " connections.";
          msg = "You discovered a path of " + guessLength + plural
      } else {
          msg = "You discovered a path of " + guessLength + " connections. However, not to burst your bubble, but there exists a shorter way."
      }
      newState = Object.assign(newState, {win: true}, {winMsg: msg});
      this.setState(newState)
    } else {
      const { guesses } = this.state;
      let newArr = [ ... guesses, {name: name1, imdbUrl: imdbUrl1, imageUrl: imageurl1} ]
      newState = Object.assign(newState, { guesses: newArr });
      this.getOptions(imdbUrl1);
      this.setState(newState);
    }
  }

  async fetchHtml(id) {
    let urlGet = "https://ymlzz52dhqb2nqddsogjrstrnu0ygnyn.lambda-url.us-west-2.on.aws/?id=" + id;
    const response = await fetch(urlGet);
    const htmlText = await response.text();
    return htmlText;
  }

  async getOptions(url) {
    let id = this.getId(url)
    let html = await this.fetchHtml(id);
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

  clearMsgFunc() {
    let newState = Object.assign(this.state, { winMsg: null });
    this.setState(newState)
  }

   render() {

     const {win, guesses, start} = this.state;
     const lastGuess = guesses.length == 0 ? start : guesses[guesses.length - 1] 
     if (guesses.length == 0) {
        const { imdbUrl } = lastGuess;
        this.getOptions(imdbUrl);
      }

     return (
      <section className="flex justify-center">
        <div className="mb-8 md:mb-16">
        <table><tbody><tr> 
            {Object.keys(this.state.guesses).map((key, index) => {
              let state1 = this.state.guesses[key]
              return (<span> 
                <td align="center" valign="middle">
                  <Link href={state1.imdbUrl} className="hover:underline">{state1.name}</Link>
                  <img src={state1.imageUrl} width="75px" /> 
                </td>
                <td align="center" valign="middle"> 
                   <img src={arrow.src} width="50px" /> 
                </td>
                </span>
                 );
            })}
          </tr></tbody></table>  
          <br/>  
          { !this.state.win && <Guess updateGuess={this.updateGuess} options={this.state.options} /> }
          { (this.state.win && this.state.winMsg) && <InfoOverlay toggleFunc={this.clearMsgFunc} showEnd={true} endMsg={this.state.winMsg} start={this.props.startId} end={this.props.endId} startImageUrl={this.props.startImageUrl} endImageUrl={this.props.endImageUrl} /> }
        </div>
      </section>
    )}
}

export default GuessesBoard;
