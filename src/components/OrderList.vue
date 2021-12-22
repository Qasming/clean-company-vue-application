<template>
  <div class="order-list">
      <div class="spinner-container" v-if="showSpinner">
          <spinner></spinner>
      </div>
      <div class="main-container" v-else>
        <div class="empty-container" v-if="orders.length===0">
            <div class="empty-title">
                Здесь будут ваши заказы
            </div>
            <router-link class="new-order-button" :to="'new-order'">
                Заказать уборку
            </router-link>
        </div>
        <ul class="list">
            <li class="list__element-container" v-for="element in orders" :key="element">
                <router-link :to="`./orders/${element.id}`">
                    <order-list-element :order="element" class="order-list__element"></order-list-element>
                </router-link>
            </li>
        </ul>
      </div>
      
  </div>
</template>

<script lang="ts">

import Order from '@/models/order.model'

import { Vue, Options } from 'vue-class-component'

import { RouterLink } from 'vue-router'

import { useStore } from 'vuex'

import orderService from '@/services/orders.service'

import Spinner from '@/components/Spinner.vue'
import OrderListElement from '@/components/OrderListElement.vue'

interface DataInteface {
    orders: Order[]
}

@Options({
    components: {
        RouterLink,
        Spinner,
        OrderListElement
    }
})
export default class OrderList extends Vue {
    private orders: Order[] = []
    private showSpinner = false

    public beforeMount() {
        this.loadOrders();
    }

    public async loadOrders() {
        this.showSpinner = true
        let orders = await orderService.getOrders();
        this.orders.push(...orders)
        this.showSpinner = false
    }
}

</script>

<style scoped>
.order-list {
    box-sizing: border-box;
    padding: 50px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    width: 900px;
    height: 600px;
}

.empty-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.empty-title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 29px;

    color: #7F7F7F;

    margin-bottom: 40px;
}

.new-order-button {
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 350px;
    height: 60px;

    background: #40A3FF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;

    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
    /* identical to box height */
    color: #FFFFFF;
    transition: 0.5s;
    text-decoration: none;

    /* font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 29px;
    color: #FFFFFF; */
}

.new-order-button:hover {
    background-color: #79beff;
    transform: translate(0,-5px);
}

.spinner-container { 
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    text-decoration: none;
}

.list__element-container {
    
} 

a {
    text-decoration: none;
}

.order-list__element {
    width: 100%;
    border:none;
    border-radius: 2px;
    background-color: white;
    border: 1px solid #40A3FF;
    box-sizing: border-box;
    margin-bottom: 10px;
    display: flex;
}

.main-container {
    height: 100%;
}

</style>