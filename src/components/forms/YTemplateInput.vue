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
      @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
      @Prop({ default: false, type: Boolean }) public isMini!: boolean;

   }
</script>


<template>
   <label
      :class="{
         'y-base-input': true,
         'has-side-label': sideLabelWidth,
         'has-error': error,
         'is-disabled': isDisabled,
         'is-mini': isMini,
      }"
   >
      <div
         v-if="!isMini && label"
         :style="(!isMini ? `width: ${ sideLabelWidth }` : undefined)"
         class="y-base-input__label"
      >
         {{ label }}
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
   </label>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-base-input /deep/ .q-field__bottom {
      display: none;
   }
</style>
