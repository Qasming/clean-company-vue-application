import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import authService from './services/auth.service'
import StoreManager from './store/store-manager'

(async ()=> {
    const storeManager = new StoreManager(store)
    const app = createApp(App).use(store)
    app.use(router)
    app.use(store)
    
    try
    {
        const user = await authService.getCurrentUser()
        storeManager.mutations.SET_USER(user)
    }
    
    catch(e){}
    
    finally {
        app.mount('#app')
    }
   
})()

// const app = createApp(App).use(store)
// app.use(router)
// app.use(store)
// app.mount("#app")