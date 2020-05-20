<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import { PageAlign } from '../../../core/enums';
   import YBase from '../../YBase';


   @Component
   export default class YPage extends YBase {

      @Prop({ default: PageAlign.Center }) public align!: PageAlign;

   }
</script>


<template>
   <div class="y-page">
      <div :class="('y-page__content has-align-' + align)">
         <slot/>
      </div>
   </div>
</template>


<style scoped lang="scss">
   .y-page {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
   }

   .y-page__content {
      max-width: 100%;
      min-height: 100%;
      box-sizing: border-box;
      padding: $y-page-padding;
      background-color: $y-page-background;

      &.has-align-center {
         margin: 0 auto;
      }

      &.has-align-left {
         margin: 0 auto 0 0;
      }

      &.has-align-right {
         margin: 0 0 0 auto;
      }
   }
</style>
