import React from 'react'

export default class Article extends React.Component {
  render () {
    return (
      <div className="article" key="{this.props.article._id}">
        <div className="image">
          <img src={`/static/img/projects/${this.props.article.name}/${this.props.article.images.main}`}></img>
        </div>
        <div className="content">
          <p className="title">{this.props.article.title}</p>
          <p className="body">{this.props.article.body}</p>
          <p className="date">{this.props.article.date}</p>
        </div>
      </div>
    )
  }
}
