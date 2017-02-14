import React from 'react'
import { Link } from 'react-router'

const NavLink = props => (
  <Link {...props} activeClassName="active"/>
)
export default class Header extends React.Component {

  constructor() {
    super()
    this.state = {
      displaySearch: false
    }
  }

  render () {
    return (
      <header>
          <ul className="actions">
            {/*<NavLink to="/"><li className="logo"></li></NavLink>*/}
            <NavLink to="/dashboard"><li className="dashboard"></li></NavLink>
            <NavLink to="/add"><li className="add"></li></NavLink>
            {/*
            <li className="search">
              <div className="search-element">
                <input type="search" placeholder="Search"></input>
              </div>
            </li>
            */}
          </ul>
          <ul className="actions">
            <li className="settings"></li>
            <NavLink to="/login"><li className="exit"></li></NavLink>
          </ul>
      </header>
    )
  }
}
