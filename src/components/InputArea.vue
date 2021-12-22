<template>
  <div class="input-area">
    <div class="input-area__area-value" 
    v-for="area in areas" 
    :key="area"
    @click="selectArea(area)" 
    :class="{'area-selected' : area.isSelected()}">
        {{area.getValue()}} м&#178
    </div>
    <div 
    class="input-area__area-value input-area__custom-area" 
    @click="selectCustomArea()" 
    @input="inputCustomAreaHandler()"
    :class="{'area-selected': customAreaSelected }"
    >
        <input type="text" 
        class="custom-area__input" 
        v-model="customArea"
        v-maska="'####'"/> м&#178
    </div>
</div>
</template>

<script lang="ts">

class Area {
    private _value: number
    
    private _selected: boolean

    constructor(
        value: number,
        selected: boolean = false
    ) {
        this._value = value
        
        this._selected = selected
    }

    public getValue() : number {
        return this._value
    }

    public isSelected() : boolean {
        return this._selected
    }

    public select() : void {
        this._selected = true
    }

    public unselect() : void {
        this._selected = false
    }
}

import { Vue, Options } from 'vue-class-component'


import { maska } from 'maska'

@Options({
    directives: {
        maska
    }
})
export default class InputArea extends Vue {
    public value: number = 0
    
    public areas: Array<Area> = [
        new Area(40, true),
        new Area(50),
        new Area(60),
        new Area(70),
        new Area(80),
        new Area(90),
        new Area(100)
    ]

    public customArea: string = ""

    public customAreaSelected: boolean = false

    public set area(value: number) {
        this.$emit('area-edited', value)
    }

    public mounted() {
        for(let area of this.areas) {
            if (area.isSelected()) {
                this.value = area.getValue()
            }
        }
    }

    public selectArea(area: Area) {
        this.customAreaSelected = false
        this.customArea = ""

        for(let a of this.areas) {
            a.unselect();
        }

        area.select()

        this.area = area.getValue()
    }

    public selectCustomArea() {
        for(let a of this.areas) {
            a.unselect();
        }

        this.customAreaSelected = true
    }

    public inputCustomAreaHandler(e: InputEvent) {
        if(this.customArea === "" && e.data == '0')
            this.customArea = ""
        if(this.customAreaSelected) {
            this.area = parseInt(this.customArea)
        }
    }
}

</script>

<style scoped>

.input-area {
display: flex;
}

.input-area__area-value {
    
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95px;
    height: 84px;
    border-style: solid;
    border-color: #40A3FF;
    border-width: 1px;
    border-left: none;
    color:#40A3FF;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    transition: 0.5s;
}

.input-area__area-value:first-child {
    border-left-style: solid;
    border-left-color: #40A3FF;
    border-width: 1px;
}

.custom-area__input {
    width: 90px;
    background:none;
    border:none;
    border-bottom: solid;
    border-width: 1px;
    border-color: #40A3FF;
    outline: none;
    margin-right: 10px;
    color: #40A3FF;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    text-align: right;
    font-family: Montserrat;
}

.area-selected .custom-area__input {
    /* width: 90px; */
    background:none;
    border:none;
    border-bottom: solid;
    border-width: 1px;
    border-color: white;
    outline: none;
    margin-right: 10px;
    color: white;
    
}

.area-selected {
    color:white;
    background-color: #40A3FF;
}

.input-area__custom-area {
    width: 144px;
}

</style>