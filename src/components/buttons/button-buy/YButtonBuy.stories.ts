import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsButtonLoading, settingsComputed } from '.storybook/custom/knob-props';
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
         default: () => text('Label', 'Add to cart', groupId),
      },
      isLarge: {
         default: () => boolean('Is Large', false, groupId),
      },
      icon: {
         default: () => select('Icon', BuyIcon, BuyIcon.Default, groupId),
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
