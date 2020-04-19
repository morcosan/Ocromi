import { boolean, number, select, text } from '@storybook/addon-knobs';
import { Spinner } from '../../src/core/settings';


export const groupId = 'Props';

const settingsGroupId = 'Settings';
const props = {
   isUppercase: {
      default: () => boolean('Is Uppercase', true, settingsGroupId),
   },
   spinner: {
      default: () => select('Spinner', Spinner, Spinner.Default, settingsGroupId),
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
   ...props,
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
   ...props,
};


export const propsButtonLoading = {
   ...propsButton,
   loadingTime: {
      default: () => number('Loading Time', 2000, {}, groupId),
   },
};
