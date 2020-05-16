<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import { LayoutType } from '../../../core/enums';
   import YBase from '../../YBase';


   @Component
   export default class YLayout extends YBase {

      @Prop({ default: LayoutType.Vertical }) public type!: LayoutType;


      public get YLayoutType(): typeof LayoutType {
         return LayoutType;
      }

   }
</script>


<template>
   <div class="y-layout">

      <div
         v-if="type === YLayoutType.Vertical"
         class="y-layout-content y-layout-content--vertical"
      >
         <slot name="top"/>
         <div class="y-layout-content__middle">
            <slot name="left"/>
            <div class="y-layout-content__center">
               <slot/>
            </div>
            <slot name="right"/>
         </div>
         <slot name="bottom"/>
      </div>

      <div
         v-if="type === YLayoutType.Horizontal"
         class="y-layout-content y-layout-content--horizontal"
      >
         <slot name="left"/>
         <div class="y-layout-content__middle">
            <slot name="top"/>
            <div class="y-layout-content__center">
               <slot/>
            </div>
            <slot name="bottom"/>
         </div>
         <slot name="right"/>
      </div>

   </div>
</template>


<style scoped lang="scss">
   .y-layout {
      width: 100vw;
      height: 100vh;
      box-sizing: border-box;
      overflow: hidden;
      background-color: $grey-1;

      .y-layout-content {
         width: 100%;
         height: 100%;
         display: flex;
         box-sizing: border-box;

         .y-layout-content__middle {
            display: flex;
            flex: 1;

            .y-layout-content__center {
               flex: 1;
            }
         }
      }

      .y-layout-content--vertical {
         flex-direction: column;

         .y-layout-content__middle {
            flex-direction: row;
         }
      }

      .y-layout-content--horizontal {
         flex-direction: row;

         .y-layout-content__middle {
            flex-direction: column;
         }
      }
   }
</style>
