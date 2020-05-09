<script lang="ts">
   import { Component, Override, Prop, Watch } from '../../../core/decorators';
   import { QCheckbox } from 'quasar';
   import YBaseInput from '../YBaseInput';
   import YTemplateInput from '../YTemplateInput.vue';


   @Component({
      components: { QCheckbox, YTemplateInput },
   })
   export default class YCheckbox extends YBaseInput {

      @Prop({ default: false }) public value!: boolean | null;


      @Watch('isReadonly')
      public onChange_isReadonly() {
         // @ts-ignore
         this.$refs.inputRef.$el.setAttribute('tabindex', (this.isReadonly ? '-1' : '0'));
      }


      @Override
      public get isValid() {
         return (this.isOptional ? true : Boolean(this.value));
      }


      public get optionalText() {
         const hasOptional = (this.isOptional && !this.hidesOptional);
         return (hasOptional ? (this.YLocale.all.optional + ' ') : '');
      }


      @Override
      public getValidationError() {
         if (this.isOptional) {
            return '';
         }

         return (this.value ? '' : this.error);
      }


      @Override
      public created() {
         this.initialValue = this.value;
      }


      public onInput(value: boolean) {
         if (!this.isReadonly) {
            this.isDirty = true;
            this.updateValueProp(value);
         }
      }

   }
</script>


<template>
   <div
      :class="{
         'y-base-input y-checkbox': true,
         'has-side-label': sideLabelWidthComputed,
         'has-error': innerError,
         'is-disabled': isDisabledComputed,
         'is-readonly': isReadonly,
      }"
   >
      <div
         v-if="!isMiniComputed && sideLabelWidthComputed"
         :style="(!isMiniComputed ? `width: ${ sideLabelWidthComputed }` : undefined)"
         class="y-base-input__label"
      >
         {{ labelComputed }}
      </div>

      <div class="y-base-input__control-box">
         <QCheckbox
            :value="value"
            :disable="isDisabledComputed"
            :color="(innerError ? 'negative' : undefined)"
            :keep-color="Boolean(innerError)"
            @input="onInput"
            ref="inputRef"
         >
            <div v-if="isMiniComputed || !sideLabelWidthComputed">
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
   @import '../../../css/variables';

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

      &.is-disabled /deep/ .q-checkbox__inner {
         opacity: $opacity-disabled;
      }

      &.is-readonly {
         pointer-events: none;
      }
   }
</style>
