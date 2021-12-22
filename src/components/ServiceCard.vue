<template>
    <div class="service-card">
        <div class="service-card__title">
            {{service.name}}
        </div>
        <div class="service-card__content">
            <div class="service-card__description">
                {{service.description}}
            </div>
            <hr class="service-card__spacer">
            <ul class="service-card__detail-list">
                <li class="service-card__detail-container" v-for="detail in service.details" :key="detail">
                    <div class="service-card__marker-container">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33325 10L8.33325 15L16.6666 5" stroke="#48A4FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="service-card__ditail">
                        {{detail}}
                    </div>
                </li>
            </ul>
            <div class="service-card__price">
                от {{servicePrice}} руб
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import Service from '@/models/service.model';

import { Vue, Options } from 'vue-class-component'

@Options({
    props: {
        service: Service
    }
})
export default class ServiceCard extends Vue {
    public service!: Service
    public photo: string = ""

    get servicePrice(): string {
        let priceRub = this.service.price / 100
        let thousand = Math.trunc(priceRub / 1000)
        let remainder = priceRub % 1000
        return `${thousand} ${remainder}`
        return `3 239`
    }
}

</script>

<style scoped>

.service-card {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: 270px;
    height: 370px;
    box-sizing: border-box;
    background-color: white;
}

.service-card__title {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    background-color: #48A4FB;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.service-card__content {
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    height: 310px;
}

.service-card__description {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #292929;
    height: 40px;
    margin-bottom: 12px;
}

.service-card__spacer {
    border: 1px solid #9F9F9F;
    margin-bottom: 18px;
}

.service-card__detail-list {
    list-style: none;
    margin: none;
    padding: none;
}

.service-card__detail-container {
    display: flex;
    margin: 0;
    padding: 0;
    margin-bottom: 14px;
} 

.service-card__marker-container {
    width: 20px;
    height: 20px;
    margin-right: 11px;
}

.service-card__ditail {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    color: #292929;
    /* width: 195px; */
    text-align: left;
}

.service-card__price {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #48A4FB;
}

</style>