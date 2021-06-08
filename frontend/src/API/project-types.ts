import axios, {AxiosResponse} from "axios";

const url = '/project-types'

export default {
    getAllTypes(): Promise<AxiosResponse<any>> {
        return axios.get(url)
    },
    create(body: any): Promise<AxiosResponse<any>> {
        return axios.post(url, body)
    },
}