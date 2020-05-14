<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import { PageAlign } from '../../../core/enums';
   import YBase from '../../YBase';


   @Component
   export default class YPage extends YBase {

      @Prop({ default: '1024px' }) public width!: string;
      @Prop({ default: PageAlign.Center }) public align!: PageAlign;

   }
</script>


<template>
   <div class="y-page">
      <div
         :class="('y-page__content has-align-' + align)"
         :style="{ width: width }"
      >
         <slot/>
      </div>
   </div>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-page {
      width: 100%;
      height: 100%;
      overflow: auto;

      .y-page__content {
         max-width: 100%;
         min-height: 100%;
         padding: 16px;
         background-color: #fff;

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
   }
</style>
