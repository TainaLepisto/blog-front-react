import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  let blogList = request.data
  blogList.sort(function(a, b) {
    return b.likes - a.likes
  })
  return blogList
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, create, update, remove, setToken }
