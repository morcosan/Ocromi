import { Component, Override, Prop, Watch } from '../../core/decorators';
import YBaseButton from './YBaseButton';


export enum Spinner {
   Default = 'DEFAULT',
   Bars = 'BARS',
   Cube = 'CUBE',
   Dots = 'DOTS',
   Facebook = 'FACEBOOK',
   Grid = 'GRID',
   Hourglass = 'HOURGLASS',
   IOS = 'IOS',
   Circle = 'CIRCLE',
   Pie = 'PIE',
   Radio = 'RADIO',
}


@Component
export default class YBaseButtonLoading extends YBaseButton {

   @Prop({ default: 2000 }) public loadingTime!: number;
   @Prop({ default: Spinner.Default }) public spinner!: Spinner;


   public isLoading: boolean = false;
   public percentage: number = 0;
   public intervalID!: number;


   @Watch('isLoading')
   public onChange_isLoading() {
      if (this.isLoading) {
         this.startLoading();
      }
      else {
         clearInterval(this.intervalID);
      }
   }


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
      this.isLoading = true;
      this.percentage = 0;

      // calculate interval
      const minTime = 300;
      const totalTime = (this.loadingTime > minTime ? this.loadingTime : minTime);
      const interval = totalTime / 100;

      // start loading
      // @ts-ignore
      this.intervalID = setInterval(this.onLoading, interval);
   }


   public stopLoading() {
      this.isLoading = false;
      clearInterval(this.intervalID);
   }


   private onLoading() {
      if (this.percentage < 99) {
         this.percentage += 1;
      }
      else {
         clearInterval(this.intervalID);
      }
   }

}
