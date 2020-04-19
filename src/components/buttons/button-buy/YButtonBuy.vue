<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import YBaseButtonLoading from '../YBaseButtonLoading';
   import YTemplateButton from '../YTemplateButton.vue';


   export enum BuyIcon {
      Default = 'shopping_cart',
      Add = 'add_shopping_cart',
      Play = 'shop',
      Basket = 'shopping_basket',
      None = '',
   }


   @Component({
      components: { YTemplateButton },
   })
   export default class YButtonBuy extends YBaseButtonLoading {

      @Prop({ default: BuyIcon.Default }) public icon!: BuyIcon;
      @Prop({ default: false, type: Boolean }) public isLarge!: boolean;

   }
</script>


<template>
   <YTemplateButton
      class="y-button-confirm"
      :label="label"
      :is-disabled="isDisabledComputed"
      :is-loading="isLoading"
      :percentage="percentage"
      :icon="icon"
      :size="(isLarge ? 'lg' : 'md')"
      :settings="settingsComputed"
      @click="onClick"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
