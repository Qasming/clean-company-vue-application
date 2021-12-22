<template>
  <div class="service-carousel">
      <div class="service-carousel__slides-container">
          <div class="service-carousel__slide-container" v-for="service in services" :key="service">
              <div class="service-carousel__slide">
                  <service-card :service="service"></service-card>
              </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">

import Service from '@/models/service.model'
import {Vue, Options} from 'vue-class-component'

import ServiceCard from './ServiceCard.vue'

@Options({
    components: {
        ServiceCard
    },
    props: {
        services: Array<Service>()
    }
})
export default class ServiceCarousel extends Vue {
    private services!: Service[]
    private countToShow: number = 1
    private countToMove: number = 1
}

</script>

<style>

</style>