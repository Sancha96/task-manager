import axios, {AxiosResponse} from "axios";

const url = '/auth'

export default {
    login(body: any): Promise<AxiosResponse<any>> {
        return axios.post(`${url}/login`, body)
    }
}