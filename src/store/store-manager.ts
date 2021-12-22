import { Store } from "vuex";
import { State } from './interfaces'
import Actions from './actions'
import Mutations from './mutations'

export default class StoreManager {
    private store: Store<State>;

    constructor(store: Store<State>) {
        this.store = store
    }

    get state() : State { 
        return this.store.state 
    }

    get actions() : Actions {
        return new Actions(this.store)
    }
    
    get mutations() : Mutations {
        return new Mutations(this.store)
    }
}



