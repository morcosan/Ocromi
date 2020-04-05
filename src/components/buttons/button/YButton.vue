<script lang="ts">
   /**
    * Used when user needs to take an action.
    * This type of button is colored and draws attention.
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import YBaseButton from '../../mixins/YBaseButton';
   import { QBtn } from 'quasar';


   @Component({
      components: { QBtn },
   })
   export default class YButtonLv3 extends Mixins(YBaseButton) {

      /** Config props */
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
      @click="$emit('click')"
      :label="label"
      :color="color"
      :icon="icon"
      :stack="isStacked"
      :no-caps="noCaps"
      :rounded="isRounded"
      class="y-button"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
