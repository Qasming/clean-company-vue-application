<template>
  <div class="information-block">
        <img class="information-block__icon information-block__element" :src="icon"/>
        <h3 class="information-block__title information-block__element">
            {{title}}
        </h3>
        <p class="information-block__description">
            {{description}}
        </p>
    </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component'

@Options({
    props: {
        title: String,
        description: String, 
        icon: String
    }
})
export default class InformationBlock extends Vue {
    private title!: String
    private icon!: String
    private desription!: String
}

</script>

<style scoped>
.information-block__icon {
    width: 100px;
    height: 100px;
}

.information-block__title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */
    color: #48A4FB;
}

.information-block__description {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 300;
    font-size: 28px;
    line-height: 34px;
    text-align: center;

    color: #292929;
}

.information-block__element {
    margin-bottom: 21px;
}
</style>