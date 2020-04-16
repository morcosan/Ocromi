<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import { QOptionGroup } from 'quasar';
   import YMixinInputGroup from '../YMixinInputGroup';
   import YTemplateInputGroup from '../YTemplateInputGroup.vue';


   @Component({
      components: { QOptionGroup, YTemplateInputGroup },
   })
   export default class YGroupCheckbox extends Mixins(YMixinInputGroup) {

      @Prop({ default: () => [] }) public value!: string[];


      @Override
      public validate() {
         if (!this.isOptional) {
            this.innerError = (this.value.length > 0 ? '' : this.$locale.groupCheckbox.requiredError);
         }

         return !this.innerError;
      }


      public onInput(value: string[]) {
         if (!this.isOptional) {
            this.innerError = (value.length > 0 ? '' : this.$locale.groupCheckbox.requiredError);
         }

         this.updateValueProp(value);
      }

   }
</script>


<template>
   <YTemplateInputGroup
      class="y-group-checkbox"
      :is-mini="isMini"
      :side-label-width="sideLabelWidth"
      :final-label="finalLabel"
      :final-error="finalError"
      :is-disabled="isDisabled"
      :is-readonly="isReadonly"
      :bg-color="bgColor"
   >
      <QOptionGroup
         :value="value"
         :options="options"
         :disable="isDisabled"
         :color="(finalError ? 'negative' : undefined)"
         :keep-color="!!finalError"
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
