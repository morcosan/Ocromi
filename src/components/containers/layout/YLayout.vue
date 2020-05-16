<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import { PageAlign } from '../../../core/enums';
   import YBase from '../../YBase';


   @Component
   export default class YLayout extends YBase {

      @Prop({ default: '1024px' }) public width!: string;
      @Prop({ default: PageAlign.Center }) public align!: PageAlign;

   }
</script>


<template>
   <div class="y-layout">
      <slot/>
   </div>
</template>


<style scoped lang="scss">
   .y-layout {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-color: $grey-1;
   }
</style>
