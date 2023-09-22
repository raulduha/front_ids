import axios from 'axios';

export const getAllUsers = () => {
    return axios.get("http://localhost:8000/records/api/v1/users/")
}