import { boolean, number, select, text } from '@storybook/addon-knobs';
import { DesignStyle, Spinner, Theme } from '../../src/core/settings';


export const groupId = 'Props';

const settingsGroupId = 'Settings';
export const settingsProps = {
   theme: {
      default: () => select('Theme', Theme, Theme.Light, settingsGroupId),
   },
   designStyle: {
      default: () => select('Design Style', DesignStyle, DesignStyle.Material, settingsGroupId),
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
};


export const settingsComputed = {
   settings(): any {
      return {
         // @ts-ignore
         theme: this.theme,
         // @ts-ignore
         designStyle: this.designStyle,
         button: {
            // @ts-ignore
            isUppercase: this.isUppercase,
            // @ts-ignore
            isRounded: this.isRounded,
            // @ts-ignore
            spinner: this.spinner,
         },
      };
   },
};


export const propsInput = {
   label: {
      default: () => text('Label', 'Nice label', groupId),
   },
   error: {
      default: () => text('Error', '', groupId),
   },
   isDisabled: {
      default: () => boolean('Is Disabled', false, groupId),
   },
   isOptional: {
      default: () => boolean('Is Optional', false, groupId),
   },
   hidesOptional: {
      default: () => boolean('Hides Optional', false, groupId),
   },
   isReadonly: {
      default: () => boolean('Is Readonly', false, groupId),
   },
   isMini: {
      default: () => boolean('Is Mini', false, groupId),
   },
   sideLabelWidth: {
      default: () => text('Side Label Width', '', groupId),
   },
   ...settingsProps,
};


export const propsInputSelect = {
   ...propsInput,
   hint: {
      default: () => text('Hint', 'Nice hint', groupId),
   },
};


export const propsInputGroup = {
   ...propsInput,
};


export const propsInputSlider = {
   ...propsInput,
   thumbSuffix: {
      default: () => text('Thumb Suffix', ' %', groupId),
   },
   minValue: {
      default: () => number('Min Value', 0, {}, groupId),
   },
   maxValue: {
      default: () => number('Max Value', 100, {}, groupId),
   },
   valueStep: {
      default: () => number('Value Step', 1, {}, groupId),
   },
   stepDecimals: {
      default: () => number('Step Decimals', 2, {}, groupId),
   },
   hasMarkers: {
      default: () => boolean('Has Markers', false, groupId),
   },
};


export const propsInputField = {
   ...propsInput,
   placeholder: {
      default: () => text('Placeholder', 'Nice placeholder', groupId),
   },
   hint: {
      default: () => text('Hint', 'Nice hint', groupId),
   },
};


export const propsButton = {
   label: {
      default: () => text('Label', 'Nice button', groupId),
   },
   isDisabled: {
      default: () => boolean('Is Disabled', false, groupId),
   },
   ...settingsProps,
};


export const propsButtonLoading = {
   ...propsButton,
   loadingTime: {
      default: () => number('Loading Time', 2000, {}, groupId),
   },
};
