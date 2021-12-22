<template>
  <div class="additional-service">
      <img src="@/assets/images/additional-services/1.svg" alt="" v-if="service.id==4" class="additional-service__icon">
      <img src="@/assets/images/additional-services/2.svg" alt="" v-else-if="service.id==5" class="additional-service__icon">
      <img src="@/assets/images/additional-services/3.svg" alt="" v-else-if="service.id==6" class="additional-service__icon">
      <img src="@/assets/images/additional-services/4.svg" alt="" v-else-if="service.id==7" class="additional-service__icon">
      <img src="@/assets/images/additional-services/5.svg" alt="" v-else-if="service.id==8" class="additional-service__icon">
      <img src="@/assets/images/additional-services/6.svg" alt="" v-else-if="service.id==9" class="additional-service__icon">
      <img src="@/assets/images/additional-services/7.svg" alt="" v-else-if="service.id==1" class="additional-service__icon">
      <img src="@/assets/images/additional-services/8.svg" alt="" v-else-if="service.id==2" class="additional-service__icon">
      <img src="@/assets/images/additional-services/9.svg" alt="" v-else-if="service.id==3" class="additional-service__icon">
      <div class="additional-service__name">
          {{service.name}}
      </div>
      <div class="additional-service__button-container">
          <button class="button" :class="{'button_add' : !selected, 'button_cancel': selected}"  @click="onClickHandler()">{{text}}</button>
      </div>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'
import AdditonalServiceModel from '@/models/additional-service.model'

@Options({
    props: {
        service: AdditonalServiceModel,
        selected: Boolean
    }
})
export default class AdditionalService extends Vue {
    public selected: boolean = false
    public service!: AdditonalServiceModel

    public onClickHandler() {
        this.$emit("button_click")
    }

    public get price() : number {
        return Math.trunc(this.service.price / 100) 
    }

    public get text() : string {
        if(this.selected) return "Отменить"
        return `+ ${this.price} руб`
    }
}

</script>

<style scoped>
.additional-service {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #FFFFFF;
    border: 1px solid #48A4FB;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px #48A4FB;
    width: 180px;
    height: 220px;
}

.additional-service__button-container {
    width: 100%;
}

.button {
    cursor: pointer;
    width: 100%;
    height: 33px;
    box-sizing: border-box;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-color: #48A4FB;
}

.button_add {
    background-color: #48A4FB;
    color:white;
}

.button_cancel {
    box-shadow: none;
    background-color: white;
    color:#48A4FB;
}


</style>