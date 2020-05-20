import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YNavItemTitle from './YNavItemTitle.vue';
import YNavBar from '../../navigation/nav-bar/YNavBar.vue';
import { propsGroupId, settingsComputed, settingsProps } from '.storybook/custom/knob-props';
import { text } from '@storybook/addon-knobs';


const vue = {
   components: {
      YNavItemTitle,
      YNavBar,
   },
   props: {
      value: {
         default: () => text('Value', 'Title Example', propsGroupId),
      },
      ...settingsProps,
   },
   computed: {
      ...settingsComputed,
   },
};


const defaultTemplate = `
<YNavBar>
   <YNavItemTitle 
      :value="value"
      :settings="settings"
   />
</YNavBar>
`;


export default StoryBuilder.createDefault('Navigation / Nav Item Title');
export const default_ = StoryBuilder.createBasicStory(vue, defaultTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used to display page title in nav bar.
 */
`);
