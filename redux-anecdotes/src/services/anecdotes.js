import axios from 'axios'


const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const getOne = async (id) => {
    const response = await axios.get(baseUrl)
    //console.log("got one from axios?: ",response.data.filter(x => x.id == id))//got it right
    return response.data.filter(x => x.id == id)
}

const getId = () => (100000 * Math.random()).toFixed(0)


const createNew = async (content) => {
    const object = {
        content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}


const vote = async (id) => {
    const response = await axios.get(baseUrl)
    
    const voted = response.data.filter(x => x.id == id)[0]
    voted.votes++
    
    const putting = await axios.put(baseUrl+"/"+id, voted)

    return voted
    
}



export default { getAll, createNew, vote, getOne, }