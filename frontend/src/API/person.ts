import axios, {AxiosResponse} from "axios";

const url = '/persons'

export default {
    getStudents(): Promise<AxiosResponse<any>> {
        return axios.get(`${url}?type=student`)
    },
    getTeachers(): Promise<AxiosResponse<any>> {
        return axios.get(`${url}?type=teacher`)
    },
    getPersonByUserId(userId: any): Promise<AxiosResponse<any>> {
        return axios.get(`${url}?userId=${userId}`)
    }
}