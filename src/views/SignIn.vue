<template>
    <div class="sign-in">
        <div class="form-container">
            
            <form class="form" v-if="!inputCodeMode" @submit.prevent="onGetCodeSubmit()">
                <h3 class="form__title form__item">Личный кабинет</h3>
                <input type="text" 
                v-model="phone" 
                class="form__item input-phone" 
                placeholder="+7(999)888-77-66"
                />
                <div class="checkbox-container form__item">
                    <input type="checkbox" v-model="agree" class="checkbox"/>
                    <span class="checkbox__information">
                        Соглашаюсь на обработку персональных данных
                    </span>
                </div>
                <button type="submit" class="form__submit">Получить код</button>
            </form>

            <div class="form" v-else @submit.prevent="null">
                <h3 class="form__title form__item">Личный кабинет</h3>
                <div class="phone-container">Мы отправили код на номер:
                    <span class="phone">{{phone}}</span>
                </div>
                <input type="text" 
                v-model="code" 
                class="form__item input-code"
                placeholder="Code"
                @input="onCodeEditedHandler()" 
                />
                <div class="change-phone" @click="onChangePhoneClicked()">Сменить</div>
                <button type="button" class="form__submit">Отправить запрос повторно</button>
            </div >

        </div>
    </div>
</template>

<script lang="ts">
import { Vue,  Options, setup } from 'vue-class-component'
import axios from 'axios'

@Options({})
export default class SignIn extends Vue {
    private phone: string = ""
    private code: string = ""
    private agree: boolean = false
    private inputCodeMode: boolean = false
    private timer = 60
    private getCodeButtonDisabled = false
    private getCodeButtonAgainDisabled = false

    async onGetCodeSubmit() {
        try 
        {
            const response = await axios.post("http://localhost:5000/auth/get_code", {
                phone: this.phone
            })
            
            const code = response.data.code
            
            this.inputCodeMode = true
            
            console.log(`Code: ${code}`)
        }
        catch(error)
        {
            console.error(error)
        }
    }

    async onGetCodeAgain() {    
        try 
        {
            const response = await axios.post("http://localhost:5000/auth/get_code", {
                phone: this.phone
            })
            
            const code = response.data.code
            
            console.log(`Code: ${code}`)
        }

        catch(error)
        {
            console.error(error)
        }
    }

    onChangePhoneClicked() {
        this.code = ""
        
        this.phone = ""
        
        this.inputCodeMode = false
    }

    async onCodeEditedHandler() {
        console.log("Code edited")

        const code = this.code.slice()
        
        if(code.length < 4) {
            return
        }

        try
        {
            const response = await axios.post('http://localhost:5000/auth/login',{
                phone: this.phone,
                code: this.code
            })
            
            console.log(response.data)
        }
        catch(error: any) 
        {  
            if(error.response.status === 401) 
            {
                alert("Unauthorized")
            }
        }
    }
}

</script>

<style scoped>
    .sign-in {
        height: 100%;
        width: 100%;
        position: relative;
        background-image: url("../assets/images/home/company_background.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        
    }

    .form-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(64, 163, 255, 0.15) ;
    }

    .form {
        z-index: 100;
        width: 743px;
        height: 506px;
        background-color: white;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        padding: 50px 80px 50px 80px;
    }

    .form__title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 48px;
        line-height: 59px;
        color: #40A3FF;
        text-align: left;
    }

    .form__item {
        margin-bottom: 50px;
    }

    .input-phone, .input-code {
        box-sizing: border-box;
        height: 95px;
        width: 100%;
        padding: 34px 28px 34px 28px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 23px;
        line-height: 28px;
        color: #8D8D8D;
        outline: none;
        border-style:solid;
        border-color: #b9b9b9;
    }

    .input-phone::placeholder, .input-code::placeholder {
        color: #b6b6b6
    }

    .input-phone:focus, .input-code:focus {
        border-color: #40A3FF;
    }

    .form__submit {
        cursor: pointer;

        width:100%;
        height: 70px;
        background-color: #40A3FF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        color:white;
        border:none;

        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 23px;
        line-height: 28px;
        transition: 0.5s;
    }

    .form__submit:hover {
        background-color: #79beff;
        transform: translate(0,-5px);
    }

    .checkbox {
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        border-color: #40A3FF;
        background: none;
    }

    .checkbox-container {
        display: flex;
        width: 100%;
        text-align: start;
    }

    .checkbox__information {
        margin-left: 20px;
        width: 305px;

        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;

        color: #000000;
    }

    .phone-container {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 23px;
        line-height: 28px;
        color: #40A3FF;
    }

    .phone {
        font-weight: bold;
    }

    .change-phone {
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height */

        display: flex;
        align-items: flex-end;
        text-decoration-line: underline;

        color: #939393;
    }

</style>