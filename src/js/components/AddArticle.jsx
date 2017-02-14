import React from 'react'

export default class Add extends React.Component {
  render() {
    return (
      <div className="article-detail section">
        <div className="title">
          Add new
        </div>
        <div className="content">
          <label htmlFor="text">Title</label>
          <input type="text" id="title" placeholder="Title"></input>
          <label htmlFor="typr">Type</label>
          <input type="text" id="type" placeholder="Type"></input>
          <label htmlFor="body">Body</label>
          <input type="text" id="body" placeholder="Body"></input>
          <label htmlFor="files">Files</label>
          <input type="file"></input>
          <input type="button" value="Add"></input>
        </div>
      </div>
    )
  }
}
