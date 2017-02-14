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
    console.log('Component did mount')
    axios.get('http://localhost:8080/api/projects')
    .then(response => {
      console.log('respose',response.data.projects)
      this.setState({projects: response.data.projects})
    })
    .catch(error => {
      console.log(error)
    })
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
