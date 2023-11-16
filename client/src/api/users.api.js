import axios from 'axios';

export const getAllUsers = () => {
    return axios.get("http://24.144.85.42:8001/records/api/v1/users/")
}