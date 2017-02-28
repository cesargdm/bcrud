import React from 'react'
import { Link } from 'react-router'

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

    this.handleChange = this.handleChange.bind(this)

  }

  deleteArticle(articleId) {
    NetworkOperation.deleteArticle(articleId,
      error => {
        alert('Could not delete article')
        this.setState({'isReadOnly': true})
      },
      response => {
        //Return to navigation and display success message
        alert('Proyecto eliminado')
        this.props.router.push('/dashboard')
      }
    )
  }

  updateArticle() {
    //Set loading animation
    NetworkOperation.updateArticle(this.state.article,
      error => {
        //Handle errors
        alert('Could not update article')
        this.setState({'isReadOnly': true})
      },
      response => {
        //Change the article state from returned data
        this.setState({
          article: response.data.project,
          'isReadOnly': true
        })
      }
    )
  }

  handleChange(event) {
    //Set tem new article to update and modify and later set state to this new article
    let newArticle = this.state.article

    if (event.target.className === "delete-button") {
      const index = newArticle.images.more.indexOf(event.target.id)
      if (index !== -1) {
          newArticle.images.more.splice(index, 1)
      }
      this.setState({ article: newArticle })
      return
    }

    //Check if wich button has been clicked
    switch (event.target.id) {
      case "edit-save":
        if (!this.state.isReadOnly)
          return this.updateArticle() //Update the article and handle the state changes after network operation
        this.setState({'isReadOnly': !this.state.isReadOnly})
        break
      case "body":
        newArticle.body = event.target.value
        this.setState({article: newArticle})
        break
      case "hero":
        const heroFile = event.target.files[0]
        let formData = new FormData()
        formData.append('file', heroFile)

        //Start upload animation with progress bar
        document.getElementById('hero-loading').classList.remove('hidden')

        NetworkOperation.uploadFile(formData,
          error => {
            //Stop upload animation
            document.getElementById('hero-loading').classList.add('hidden')
            alert('Could not upload file')
          },
          response => {
            newArticle.images.main = response.data.file.name

            this.setState({
              article: newArticle
            })

            this.updateArticle()
            //Stop upload animation
            document.getElementById('hero-loading').classList.add('hidden')
          }
        )

        break
      case "add-image":
        const newImage = event.target.files[0]
        let imageFormData = new FormData()
        imageFormData.append('file', newImage)

        NetworkOperation.uploadFile(imageFormData,
          error => {
            alert('Could not upload file')
          },
          response => {
            newArticle.images.more.push(response.data.file.name)
            this.setState({
              article: newArticle
            })
            this.updateArticle()
          }
        )

        break
      case "delete":
        this.deleteArticle(newArticle._id)
        break
      case "type":
        //Todo set projects type
        break
      case "title":
        newArticle.title = event.target.value
        this.setState({article: newArticle})
        break
      default:
        return
    }
  }

  componentDidMount() {
    NetworkOperation.getArticle(this.props.params.id,
    error => alert(error.message),
    response => {
      this.setState({
        article: response.data.project
      })
    })
  }


  render() {
    const heroStyle = {
      backgroundImage: `url(${window.baseUrl}/static/uploads/${this.state.article.images.main})`
    }

    return (
      <div className="article-detail section">
        <div className="title">
          <Link to="/"><div className="return"></div></Link>
          Article - "{this.state.article.title}"
        </div>
        <div className="content">
          <div className="hero">
            <label
              htmlFor="hero"
              style={heroStyle}
              className={`hero-label ${this.state.isReadOnly ? "" : "editable"}`}/>
            <img src="./app/img/loading.svg" className="loading hidden" id="hero-loading"/>
            <input type="file" onChange={this.handleChange} id="hero"/>
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
            {this.state.article.images.more.map(imageId =>
              <div className={this.state.isReadOnly ? "" : "edit"} key={imageId}>
                <div className="delete-button" onClick={this.handleChange.bind(this)} id={imageId}></div>
                <img src={`${window.baseUrl}/static/uploads/${imageId}`}/>
              </div>
            )}
            <div className="add-more">
              <label htmlFor="add-image">Añadir imagen</label>
              <input type="file" onChange={this.handleChange} id="add-image"/>
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
