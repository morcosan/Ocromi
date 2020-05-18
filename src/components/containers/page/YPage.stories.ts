import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YPage from './YPage.vue';
import YLayout from '../layout/YLayout.vue';
import YFieldTextArea from '../../forms/field-text-area/YFieldTextArea.vue';
import { propsGroupId, settingsComputed, settingsProps } from '.storybook/custom/knob-props';
import { select, text } from '@storybook/addon-knobs';
import { PageAlign } from '../../../core/enums';
import faker from 'faker';


const vue = {
   components: {
      YPage,
      YLayout,
      YFieldTextArea,
   },
   props: {
      align: {
         default: () => select('Align', PageAlign, PageAlign.Center, propsGroupId),
      },
      ...settingsProps,
   },
   data() {
      return {
         value: [],
      };
   },
   computed: settingsComputed,
};


const defaultTemplate = `
<YLayout>
   <YPage
      :settings="settings"
      :align="align"
   >
      ${ faker.lorem.paragraphs(4, '<br>') }
      <YFieldTextArea 
         v-model="value" 
         is-dynamic 
         is-optional
      />
      ${ faker.lorem.paragraphs(4, '<br>') }
   </YPage>
</YLayout>
`;


const noLayoutTemplate = `
<YPage 
   :settings="settings"
   :align="align"
>
   ${ faker.lorem.paragraphs(4, '<br>') }
   <YFieldTextArea 
      v-model="value" 
      is-dynamic 
      is-optional
   />
   ${ faker.lorem.paragraphs(4, '<br>') }
</YPage>
`;


export default StoryBuilder.createDefault('Containers / Page');
export const default_ = StoryBuilder.createBasicStory(vue, defaultTemplate);
export const noLayout = StoryBuilder.createBasicStory(vue, noLayoutTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used as the top level container for page content. It must be placed inside a layout.
 */
`);
