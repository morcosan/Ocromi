<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import YBase from '../../YBase';


   @Component
   export default class YNavItemLink extends YBase {

      @Prop({ default: false, type: Boolean }) public isExternal!: boolean;

   }
</script>


<template>
   <a class="y-nav-item-link" href="/">
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
