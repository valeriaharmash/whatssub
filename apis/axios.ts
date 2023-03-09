import axios from "axios";


const client = axios.create({
	baseURL: "https://realtimerail.nyc"
})

export default client
