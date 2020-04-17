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
      public validate() {
         if (!this.isOptional) {
            this.innerError = (this.value ? '' : this.$locale.groupRadio.requiredError);
         }

         return !this.innerError;
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
         type="radio"
         @input="onInput"
         @keydown="onKeyDown"
         ref="qOptionGroup"
      />
   </YTemplateInputGroup>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
