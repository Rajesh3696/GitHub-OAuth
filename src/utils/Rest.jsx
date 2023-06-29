import axios from 'axios'

const defaultHeaders = {
  Accept: 'application/json',
  auth: sessionStorage.getItem('token'),
  'X-GitHub-Api-Version': '2022-11-28',
  'Access-Control-Allow-Origin': '*',
}
export const checkData = (response) => {
  if (
    response.data &&
    response.data.status >= 200 &&
    response.data &&
    response.data.status < 400
  ) {
    return response.data
  }
  return response
}
export const httpGet = (url) => {
  return axios('https://api.github.com' + url, {
    method: 'GET',
    headers: defaultHeaders,
  }).then(checkData)
  // .catch(checkError)
}
export const httpPost = (url, body) => {
  return axios
    .post(url, body, {
      headers: defaultHeaders,
    })
    .then(checkData)
  // .catch(checkError)
}
