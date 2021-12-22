<template>
  <div class="input-contact-information">
      <div class="input-container">
          <input type="text" placeholder="Фамилия" v-model="lastNameModel" @input="onLastNameInput()">
      </div>
      <div class="input-container">
          <input type="text" placeholder="Имя" v-model="firstNameModel" @input="onFirstNameInput()">
      </div>
      <div class="input-container">
          <input type="text" placeholder="Отчество" v-model="middleNameModel" @input="onMiddleNameInput()">
      </div>
      <div class="input-container">
          <input type="text" placeholder="Телефон" v-maska="'+7(###)###-##-##'" v-model="phoneModel" @input="onPhoneInput()">
      </div>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from "vue-class-component";
import { maska } from 'maska'
import UserModel from '@/models/user.model'

@Options({
    props: {
        user: UserModel
    },
    directives: {
        maska
    }
})
export default class InputContactInformation extends Vue {
    public user!: UserModel

    public firstNameModel: string = this.user.firstName ?? ""
    public lastNameModel: string = this.user.lastName ?? ""
    public middleNameModel: string = this.user.middleName ?? ""
    public phoneModel: string = this.user.phone ?? ""

    mounted() {
        this.firstName = this.user.firstName
        this.lastName = this.user.lastName
        this.middleName = this.user.middleName
        this.phone = this.user.phone
    }
    
    public set firstName(value: string) {
        this.$emit("firstname-edited", value)
    }

    public set lastName(value: string) {
        this.$emit("lastname-edited", value)
    }

    public set middleName(value: string) {
        this.$emit('middlename-edited', value)
    }

    public set phone(value: string) {
        this.$emit('phone-edited', value)
    }

    public onFirstNameInput() {
        this.firstName = this.firstNameModel
    }

    public onLastNameInput() {
        this.lastName = this.lastNameModel
    }

    public onMiddleNameInput() {
        this.middleName = this.middleNameModel
    }

    public onPhoneInput() {
        this.phone = this.phoneModel
    }
}

</script>

<style scoped>

input {
    /* identical to box height */
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
    color: #8D8D8D;
}

input::placeholder {
    color: rgb(206, 206, 206);

}

input:focus {
    border-color: #40A3FF;
}

.input-container {
    margin-bottom: 22px;
}

.input-container:last-child {
    margin-bottom: 0px;
}

</style>