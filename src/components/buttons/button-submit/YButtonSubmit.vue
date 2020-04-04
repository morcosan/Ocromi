<script lang="ts">
   /**
    * Used when user needs to take the submit action for certain data.
    */

   import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
   import YBaseButton from '../../mixins/YBaseButton';
   import { QBtn, QSpinnerHourglass } from 'quasar';


   @Component({
      components: { QBtn, QSpinnerHourglass },
   })
   export default class YButtonSubmit extends Mixins(YBaseButton) {

      /** Config props */
      @Prop({ default: false, type: Boolean }) public isLoading!: boolean;
      @Prop({ default: 2000 }) public loadingTime!: number;

      /** States */
      public percentage: number = 0;
      public loadingTimeout!: NodeJS.Timeout;

      /** Prop watcher */
      @Watch('isLoading')
      public onChangeIsLoading(value: string, oldValue: string) {
         if (this.isLoading) {
            this._startLoading();
         }
         else {
            clearInterval(this.loadingTimeout);
         }
      }

      /** Start loading percentage increase */
      private _startLoading() {
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
               // stop interval
               clearInterval(this.loadingTimeout);
            }
         }, interval);
      }

      /** Lifecycle hook */
      public mounted() {
         // if loading is set, start loading
         if (this.isLoading) {
            this._startLoading();
         }
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
