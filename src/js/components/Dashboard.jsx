import React from 'react'
import { Link } from 'react-router'

import NetworkOperation from "../NetworkOperation.js"
import Article from "./Article.jsx"

export default class Dashboard extends React.Component {

  constructor () {
    super()
    this.state = {
      articles: []
    }
  }

  componentDidMount() {

    console.log('Component did mount!')
    NetworkOperation.getArticles(
      error => console.error(error),
      response => {
        console.log('response!!!', response)
        this.setState({
          articles: response.data.projects
        })
      }
    )

  }

  render() {
    return (
      <div className="dashboard section">
        <div className="title">
          Dashboard
          <div className="search"></div>
        </div>
        <div className="articles content">
          {this.state.articles.map(article => <Link to={`/article/${article._id}`} key={article._id}><Article article={article} key={article._id}/></Link>)}
        </div>
      </div>
    )
  }
}
