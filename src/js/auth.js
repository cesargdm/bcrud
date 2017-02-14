import NetworkOperation from "./NetworkOperation"

export default class Auth {

  static logIn(credentials, errorCallback, callback) {
    NetworkOperation.getAuth(credentials, errorCallback, callback)
  }

  static loggedIn(nextState, replace) {
    return localStorage.getItem('token') !== null
  }

}
