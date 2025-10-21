import axios from "axios";

const client = axios.create({
    baseURL: "http://10.1.0.1:32323/",
    timeout: 40000
})

export default client;