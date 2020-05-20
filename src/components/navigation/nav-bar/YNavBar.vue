<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBase from '../../YBase';
   import { QResizeObserver } from 'quasar';
   import { PageSnapAlign } from '../../../core/enums';


   @Component({
      components: { QResizeObserver },
   })
   export default class YNavBar extends YBase {

      @Prop({ default: false, type: Boolean }) public isScrollable!: boolean;
      @Prop({ default: PageSnapAlign.None }) public pageSnapAlign!: PageSnapAlign;


      public get YPageSnapAlign(): typeof PageSnapAlign {
         return PageSnapAlign;
      }


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
         :class="{ ['y-nav-bar__container has-page-snap-align-' + pageSnapAlign]: true, 'shadow-2': !isScrollable }"
         ref="domInnerBar"
      >
         <div v-if="pageSnapAlign !== YPageSnapAlign.Left" class="y-nav-bar__content-left">
            <slot name="left"/>
         </div>

         <div class="y-nav-bar__content-middle">
            <div v-if="pageSnapAlign === YPageSnapAlign.Left" class="y-nav-bar__content-left">
               <slot name="left"/>
            </div>

            <slot/>

            <div v-if="pageSnapAlign === YPageSnapAlign.Right" class="y-nav-bar__content-right">
               <slot name="right"/>
            </div>
         </div>

         <div v-if="pageSnapAlign !== YPageSnapAlign.Right" class="y-nav-bar__content-right">
            <slot name="right"/>
         </div>
      </div>

      <QResizeObserver @resize="onResize"/>
   </nav>
</template>


<style scoped lang="scss">
   $bar-height: calc(#{$y-nav-bar-content-height} + 2 * #{$y-nav-bar-padding});

   .y-nav-bar {
      width: 100%;
      height: $bar-height;
   }

   .y-nav-bar__container {
      position: fixed;
      top: 0;
      left: 0;

      height: $bar-height;
      box-sizing: border-box;
      display: flex;
      padding: $y-nav-bar-padding;

      background-color: $y-nav-bar-color;

      color: #fff;

      flex-direction: row;

      .y-nav-bar.is-scrollable & {
         position: relative;
      }

      &.has-page-snap-align-center {
         .y-nav-bar__content-middle {
            padding: 0 $y-page-padding;
         }

         .y-nav-bar__content-left,
         .y-nav-bar__content-right {
            flex: 1;
         }
      }

      &.has-page-snap-align-right {
         .y-nav-bar__content-left {
            flex: 1;
         }
      }
   }

   .y-nav-bar__content-left,
   .y-nav-bar__content-middle,
   .y-nav-bar__content-right {
      display: flex;
      box-sizing: border-box;
      align-items: center;
   }

   .y-nav-bar__content-left > * {
      padding-right: $y-nav-bar-padding;
   }

   .y-nav-bar__content-right {
      flex: 1;
      justify-content: flex-end;

      & > * {
         padding-left: $y-nav-bar-padding;
      }
   }
</style>
