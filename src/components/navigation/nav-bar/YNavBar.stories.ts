import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YNavBar from './YNavBar.vue';
import YLayout from '../../containers/layout/YLayout.vue';
import YPage from '../../containers/page/YPage.vue';
import { propsGroupId, settingsComputed, settingsProps } from '.storybook/custom/knob-props';
import faker from 'faker';
import { boolean } from '@storybook/addon-knobs';


const vue = {
   components: {
      YNavBar,
      YLayout,
      YPage,
   },
   props: {
      isScrollable: {
         default: () => boolean('Is Scrollable', false, propsGroupId),
      },
      ...settingsProps,
   },
   computed: settingsComputed,
};


const defaultTemplate = `
<YLayout>
   <template v-slot:top>
      <YNavBar 
         :is-scrollable="isScrollable"
         :settings="settings"
      >
         Title example
      </YNavBar>
   </template>
   
   <template>
      <YPage>
         ${ faker.lorem.paragraphs(20, '<br>') }
      </YPage>
   </template>
</YLayout>
`;


export default StoryBuilder.createDefault('Navigation / Nav Bar App');
export const default_ = StoryBuilder.createBasicStory(vue, defaultTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used as the top navigation control for the entire app.
 */
`);
