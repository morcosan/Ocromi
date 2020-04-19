import { Component, Override, Prop, Watch } from '../../core/decorators';
import YBaseButton from './YBaseButton';
import { Spinner } from '../../core/enums';


@Component
export default class YBaseButtonLoading extends YBaseButton {

   @Prop({ default: 1000 }) public loadingTime!: number;
   @Prop({ default: Spinner.Default }) public spinner!: Spinner;


   public isLoading: boolean = false;
   public percentage: number = 0;
   public intervalID!: number | undefined;
   private minStepTime: number = 500;
   private minStepValue: number = 50;
   private maxStepTime: number = 6000;
   private maxStepValue: number = 3;
   private loadingStep!: number;


   @Override
   public get isDisabledComputed() {
      return (this.isDisabled && !this.isLoading);
   }


   @Override
   public mounted() {
      if (this.isLoading) {
         this.startLoading();
      }
   }


   public onClick() {
      this.startLoading();
      this.$emit('click');
   }


   public startLoading() {
      if (this.loadingTime > 0) {
         this.isLoading = true;
         this.percentage = 0;

         // @ts-ignore
         this.intervalID = setInterval(this.onLoading, this.computeIntervalTime());
      }
   }


   public stopLoading() {
      this.isLoading = false;
      clearInterval(this.intervalID);
      this.intervalID = undefined;
   }


   private onLoading() {
      if (this.percentage < 100) {
         this.percentage += this.loadingStep;
      }
      else {
         this.stopLoading();
      }
   }


   private computeIntervalTime() {
      const loadingTime = (this.loadingTime > this.minStepTime ? this.loadingTime : this.minStepTime);

      if (loadingTime > this.maxStepTime) {
         this.loadingStep = this.maxStepValue;
      }
      else {
         const percent = (loadingTime - this.minStepTime) / (this.maxStepTime - this.minStepTime);
         this.loadingStep = percent * (this.maxStepValue - this.minStepValue) + this.minStepValue;
      }

      return (loadingTime * this.loadingStep / 100);
   }

}
