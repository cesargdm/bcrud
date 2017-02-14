import React from 'react'
import { Link } from 'react-router'

import NetworkOperation from "../NetworkOperation.js"

export default class ArticleDetail extends React.Component {

  constructor () {
    super()
    this.state = {
      article: {}
    }
  }

  handleChange(event) {
    this.setState({article: {title: this.state.article.title}});
  }

  componentDidMount() {
    NetworkOperation.getArticle(
    this.props.params.id,
    (error) => console.error(error),
    (article) => {
      this.setState({
        article: article
      })
    })
  }

  render() {
    return (
      <div className="article-detail section">
        <div className="title">
          <Link to="/"><div className="return"></div></Link>
          Article - "{this.state.article.title}"
        </div>
        <div className="content">
          <input type="text"
            value={this.state.article.title}
            onChange={this.handleChange}
            className="title"
            readOnly/>
          <input type="text"
            value={this.state.article.type}
            onChange={this.handleChange}
            className="type"
            readOnly/>
          <textarea
            value={this.state.article.body}
            onChange={this.handleChange}
            className="body"
            readOnly>
          </textarea>
          <input type="button" value="Editar"/>
        </div>
      </div>
    )
  }
}
