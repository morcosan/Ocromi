import Utils from '../utils';
import { Design, DuoStyle, Spinner, Theme } from './enums';


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
