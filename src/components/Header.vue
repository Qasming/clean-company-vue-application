<template>
    <header>
        <div class="container">
        <div class="logo-container header__element"></div>
        <div class="navigation-container header__element">
            <nav class="navigation">
                <ul class="navigation__list">
                    <li class="navigation__element" v-for="element of navigationList" :key="navigationList.indexOf(element)">
                        <router-link class="navigation__link" :to="element.link">{{element.title}}</router-link>
                    </li>
                </ul>
                    <div class="auth-container header__element">
                        <router-link class="navigation__link" :to="'cabinet'">Личный кабинет</router-link>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>


<script lang="ts">

import { Vue } from 'vue-class-component'

interface NavigationElement {
    link: string,
    title: string
}

export default class Header extends Vue {
    public navigationList: NavigationElement[] = [{
        link: "",
        title: "Главная"
    },
]
}

</script>

<style scoped>

header {
    display: flex;
    height: 80px;
    width: 100%;
    background-color:white;
    box-shadow: 0px 2px 2px 2px rgba(0,0,0,.10);
}

.header__element,.navigation, .navigation__list, .navigation__link {
    height: 100%;
}

.navigation__list {
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: space-between;
}

.navigation__link {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 17px;
    text-align: center;
    color: #000000;
    text-decoration: none;
}

.navigation {
    display: flex;
    justify-content: space-between;
}

</style>