<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import YBase from '../../YBase';
   import { QToolbar, QToolbarTitle } from 'quasar';


   @Component({
      components: { QToolbar, QToolbarTitle },
   })
   export default class YNavBarApp extends YBase {

      @Prop({ default: '' }) public title!: string;
      @Prop({ default: false, type: Boolean }) public isScrollable!: boolean;

   }
</script>


<template>
   <div class="y-nav-bar-app">
      <QToolbar class="y-nav-bar-app__bar shadow-2">
         <QToolbarTitle>{{ title }}</QToolbarTitle>
      </QToolbar>
   </div>
</template>


<style scoped lang="scss">
   $bar-height: 50px;

   .y-nav-bar-app {
      width: 100%;
      height: $bar-height;

      .y-nav-bar-app__bar {
         position: fixed;
         top: 0;
         left: 0;

         background-color: $primary;
         color: #fff;
      }
   }
</style>
