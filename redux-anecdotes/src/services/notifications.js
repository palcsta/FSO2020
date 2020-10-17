
const createNew = async (content) => {
    const object = {
        content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}