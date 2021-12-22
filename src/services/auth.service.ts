import axios from 'axios'
import { reactive, computed } from 'vue';
import { API_URL } from '@/config'
import User from '@/models/user.model'

import authHeader from '@/headers/auth.header'
import UnathorizedError from '@/error/unauthorized.error'

class AuthService {
    async login(phone: string, code: string) : Promise<string>{
        try{
            const response = await axios.post(`${API_URL}/auth/login`, {
                phone,
                code
            })
            
            let access_token = response.data.access_token

            localStorage.setItem('Authorization', access_token)
            
            return access_token

        }catch(e){
            if (axios.isAxiosError(e)){
                
                if(e.response?.status === 401) {
                    localStorage.removeItem('Authorization')
                    throw new UnathorizedError()
                }
            }
            throw e
        }
    }

    async sendCodeToPhone(phone: string) : Promise<boolean> {
        try {
            const response = await axios.post(`${API_URL}/auth/get_code`, { phone })
            let code = response.data.code
            console.log(code)
            return true
        }catch(e){
            throw e
        }
    }

    async getCurrentUser() : Promise<User> {
        try {
            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: authHeader()
            })
            const user = new User()
            user.id = response.data.id
            user.name = response.data.name
            user.phone = response.data.phone
            user.tag = response.data.tag
            user.firstName = response.data.first_name
            user.lastName = response.data.last_name
            user.middleName = response.data.middle_name
            user.email = response.data.email
            console.log(user)
            return user;
        }catch(e){
            if(axios.isAxiosError(e)){
                if(e.response?.status == 401) {
                    localStorage.removeItem('Authorization')
                    throw new UnathorizedError()
                }
            }
            throw e
        }
    }

    async logout() : Promise<void>{
        localStorage.removeItem('Authorization')
    }
}

 
export default new AuthService()