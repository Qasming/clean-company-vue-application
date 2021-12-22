<template>
  <div class="order-list-element">
      <div class="order-list-element__container">
          <div class="order-list-element__title">
              Заказ #{{order.id}}
          </div>
      </div>
  </div>
</template>

<script lang="ts">

import Order from '@/models/order.model';
import { Vue, Options } from 'vue-class-component'
import { RouterLink } from 'vue-router'

@Options({
    props: {
        order: Order
    },
    components: {
        RouterLink
    }
})
export default class OrderListElement extends Vue {
    public order!: Order

    public mounted() {
        console.log(this.order)
    }

    public getSum() : string {
        return ""
    }
}

</script>

<style scoped>

.order-list-element {
    display: flex;
    padding: 5px 10px;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    align-items: center;
}

.order-list-element__title {
    color:#40A3FF;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 28px; 
}

.order-list__element:hover 
.order-list-element__title,
.order-list__element:hover{
    background-color: #40A3FF;
    color:white;
}

a {
    text-decoration: none;
}
</style>