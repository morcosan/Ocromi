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

export const defaultSettings = {
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
   settings.theme && (defaultSettings.theme = settings.theme);
   settings.design && (defaultSettings.design = settings.design);
   settings.button && (defaultSettings.button = Utils.mergeObjects(defaultSettings.button, settings.button));
}
