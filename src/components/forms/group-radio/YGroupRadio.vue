<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import { QOptionGroup } from 'quasar';
   import YBaseInputGroup from '../YBaseInputGroup';
   import YTemplateInputGroup from '../YTemplateInputGroup.vue';


   @Component({
      components: { QOptionGroup, YTemplateInputGroup },
   })
   export default class YGroupRadio extends YBaseInputGroup {

      @Prop({ default: null }) public value!: string | null;


      @Override
      public getValidationError() {
         if (this.isOptional) {
            return '';
         }

         return (this.value ? '' : this.$locale.groupRadio.requiredError);
      }


      @Override
      public isValid() {
         return (this.isOptional ? true : !!this.value);
      }


      public onInput(value: string) {
         this.isDirty = true;
         this.innerError = '';
         this.updateValueProp(value);
      }

   }
</script>


<template>
   <YTemplateInputGroup
      class="y-group-radio"
      :is-mini="isMiniComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
      :is-disabled="isDisabledComputed"
      :is-readonly="isReadonly"
      :bg-color="bgColor"
   >
      <QOptionGroup
         :value="value"
         :options="options"
         :disable="isDisabledComputed"
         :color="(errorComputed ? 'negative' : undefined)"
         :keep-color="!!errorComputed"
         type="radio"
         @input="onInput"
         @keydown="onKeyDown"
         ref="qOptionGroup"
      />
   </YTemplateInputGroup>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-group-radio.is-disabled /deep/ .q-radio__inner {
      opacity: 0.6;
   }
</style>
