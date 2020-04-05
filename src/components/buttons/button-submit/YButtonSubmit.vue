<script lang="ts">
   import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
   import YBaseButton from '../YBaseButton';
   import { QBtn, QSpinnerHourglass } from 'quasar';


   @Component({
      components: { QBtn, QSpinnerHourglass },
   })
   export default class YButtonSubmit extends Mixins(YBaseButton) {

      @Prop({ default: false, type: Boolean }) public isLoading!: boolean;
      @Prop({ default: 2000 }) public loadingTime!: number;


      public percentage: number = 0;
      public loadingTimeout!: NodeJS.Timeout;


      @Watch('isLoading')
      public onChange_isLoading() {
         if (this.isLoading) {
            this.startLoading();
         }
         else {
            clearInterval(this.loadingTimeout);
         }
      }


      // Override
      public mounted() {
         if (this.isLoading) {
            this.startLoading();
         }
      }


      private startLoading() {
         // reset percentage
         this.percentage = 0;

         // calculate interval
         const minTime = 300;
         const totalTime = (this.loadingTime > minTime ? this.loadingTime : minTime);
         const interval = totalTime / 100;

         // start loading
         this.loadingTimeout = setInterval(() => {
            if (this.percentage < 99) {
               this.percentage += 1;
               console.log(this.percentage);
            }
            else {
               clearInterval(this.loadingTimeout);
            }
         }, interval);
      }

   }
</script>


<template>
   <QBtn
      @click="$emit('click')"
      :disable="isDisabled"
      :loading="isLoading"
      :percentage="percentage"
      type="submit"
      color="primary"
      class="y-button-submit"
      size="md"
   >
      {{ label }}

      <template v-slot:loading>
         <QSpinnerHourglass class="on-left"/>

         {{ $locale.buttonSubmit.loading }}
      </template>
   </QBtn>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-button-submit {
      min-width: 120px;
   }
</style>
