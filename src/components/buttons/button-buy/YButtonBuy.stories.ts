import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsGroupId, propsButtonLoading, settingsComputed } from '.storybook/custom/knob-props';
import { boolean, select, text } from '@storybook/addon-knobs';
import YButtonBuy from './YButtonBuy.vue';
import { BuyIcon } from '../../../core/enums';


const vue = {
   components: {
      YButtonBuy,
   },
   props: {
      ...propsButtonLoading,
      label: {
         default: () => text('Label', 'Add to cart', propsGroupId),
      },
      isLarge: {
         default: () => boolean('Is Large', false, propsGroupId),
      },
      icon: {
         default: () => select('Icon', BuyIcon, BuyIcon.Default, propsGroupId),
      },
   },
   computed: settingsComputed,
   methods: {
      onClick() {
         console.log('Loading...');
         setTimeout(
            () => {
               console.log('Done');
            },
            // @ts-ignore
            this.loadingTime,
         );
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YButtonBuy
            :label="label"
            :is-disabled="isDisabled"
            :loading-time="loadingTime"
            :is-large="isLarge"
            :icon="icon"
            :settings="settings"
            @click="onClick"
         />
      `,
   },
];


export default StoryBuilder.createDefault('Buttons / Button Buy');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs a call to action.
 */
`);
