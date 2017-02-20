import React from 'react'

import NetworkOperation from "../NetworkOperation.js"

export default class Add extends React.Component {

  constructor() {
    super()

    this.state = {
      article: {
        images: []
      }
    }

    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(event) {

    switch (event.target.id) {
      case "hero":
        console.log(event.target.files[0])
        this.state.article.images.main = event.target.files[0]
      case "title":

        break
      case "body":

        break
      default:
        if (event.target.type == "file") {
          //this.state.hero
          console.log(event.target.value.split(/(\\|\/)/g).pop())
        }
        break
    }
  }

  addArticle() {

    let data = new FormData()

    const files = [document.getElementById("hero").files[0],document.getElementById("hero").files[0]]

    data.append('title', 'This is the title')

    NetworkOperation.setArticle(data,
      (error) => console.log(error),
      (response) => console.log(response)
    )
  }

  render() {
    return (
      <div className="article-detail section">
        <div className="title">
          Add new
        </div>
        <div className="content">
          <div className="form-element">
            <label htmlFor="text">Title</label>
            <input type="text" id="title" placeholder="Title" onChange={this.handleChange}></input>
          </div>
          <div className="form-element">
            <label htmlFor="type">Types</label>
            <div>

            </div>
            <input type="text" id="type" placeholder="Type" onChange={this.handleChange}></input>
          </div>
          <div className="form-element">
            <label for="body">Body</label>
            <textarea htmlFor="body" placeholder="Body" onChange={this.handleChange}></textarea>
          </div>
          <div className="form-element">
            <label htmlFor="files">Image hero</label>
            <input type="file" onChange={this.handleChange} className="" id="hero"/>
          </div>
          <div className="form-element">
            <label htmlFor="files">Files</label>
            <input type="file" onChange={this.handleChange} className=""/>
            <input type="file" onChange={this.handleChange} className=""/>
            <input type="file" onChange={this.handleChange} className=""/>
          </div>
          <input type="button" value="Add" id="submit" onClick={this.addArticle.bind(this)}></input>
        </div>
      </div>
    )
  }
}
