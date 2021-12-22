<template>
    <div class="profile">
        <div class="profile__col col-1">
            <div class="profile__photo-editor">
                <div class="profile__photo-container">
                    <img src="../assets/images/avatar.svg" alt="" class="profile__photo" v-if="!user.photo">
                    <img :src="user.photo" alt="" class="profile__photo" v-else>
                </div>
                <button class="profile__change-photo-button">
                    Сменить фотографию
                </button>
            </div>
        </div>
        <div class="profile__col col-2">
            <!-- <div class="profile__title-container">
                <span class="profile__title">
                    Личный данные
                </span>
            </div> -->
            <div class="profile__fields-container">
                    <div class="profile__fields-title-container">
                        <div class="profile__fields-title">
                            Основное
                        </div>
                        <hr class="profile__fields-title-seporator"/>
                    </div>
                    <div class="profile__fields-group">
                        <input type="text" class="profile__field" placeholder="Фамилия" v-model="lastNameField">
                        <input type="text" class="profile__field" placeholder="Имя" v-model="firstNameField">
                        <input type="text" class="profile__field" placeholder="Отчество" v-model="middleNameField">
                    </div>
                </div>
                <div class="profile__fields-container">
                    <div class="profile-editor__fields-title-container">
                        <div class="profile__fields-title">
                            Дополнительно
                        </div>
                        <hr class="profile__fields-title-seporator"/>
                    </div>
                    <div class="profile__fields-group">
                        <input type="text" class="profile__field" placeholder="Email" v-model="emailField">
                    </div>
                    <div class="profile__save-settings-button-container">
                        <button class="profile__save-settings-button" @click="onButtonClickHandler()">Сохранить</button>
                    </div>
                </div>
        </div>
    </div>
</template>

<script lang="ts">

import User from '@/models/user.model'
import { Vue, Options } from 'vue-class-component'
import { useStore } from 'vuex'
import StoreManager from '@/store/store-manager'
import userService from '@/services/user.service'

@Options({})
export default class ProfileEditer extends Vue {

    public storeManager = new StoreManager(useStore())

    private get user() : User | undefined {
        return this.storeManager.state.user
    }
    private firstNameField: string = this.user ? this.user.firstName  ?? "": ""
    private lastNameField: string = this.user ? this.user.lastName ?? "" : ""
    private middleNameField: string = this.user ? this.user.middleName  ?? "": ""
    private emailField: string = this.user ? this.user.email ?? "" : ""
    private phoneField: string = this.user ? this.user.phone ?? "" : ""

    async onButtonClickHandler() {
        const user = await userService.editUser({
            first_name: this.firstNameField,
            last_name: this.lastNameField,
            middle_name: this.middleNameField,
            email: this.emailField
        })
        this.storeManager.mutations.SET_USER(user)
        alert("Данный сохранены")
    }
}

</script>

<style scoped>
.profile {
    display: flex;
    padding: 50px;
    width: 900px;
    height: 600px;
    background-color:white;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
}

.profile__col {
    height: 100%;
}

.profile__photo {
    width: 140px;
    height: 140px;
}

.photo-container {
    width: 160px;
    height: 160px;
    border:none;
    border-radius: 50%;
    overflow: hidden;
}

.profile__change-photo-button {
    cursor: pointer;
    width: 150px;
    height: 50px;
    border-width: 1px;
    border-style: solid;
    border-color: #40A3FF;
    transition: 0.5s;
    color: #40A3FF;
    background-color:white;

    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
}

.profile__change-photo-button:hover {
    color: white;
    background-color:#40A3FF;
}

.profile__fields-container {
    width: 100%;
}

.profile__fields-title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    line-height: 32px;
    /* identical to box height */
    color: #40A3FF;
    text-align: left;
}

.profile__fields-title-seporator {
    width: 100%;
    height: 1px;
    border:none;
    background-color: #40A3FF;
    margin-top: 10px;
    margin-bottom: 30px;
}

.profile__fields-group {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.col-1 {
    margin-right: 50px;
}

.col-2 {
    flex-grow: 1;
}

.profile__field {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */
    text-align: left;


    color: #40A3FF;
}

.profile__field {
    width: 100%;
    height: 60px;
    
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    background-color: white;

    border: 1px solid #89c6ff;
    box-sizing: border-box;
    outline: none;
    padding: 5px 20px;
    color: #8D8D8D;;
    margin-bottom: 20px;
}

.profile__field:focus {
    border-color: #40A3FF;
}

.profile__field::placeholder {
    color: rgb(206, 206, 206);
}

.profile__photo-container {
    margin-top: 60px;
}


.profile__save-settings-button-container {
    width: 100%;
    display: flex;
    justify-content: right;
}

.profile__save-settings-button {
    cursor: pointer;

    width: 300px;
    height: 53px;

    background: #40A3FF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;

    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    /* identical to box height */
    color: #FFFFFF;
    transition: 0.5s;
}

.profile__save-settings-button:hover {
    background-color: #99ceff;
    transform: translate(0,-5px);
}

.profile__title-container {
    display: flex;
    justify-content: left;
    width: 100%;
}

.profile__title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 46px;
    color: #40A3FF;
}

</style>