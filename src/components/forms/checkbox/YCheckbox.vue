<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import { QCheckbox } from 'quasar';
   import YBaseInput from '../YBaseInput';
   import YTemplateInput from '../YTemplateInput.vue';


   @Component({
      components: { QCheckbox, YTemplateInput },
   })
   export default class YCheckbox extends YBaseInput {

      @Prop({ default: false }) public value!: boolean | null;


      public get optionalText() {
         const hasOptional = (this.isOptional && !this.hidesOptional);
         return (hasOptional ? (this.$locale.all.optional + ' ') : '');
      }


      public get labelFinal() {
         return (this.sideLabelWidthComputed ? this.labelComputed : undefined);
      }


      @Override
      public getValidationError() {
         if (this.isOptional) {
            return '';
         }

         return (this.value ? '' : this.error);
      }


      @Override
      public isValid() {
         return (this.isOptional ? true : !!this.value);
      }


      @Override
      public focus() {
         // @ts-ignore
         this.$refs.qCheckbox.$el.focus();
      }


      public onInput(value: boolean) {
         this.isDirty = true;
         this.updateValueProp(value);
      }

   }
</script>


<template>
   <div
      :class="{
         'y-base-input y-checkbox': true,
         'has-side-label': sideLabelWidthComputed,
         'has-error': innerError,
      }"
   >
      <div
         v-if="!isMiniComputed && labelFinal"
         :style="(!isMiniComputed ? `width: ${ sideLabelWidthComputed }` : undefined)"
         class="y-base-input__label"
      >
         {{ labelFinal }}
      </div>

      <div class="y-base-input__control-box">
         <QCheckbox
            :value="value"
            :disable="isDisabledComputed"
            :color="(innerError ? 'negative' : undefined)"
            :keep-color="!!innerError"
            @input="onInput"
            ref="qCheckbox"
         >
            <div v-if="!sideLabelWidthComputed">
               {{ optionalText }}
               {{ label }}
               <slot/>
            </div>
         </QCheckbox>

         <div class="y-base-input__bottom">
            <div class="y-base-input__bottom-left">
               <div :class="{ 'y-base-input__error': true, 'is-visible': innerError }">
                  {{ innerError }}
               </div>
            </div>
         </div>
      </div>
   </div>
</template>


<style scoped lang="scss">
   //@import '../../../css/variables';

   .y-checkbox {
      /deep/ .y-base-input__control-box {
         margin-left: -10px;
      }

      &.is-required {
         position: relative;
         padding-bottom: 18px;
      }

      /deep/ .y-base-input__control-box .y-base-input__bottom {
         padding-top: 4px;
      }

      /deep/ a {
         color: initial;
         text-decoration: underline;
      }
   }
</style>
