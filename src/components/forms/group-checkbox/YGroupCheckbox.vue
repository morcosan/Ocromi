<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import { QOptionGroup } from 'quasar';
   import YBaseInputGroup from '../YBaseInputGroup';
   import YTemplateInputGroup from '../YTemplateInputGroup.vue';


   @Component({
      components: { QOptionGroup, YTemplateInputGroup },
   })
   export default class YGroupCheckbox extends YBaseInputGroup {

      @Prop({ default: () => [] }) public value!: string[];


      @Override
      public get isValid() {
         return (this.isOptional ? true : (this.value.length > 0));
      }


      @Override
      public getValidationError() {
         if (this.isOptional) {
            return '';
         }

         return (this.value.length > 0 ? '' : this.$locale.groupCheckbox.requiredError);
      }


      @Override
      public created() {
         this.initialValue = this.value;
      }


      public onInput(value: string[]) {
         this.isDirty = true;
         this.updateValueProp(value);
      }

   }
</script>


<template>
   <YTemplateInputGroup
      class="y-group-checkbox"
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
         type="checkbox"
         @input="onInput"
         @keydown="onKeyDown"
         ref="inputRef"
      />
   </YTemplateInputGroup>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-group-checkbox.is-disabled /deep/ .q-checkbox__inner {
      opacity: 0.5;
   }
</style>
