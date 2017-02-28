import axios from 'axios'

//Interceptors
axios.interceptors.request.use(
config => {
  if (config.url.split('/').pop() !== "authenticate") config.headers['x-access-token'] = localStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

//Set the base url in the window variable (global)
window.baseUrl = "http://localhost:8080"

export default class NetworkOperation {

  static getArticles(errorCallback, callback) {
    axios(`${window.baseUrl}/api/projects`)
    .then(response => callback(response))
    .catch(error => errorCallback(error))
  }

  static deleteArticle(articleId, errorCallback, callback) {
    axios.delete(`${window.baseUrl}/api/projects/${articleId}`)
    .then(response => callback(response))
    .catch(error => errorCallback(error))
  }

  static updateArticle(article, errorCallback, callback) {
    axios.put(window.baseUrl + '/api/projects/' + article._id, {project: article})
    .then(response => callback(response))
    .catch(error => errorCallback(error))
  }

  static getArticle(articleId, errorCallback, callback) {
    axios(window.baseUrl + '/api/projects/' + articleId )
    .then(response => callback(response))
    .catch(error => errorCallback(error))
  }

  static getAuth(credentials, errorCallback, callback) {
    axios.post(window.baseUrl + '/api/authenticate', credentials)
    .then(response => callback(response))
    .catch(error => errorCallback(error))
  }

  //With form adata
  static setArticle(formData, errorCallback, callback) {
    axios.post(window.baseUrl + '/api/projects', formData)
    .then(response => callback(response))
    .catch(error => errorCallback(error))
  }

  static uploadFile(formData, errorCallback, callback) {
    axios.post(`${window.baseUrl}/api/upload`, formData)
    .then(callback)
    .catch(errorCallback)
  }

}
