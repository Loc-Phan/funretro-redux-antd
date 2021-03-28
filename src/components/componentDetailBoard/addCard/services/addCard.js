import axios from 'axios'

const fetchAddCard = (card) => {
    const data = axios.post('https://backendretro1712512.herokuapp.com/card/create', { ...card })
        .then((res) => {
            // console.log(res.data)
            return res.data.data
        })
        .catch((err) => {
            console.log(err)
            return null
        })
    return data
}

export default fetchAddCard