<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import YBaseButton from '../YBaseButton';
   import { QToggle } from 'quasar';
   import { ToggleSize } from '../../../core/enums';


   @Component({
      components: { QToggle },
   })
   export default class YToggleSwitch extends YBaseButton {

      @Prop({ default: false, type: Boolean }) public value!: boolean;
      @Prop({ default: '' }) public labelOnRight!: string;
      @Prop({ default: 'done' }) public iconIdTrue!: string;
      @Prop({ default: '' }) public iconIdFalse!: string;
      @Prop({ default: ToggleSize.Medium }) public size!: ToggleSize;


      public get labelComputed() {
         if (this.label) {
            return this.label;
         }
         return (this.labelOnRight ? this.labelOnRight : undefined);
      }

   }
</script>


<template>
   <QToggle
      class="y-toggle-switch"
      :value="value"
      :label="labelComputed"
      :left-label="Boolean(label)"
      color="primary"
      :checked-icon="iconIdTrue"
      :unchecked-icon="iconIdFalse"
      :size="size"
      :disable="isDisabled"
      @input="$emit('input', $event)"
   />
</template>


<style scoped lang="scss">
   // no css yet
</style>
