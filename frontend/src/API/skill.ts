import axios, {AxiosResponse} from "axios";

const url = '/skills'

export default {
    getSkills(): Promise<AxiosResponse<any>> {
        return axios.get(url)
    },
    create(body: any): Promise<AxiosResponse<any>> {
        return axios.post(url, body)
    },
}