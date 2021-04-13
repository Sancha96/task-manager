import axios, {AxiosResponse} from "axios";

const url = '/projects'

export default {
    getList(): Promise<AxiosResponse<any>> {
        return axios.get(url)
    }
}