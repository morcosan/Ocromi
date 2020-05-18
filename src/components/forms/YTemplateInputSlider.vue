<script lang="ts">
   import { Component, Prop, Vue } from '../../core/decorators';
   import YTemplateInput from './YTemplateInput.vue';


   @Component({
      components: { YTemplateInput },
   })
   export default class YTemplateInputSlider extends Vue {

      @Prop({ default: '' }) public label!: string;
      @Prop({ default: '' }) public error!: string;
      @Prop({ default: '' }) public sideLabelWidth!: string;
      @Prop({ default: '' }) public bgColor!: string;
      @Prop({ default: '' }) public inputId!: string;
      @Prop({ default: false, type: Boolean }) public isMini!: boolean;
      @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
      @Prop({ default: false, type: Boolean }) public isReadonly!: boolean;
      @Prop({ default: 0 }) public minValue!: number;
      @Prop({ default: 0 }) public maxValue!: number;


      public get classComputed() {
         return {
            ['y-base-input__fieldset bg-' + this.bgColor]: true,
            'has-label': (this.isMini && this.label),
            'is-readonly': this.isReadonly,
         };
      }

   }
</script>


<template>
   <YTemplateInput
      class="y-base-slider"
      :is-mini="isMini"
      :is-disabled="isDisabled"
      :side-label-width="sideLabelWidth"
      :label="label"
      :error="error"
      :input-id="inputId"
   >
      <div :class="classComputed">
         <div v-if="isMini && label" :class="['y-base-input__fieldset-label bg-' + bgColor]">
            {{ label }}
         </div>

         <div class="y-slider__min-max text-caption">
            <div class="y-slider__min">{{ minValue }}</div>
            <div class="y-slider__max">{{ maxValue }}</div>
         </div>

         <slot/>
      </div>
   </YTemplateInput>
</template>


<style scoped lang="scss">
   // no css yet
</style>
