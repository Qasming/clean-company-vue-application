<template>
  <div class="service-list container">
      <ul class="list">
          <li class="list-element" v-for="service of services" :key="service.id">
              <service-card :service="service"/>
          </li>
      </ul>
  </div>
</template>

<script lang="ts">

import Service from '@/models/service.model';
import ServiceCard from '@/components/ServiceCard.vue'
import { Vue, Options } from 'vue-class-component'

@Options({
    components: {
        ServiceCard
    },
    props: {
        services: Array<Service>()
    }
})
export default class ServiceList extends Vue {
    public services: Service[] = []
}

</script>

<style scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: space-between;
}
</style>