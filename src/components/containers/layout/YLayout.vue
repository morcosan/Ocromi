<script lang="ts">
   import { Component, Prop, Vue } from '../../../core/decorators';
   import { PageAlign } from '../../../core/enums';


   @Component
   export default class YLayout extends Vue {

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
   @import '../../../css/variables';

   .y-layout {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-color: $grey-1;
   }
</style>
