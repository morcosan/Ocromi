<script lang="ts">
   import { Component, Prop, Vue } from '../../core/decorators';
   import { QIcon } from 'quasar';


   @Component({
      components: { QIcon },
   })
   export default class YTemplateInput extends Vue {

      @Prop({ default: '' }) public label!: string;
      @Prop({ default: '' }) public error!: string;
      @Prop({ default: '' }) public sideLabelWidth!: string;
      @Prop({ default: '' }) public inputId!: string;
      @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
      @Prop({ default: false, type: Boolean }) public isMini!: boolean;


      public get classComputed() {
         return {
            'y-base-input': true,
            'has-side-label': this.sideLabelWidth,
            'has-error': this.error,
            'is-disabled': this.isDisabled,
            'is-mini': this.isMini,
         };
      }

   }
</script>


<template>
   <div :class="classComputed">
      <div
         v-if="!isMini && label"
         class="y-base-input__label"
         :style="(!isMini ? `width: ${ sideLabelWidth }` : undefined)"
      >
         <label :for="inputId">{{ label }}</label>
      </div>

      <div class="y-base-input__control-box">
         <slot/>

         <div class="y-base-input__bottom">
            <div class="y-base-input__bottom-left">
               <div :class="{ 'y-base-input__error': true, 'is-visible': error }">
                  <QIcon class="y-base-input__error-icon" name="error" size="16px"/>
                  {{ error }}
               </div>

               <slot name="bottom-left"/>
            </div>

            <slot name="bottom-right"/>
         </div>
      </div>
   </div>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-base-input /deep/ .q-field__bottom {
      display: none;
   }
</style>
