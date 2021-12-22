import { API_URL } from '@/config'
import User from '@/models/user.model'
import axios from 'axios'
import authHeader from '../headers/auth.header'

class UserService {
    private API = `${API_URL}/users`

    async editUser(data: {
        first_name: string,
        last_name: string,
        middle_name: string,
        email: string
    }) : Promise<User> {
        const receivedUser = await axios.post(`${this.API}/update`, data, {
            headers: authHeader()
        })
        const user = new User()
        user.id = receivedUser.data.id
        user.email = receivedUser.data.email
        user.firstName = receivedUser.data.first_name
        user.lastName = receivedUser.data.last_name
        user.middleName = receivedUser.data.middle_name
        return user
    }
}

const service = new UserService()

export default service;