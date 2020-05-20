import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YNavItemLogo from './YNavItemLogo.vue';
import YNavBar from '../../navigation/nav-bar/YNavBar.vue';
import YLayout from '../../containers/layout/YLayout.vue';
import { propsGroupId, settingsComputed, settingsProps } from '.storybook/custom/knob-props';
import { text } from '@storybook/addon-knobs';


const vue = {
   components: {
      YNavItemLogo,
      YNavBar,
      YLayout,
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
<YLayout>
   <template v-slot:top>
      <YNavBar>
         <YNavItemLogo 
            :image-url="imageUrl"
            :settings="settings"
            style="height: 1.6rem;"
         />
      </YNavBar>
   </template>
</YLayout>
`;


export default StoryBuilder.createDefault('Navigation / Nav Item Logo');
export const default_ = StoryBuilder.createBasicStory(vue, defaultTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used to display app logo in top-left corner.
 */
`);
