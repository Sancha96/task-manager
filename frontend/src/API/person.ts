import axios, {AxiosResponse} from "axios";

const url = '/persons'

export default {
    getStudents(): Promise<AxiosResponse<any>> {
        return axios.get(`${url}?type=student`)
    }
}