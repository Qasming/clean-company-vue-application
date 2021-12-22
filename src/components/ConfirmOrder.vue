<template>
  <div class="confirm-order">
        <div class="confirm-order__block">
            
            <div class="block__title">Контактая информация:</div>
            
            <div class="block__element">
                <div class="element__title">Заказчик:</div>
                <div class="element__value">{{lastName}} {{firstName}} {{middleName}}</div>
            </div>
            
            <div class="block__element">
                <div class="element__title">Телефон:</div>
                <div class="element__value">{{phone}}</div>
            </div>

        </div>
        
        <hr class="confirm-order__hr">

        <div class="confirm-order__block">
            <div class="block__title">Помещение:</div>
            
            <div class="block__element">
                <div class="element__title">Адрес:</div>
                <div class="element__value">
                    {{address}}
                </div>
            </div>
            
            <div class="block__element">
                <div class="element__title">Тип помещения:</div>
                <div class="element__value">
                    {{
                        premisesType == 1 ? "квартира" :
                        premisesType == 2 ? "офис" :
                        premisesType == 3 ? "дом" : ""
                    }}
                </div>
            </div>

            <div class="block__element">
                <div class="element__title">Площадь:</div>
                <div class="element__value">
                    {{area}} м&#178
                </div>
            </div>
        </div>
        
         <hr class="confirm-order__hr">

        <div class="confirm-order__block service-block">
            <div class="block__title">Услуги:</div>
            <div class="block__element">
                <div class="element__title service-title">{{service.name}}</div>
                <div class="element__value">{{getServicePrice()}}</div>
            </div>
        </div>

        <div class="confirm-order__block" v-if="additionalServices.length > 0">
            <div class="block__title">Дополнительные услуги:</div>
            <div class="block__element" v-for="service in additionalServices" :key="service">
                <div class="element__title service-title">{{service.name}}</div>
                <div class="element__value">{{getAdditionalServicePrice(service)}}</div>
            </div>
        </div>

        <hr class="confirm-order__hr">

        <div class="confirm-order__block">
            <div class="block__element total-block">
                <div class="element__title total-title">ИТОГО</div>
                <div class="element__value">{{getSum()}}</div>
            </div>
        </div>
  </div>
</template>

<script lang="ts">

import AdditionalService from "@/models/additional-service.model";
import Service from "@/models/service.model";
import { Vue, Options } from "vue-class-component";

@Options({
    props: {
        service: Service,
        additionalServices: Array<AdditionalService>(),
        firstName: String,
        lastName: String,
        middleName: String,
        phone: String,
        premisesType: Number,
        area: Number,
        address: String
    }
    
})
export default class ConfirmOrder extends Vue {
    public service!: Service
    public additionalServices!: AdditionalService[]
    public firstName!: string
    public lastName!: string
    public middleName!: string
    public phone!: string
    public premisesType!: number
    public area!: number
    public address!: string
    
    public getServicePrice() : string {
        let price = this.service.price / 100

        if(price < 1000) return `${this.service.price % 1000} руб`
        
        let ost = price % 1000 >= 100 ? (price % 1000).toString() : '0' + (price % 1000).toString()

        return `${Math.trunc(price / 1000)} ${ost} руб`
    }

    public getAdditionalServicePrice(service: AdditionalService) : string {
        let price = service.price / 100

        if(price < 1000) return `${price} руб`


        let ost = price % 1000 >= 100 ? (price % 1000).toString() : '0' + (price % 1000).toString()

        return `${Math.trunc(price / 1000)} ${ost} руб`
    }

    public getSum() : string {
        let sum = this.service.price
        for(let additional_service of this.additionalServices) {
            sum += additional_service.price
        }
        sum = sum / 100
        
        let ost = sum % 1000 > 100 ? (sum % 1000).toString() : '0' + (sum % 1000).toString()

        return `${Math.trunc(sum / 1000)} ${ost} руб`
    }
}

</script>

<style scoped>
.confirm-order {
    display: flex;
    flex-direction: column;
}

.confirm-order__block {
    display: flex;
    flex-direction: column;
    min-width: 800px;
}


.block__title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 39px;
    color: #40A3FF;
    text-align: left;
}

.block__element {
    display: flex;
    justify-content: space-between;
    margin-top: 25px
}

.element__title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;

    color: #40A3FF;
}

.element__value {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 29px;
    color: #40A3FF;
}

hr {
    margin-top: 35px;
    margin-bottom: 35px;
    border-style: none;
    background-color: #40A3FF;
    height: 1px;
}

hr:last-child {
    margin-bottom: 10px;
}

.service-title {
    font-weight: normal;
}

.service-block {
    margin-bottom: 25px;
}

.total-block {
    margin-top: 0px;
    margin-bottom: 35px;
}

.total-title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 39px;
    color: #40A3FF;
}

</style>