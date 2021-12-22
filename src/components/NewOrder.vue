<template>
  <div class="new-order">
      <div class="new-order__create-order" v-if="newOrderId == 0">
                <div class="new-order__card">
                <div class="new-order__title-container">
          <div class="new-order__title">
              Шаг {{stepIndex}} / 5. {{ 
                  stepIndex == 1 ? "Введите адрес" : 
                  stepIndex == 2 ? "Выберите услугу" : 
                  stepIndex == 3 ? "Дополнительные услуги" :
                  stepIndex == 4 ? "Введите контактную информацию" :
                  stepIndex == 5 ? "Подтверждение" : ""
                }}
          </div>
      </div>
        <div class="new-order__step-container">
            <div class="first-step" v-if="stepIndex === 1">
                <div class="first-step__input-address-container">
                    <input type="text" class="first-step__input-address" placeholder="Адрес" v-model="address"/>
                </div>
                <div class="first-step__input-area-container">
                    <input-area @area-edited="onAreaInputHandler($event)"></input-area>
                </div>
                <div class="first-step__input-premises-type-container">
                    <div class="first-step__select-premises-type">
                        <div class="first-step__select-premises-type__title">
                            Тип помещения:
                        </div>
                        <div class="premises-type__container" v-for="pt in premisesTypes" :key="pt">
                            <label class="premises-type">
                                <input class="premises-type__radio" 
                                :value="pt.typeId"
                                v-model="premisesType"
                                type="radio"
                                >
                            </label>
                            {{pt.name}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="second-step__select-service-container" v-else-if="stepIndex === 2">
                <select-service class="second-step__select-service" @service-selected="onServiceSelectedHandler($event)"> </select-service>
            </div>
            <div class="thrid-step__select-additional-services-container" v-else-if="stepIndex === 3">
                <select-additional-services :service_id="service.id" class="thrid-step__select-additional-services" @list-changed="onSelectedAdditionalServicesChangedHanlder($event)"></select-additional-services>
            </div>
            <div class="fourth-step" v-else-if="stepIndex === 4">
                <input-contact-information 
                @phone-edited="onPhoneEditedHandler($event)"
                @firstname-edited="onFirstNameEditedHandler($event)"
                @lastname-edited="onLastNameEditedHandler($event)"
                @middlename-edited="onMiddleNameEditedHandler($event)"
                :user="user"
                >
                </input-contact-information>
            </div>
            <div class="fifth-step" v-else-if="stepIndex === 5">
                <confirm-order
                    :service="service"
                    :additionalServices="additionalServices"
                    :area="area"
                    :address="address"
                    :firstName="firstName"
                    :middleName="middleName"
                    :lastName="lastName"
                    :premisesType="premisesType"
                    :phone="phone"
                ></confirm-order>
            </div>
        </div>
        <div class="buttons-container">
                <button class="prev-button btn" v-if="stepIndex > 1" @click="onPrevButtonClicked()">
                    Назад
                </button>
                <button class="next-button btn" v-if="stepIndex < 5 && stepIndex != 2" @click="onNextButtonClicked()">
                    Продолжить
                </button>
                <button class="complete-button btn" v-if="stepIndex == 5" @click="onCompleteButtonClicked()">
                    Подтвердить
                </button>
        </div>
      </div>
      <div class="new-order__order-info-container" v-if="stepIndex > 2 && stepIndex < 5">
          <order-info :service="service" :premisesType="premisesType" :area="area" :additionalServices="additionalServices">
          </order-info>
      </div>
      </div>
      <div class="new-order__success" v-else>
          <h1>Заказ оформлен</h1>
          <router-link :to="newOrderLink" class="new-order__link">
            Перейти к заказу
          </router-link>
      </div>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'

import { maska } from 'maska';

import ServiceCard from '@/components/ServiceCard.vue'
import AdditionalService from '@/components/AdditionalService.vue'
import OrderInfo from '@/components/OrderInfo.vue'
import InputArea from '@/components/InputArea.vue'
import SelectAdditionalServices from '@/components/SelectAdditionalServices.vue'
import SelectService from '@/components/SelectService.vue'
import InputContactInformation from '@/components/InputContactInformation.vue'
import ConfirmOrder from '@/components/ConfirmOrder.vue'
import { CreateOrderDto } from '@/services/orders.service'

import ServiceModel from '@/models/service.model'
import AdditionalServiceModel from '@/models/additional-service.model'
import StoreManager from '@/store/store-manager'
import { useStore} from 'vuex'
import axios from 'axios';
import User from '@/models/user.model';
import { RouterLink } from 'vue-router'

import ordersService from '@/services/orders.service'


class PremisesType {
    private _name: string
    private _selected: boolean
    private _type_id: number
    constructor(type_id: number, name: string, selected: boolean = false) {
        this._name = name
        this._selected = selected
        this._type_id = type_id
    }

    get typeId() : number {
        return this._type_id
    }

    get name() : string {
        return this._name
    }

    get isSelected() : boolean {
        return this._selected
    }

    public select()  {
        this._selected = true
    }

    public unselect() {
        this._selected = false
    }
    
}


@Options({
    directives: {
        maska
    },
    components: {
        ServiceCard,
        AdditionalService,
        OrderInfo,
        InputArea,
        SelectAdditionalServices,
        SelectService,
        InputContactInformation,
        ConfirmOrder,
        RouterLink
    }
})
export default class NewOrder extends Vue {
    public newOrderId = 0

    public storeManager = new StoreManager(useStore())

    public stepIndex:number = 1
    
    public premisesTypes: Array<PremisesType> = [
        new PremisesType(1, "Квартира", true),
        new PremisesType(2, "Офис", false),
        new PremisesType(3, "Дом", false)
    ]

    public address: string = ""

    public area: number = 0;

    public premisesType: number = 0

    public additionalServices: AdditionalServiceModel[] = []

    public service: ServiceModel | undefined = undefined

    public phone: string = ""

    public firstName: string = ""

    public lastName: string = ""

    public middleName: string = ""

    public get newOrderLink() : string {
        return `/cabinet/orders/${this.newOrderId}`
    }

    get user() : User  | undefined 
    {
        return this.storeManager.state.user
    }

    public getUser() : User | undefined{
        return this.storeManager.state.user
    }


    public onNextButtonClicked() {
        this.stepIndex += 1
    }

    public onPrevButtonClicked() {
        this.stepIndex -= 1
        
        if(this.stepIndex == 2) {
            this.additionalServices = []
        }
        
        if(this.stepIndex == 1) {
            this.service = undefined
        }
    }

    public async onCompleteButtonClicked() { 
        this.createOrder();
    }

    public async createOrder() {
        const data = new CreateOrderDto()
        
        data.address = this.address
        
        data.area = this.area
        
        data.premisesType = this.premisesType
        
        data.phone = this.phone
        
        data.clietFirstName = this.firstName
        
        data.clientLastName = this.lastName
        
        data.clientMiddleName = this.middleName

        data.service_id = this.service ? this.service.id : 0

        for(let s of this.additionalServices) {
            data.additionalServices.push(s.id)
        }

        try{
            const order_id = await ordersService.createOrder(data)
            this.newOrderId = order_id
        
        }catch(e){

        }
    }


    public onAreaInputHandler(value: number) {
        try {
            this.area = value
        }catch(e) {
            this.area = 0
        }
    }

    public onSelectedAdditionalServicesChangedHanlder(services: any) {
        this.additionalServices = services
    }

    public onServiceSelectedHandler(service: ServiceModel) {
        this.service = service
        this.stepIndex = 3
    }

    public onPhoneEditedHandler(value: string) {
        this.phone = value
    }

    public onFirstNameEditedHandler(value: string) {
        this.firstName = value
    }

    public onMiddleNameEditedHandler(value: string) {
        this.middleName = value
    }

    public onLastNameEditedHandler(value: string) {
        this.lastName = value
    }
}

</script>

<style scoped>

.new-order {
    display: flex;
}

.new-order__order-info-container {
    margin-left: 20px;
}

.new-order__card {
    box-sizing: border-box;
    padding: 50px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    min-width: 700px;
    min-height: 600px;
}

.new-order__title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bolder;
    font-size: 24px;
    line-height: 29px;
    color: #40A3FF;
    text-align: left;
}

.first-step__input-area-container {
    margin-top: 22px;
}

.first-step__input-area {
    display: flex;
}


.first-step__input-address {
    /* identical to box height */
    width: 100%;
    height: 60px;
    
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    background-color: white;

    border: 1px solid #89c6ff;
    box-sizing: border-box;
    outline: none;
    padding: 5px 20px;
    color: #8D8D8D;
}

.first-step__input-address::placeholder {
    color: rgb(206, 206, 206);

}

.first-step__input-address:focus {
    border-color: #40A3FF;
}

.first-step__input-address-container {
    margin-top: 22px;
}

.first-step__select-premises-type {
    display: flex;
    flex-direction: column;
    justify-content: start;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 29px;
    color: #40A3FF;
}

.first-step__select-premises-type__title {
    text-align: left;
    margin-top: 22px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #40A3FF;
}

.premises-type {
    border:none;
}

.premises-type__container {
    display: flex;
    justify-content: start;
}

.premises-type__container {
    margin-top: 10px;
}

.premises-type {
    border:none;
    margin-right: 26px;
}

.premises-type__radio {
    width: 25px;
    height: 25px;
}

.buttons-container {
    display: flex;
    justify-content: end;
}


.next-button, .complete-button {
    cursor: pointer;
    width: 190px;
    height: 60px;
    border:none;
    background-color: #40A3FF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 29px;
}

.prev-button {
    cursor: pointer;
    width: 190px;
    height: 60px;
    box-sizing: border-box;
    background-color:white;
    border-style: solid;
    border-width: 1px;
    border-color: #40A3FF;
    color:#40A3FF;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 29px;
    margin-right: 17px;
}

.new-order__card {
    position: relative;
}

.buttons-container { 
    position: absolute;
    bottom: 50px;
    right: 50px;
}

.new-order__title-container {
    margin-bottom: 20px;
}

.new-order__step-container { 
    margin-bottom: 50px;
}

.new-order__create-order {
    display: flex;
}

.new-order__success {
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 250px;
    background-color: white;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.new-order__success h1 {
    color:#40A3FF;
    font-family: Montserrat;
    margin-bottom: 20px;
}

.new-order__link {
    color:#7F7F7F;
}

</style>