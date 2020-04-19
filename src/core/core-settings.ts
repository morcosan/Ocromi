import Vue from 'vue';


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


export type Settings = {
   hasDarkMode?: boolean,
   button?: {
      isRounded?: boolean,
      hasFlatDesign?: boolean,
      isUppercase?: boolean,
      spinner?: Spinner,
   },
};


const defaultSettings: Settings = {
   hasDarkMode: false,
   button: {
      isRounded: false,
      hasFlatDesign: false,
      isUppercase: true,
      spinner: Spinner.Default,
   },
};


export default {
   install(Vue: any, settings: Settings = defaultSettings) {
      // create global mixin
      Vue.mixin({
         computed: {
            YSettings(): Settings {
               return settings;
            },
         },
      });
   },
};
