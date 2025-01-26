import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    return axios.get(baseUrl)
}

const add = (personObj) => {
    return axios.post(baseUrl, personObj)
}

const update = (id, personObj) => {
    return axios.put(`${baseUrl}/${id}`, personObj)
}

const del = (id, personObj) => {
    return axios.delete(`${baseUrl}/${id}`, personObj)
}

export default { getAll, add, update, del }