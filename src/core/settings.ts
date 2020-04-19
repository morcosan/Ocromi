import Utils from '../utils';


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


const defaultSettings = {
   hasDarkMode: false,
   button: {
      isRounded: false,
      hasFlatDesign: false,
      isUppercase: true,
      spinner: Spinner.Default,
   },
};


export function install(Vue: any, settings: Settings = {}) {
   Vue.mixin({
      computed: {
         YSettings(): Settings {
            return Utils.mergeObjects(defaultSettings, settings);
         },
      },
   });
}
