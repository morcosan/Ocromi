<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import YBase from '../../YBase';


   @Component
   export default class YNavItemLogo extends YBase {

      @Prop({ default: '' }) public imageUrl!: string;

   }
</script>


<template>
   <a class="y-nav-item-logo" href="/">
      <img class="y-nav-item-logo__img" :src="imageUrl" alt="">
   </a>
</template>


<style scoped lang="scss">
   .y-nav-item-logo {
      display: inline-block;
      height: 100%;
      text-decoration: none;
   }

   .y-nav-item-logo__img {
      height: 100%;
   }
</style>
