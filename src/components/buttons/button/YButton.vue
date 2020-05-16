<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import YBaseButton from '../YBaseButton';
   import { QBtn } from 'quasar';


   @Component({
      components: { QBtn },
   })
   export default class YButton extends YBaseButton {

      @Prop({ default: false, type: Boolean }) public isStacked!: boolean;
      @Prop({ default: false, type: Boolean }) public isRounded!: boolean;
      @Prop({ default: false, type: Boolean }) public noCaps!: boolean;
      @Prop({ default: 'primary' }) public color!: string;
      @Prop({ default: '' }) public icon!: string;
      @Prop({ default: '' }) public routerTo!: string;

   }
</script>


<template>
   <QBtn
      :label="label"
      :color="color"
      :icon="icon"
      :stack="isStacked"
      :no-caps="noCaps"
      :rounded="isRounded"
      class="y-button"
      @click="$emit('click')"
   />
</template>


<style scoped lang="scss">
   // no css yet
</style>
