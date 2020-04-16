<script lang="ts">
   import { Component, Prop, Vue } from '../../core/decorators';
   import YTemplateInput from './YTemplateInput.vue';


   @Component({
      components: { YTemplateInput },
   })
   export default class YTemplateInputSlider extends Vue {

      @Prop({ default: '' }) public finalLabel!: string;
      @Prop({ default: '' }) public finalError!: string;
      @Prop({ default: '' }) public sideLabelWidth!: string;
      @Prop({ default: '' }) public bgColor!: string;
      @Prop({ default: false, type: Boolean }) public isMini!: boolean;
      @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
      @Prop({ default: false, type: Boolean }) public isReadonly!: boolean;
      @Prop({ default: 0 }) public minValue!: number;
      @Prop({ default: 0 }) public maxValue!: number;

   }
</script>


<template>
   <YTemplateInput
      class="y-base-slider"
      :is-mini="isMini"
      :side-label-width="sideLabelWidth"
      :final-label="finalLabel"
      :final-error="finalError"
   >
      <div
         :class="{
            ['y-base-input__fieldset bg-' + bgColor]: true,
            'has-error': finalError,
            'has-label': finalLabel,
            'is-disabled': isDisabled,
            'is-readonly': isReadonly,
         }"
      >
         <div v-if="isMini && finalLabel"
              :class="{ ['y-base-input__fieldset-label bg-' + bgColor]: true }"
         >
            {{ finalLabel }}
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
   // @import '../../../css/variables';
</style>
