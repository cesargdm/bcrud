import React from 'react'

import NetworkOperation from "../NetworkOperation.js"

export default class Add extends React.Component {

  constructor() {
    super()

    this.state = {
      article: {
        images: {}
      },
      active: false
    }

    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(event) {

    let newArticle = this.state.article

    switch (event.target.id) {
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

            //Stop upload animation
            document.getElementById('hero-loading').classList.add('hidden')
          }
        )

        break
      case "title":
        newArticle.title = `${event.target.value}`

        this.setState({article: newArticle})

        break
      case "body":
        console.log(`${event.target.value}`)
        newArticle.body = `${event.target.value}`

        this.setState({article: newArticle})

        break
      default:
        if (event.target.type == "file") {
          let formData = new FormData()
          //this.state.hero
          //If multiple files, create new input for every file and upload element by element
        }
        break
    }

    this.setState({
      active:
      this.state.article.images.main
      && this.state.article.title
      && this.state.article.body
    })

  }

  addArticle() {
    if (!this.state.article.images.main)
      return (alert('No haz añadido una imgen principal'))

    console.log(this.state.article)

    NetworkOperation.setArticle({article: this.state.article},
      error => console.log(error),
      response => {
        alert('¡Proyecto creado!')
        //Redirect to dashboard :)
        this.props.router.push('/dashboard')
      }
    )
  }

  render() {
    return (
      <div className="article-detail section">
        <div className="title">
          Añadir nuevo proyecto
        </div>
        <div className="content">
          <div className="form-element">
            <label htmlFor="text">Título</label>
            <input type="text" id="title" placeholder="Title" onChange={this.handleChange}></input>
          </div>
          <div className="form-element">
            <label htmlFor="type">Categorías</label>
            <div>

            </div>
            <input type="text" id="type" placeholder="Type" onChange={this.handleChange}></input>
          </div>
          <div className="form-element">
            <label htmlFor="body">Descripción del proyecto</label>
            <textarea htmlFor="body" placeholder="Body" onChange={this.handleChange} id="body"></textarea>
          </div>
          <div className="form-element">
            <label htmlFor="files">Imagen principal</label>
            <input type="file" onChange={this.handleChange} id="hero"/>
          </div>
          <div className="form-element">
            <label htmlFor="files">Imagenes adicionales</label>
            <input type="file" onChange={this.handleChange} className=""/>
          </div>
          <input type="button"
            className={this.state.active ? "active" : ""}
            value="Add"
            id="submit"
            onClick={this.addArticle.bind(this)}/>
        </div>
      </div>
    )
  }
}
