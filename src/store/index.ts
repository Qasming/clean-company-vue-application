import User from '@/models/user.model'

import { createStore } from 'vuex'

import { State, LoginDto, SendCodeToPhoneDto } from './interfaces'

import AuthService from '@/services/auth.service'



export default createStore<State>({
    state: {
        user: undefined,
        // services: [],
    },
    mutations: {
        SET_USER(state, user: User) {
            state.user = user
        }
    },
    actions: {
        async LOGIN({commit}, { phone, code }: LoginDto) : Promise<User> {
            try{
                await AuthService.login(phone, code);
                const user = await AuthService.getCurrentUser()
                commit('SET_USER', user)
                return user
            }
            catch(e)
            {
                commit('SET_USER', undefined)
                throw e
            } 
        },

        async SEND_CODE_TO_PHONE({commit}, {phone} : SendCodeToPhoneDto) : Promise<boolean> {
            try{
                return await AuthService.sendCodeToPhone(phone)
            }
            catch(e) {
                throw e
            }
        },

        async LOGOUT({commit}) : Promise<void> {
            commit('SET_USER', undefined)
            return AuthService.logout()
        }
    }
})