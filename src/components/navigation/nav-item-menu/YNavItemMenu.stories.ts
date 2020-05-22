import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YNavItemMenu from './YNavItemMenu.vue';
import YNavBar from '../../navigation/nav-bar/YNavBar.vue';
import { propsGroupId, settingsComputed, settingsProps } from '.storybook/custom/knob-props';
import { text } from '@storybook/addon-knobs';


const vue = {
   components: {
      YNavItemMenu,
      YNavBar,
   },
   props: {
      imageUrl: {
         default: () => text('Image URL', '/node-js.svg', propsGroupId),
      },
      ...settingsProps,
   },
   computed: {
      ...settingsComputed,
   },
};


const defaultTemplate = `
<YNavBar>
   <YNavItemMenu 
      :settings="settings"
   />
</YNavBar>
`;


export default StoryBuilder.createDefault('Navigation / Nav Item Menu');
export const default_ = StoryBuilder.createBasicStory(vue, defaultTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used to display menu button in nav bar.
 */
`);
