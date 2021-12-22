import { Store } from 'vuex'
import { State } from './interfaces'
import User from '@/models/user.model'

export default class Mutations {
    constructor(private store: Store<State>){}

    SET_USER(user: User | undefined) {
        this.store.commit('SET_USER', user)
    }
}