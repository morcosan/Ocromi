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


export enum Theme {
   Light = 'LIGHT',
   Dark = 'DARK',
}


export enum DesignStyle {
   Material = 'MATERIAL',
   Flat = 'FLAT',
}


export type Settings = {
   theme?: Theme,
   designStyle?: DesignStyle,
   button?: {
      isRounded?: boolean,
      isUppercase?: boolean,
      spinner?: Spinner,
   },
};


const defaultSettings = {
   theme: Theme.Light,
   designStyle: DesignStyle.Material,
   button: {
      isRounded: false,
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
