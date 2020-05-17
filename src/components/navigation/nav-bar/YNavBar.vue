<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBase from '../../YBase';
   import { QResizeObserver, QToolbar, QToolbarTitle } from 'quasar';


   @Component({
      components: { QToolbar, QToolbarTitle, QResizeObserver },
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
         this.$refs.innerBar.$el.style.width = `${ this.$refs.domOuterBar.offsetWidth }px`;
      }

   }
</script>


<template>
   <div
      :class="{ 'y-nav-bar': true, 'is-scrollable': isScrollable }"
      ref="domOuterBar"
   >
      <QToolbar
         :class="{ 'y-nav-bar__content': true, 'shadow-2': !isScrollable }"
         ref="innerBar"
      >
         <slot/>
      </QToolbar>

      <QResizeObserver @resize="onResize"/>
   </div>
</template>


<style scoped lang="scss">
   $bar-height: 50px;

   .y-nav-bar {
      width: 100%;
      height: $bar-height;

      .y-nav-bar__content {
         position: fixed;
         top: 0;
         left: 0;

         background-color: $primary;
         color: #fff;
      }

      &.is-scrollable .y-nav-bar__content {
         position: relative;
      }
   }
</style>
