<template>
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__subscribe-form-container">
                <div class="subscribe-form">
                    <span class="subscribe-form__title">
                        Узнавайте о лучших предложениях и новинках раньше остальных!
                    </span>
                    <div class="subscribe-form__input-group">
                        <input type="text" class="subscribe-form__input-email" placeholder="Email" v-model="email">
                        <button class="subscribe-form__button">Подписаться</button>
                    </div>
                </div>
            </div>
            <hr class="footer__separator">
            <!-- <div class="footer__bottom-block">
                <div class="footer__bottom-block__col">
                    <div class="footer__logo-container">
                        <div class="footer__logo">
                            Clin
                        </div>
                    </div>
                </div>
                <div class="footer__bottom-block__col">
                    <div class="footer__services-container">
                        <div class="footer__services-title">
                            Наши услуги
                        </div>
                        <div class="footer__services">
                            <div class="footer__services-service">Поддерживающая</div>
                            <div class="footer__services-service">Комплексная</div>
                            <div class="footer__services-service">Мытьё окон</div>
                            <div class="footer__services-service">Генеральная уборка</div>
                        </div>
                    </div>
                </div>
                <div class="footer__bottom-block__col">
                    <div class="footer__address-container">
                        <div class="footer__address-title">
                            Адрес
                        </div>
                        <div class="footer__address-city">
                            г.Абакан
                        </div>
                        <div class="footer__address-street">
                            ул.Дружбы Народов 122-1
                        </div>
                    </div>
                    <div class="foooter__phones-container">
                        <div class="footer__phones-title">
                            Телефоны
                        </div>
                        <div class="footer__phones-group">
                            <div class="footer__phones__phone">
                                +7 (3902) 99-99-99
                            </div>
                            <div class="footer__phones__phone">
                                +7 (999) 99-99-99
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer__button-block__col">

                </div>
            </div> -->
        </div>
    </footer>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'

export default class Footer extends Vue {
    private email: string = ""
}

</script>

<style scoped>
.footer {
    background-color: rgba(64, 163, 255, 1);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 388px;
    width: 100%;
}

.footer__container {
    width: 1025px;
    height: 100%;
}

.subscribe-form {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.subscribe-form__input-email {
    width: 273px;
    height: 70px;
    box-sizing: border-box;
    padding-left: 22px;
    color: #8D8D8D;
    border:none;
    outline: none;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    margin-right: 14.5px;
}

.subscribe-form__input-email::placeholder {
    color: rgb(206, 206, 206);
}

.subscribe-form__button {
    cursor: pointer;
    width: 226px;
    height: 70px;
    color:white;
    background-color: black;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    border:none;
    transition: 0.1s;
}

.subscribe-form__button:hover {
    background-color: rgb(26, 26, 26);
}


.subscribe-form__title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;

    color: #FFFFFF;
    width: 480px;
    text-align: left;
}

.footer__separator {
    height: 2px;
    width: 100%;
    border:none;
    background-color: white;
    border-radius: 5px;
    margin-top: 40px;
    margin-bottom: 25px;
}

.footer__bottom-block {
    height: 172px;
}

.footer__logo-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
    width: 36px;
}

.footer__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    background-color: white;
    border:none;
    border-radius: 50%;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #40A3FF;
}
</style>