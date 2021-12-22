<template>
    <div class="order">

        <div class="order__spinner-container" v-if="order === undefined">
            <spinner></spinner>
        </div>
        <div class="order-container" v-else>

            <div class="order__block">
                <div class="block__title">Заказ: #{{order.id}}</div> 
            </div>
        
            <hr class="-order__hr">

            <div class="order__block">
                <div class="block__title">Контактая информация:</div> 
                <div class="block__element">
                    <div class="element__title">Заказчик:</div>
                    <div class="element__value">{{order.client.last_name}} {{order.client.first_name}} {{order.client.middle_name}}</div>
                </div>
                
                <div class="block__element">
                    <div class="element__title">Телефон:</div>
                    <div class="element__value">{{order.client.phone}}</div>
                </div>

            </div>
        
            <hr class="-order__hr">

            <div class="order__block">
                <div class="block__title">Помещение:</div>
                
                <div class="block__element">
                    <div class="element__title">Адрес:</div>
                    <div class="element__value">
                        {{order.premises.address}}
                    </div>
                </div>
                
                <div class="block__element">
                    <div class="element__title">Тип помещения:</div>
                    <div class="element__value">
                        {{
                            order.premises.premises_type == 1 ? "квартира" :
                            order.premises.premises_type == 2 ? "офис" :
                            order.premises.premises_type == 3 ? "дом" : ""
                        }}
                    </div>
                </div>

                <div class="block__element">
                    <div class="element__title">Площадь:</div>
                    <div class="element__value">
                        {{order.premises.area}} м&#178
                    </div>
                </div>
            </div>
            
            <hr class="order__hr">

            <div class="order__block service-block">
                <div class="block__title">Услуги:</div>
                <div class="block__element">
                    <div class="element__title service-title">{{order.service.name}}</div>
                    <div class="element__value">{{getServicePrice()}}</div>
                </div>
            </div>

            <div class="order__block" v-if="order.additnal_services.length > 0">
                <div class="block__title">Дополнительные услуги:</div>
                <div class="block__element" v-for="service in order.additnal_services" :key="service">
                    <div class="element__title service-title">{{service.name}}</div>
                    <div class="element__value">{{getAdditionalServicePrice(service)}}</div>
                </div>
            </div>

            <hr class="order__hr">

            <div class="order__block">
                <div class="block__element total-block">
                    <div class="element__title total-title">ИТОГО</div>
                    <div class="element__value">{{getSum()}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>

import { Vue, Options } from 'vue-class-component'
import StoreManager from '@/store/store-manager'
import { useStore } from 'vuex'
import Spinner from '@/components/Spinner.vue'
import ordersService from '@/services/orders.service'
import OrderModel, { AddtionalServiceInfo } from '@/models/order.model'

@Options({
    components: {
        Spinner
    }
})
export default class Order extends Vue {
    public order: OrderModel | undefined = undefined
    public order_id: any = 0

    
    public mounted() {
        this.order_id = this.$route.params.id
        this.loadOrder()
    }

    public async loadOrder() {
        this.order  = await ordersService.getOrderById(this.order_id) 
        this.$forceUpdate()
    }

    public async completeOrder() {
        this.order = await ordersService.completeOrder(this.order_id)
        this.$forceUpdate();
    }


    public async cancelOrder() {
        this.order = await ordersService.completeOrder(this.order_id)
        this.$forceUpdate();
    }

    public getSum() : string {
        if (!this.order) return ""

        let sum = this.order.service.price

        for(let additional_service of this.order.additnal_services) {
            sum += additional_service.price
        }
        sum = sum / 100

        if(sum < 1000) return `${(sum % 1000)} руб`
        
        let ost = sum % 1000 > 100 ? (sum % 1000).toString() : '0' + (sum % 1000).toString()

        return `${Math.trunc(sum / 1000)} ${ost} руб`
    }

    public getAdditionalServicePrice(service: AddtionalServiceInfo) : string {

        let sum = service.price

        sum = sum / 100

        if(sum < 1000) return  `${(sum % 1000)} руб`
        
        let ost = sum % 1000 > 100 ? (sum % 1000).toString() : '0' + (sum % 1000).toString()

        return `${Math.trunc(sum / 1000)} ${ost} руб`
    }

    public getServicePrice() : string {
        if (!this.order) return ""

        let sum = this.order.service.price

        sum = sum / 100
        
        let ost = sum % 1000 > 100 ? (sum % 1000).toString() : '0' + (sum % 1000).toString()

        return `${Math.trunc(sum / 1000)} ${ost} руб`
    }
}

</script>

<style scoped>
.order__review-form-container {
    position: absolute;
    width: 100%;
    min-height: 100vh;

    display: flex;

    justify-content: center;
    align-items: center;
    z-index: 2
}

.order {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 50px;
    box-sizing: border-box;
    min-width: 900px;
    min-height: 600px;
}

.order__block {
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

.order__spinner-container, .spinner-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>