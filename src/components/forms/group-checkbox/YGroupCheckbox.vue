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
      public validate() {
         if (!this.isOptional) {
            this.innerError = (this.value.length > 0 ? '' : this.$locale.groupCheckbox.requiredError);
         }

         return !this.innerError;
      }


      public onInput(value: string[]) {
         this.isDirty = true;
         this.validate();
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
      :is-disabled="isDisabled"
      :is-readonly="isReadonly"
      :bg-color="bgColor"
   >
      <QOptionGroup
         :value="value"
         :options="options"
         :disable="isDisabled"
         :color="(errorComputed ? 'negative' : undefined)"
         :keep-color="!!errorComputed"
         type="checkbox"
         @input="onInput"
         @keydown="onKeyDown"
         ref="qOptionGroup"
      />
   </YTemplateInputGroup>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
