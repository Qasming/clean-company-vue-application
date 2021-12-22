<template>
  <div class="mobile-application-form">
      <form action="" class="mobile-application-form__form">
            <div class="mobile-application-form__title form__element">
                Скачай приложение и получи скидку
            </div>
            <input
            class="mobile-application-form__input-phone form__element" 
            v-model="phone" 
            placeholder="+7(983)255-75-32"
            v-maska="'+7(###)###-##-##'"/>
            <button class="mobile-application-form__submit form__element">Получить ссылку</button>
      </form>
      <div class="mobile-application-form__image"/>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'
import { maska } from 'maska'

@Options({
    directives: {
        maska
    }
})
export default class MobileAppilcationForm extends Vue {
    private phone: string = ""
}

</script>

<style scoped>

.mobile-application-form {
    padding: 60px 45px;
    background: #FFFFFF;
    border: 1px solid #40A3FF;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px #48A4FB;
    border-radius: 5px;
    width: 1116px;
    height: 475px;

    display: flex;
    justify-content: space-between;
}

.mobile-application-form__image {
    width: 525px;
    height: 354px;
    border-radius: 5px;
    box-sizing: border-box;
    background-position: center;
    background-image: url("../assets/images/mobile-application.jpg");
    background-size: cover;
    background-repeat: no-repeat;    
}

.mobile-application-form__title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 35px;
    line-height: 43px;
    text-decoration-line: underline;
    text-align: left;
    color: #40A3FF;
}

.mobile-application-form__form {
    width: 398px;
}


.mobile-application-form__input-phone {
    /* identical to box height */
    width: 100%;
    height: 70px;
    
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    background-color: white;

    border: 1px solid #b9b9b9;
    box-sizing: border-box;
    outline: none;
    padding: 5px 20px;
    color: #8D8D8D;
}

.mobile-application-form__input-phone::placeholder {
    color: rgb(206, 206, 206);

}

.mobile-application-form__input-phone:focus {
    border-color: #40A3FF;
}

.form__element {
    margin-bottom: 45px;
}

.mobile-application-form__submit {
    width: 100%;
    height: 75px;
    background: #40A3FF;
    border-radius: 4px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: #FFFFFF;
    border-style: none;
}

</style>