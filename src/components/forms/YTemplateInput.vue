<script lang="ts">
   import { Component, Prop, Vue } from '../../core/decorators';


   @Component
   export default class YTemplateInput extends Vue {

      @Prop({ default: '' }) public finalLabel!: string;
      @Prop({ default: '' }) public finalError!: string;
      @Prop({ default: '' }) public sideLabelWidth!: string;
      @Prop({ default: false, type: Boolean }) public isMini!: boolean;

   }
</script>


<template>
   <label
      :class="{
         ['y-base-input']: true,
         'has-side-label': sideLabelWidth,
         'has-error': finalError,
      }"
   >
      <div
         v-if="!isMini"
         :style="(!isMini ? `width: ${ sideLabelWidth }` : undefined)"
         class="y-base-input__label text-body1"
      >
         {{ finalLabel }}
      </div>

      <div class="y-base-input__control-box">
         <slot/>

         <div class="y-base-input__bottom">
            <div class="y-base-input__bottom-left">
               <div :class="{ 'y-base-input__error': true, 'is-visible': finalError }">
                  {{ finalError }}
               </div>

               <slot name="bottom-left"/>
            </div>

            <slot name="bottom-right"/>
         </div>
      </div>
   </label>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-base-input /deep/ .q-field__bottom {
      display: none;
   }
</style>
