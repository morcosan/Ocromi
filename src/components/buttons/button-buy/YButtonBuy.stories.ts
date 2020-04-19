import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsButtonLoading } from '../../../../.storybook/custom/knob-props';
import { boolean, select, text } from '@storybook/addon-knobs';
// @ts-ignore
import YButtonBuy, { BuyIcon } from './YButtonBuy.vue';


const vue = {
   components: {
      YButtonBuy,
   },
   props: {
      ...propsButtonLoading,
      label: {
         default: () => text('Label', 'Add to cart'),
      },
      isLarge: {
         default: () => boolean('Is Large', false),
      },
      icon: {
         default: () => select('Icon', BuyIcon, BuyIcon.Default),
      },
   },
   methods: {
      onClick() {
         console.log('Loading...');
         setTimeout(
            () => {
               console.log('Done');
               // @ts-ignore
               this.$refs.button.stopLoading();
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
            :spinner="spinner"
            :is-large="isLarge"
            :icon="icon"
            @click="onClick"
            ref="button"
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
