<script lang="ts">
   import { Component, Mixins, Prop } from '../../../core/decorators';
   import YMixinButton from '../YMixinButton';
   import { QBtn } from 'quasar';


   @Component({
      components: { QBtn },
   })
   export default class YButtonLv3 extends Mixins(YMixinButton) {

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
   // @import '../../../css/variables';
</style>
