import React from 'react'

export default class TryAgain extends React.Component {
  render () {
    return (
      <div id="try-again" onClick={this.props.action.bind(this.props.context)}>
        <img src="./app/img/lost.png"></img>
        <p>{this.props.message}</p>
        <span>{this.props.actionMessage}</span>
      </div>
    )
  }
}
