import axios, {AxiosResponse} from "axios";

const url = '/stages'

export default {
    getStagesByTypeId(id: any): Promise<AxiosResponse<any>> {
        return axios.get(`${url}?type=${id}`)
    },
    getStageById(id: any): Promise<AxiosResponse<any>> {
        return axios.get(`${url}/${id}`)
    },
    create(body: any): Promise<AxiosResponse<any>> {
        return axios.post(url, body)
    },
}