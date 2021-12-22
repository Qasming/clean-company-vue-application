<template>
    <div class="home">
        <Header/>
        <div class="landing">
            <div class="landing__text-container">
                <h1 class="landing__title">Ваш дом в наших руках</h1>
                <h3 class="landing__info" >Клининговые услуги</h3>
            </div>
        </div>
        <div class="content">
        <div class="page-block">
            
            <div class="page__services-container container">
                <!-- <ServiceCarousel :services="services"></ServiceCarousel> -->
                <ServiceList :services="services" v-if="services.length > 0"></ServiceList>
                <spinner v-else></spinner>  
            </div>
        </div>
        <div class="page-block  about-us-container">
            <div class="about-us-content">
            <div class="about-us-title-container">
                <div class="about-us-title">
                    Немного о нас
                </div>
            </div>
            </div>
            <div class="about-us-content">
                <div class="page-block__information-blocks-container">
                    <div class="information-blocks">
                        <div class="information-blocks__row">
                        <div class="information-block">
                        <img class="information-block__icon information-block__element" src="../assets/images/security.svg"/>
                        <h3 class="information-block__title information-block__element">
                            100% безопасность
                        </h3>
                        <p class="information-block__description">
                            Регулярно измеряем t исполнителей. Работаем в масках
                        </p>
                    </div>
                    <div class="information-block">
                        <img class="information-block__icon information-block__element" src="../assets/images/employee.svg"/>
                        <h3 class="information-block__title information-block__element">
                            Постоянство
                        </h3>
                        <p class="information-block__description">
                            Закрепляем за вами постоянного исполнителя
                        </p>
                    </div>
                        </div>
                        <div class="information-blocks__row">
                        <div class="information-block">
                            <img class="information-block__icon information-block__element" src="../assets/images/kachestvo.svg"/>
                            <h3 class="information-block__title information-block__element">
                                Качество
                            </h3>
                            <p class="information-block__description">
                                Мы тщательно отбираем и обучаем исполнителей в нашем сервисе заказ уборки
                            </p>
                        </div>
                        <div class="information-block">
                            <img class="information-block__icon information-block__element" src="../assets/images/service.svg"/>
                            <h3 class="information-block__title information-block__element">
                                Удобный сервис
                            </h3>
                            <p class="information-block__description">
                                Оплата картой, сдача кобчей в офис, управление заказами в приложении
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="page-block__mobile-application-form-container">
                    <MobileApplicationForm></MobileApplicationForm>
                </div>
            </div>
        </div>
        
        
        
        <div class="page-block">
            <div class="page-block__reviews-container">
                <h1 class="page-block__title page-block__reviews-title">Отзывы наших клиентов</h1>
                <ReviewList :reviews="reviews"/>
            </div>
        </div>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">

import Service from '../models/service.model'
import ServiceList from '../components/ServiceList.vue'
import ReviewList from '../components/ReviewList.vue'
import { Vue, Options } from 'vue-class-component'
import Client from '../models/client.model'
import Review from '../models/review.model'
import ServiceCarousel from '../components/ServiceCarousel.vue'
import MobileApplicationForm from '../components/MobileApplicationForm.vue'
import InformationBlock from '../components/InformationBlock.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Spinner from '../components/Spinner.vue'
import axios from 'axios'
import { API_URL } from '@/config'
// import api from '@/api'

@Options({
    components: {
        ServiceList,
        ReviewList,
        ServiceCarousel,
        MobileApplicationForm,
        InformationBlock,
        Header,
        Footer,
        Spinner
    }
})
export default class Home extends Vue {
    public services: Service[] = []

    public clients: Client[] = [
        {
            id: 1,
            name: "Елена",
            photo: "client_1.jpg"
        },
        {
            id: 2,
            name: "Мария",
            photo: "client_2.jpg"
        },
        {
            id: 3,
            name: "Николай",
            photo: "client_3.jpg"
        },
    ]

    public reviews: Review[] = [
        {
            id: 1,
            client: this.clients[0],
            text: "Мне все понравилось. Чистота и порядок. Спасибо",
            date: new Date(),
            assessment: 4
        },
        {
            id: 2,
            client: this.clients[1],
            text: "Спасибо, что навели чистоту после ремонта. Одной мне было не справиться.",
            date: new Date(),
            assessment: 5
        },
        {
            id: 2,
            client: this.clients[2],
            text: "Всё на высшем уровне.Цена и качество соответсвуют",
            date: new Date(),
            assessment: 5
        }
    ]

    async beforeMount() {
       let response = await axios.get(`${API_URL}/services`)
       console.log(response.data)
       let list: Service[] = []
       for (let i = 0; i < 4; i++) {
           const service = new Service()
           debugger
           let element = response.data[i]
           service.id = element.id
           service.name = element.name
           service.description = element.description
           service.details = [
               ...(element.details)
           ]
           service.price  = element.price
           list.push(service)
       }
       this.services.push(...list)
    }
}

</script>

<style scoped>
.page-block {
    margin-top: 71px;
    margin-bottom: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.page-block__title {
    margin-bottom: 40px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 49px;
    text-align: center;
    color: #180D5F;
}

.landing {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 800px;
    background-image: url("../assets/images/home/company_background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.landing__text-container{
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: rgba(196, 196, 196, 0.5);
    
}

.landing__title, .landing__info {
    color: #180D5F;
    font-family: "Montserrat";
}

.landing__title {
    text-transform: uppercase;
    font-size: 70px;
    font-weight: bolder;
    margin-bottom: 20px;
}

.landing__info {
    font-size: 50px;
    font-weight: 600;  
}

.order-container {
    display: flex;
}

.order-container__image {
    width: 793px;
    height: 620px;
}

.information-block {
    width: 413px;
}

.information-block__icon {
    width: 100px;
    height: 100px;
}

.information-block__title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */
    color: #48A4FB;
}

.information-block__description {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 300;
    font-size: 28px;
    line-height: 34px;
    text-align: center;

    color: #292929;
}

.information-blocks__row {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.information-blocks__row:first-child {
    margin-bottom: 100px;
}

.information-block__element {
    margin-bottom: 21px;
}

.information-blocks {
    width: 1035px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.page-block__mobile-application-form-container {
    margin-top: 100px;
}

.about-us-container {
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../assets/images/about-us-background.jpg");
    padding-top: 75px;
    padding-bottom: 75px;
}

.about-us-container::after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.83);
    backdrop-filter: blur(30px);
}

.about-us-content {
    z-index: 1;
}

.about-us-container {
    padding-top: 0px;
    margin-bottom: 64px;
}

.about-us-title-container {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #48A4FB;
    margin-bottom: 75px;
}

.about-us-title {
    text-transform: uppercase;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;
}

.page-block__information-blocks-container {
    display: flex;
    justify-content: center;
}

.page-block__mobile-application-form-container {
    display: flex;
    justify-content: center;
}

.page-block__reviews-title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 49px;
    /* identical to box height */

    text-align: center;
    text-transform: uppercase;

    color: #40A3FF;
}

</style>