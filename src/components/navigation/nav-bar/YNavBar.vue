<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBase from '../../YBase';
   import { QResizeObserver } from 'quasar';


   @Component({
      components: { QResizeObserver },
   })
   export default class YNavBar extends YBase {

      @Prop({ default: false, type: Boolean }) public isScrollable!: boolean;


      @Override
      public mounted() {
         this.correctWidth();
      }


      public onResize() {
         this.correctWidth();
      }


      private correctWidth() {
         const width = (this.$refs.domOuterBar as HTMLElement).offsetWidth;
         (this.$refs.domInnerBar as HTMLElement).style.width = `${ width }px`;
      }

   }
</script>


<template>
   <nav
      :class="{ 'y-nav-bar print-hide': true, 'is-scrollable': isScrollable }"
      ref="domOuterBar"
   >
      <div
         :class="{ 'y-nav-bar__container': true, 'shadow-2': !isScrollable }"
         ref="domInnerBar"
      >
         <div class="y-nav-bar__logo">
            <slot name="logo"/>
         </div>

         <div class="y-nav-bar__title">
            <slot name="title"/>
         </div>
      </div>

      <QResizeObserver @resize="onResize"/>
   </nav>
</template>


<style scoped lang="scss">
   $bar-height: $y-nav-bar-content-height + 2 * $y-nav-bar-padding;

   .y-nav-bar {
      width: 100%;
      height: $bar-height;
   }

   .y-nav-bar__container {
      position: fixed;
      top: 0;
      left: 0;

      box-sizing: border-box;
      display: flex;
      padding: $y-nav-bar-padding;

      background-color: $primary;

      line-height: $y-nav-bar-content-height;
      color: #fff;

      flex-direction: row;
      align-items: center;

      .y-nav-bar.is-scrollable & {
         position: relative;
      }
   }

   .y-nav-bar__logo {
      width: $y-nav-bar-content-height;
      height: $y-nav-bar-content-height;
   }
</style>
