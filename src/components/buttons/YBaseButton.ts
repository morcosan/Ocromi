import { Component, Override, Prop, Vue, Watch } from '../../core/decorators';


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
export default class YBaseButton extends Vue {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: false, type: Boolean }) public hasFlatDesign!: boolean;
   @Prop({ default: false, type: Boolean }) public isLoading!: boolean;
   @Prop({ default: 2000 }) public loadingTime!: number;
   @Prop({ default: Spinner.Default }) public spinner!: Spinner;


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
      // @ts-ignore
      this.intervalID = setInterval(this.onLoading, interval);
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
