<template>
  <div class="review-card">
      <div class="review-card__client-photo-container">
          <img :src="photo" alt="" class="review-card__client-photo">
      </div>     
      <div class="review-card__client-name-container">
          <span class="review-card__client-name">{{review.client.name}}</span>
      </div>
      <div class="review-card__stars-container">
          <div class="review-card__star-container" v-for="index in 5" :key="index">
              <img src="../assets/images/blue-star.jpg" alt="" class="review-card__star" v-if="isStar(index)">
              <img src="../assets/images/gray-star.jpg" alt="" class="review-card__star" v-else>
          </div>
      </div>
      <div class="review-card__spacer"/>
      <div class="review-card__review-text-container">
           <p class="review-card__review-text">{{review.text}}</p>
      </div>
  </div>
</template>

<script lang="ts">
import Review from '@/models/review.model';
import { Vue, Options } from 'vue-class-component'

@Options({
    props: {
        review: Review
    }
})
export default class ReviewCard extends Vue {
    public review!: Review 
    public photo!: string

    beforeMount() {
        this.photo =  require("../assets/images/clients/" + this.review?.client?.photo)
    }

    isStar(index: number): boolean {
        if (index <= this.review.assessment) return true
        return false
    }
}

</script>

<style scoped>
.review-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 370px;
    height: 500px;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.25);
    background-color: #F0F7FA;
    box-sizing: border-box;
    background-color: white;
    border: 1px solid #40A3FF;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px #48A4FB;
    padding: 30px 18px;
}

.review-card__client-photo-container {
    overflow: hidden;
    border-style: solid;
    border-width: 3px;
    border-radius: 50%;
    border-color: #40A3FF;
    min-width: 120px;
    min-height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}


.review-card__client-name {
    font-family: "Montserrat";
    font-size: 30px;
    font-weight: light;
}

.review-card__spacer {
    background: #C4C4C4;
    height: 2px;
    width: 100%;
    border-radius: 2px;
}

.review-card__review-text {
    font-family: "Montserrat";
    font-size: 20px;
    font-weight: light;
    text-align: left;
}

.review-card__stars-container {
    display: flex;
}

.review-card__client-name-container {
    margin-top: 33px;
}

.review-card__stars-container {
    margin-top: 20px
}

.review-card__spacer {
    margin-top: 20px
}

.review-card__review-text-container {
    margin-top: 30px;
}
</style>