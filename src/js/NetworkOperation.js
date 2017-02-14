import axios from 'axios'

//Interceptors
axios.interceptors.request.use(
config => {
  if (config.url.split('/').pop() !== "authenticate") config.headers['x-access-token'] = localStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

window.baseUrl = "http://aktiastudio.com:8081"

export default class NetworkOperation {

  static getArticles(errorCallback, callback) {
    axios(window.baseUrl + '/api/projects')
    .then(response => callback(response))
    .catch(error => errorCallback(error))
  }

  static getArticle(articleId, errorCallback, callback) {
    axios(window.baseUrl + '/api/projects/' + articleId )
    .then(response => callback(response))
    .catch(error => errorCallback(error))
  }

  static getAuth(credentials, errorCallback, callback) {
    axios.post(window.baseUrl + '/api/authenticate',credentials)
    .then(response => callback(response))
    .catch(error => errorCallback(error))
  }

  static setArticle(article, errorCallback, callback) {
    axios.post(window.baseUrl + '/api/projects', article)
    .then(response => callback(response))
    .catch(error => errorCallback(error))
  }

}
