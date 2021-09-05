import axios from "axios";

const instance = axios.create({
	baseURL: 'https://amazon-clone-6532.herokuapp.com'
})

export default instance;