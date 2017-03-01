import React from 'react'
import { Link } from 'react-router'

import NetworkOperation from "../NetworkOperation.js"
import Article from "./Article.jsx"
import TryAgain from "./TryAgain.jsx"

//Electron ipcMain for getting messages
const {ipcRenderer} = require('electron')

export default class Dashboard extends React.Component {

  constructor () {
    super()
    this.state = {
      showSearch: false,
      articles: [],
      filteredArticles: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {

    const query = event.target.value

    if (query == "") return this.setState({'filteredArticles': this.state.articles})

    this.setState({'filteredArticles': this.state.articles.filter(article => JSON.stringify(article).includes(query))})

  }

  showSearch() {
    this.setState({showSearch: !this.state.showSearch})
    if (!this.state.showSearch) setTimeout(() => document.getElementById("search-input").focus(), 300)
  }

  componentDidMount() {

    this.getArticles()

  }

  getArticles() {

    console.log('Getting articles')

    document.getElementById('try-again').classList.remove('visible')

    NetworkOperation.getArticles(
      error => {
        document.getElementById('try-again').classList.add('visible')
      },
      response => {
        this.setState({
          articles: response.data.projects,
          filteredArticles: response.data.projects
        })
      }
    )
  }

  render() {
    return (
      <div className="dashboard section">
        <div className="title">
          Dashboard
          <div className="search-wrapper">
            <div className={"search " + (this.state.showSearch ? "active" : "")} onClick={this.showSearch.bind(this)}></div>
            <div className={"search-input " + (this.state.showSearch ? "active" : "")}>
              <input type="text" id="search-input" onChange={this.handleChange}/>
            </div>
          </div>
        </div>
        <div className="articles content">
          <TryAgain
            context={this}
            action={this.getArticles}
            message="Hay problemas cargando los proyectos"
            actionMessage="Intentar de nuevo"/>
          {this.state.filteredArticles.map(article =>
            <Link to={`/article/${article._id}`}
              key={article._id}>
              <Article article={article} key={article._id}/>
            </Link>)
          }
        </div>
      </div>
    )
  }
}
