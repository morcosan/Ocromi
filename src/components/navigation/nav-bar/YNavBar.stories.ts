import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YNavBar from './YNavBar.vue';
import YLayout from '../../containers/layout/YLayout.vue';
import YPage from '../../containers/page/YPage.vue';
import YNavItemLogo from '../nav-item-logo/YNavItemLogo.vue';
import YNavItemTitle from '../nav-item-title/YNavItemTitle.vue';
import { propsGroupId, settingsComputed, settingsProps, storyGroupId } from '.storybook/custom/knob-props';
import faker from 'faker';
import { boolean, select } from '@storybook/addon-knobs';
import { PageSnapAlign, PageAlign } from '../../../core/enums';


const vue = {
   components: {
      YNavBar,
      YLayout,
      YPage,
      YNavItemLogo,
      YNavItemTitle,
   },
   props: {
      isScrollable: {
         default: () => boolean('Is Scrollable', false, propsGroupId),
      },
      pageSnapAlign: {
         default: () => select('Page Snap Align', PageSnapAlign, PageSnapAlign.Center, propsGroupId),
      },
      pageAlign: {
         default: () => select('Page Align', PageAlign, PageAlign.Center, storyGroupId),
      },
      hasLogo: {
         default: () => boolean('Has Logo', true, storyGroupId),
      },
      hasTitle: {
         default: () => boolean('Has Title', true, storyGroupId),
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
      <YNavBar 
         :is-scrollable="isScrollable"
         :page-snap-align="pageSnapAlign"
         :settings="settings"
      >
         <template v-slot:left>
            <YNavItemLogo v-if="hasLogo" image-url="/node-js.svg" style="height: 1.4rem;"/>
         </template>
         
         <YNavItemTitle v-if="hasTitle" value="Title Example"/>
         
         <template v-slot:right>
            <YNavItemLogo image-url="/node-js.svg" style="height: 1.4rem;"/>
         </template>
      </YNavBar>
   </template>
   
   <template>
      <YPage :align="pageAlign">
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
