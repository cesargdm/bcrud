import React from 'react'
import axios from 'axios'

import Header from "./Header.jsx"

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="app">
        <Header username="cesargdm"></Header>
        { this.props.children }
      </div>
    )
  }
}
