import React from 'react'
import { Link, hashHistory } from 'react-router'

import NetworkOperation from "../NetworkOperation.js"

export default class ArticleDetail extends React.Component {

  constructor () {
    super()

    this.state = {
      article: {
        images:{
          more: []
        }
      },
      isReadOnly: true
    }
  }

  deleteArticle(articleId) {
    NetworkOperation.deleteArticle(articleId,
      (error) => {
        alert('Could not delete article')
        this.setState({'isReadOnly': true})
      },
      (response) => {
        this.context.router.push('/dashboard')
        //Return to navigation and display success message
      }
    )
  }

  updateArticle() {
    //Set loading animation
    NetworkOperation.updateArticle(this.state.article,
      (error) => {
        //Handle errors
        alert('Could not update article')
        this.setState({'isReadOnly': true})
      },
      (response) => {
        //Change the article state from returned data
        console.log('RESPONSE:', response.data)
        this.setState({
          article: response.data.project,
          'isReadOnly': true
        })
      }
    )
  }

  handleChange(event) {
    //Check if wich button has been clicked
    let tempArticle = this.state.article

    switch (event.target.id) {
      case "edit-save":
        if(!this.state.isReadOnly)
          return this.updateArticle() //Update the article and handle the state changes after network operation
        this.setState({'isReadOnly': !this.state.isReadOnly})
        break
      case "body":
        tempArticle.body = event.target.value
        this.setState({article: tempArticle})
        break
      case "delete":
        console.log('Should delete')
        this.deleteArticle(tempArticle._id)
        break
      case "type":
        break
      case "title":
        tempArticle.title = event.target.value
        this.setState({article: tempArticle})
        break
      default:
        return
    }
  }

  componentDidMount() {
    NetworkOperation.getArticle(
    this.props.params.id,
    (error) => alert(error),
    (response) => {
      console.log(response.data.project.images);
      this.setState({
        article: response.data.project
      })
    })
  }


  render() {
    const heroStyle = {
      backgroundImage: `url(${window.baseUrl}/static/img/projects/${this.state.article.name}/${this.state.article.images.main})`
    }

    return (
      <div className="article-detail section">
        <div className="title">
          <Link to="/"><div className="return"></div></Link>
          Article - "{this.state.article.title}"
        </div>
        <div className="content">
          <div className="hero">
            <label htmlFor="hero-input" style={heroStyle} className={`hero-label ${this.state.isReadOnly ? "" : "editable"}`}></label>
            <input type="file" id="hero-input"></input>
          </div>
          <input type="text"
            id="title"
            value={this.state.article.title}
            onChange={this.handleChange.bind(this)}
            className="title"
            readOnly={this.state.isReadOnly}/>
          {/*<input type="text"
            id="type"
            value={this.state.article.type}
            onChange={this.handleChange.bind(this)}
            className="type"
            readOnly={this.state.isReadOnly}/>*/}
          <textarea
            id="body"
            value={this.state.article.body}
            onChange={this.handleChange.bind(this)}
            className="body"
            readOnly={this.state.isReadOnly}>
          </textarea>
          <div className="more-images">
            {this.state.article.images.more.map(imageUrl =>
              <div className={this.state.isReadOnly ? "" : "edit"} key={imageUrl}>
                <div className="delete-button" onClick=""></div>
                <img src={`${window.baseUrl}/static/img/projects/${this.state.article.name}/${imageUrl}`}/>
              </div>
            )}
            <div className="add-more">
              <p>Añadir imagen</p>
            </div>
          </div>
          <div className="actions">
            <input
              type="button"
              id="delete"
              className={`delete ${this.state.isReadOnly ? "hidden" : ""}`}
              value="Eliminar"
              onClick={this.handleChange.bind(this)} />
            <input
              type="button"
              id="edit-save"
              value={this.state.isReadOnly ? "Editar" : "Guardar"}
              className={this.state.isReadOnly ? "" : "active"}
              onClick={this.handleChange.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}
