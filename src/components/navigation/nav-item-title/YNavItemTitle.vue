<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import YBase from '../../YBase';


   @Component
   export default class YNavItemTitle extends YBase {

      @Prop({ default: '' }) public value!: string;

   }
</script>


<template>
   <div class="y-nav-item-title">
      {{ value }}
   </div>
</template>


<style scoped lang="scss">
   .y-nav-item-title {
      display: inline-block;
      font-size: 1.3rem;
   }
</style>
