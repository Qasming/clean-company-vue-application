<template>
  <div class="signin-form">
      <h1 class="signin-form__title form__item">Личный кабинет</h1>
      <form class="get-code-form" @submit.prevent="onGetCodeFormSubmitHandler()" v-if="!inputCodeMode">
          <input type="text" class="get-code-form__input-phone form__item input"
            v-model="phone" 
            placeholder="+7(###)##-##-##"
            v-maska="'+7(###)###-##-##'"
            />
          <div class="get-code-form__checkbox-container form__item">
              <input type="checkbox" class="get-code-form__checkbox"/>
              <span class="get-code-form__checkbox-description">
                  Соглашаюсь на обработку персональных данных
              </span>
          </div>
          <button class="get-code-form__submit-button" :disabled=getCodeButtonDisabled>Получить код</button>
      </form>
      
      <dev class="input-code-form" v-else>
          <div class="input-code-form__phone-container input-code-form__item">
                Код был отправлен по SMS на номер: 
                <span class="input-code-form__phone">{{phone}}</span>
          </div>
          <div class="input-code-form__edit-phone-button input-code-form__item" @click="onChangeCodeClickHandler()">
              Сменить номер телефона
          </div>
          <input type="text" 
          class="input-code-form__item input" :class="{'unauthorization_error': unauthorizationError}" 
          placeholder="Код" 
          v-maska="'####'"
          v-model="code" 
          @input="onCodeEditedHandler()"/>
          <div class="input-code-form__error input-code-form__item" v-if="unauthorizationError">Неверный код</div>
          <button @click="onGetCodeAgainClickHandler()" :disabled="getCodeButtonAgainDisabled">Отправить повторно</button>
      </dev>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { useStore } from 'vuex'
import { maska } from 'maska'
import UnauthorizationError from "../error/unauthorized.error"
import StoreManager from '@/store/store-manager'

@Options({
    directives: {
        maska
    }
})
export default class SignInForm extends Vue {
    public inputCodeMode: boolean = false
    public phone: string =""
    public code: string = ""
    public unauthorizationError = false
    public getCodeButtonDisabled = false
    public getCodeAgainButtonDisabled = false
    private storeManager = new StoreManager(useStore())

    async onGetCodeFormSubmitHandler() {
        const phonePattern = "+7(###)###-##-##"
        if(this.phone.length !== phonePattern.length) {
            return
        }

        try
        {
            this.getCodeButtonDisabled = true
            await this.sendCodeToPhone(this.phone)
            this.inputCodeMode = true
            this.getCodeButtonDisabled = false
        }
        catch(e:any) 
        {
            console.error(e)
        }
    }

    onCodeEditedHandler() {
    
        if (this.code.length < 4) return
        
        this.login(this.phone, this.code)
        .then((result)=>{})
        .catch(e=>{
            this.unauthorizationError = true
        }) 
    }

    onChangeCodeClickHandler() {
        this.code = ""
        this.phone = ""
        this.inputCodeMode = false
    }

    async onGetCodeAgainClickHandler() {
        await this.sendCodeToPhone(this.phone)
    }

    async sendCodeToPhone (phone:string) : Promise<boolean> {
        return this.storeManager.actions.SEND_CODE_TO_PHONE({
            phone
        })
    }

    async login(phone: string, code: string) : Promise<any> {
        return this.storeManager.actions.LOGIN({
            phone,
            code
        })
    }
}

</script>

<style scoped>
.signin-form {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    box-sizing: border-box;
    min-width: 630px;
    min-height: 380px;
    background-color:white;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    padding: 38px 50px;
}

.signin-form__title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 46px;

    color: #40A3FF;

    width: 100%;
    text-align: start;
}

.input {
    /* identical to box height */
    width: 100%;
    height: 60px;
    
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

.input::placeholder {
    color: rgb(206, 206, 206);

}

.input:focus {
    border-color: #40A3FF;
}



.unauthorized_error {
    border-color:rgb(255, 55, 55)
}




button {
    cursor: pointer;

    width: 100%;
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

button:hover {
    background-color: #79beff;
    transform: translate(0,-5px);
}

button:disabled {
    box-shadow: none;
    background-color: rgb(194, 194, 194);
    transform: translate(0,0px);
}

.get-code-form__checkbox-container {
    display: flex;
    width: 100%;
}

.get-code-form__checkbox {
    margin-right: 30px;
    height: 40px;
    width: 40px;
}


.get-code-form__checkbox-description {
    width: 305px;
    text-align: start;

    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    color: #000000;
}

.form__item {
    margin-bottom: 34px;
}

.input-code-form__phone-container {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */
    text-align: left;


    color: #40A3FF;
}

.input-code-form__phone {
    font-weight: bold;
}

.input-code-form__edit-phone-button {
    cursor: pointer;
    width: 100%;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */
    text-align: left;
    text-decoration-line: underline;

    color: #40A3FF;
}

.input-code-form__item {
    margin-bottom: 21px;
}

.unauthorization_error, .unauthorization_error:focus{
    border-color: red;
}

.input-code-form__error {
    width: 100%;
    text-align: left;
    color:red;
    font-size: 14px;
    font-family: Montserrat;
}

</style>