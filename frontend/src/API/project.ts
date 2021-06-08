import axios, {AxiosResponse} from "axios";
import qs from "querystring";

const url = '/projects'

export default {
    getList(params: any): Promise<AxiosResponse<any>> {
        return axios.get(`${url}/?${qs.stringify(params)}`)
    },
    getById(id: any): Promise<AxiosResponse<any>> {
        return axios.get(`${url}/${id}`)
    },
    create(body: any): Promise<AxiosResponse<any>> {
        return axios.post(url, body)
    },
    updateProject(id: any, item: any): any {
        return axios.patch(`${url}/${id}`, item)
    },
}