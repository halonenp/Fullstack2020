import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const getId = () => (1000000 * Math.random()).toFixed(0)

const createNew = async (content) => {
    const object = { content, id: getId(), votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}


const update = async (id, content, votes) => {
    const object = { content, id, votes }
    const response = await axios.put(`${baseUrl}/${id}`, object)
    return response.data
}

export default { getAll, createNew, update }