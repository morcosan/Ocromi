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
         this.isDirty = true;
         this.validate();
         this.updateValueProp(value);
      }

   }
</script>


<template>
   <YTemplateInput
      class="y-checkbox"
      :is-mini="isMiniComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="(sideLabelWidthComputed ? labelComputed : undefined)"
      :error="innerError"
   >
      <QCheckbox
         :value="value"
         :disable="isDisabled"
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
   </YTemplateInput>
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
