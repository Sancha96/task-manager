import axios, {AxiosResponse} from "axios";

const url = '/tasks'

export default {
    getTasks(params: any): Promise<AxiosResponse<any>> {
        return axios.get(`${url}?project=${params.projectId}&stage=${params.stageId}`)
    },
    updateStatusTask(id: any, item: any): any {
        return axios.patch(`${url}/${id}`, item)
    },
    create(body: any): any {
        return axios.post(url, body)
    }
}