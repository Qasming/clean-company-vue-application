<template>
  <div class="select-service">
      <div class="spinner-container" v-if="services.length == 0">
          <spinner></spinner>
      </div>
      <div class="services-container" v-else>
            <div class="service-container" v-for="service in services" :key="service" @click="selectService(service)">
                <service-card :service="service"></service-card>
            </div>
       </div>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'
import axios from 'axios'

import ServiceCard from '@/components/ServiceCard.vue'
import Spinner from '@/components/Spinner.vue'
import ServiceModel from '@/models/service.model'
import Service from '@/models/service.model'
import servicesService from '@/services/services.service'


@Options({
    components: {
        Spinner,
        ServiceCard
    }
})
export default class SelectService extends Vue { 
    private services: ServiceModel[] = []
    
    public mounted() {
        this.loadServices()
    }

    public async loadServices() {
        const services = await servicesService.getServices()
        
        for(let service of services) {
            this.services.push(service)
        }
    }

    public selectService(service: Service) {
        this.$emit("service-selected", service)
    }
}

</script>

<style scoped>
    .spinner-container, .services-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width:100%;
        min-height: 450px;
    }

    .service-container {
        margin-top: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
    }

    .service-container:last-child {
        margin-right: 0px;
    }

</style>