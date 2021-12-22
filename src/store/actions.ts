import { Store } from 'vuex'
import { State, LoginDto, SendCodeToPhoneDto } from './interfaces'

export default class Actions {
    constructor(private store: Store<State>){}

    async LOGIN(loginData: LoginDto) {
        return this.store.dispatch('LOGIN', loginData)
    }

    async SEND_CODE_TO_PHONE(data: SendCodeToPhoneDto) {
        return this.store.dispatch('SEND_CODE_TO_PHONE', data)
    }

    async LOGOUT() {
        return this.store.dispatch('LOGOUT')
    }
}
