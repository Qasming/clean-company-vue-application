<template>
  <div class="order-info">
      <h1 class="order-info__title">Ваш заказ</h1>
      <div class="order-info__row">
          <div class="order-info__col">
              Площадь:
          </div>
          <div class="order-info__col">
              {{area}} м&#178
          </div>
      </div>
      <div class="order-info__row">
          <div class="order-info__col">
              Тип помещения
          </div>
          <div class="order-info__col">
            {{
            premisesType === 1 ? "квартира" :
            premisesType === 2 ? "офис" : 
            premisesType === 3 ? "Дом" : ""  
            }}
          </div>
      </div>
      <hr class="order-info__hr">
      <div class="order-info__block-title">
          Услуги:
      </div>
      <div class="order-info__row">
          <div class="order-info__col">
              {{service.name}}
          </div>
          <div class="order-info__col">
              {{servicePrice}}
          </div>
      </div>
      <div class="order-info__additional-services-contaienr" v-if="additionalServices.length > 0"> 
            <div class="order-info__block-title">
                Дополнительные услуги:
            </div>
            <div class="order-info__row" v-for="additionalService of additionalServices" :key="additionalService">
                <div class="roder-info__col">
                    {{additionalService.name}}
                </div>
                <div class="roder-info__col">
                    {{getAdditionalServicePrice(additionalService)}}
                </div>
            </div>
      </div>
      <hr class="order-info__hr">
      <div class="order-info__row">
          <div class="order-info__col order-info__sum-title">ИТОГО</div>
          <div class="order-info__col">{{sum}}</div>
      </div>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'

import ServiceModel from '@/models/service.model'
import AdditionalServiceModel from '@/models/additional-service.model'

@Options({
    props: {
        service: ServiceModel,
        additionalServices: Array<AdditionalServiceModel>(),
        premisesType: Number,
        area: Number

    }
})
export default class OrderView extends Vue {
    public service!: ServiceModel
    public additionalServices: Array<AdditionalServiceModel> = []
    public premisesType!: number
    public area!: number

    public get sum() : string {
        let sum = this.service.price
        for(let additional_service of this.additionalServices) {
            sum += additional_service.price
        }
        sum = sum / 100
        
        let ost = sum % 1000 > 100 ? (sum % 1000).toString() : '0' + (sum % 1000).toString()

        return `${Math.trunc(sum / 1000)} ${ost} руб`
    }

    public get servicePrice() {
        let price = this.service.price / 100

        if(price < 1000) return `${this.service.price % 1000} руб`
        
        let ost = price % 1000 >= 100 ? (price % 1000).toString() : '0' + (price % 1000).toString()

        return `${Math.trunc(price / 1000)} ${ost} руб`
    }

    public getAdditionalServicePrice(additonalService: AdditionalServiceModel) {
        let price = additonalService.price / 100

        if(price < 1000) return `${price} руб`


        let ost = price % 1000 >= 100 ? (price % 1000).toString() : '0' + (price % 1000).toString()

        return `${Math.trunc(price / 1000)} ${ost} руб`
    }
}

</script>

<style scoped>
.order-info {
    display: flex;
    flex-direction: column;
    width: 430px;
    box-sizing: border-box;
    padding: 25px;
    color: rgba(64, 163, 255, 1);
    font-family: Montserrat;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    background-color: white;
}

.order-info__title {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
    text-align: left;
}

.order-info__row {
    display: flex;
    justify-content: space-between;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    margin-top: 20px;
}

.order-info__hr {
    border: none;
    height: 1px;
    width: 100%;
    background-color: #40A3FF;
    margin-top: 20px;
}

.order-info__sum-title {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
}

.order-info__block-title {
    font-weight: bolder;
    font-size: 24px;
    line-height: 29px;
    text-align: left;
    margin-top:20px
}

</style>