<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import { LayoutType } from '../../../core/enums';
   import YBase from '../../YBase';


   @Component
   export default class YLayout extends YBase {

      @Prop({ default: LayoutType.ToBoLeRi }) public type!: LayoutType;


      public get YLayoutType(): typeof LayoutType {
         return LayoutType;
      }

   }
</script>


<template>
   <div class="y-layout">

      <div v-if="type === YLayoutType.ToBoLeRi" class="y-layout-box y-layout-box--toboleri">
         <div class="y-layout-box__content">

            <div>
               <slot name="top"/>
            </div>

            <div class="y-layout-box__middle-huge">
               <div class="y-layout-box__middle-big">
                  <div class="y-layout-box__middle">
                     <div>
                        <slot name="left"/>
                     </div>

                     <div class="y-layout-box__center">
                        <slot/>
                     </div>

                     <div>
                        <slot name="right"/>
                     </div>
                  </div>
               </div>
            </div>

            <div>
               <slot name="bottom"/>
            </div>

         </div>
      </div>


      <div v-if="type === YLayoutType.LeRiToBo" class="y-layout-box y-layout-box--leritobo">
         <div class="y-layout-box__content">

            <div>
               <slot name="left"/>
            </div>

            <div class="y-layout-box__middle-huge">
               <div class="y-layout-box__middle-big">
                  <div class="y-layout-box__middle">
                     <div>
                        <slot name="top"/>
                     </div>

                     <div class="y-layout-box__center">
                        <slot/>
                     </div>

                     <div>
                        <slot name="bottom"/>
                     </div>
                  </div>
               </div>
            </div>

            <div>
               <slot name="right"/>
            </div>

         </div>
      </div>


      <div v-if="type === YLayoutType.ToLeRiBo" class="y-layout-box y-layout-box--toleribo">
         <div class="y-layout-box__content">

            <div>
               <slot name="top"/>
            </div>

            <div class="y-layout-box__middle-huge">
               <div class="y-layout-box__middle-big">
                  <div>
                     <slot name="left"/>
                  </div>

                  <div class="y-layout-box__middle">
                     <div class="y-layout-box__center">
                        <slot/>
                     </div>

                     <div>
                        <slot name="bottom"/>
                     </div>
                  </div>

                  <div>
                     <slot name="right"/>
                  </div>
               </div>
            </div>

         </div>
      </div>


      <div v-if="type === YLayoutType.ToLeBoRI" class="y-layout-box y-layout-box--tolebori">
         <div class="y-layout-box__content">

            <div>
               <slot name="top"/>
            </div>

            <div class="y-layout-box__middle-huge">
               <div>
                  <slot name="left"/>
               </div>

               <div class="y-layout-box__middle-big">
                  <div class="y-layout-box__middle">
                     <div class="y-layout-box__center">
                        <slot/>
                     </div>

                     <div>
                        <slot name="right"/>
                     </div>
                  </div>

                  <div>
                     <slot name="bottom"/>
                  </div>
               </div>
            </div>

         </div>
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

      .y-layout-box {
         width: 100%;
         height: 100%;
         box-sizing: border-box;
         overflow-y: scroll;
         overflow-x: hidden;

         .y-layout-box__content {
            width: 100%;
            min-height: 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
         }

         .y-layout-box__middle-huge {
            flex: 1;
            display: flex;

            .y-layout-box__middle-big {
               flex: 1;
               display: flex;

               .y-layout-box__middle {
                  flex: 1;
                  display: flex;
                  align-items: stretch;

                  .y-layout-box__center {
                     flex: 1;
                  }
               }
            }
         }


         &.y-layout-box--toboleri {
            .y-layout-box__content {
               flex-direction: column;

               .y-layout-box__middle {
                  flex-direction: row;
               }
            }
         }


         &.y-layout-box--leritobo {
            .y-layout-box__content {
               flex-direction: row;

               .y-layout-box__middle {
                  flex-direction: column;
               }
            }
         }


         &.y-layout-box--toleribo {
            .y-layout-box__content {
               flex-direction: column;

               .y-layout-box__middle-big {
                  flex-direction: row;

                  .y-layout-box__middle {
                     flex-direction: column;
                  }
               }
            }
         }


         &.y-layout-box--tolebori {
            .y-layout-box__content {
               flex-direction: column;

               .y-layout-box__middle-huge {
                  flex-direction: row;

                  .y-layout-box__middle-big {
                     flex-direction: column;

                     .y-layout-box__middle {
                        flex-direction: row;
                     }
                  }
               }
            }
         }
      }
   }
</style>
