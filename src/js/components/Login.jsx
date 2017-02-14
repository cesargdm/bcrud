import React from 'react'

import Auth from "../auth.js"

export default class Login extends React.Component {

  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      filled: false
    }

    this.handleChange = this.handleChange.bind(this)

  }

  logIn() {

    if (this.state.username == '' || this.state.password == '') {
      alert('You must fill all fields')
      return
    }

    const credentials = {
      username: this.state.username,
      password: this.state.password
    }

    Auth.logIn(credentials,
      error => console.error(error),
      response => {
        const token = response.data.token

        if (!token || token == null) return

        localStorage.setItem("token", token)
        this.props.router.push('/dashboard')
      }
    )
  }

  handleChange(event) {

    const key = event.target.id
    const value = event.target.value

    this.setState({
      [key]: value
    })

    this.state.username != '' && this.state.password != '' ? this.setState({filled: true}) : this.setState({filled: false})

  }

  render() {
    return (
      <div className="app login">
        <div className="logo"></div>
        <input type="text" id="username" placeholder="Username" onChange={this.handleChange}/>
        <input type="password" id="password" placeholder="Password" onChange={this.handleChange}/>
        <input type="button" value="Log in" onClick={this.logIn.bind(this)} className={this.state.filled ? 'active' : 'disabled'}/>
      </div>
    )
  }
}
