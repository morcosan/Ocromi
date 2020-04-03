/**
 * List of props for components
 */

import { boolean, number, text } from '@storybook/addon-knobs';


/** Basic props for form control */
export const formControlProps = {
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

/** Basic props for form select */
export const formSelectProps = {
   ...formControlProps,
   hint: {
      default: () => text('Hint', 'Nice hint'),
   },
};

/** Basic props for form group */
export const formGroupProps = {
   ...formControlProps,
};

/** Basic props for form slider */
export const formSliderProps = {
   ...formControlProps,
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

/** Basic props for form field */
export const formFieldProps = {
   ...formControlProps,
   placeholder: {
      default: () => text('Placeholder', 'Nice placeholder'),
   },
   hint: {
      default: () => text('Hint', 'Nice hint'),
   },
};

/** Basic props for button */
export const buttonProps = {
   label: {
      default: () => text('Label', 'Nice button'),
   },
   isDisabled: {
      default: () => boolean('Is Disabled', false),
   },
};
