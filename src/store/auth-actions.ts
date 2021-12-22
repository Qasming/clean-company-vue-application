import { Store } from 'vuex'
import { State } from './interfaces'

export default class AuthActions {
    constructor(
        private store: Store<State>
    ) {}
}