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


export enum Design {
   Material = 'MATERIAL',
   Flat = 'FLAT',
}


export enum DuoStyle {
   FilledText = 'FILLED_TEXT',
   FilledOutlined = 'FILLED_OUTLINED',
}

export type Settings = {
   theme?: Theme,
   design?: Design,
   button?: {
      isRounded?: boolean,
      isUppercase?: boolean,
      spinner?: Spinner,
      duoStyle?: DuoStyle,
   },
};


const defaultSettings = {
   theme: Theme.Light,
   design: Design.Material,
   button: {
      isRounded: false,
      isUppercase: true,
      spinner: Spinner.Default,
      duoStyle: DuoStyle.FilledText,
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
