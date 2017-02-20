import React from 'react'
import axios from 'axios'

import Header from "./Header.jsx"

export default class AddHero extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="section">
        <div className="title">
          <h1>Add hero</h1>
        </div>
      </div>
    )
  }
}
