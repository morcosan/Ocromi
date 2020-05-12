import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YPage from './YPage.vue';
import YLayout from '../layout/YLayout.vue';
import { groupId, settingsComputed } from '../../../../.storybook/custom/knob-props';
import { select, text } from '@storybook/addon-knobs';
import { PageAlign } from '../../../core/enums';
import faker from 'faker';


const vue = {
   components: {
      YPage,
      YLayout,
   },
   props: {
      width: {
         default: () => text('Width', '768px', groupId),
      },
      align: {
         default: () => select('Align', PageAlign, PageAlign.Center, groupId),
      },
   },
   computed: settingsComputed,
};


const basicFormTemplate = `
<YLayout>
   <YPage 
      :settings="settingsComputed"
      :width="width"
      :align="align"
   >
      ${ faker.lorem.paragraphs(25, '<br/>') }
   </YPage>
</YLayout>
`;


export default StoryBuilder.createDefault('Containers / Page');
export const default_ = StoryBuilder.createBasicStory(vue, basicFormTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used as the top level container for page content. It must be placed inside a layout.
 */
`);
