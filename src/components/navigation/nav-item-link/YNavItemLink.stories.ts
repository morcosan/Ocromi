import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YNavItemLink from './YNavItemLink.vue';
import YNavBar from '../../navigation/nav-bar/YNavBar.vue';
import { propsGroupId, settingsComputed, settingsProps } from '.storybook/custom/knob-props';
import { text } from '@storybook/addon-knobs';


const vue = {
   components: {
      YNavItemLink,
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
   <YNavItemLink 
      :settings="settings"
   />
</YNavBar>
`;


export default StoryBuilder.createDefault('Navigation / Nav Item Link');
export const default_ = StoryBuilder.createBasicStory(vue, defaultTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used to display navigation / page link in nav bar.
 */
`);
