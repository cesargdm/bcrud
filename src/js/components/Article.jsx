import React from 'react'

export default class Article extends React.Component {
  render () {
    return (
      <div className="article" key="{this.props.article._id}">
        <div className="image">
          <img src={`${window.baseUrl}/static/uploads/${this.props.article.images.main}`}></img>
        </div>
        <div className="content">
          <div className="title-header">
            <p className="title">{this.props.article.title}</p>
            <div className="types">
              <span key={this.props.article.type[0]}>{this.props.article.type[0]}</span>
            </div>
          </div>
          <p className="body">{this.props.article.body}</p>
          <p className="date">{this.props.article.date}</p>
        </div>
      </div>
    )
  }
}
