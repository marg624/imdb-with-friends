import CoverImage from './cover-image'
import Link from 'next/link'
import Guess from './guess'
import React, { Component } from "react";

class GuessesBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {guesses: [], options: [],
                               start: {name: this.props.startName, imdbUrl: this.props.startUrl, imageUrl: this.props.startImageUrl},
                               end: {name: this.props.endName, imdbUrl: this.props.endUrl, imageUrl: this.props.endImageUrl}  }
    this.updateGuess = this.updateGuess.bind(this)
    this.fetchHtml = this.fetchHtml.bind(this)
    this.getOptions = this.getOptions.bind(this)
    this.getId = this.getId.bind(this)
    this.getTitles = this.getTitles.bind(this)
    this.getCast = this.getCast.bind(this)
    this.isPerson = this.isPerson.bind(this)
  }

  updateGuess(name1, id1, imdbUrl1, imageurl1) {
    console.log("update guess: " + name1)
    let newArr = [ ... this.state.guesses, {name: name1, imdbUrl: imdbUrl1, imageUrl: imageurl1} ]
    this.state.guesses = newArr
    this.getOptions(imdbUrl1)
    this.setState(this.state)
  }

  async fetchHtml(url) {
    const response = await fetch(url, {
        crossDomain:true,
        headers: {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'Origin, Content-Type, Accept'}
      });
    const htmlText = await response.text();
    return htmlText;
  }

  async getOptions(url) {
    let id = this.getId(url)
    let html = await this.fetchHtml(url);
    let arr = this.isPerson(id) ? this.getTitles(html) : this.getCast(html);
    this.state.options = arr
    this.setState(this.state)
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
     const lastGuess = this.state.guesses.length == 0 ? this.state.start : this.state.guesses[this.state.guesses.length - 1] 
     if (this.state.guesses.length == 0) {
        this.getOptions(lastGuess.imdbUrl)
     }

     if (this.state.guesses.length > 0 &&
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
