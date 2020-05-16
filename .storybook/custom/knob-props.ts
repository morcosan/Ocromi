import { boolean, number, select, text } from '@storybook/addon-knobs';
import { Design, DuoStyle, Spinner, Theme } from '../../src/core/enums';


export const propsGroupId = 'Props';
export const storyGroupId = '@Storybook';

const settingsGroupId = 'YSettings';
export const settingsProps = {
   theme: {
      default: () => select('Theme', Theme, Theme.Light, settingsGroupId),
   },
   design: {
      default: () => select('Design', Design, Design.Material, settingsGroupId),
   },
   isUppercase: {
      default: () => boolean('Button: Is Uppercase', true, settingsGroupId),
   },
   isRounded: {
      default: () => boolean('Button: Is Rounded', false, settingsGroupId),
   },
   spinner: {
      default: () => select('Button: Spinner', Spinner, Spinner.Default, settingsGroupId),
   },
   duoStyle: {
      default: () => select('Button: Duo Style', DuoStyle, DuoStyle.FilledText, settingsGroupId),
   },
};


export const settingsComputed = {
   settings(): any {
      return {
         // @ts-ignore
         theme: this.theme,
         // @ts-ignore
         design: this.design,
         button: {
            // @ts-ignore
            isUppercase: this.isUppercase,
            // @ts-ignore
            isRounded: this.isRounded,
            // @ts-ignore
            spinner: this.spinner,
            // @ts-ignore
            duoStyle: this.duoStyle,
         },
      };
   },
};


export const propsInput = {
   label: {
      default: () => text('Label', 'Nice label', propsGroupId),
   },
   error: {
      default: () => text('Error', '', propsGroupId),
   },
   isDisabled: {
      default: () => boolean('Is Disabled', false, propsGroupId),
   },
   isOptional: {
      default: () => boolean('Is Optional', false, propsGroupId),
   },
   hidesOptional: {
      default: () => boolean('Hides Optional', false, propsGroupId),
   },
   isReadonly: {
      default: () => boolean('Is Readonly', false, propsGroupId),
   },
   isMini: {
      default: () => boolean('Is Mini', false, propsGroupId),
   },
   sideLabelWidth: {
      default: () => text('Side Label Width', '', propsGroupId),
   },
   ...settingsProps,
};


export const propsInputSelect = {
   ...propsInput,
   hint: {
      default: () => text('Hint', 'Nice hint', propsGroupId),
   },
};


export const propsInputGroup = {
   ...propsInput,
};


export const propsInputSlider = {
   ...propsInput,
   thumbSuffix: {
      default: () => text('Thumb Suffix', ' %', propsGroupId),
   },
   minValue: {
      default: () => number('Min Value', 0, {}, propsGroupId),
   },
   maxValue: {
      default: () => number('Max Value', 100, {}, propsGroupId),
   },
   valueStep: {
      default: () => number('Value Step', 1, {}, propsGroupId),
   },
   stepDecimals: {
      default: () => number('Step Decimals', 2, {}, propsGroupId),
   },
   hasMarkers: {
      default: () => boolean('Has Markers', false, propsGroupId),
   },
};


export const propsInputField = {
   ...propsInput,
   placeholder: {
      default: () => text('Placeholder', 'Nice placeholder', propsGroupId),
   },
   hint: {
      default: () => text('Hint', 'Nice hint', propsGroupId),
   },
};


export const propsButton = {
   label: {
      default: () => text('Label', 'Nice button', propsGroupId),
   },
   isDisabled: {
      default: () => boolean('Is Disabled', false, propsGroupId),
   },
   ...settingsProps,
};


export const propsButtonLoading = {
   ...propsButton,
   loadingTime: {
      default: () => number('Loading Time', 1000, {}, propsGroupId),
   },
};
