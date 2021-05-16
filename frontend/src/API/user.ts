import axios, {AxiosResponse} from "axios";

const url = '/users'

export default {
    register(body: any): Promise<AxiosResponse<any>> {
        return axios.post(url, body)
    }
}