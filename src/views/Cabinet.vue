<template>
    <div class="cabinet-page">
        <div class="cabinet-page__content">
            <div class="signin-form-container" v-if="!user">
                <sign-in-form/>
            </div>
            <div class="cabiten-container" v-else>
                <div class="cabinet__header">
                    <div class="header__content">
                        <nav class="cabinet__navigation">
                            <ul class="cabinet__navigation">
                                <li class="navingation__element">
                                    <router-link class="navingation__link" to="/cabinet/orders" active-class="navigation__link_active">
                                        Заказы
                                    </router-link>      
                                </li>
                                <li class="navingation__element">
                                    <router-link class="navingation__link" to="/cabinet/profile" active-class="navigation__link_active">
                                        Профиль
                                    </router-link>
                                </li>
                                <li class="navingation__element">
                                    <router-link class="navingation__link" to="/cabinet/new-order" active-class="navigation__link_active">
                                        Новый заказ
                                    </router-link>
                                </li>
                            </ul>
                        </nav>
                        <div class="exit" @click="onLogoutClickHandler()">Выйти</div>
                    </div>
                </div>
                <div class="content-container">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>

import { RouterLink } from 'vue-router'
import { Vue, Options } from 'vue-class-component'
import { computed, defineComponent } from 'vue'
import SignInForm from '../components/SignInForm.vue'
import User from '../models/user.model'
import { Store, useStore } from 'vuex'
import StoreManager from '@/store/store-manager'

@Options({
    components: {
        RouterLink,
        SignInForm
    }
})
export default class Cabinet extends Vue{
    public storeManager = new StoreManager(useStore())

    get user() : User  | undefined 
    {
        return this.storeManager.state.user
    }

    beforeMount() {
        if (!this.user) { 
            this.$router.replace('/cabinet')
            return
        }

        if(this.$route.path === '/cabinet'){
            this.$router.replace(`/cabinet/orders`)
        }           
    }

    beforeUpdate() {
        if (!this.user) { 
            this.$router.replace('/cabinet')
            return
        }

        if(this.$route.path === '/cabinet'){
            this.$router.replace(`/cabinet/orders`)
        }     
    }

    async onLogoutClickHandler() {
        await this.storeManager.actions.LOGOUT()
        this.$router.replace('/')
    }
}

</script>

<style>

.cabinet-page {
    width: 100%;
    min-height: 100vh;
}

.cabinet-page__content {
    width: 100%;
    min-height: 100vh;
    background-color: rgb(64, 163, 255, 0.15) ;
}

.signin-form-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cabinet__header {
    display: flex;
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 1);
    align-items: center;
    z-index: 5;
    margin-bottom: 10px;
}

.header__content {
    width: 100%;
    display: flex;
    margin: 0px 50px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 29px;

    color: #7F7F7F;
}

.cabinet__navigation {
    display: flex;
    width: 100%;
    list-style: none;
    align-items: center;
}

.navingation__link {
    text-decoration: none;
    margin-right: 53px;
    color: #7F7F7F;
    transition: 0.5s;
}

.navigation__link_active {
    color: rgba(64, 163, 255);
}

.exit {
    cursor: pointer;
}

.exit:hover{
    color: #5c5b5b;
}

.content-container {
    padding-bottom: 10px;
    display: flex;
    width: 100%;
    min-height: calc(100vh - 70px);
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.cabinet-page {
    background-image: url("../assets/images/home/company_background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

}

.navingation__link {
    position: relative;
}

.navingation__link::after {
    position: absolute;
    top: 25px;
    left: 0;
    content: "";
    height: 2px;
    background: rgba(64, 163, 255, 1);
    width: 0%;
    border:none;
    border-radius: 50%;
}

.navigation__link_active::after {
    width: 100%;
    content: " ";
    transition: 0.2s;
}

.cabiten-container {
    width: 100%;
    min-height: 100vh;
}

</style>