<template>
  <div class="select-additional-services">
      <div class="additional-services-container">
            <div class="spinner-container" v-if="serviceViews.length === 0">
                <spinner></spinner>
            </div>
            <div v-else class="additional-service-container" v-for="element in serviceViews" :key="element">
                <additional-service
                    :service="element.model"
                    :selected="element.selected"
                    @button_click="serviceButtonClickedHandler(element)"
                ></additional-service>
            </div>
        </div>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'
import axios from 'axios'

import AdditionalServiceModel from '@/models/additional-service.model'
import AdditionalService from '@/components/AdditionalService.vue'
import Spinner from '@/components/Spinner.vue'
import services from '@/services/services.service'

class AdditionalServiceView {
    model: AdditionalServiceModel
    selected: boolean

    constructor(
        model: AdditionalServiceModel,
        selected: boolean
    ) {
        this.model = model
        this.selected = selected
    }
}

@Options({
    props: {
        service_id: Number
    },
    components: {
        AdditionalService,
        Spinner
    }
})
export default class SelectAdditionalServices extends Vue {

    public service_id!: number
    
    public services!: Array<AdditionalServiceModel>
    
    public serviceViews: Array<AdditionalServiceView> = []

    public selectedServices: Array<AdditionalServiceModel> = []
    
    async mounted() {
        await this.loadAdditionalService()
    }

    public serviceButtonClickedHandler(view: AdditionalServiceView) {
        if(view.selected) 
            this.unselectService(view)
        else this.selectService(view)
        console.log(this.selectedServices)
    }

    public selectService(serviceView: AdditionalServiceView) {
        serviceView.selected = true 
        this.selectedServices.push(serviceView.model)
        this.$emit("list-changed", this.selectedServices)
    }

    public unselectService(serviceView: AdditionalServiceView) {
        serviceView.selected = false
        let index = this.selectedServices.indexOf(serviceView.model)
        if(index > -1 ) {
            this.selectedServices.splice(index, 1)
        }
        this.$emit('list-changed', this.selectedServices)
    }

    private async loadAdditionalService() {

        this.services = await services.getAdditionalServicesByServiceId(this.service_id)

        for(let service of this.services) {
            let view = new AdditionalServiceView(service, false)
            this.serviceViews.push(view)
        }
    }
}

</script>

<style scoped>

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    min-height: 450px;
}

.select-additional-services {
    min-height: 450px;
}

.additional-services-container {
    width: 600px;
    display: flex;
    flex-wrap: wrap;
}

.additional-service-container {
    margin-right: 20px;
    margin-bottom: 20px;
}

</style>