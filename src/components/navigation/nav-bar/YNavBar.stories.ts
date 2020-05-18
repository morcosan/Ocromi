import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YNavBar from './YNavBar.vue';
import YLayout from '../../containers/layout/YLayout.vue';
import YPage from '../../containers/page/YPage.vue';
import { propsGroupId, storyGroupId, settingsComputed, settingsProps } from '.storybook/custom/knob-props';
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
      hasLogo: {
         default: () => boolean('Has Logo', true, storyGroupId),
      },
      hasTitle: {
         default: () => boolean('Has Title', true, storyGroupId),
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
         <template v-slot:logo v-if="hasLogo">
            <img 
               src="https://unfoldedinquiry.files.wordpress.com/2019/07/wp-header.png?w=656&h=210" 
               width="100%"
               height="100%"
               alt=""
            >
         </template>
         
         <template v-slot:title v-if="hasTitle">
            Title example
         </template>
      </YNavBar>
   </template>
   
   <template>
      <YPage>
         ${ faker.lorem.paragraphs(20, '<br>') }
      </YPage>
   </template>
</YLayout>
`;


export default StoryBuilder.createDefault('Navigation / Nav Bar');
export const default_ = StoryBuilder.createBasicStory(vue, defaultTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used as the top navigation control for the entire app.
 */
`);
