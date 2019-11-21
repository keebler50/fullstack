import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = personObject => {
    return axios
        .post(baseUrl, personObject)
        .then(response => response.data)
}

const remove = id => {
    return axios
        .delete(baseUrl + `/${id}`)
}

const update = personObject => {
    return axios
        .put(baseUrl + `/${personObject.id}`, personObject)
        .then(response => response.data)
}

export default {
    getAll,
    create,
    remove,
    update
}