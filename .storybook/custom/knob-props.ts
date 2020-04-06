import { boolean, number, text } from '@storybook/addon-knobs';


export const propsInput = {
   label: {
      default: () => text('Label', 'Nice label'),
   },
   error: {
      default: () => text('Error', ''),
   },
   isDisabled: {
      default: () => boolean('Is Disabled', false),
   },
   isRequired: {
      default: () => boolean('Is Required', false),
   },
   isReadonly: {
      default: () => boolean('Is Readonly', false),
   },
};


export const propsInputSelect = {
   ...propsInput,
   hint: {
      default: () => text('Hint', 'Nice hint'),
   },
};


export const propsInputGroup = {
   ...propsInput,
};


export const propsInputSlider = {
   ...propsInput,
   thumbSuffix: {
      default: () => text('Thumb Suffix', ' %'),
   },
   minValue: {
      default: () => number('Min Value', 0),
   },
   maxValue: {
      default: () => number('Max Value', 100),
   },
   valueStep: {
      default: () => number('Value Step', 1),
   },
   stepDecimals: {
      default: () => number('Step Decimals', 2),
   },
   hasMarkers: {
      default: () => boolean('Has Markers', false),
   },
};


export const propsInputField = {
   ...propsInput,
   placeholder: {
      default: () => text('Placeholder', 'Nice placeholder'),
   },
   hint: {
      default: () => text('Hint', 'Nice hint'),
   },
};


export const propsButton = {
   label: {
      default: () => text('Label', 'Nice button'),
   },
   isDisabled: {
      default: () => boolean('Is Disabled', false),
   },
};
