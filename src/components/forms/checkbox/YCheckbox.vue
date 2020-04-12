<script lang="ts">
   import { Component, Mixins, Override, Prop, Watch } from '../../../core/decorators';
   import { QCheckbox } from 'quasar';
   import YBaseInput from '../YBaseInput';


   @Component({
      components: { QCheckbox },
   })
   export default class YCheckbox extends Mixins(YBaseInput) {

      @Prop({ default: false }) public value!: boolean | null;
      @Prop({ default: ' ' }) public error!: string;


      public innerError: string = '';


      @Watch('isOptional')
      public onChange_isOptional() {
         if (this.isOptional) {
            // reset error
            this.innerError = '';
         }
      }


      @Override
      public get finalLabel() {
         const isVisible = (this.isOptional && !this.hidesOptional);
         return (isVisible ? (this.$locale.all.optional + ' ' + this.label) : this.label);
      }


      @Override
      public validate() {
         if (!this.isOptional) {
            this.innerError = (this.value ? '' : this.error);
         }

         return !this.innerError;
      }


      @Override
      public focus() {
         // @ts-ignore
         this.$refs.qCheckbox.$el.focus();
      }


      public onInput(value: boolean) {
         if (!this.isOptional) {
            this.innerError = (value ? '' : this.error);
         }

         this.updateValueProp(value);
      }

   }
</script>


<template>
   <div
      :class="{
         'y-base-input y-checkbox': true,
         'y-checkbox--required': !isOptional,
      }"
   >
      <QCheckbox
         :value="value"
         :disable="isDisabled"
         :color="innerError ? 'negative' : undefined"
         :keep-color="!!innerError"
         @input="onInput"
         ref="qCheckbox"
      >
         <div :class="{ 'text-negative': innerError }">
            {{ finalLabel }}
            <slot/>
         </div>
      </QCheckbox>

      <div
         :class="{
            'y-checkbox__error text-caption text-negative': true,
            'y-checkbox__error--visible': innerError
         }"
      >
         {{ innerError }}
      </div>
   </div>
</template>


<style scoped lang="scss">
   //@import '../../../css/variables';

   .y-checkbox {
      margin-left: -10px;

      &.y-checkbox--required {
         position: relative;
         padding-bottom: 18px;
      }

      .y-checkbox__error {
         position: absolute;
         left: 0;
         bottom: 10px;
         padding-left: 12px;
         opacity: 0;
         transition: bottom 0.3s, opacity 0.3s;
         transition-timing-function: ease-out;

         &.y-checkbox__error--visible {
            bottom: 0;
            opacity: 1;
         }
      }
   }
</style>
