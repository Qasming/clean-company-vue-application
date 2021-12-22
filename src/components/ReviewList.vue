<template>
  <div class="review-list container">
      <ul class="list">
          <li class="list-element" v-for="review of reviews" :key="review.id">
              <review-card :review="review" @click="addReview(review)"/>
          </li>
      </ul>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'

import Review from '@/models/review.model';
import ReviewCard from '@/components/ReviewCard.vue'

@Options({
    components: {
        ReviewCard
    },
    props: {
        reviews: Array<Review>()
    }
})
export default class ReviewList extends Vue {
    public reviews: Review[] = []

    addReview(review: Review) {
        this.reviews.push({ ...review })
    }
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