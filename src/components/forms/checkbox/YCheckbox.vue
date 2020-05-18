<script lang="ts">
   import { Component, Override, Prop, Watch } from '../../../core/decorators';
   import YBaseInput from '../YBaseInput';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QCheckbox, QIcon } from 'quasar';


   @Component({
      components: { YTemplateInput, QCheckbox, QIcon },
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


      public get classComputed() {
         return {
            'y-base-input y-checkbox': true,
            'has-side-label': this.sideLabelWidthComputed,
            'has-error': this.innerError,
            'is-disabled': this.isDisabledComputed,
            'is-readonly': this.isReadonly,
         };
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


      public onClickLabel() {
         if (!this.isReadonly && !this.isDisabledComputed) {
            this.isDirty = true;
            this.updateValueProp(!this.value);
         }
      }

   }
</script>


<template>
   <div :class="classComputed">
      <label
         v-if="!isMiniComputed && sideLabelWidthComputed"
         :style="(!isMiniComputed ? `width: ${ sideLabelWidthComputed }` : undefined)"
         class="y-base-input__label"
         :for="inputId"
         @click="onClickLabel"
      >
         {{ labelComputed }}
      </label>

      <div class="y-base-input__control-box">
         <QCheckbox
            :value="value"
            :disable="isDisabledComputed"
            :color="(innerError ? 'negative' : undefined)"
            :keep-color="Boolean(innerError)"
            :id="inputId"
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
                  <QIcon
                     v-if="innerError"
                     class="y-base-input__error-icon"
                     name="error"
                     size="16px"
                  />
                  {{ innerError }}
               </div>
            </div>
         </div>
      </div>
   </div>
</template>


<style scoped lang="scss">
   .y-checkbox {
      /deep/ .y-base-input__control-box {
         margin-left: -10px;
      }

      &.is-required {
         position: relative;
         padding-bottom: 18px;
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

   .y-base-input__bottom {
      padding: 0 20px 0
   }
</style>
