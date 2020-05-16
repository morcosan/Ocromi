import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YLayout from './YLayout.vue';
import YPage from '../page/YPage.vue';
import YFieldTextArea from '../../forms/field-text-area/YFieldTextArea.vue';
import { groupId, settingsComputed, settingsProps } from '.storybook/custom/knob-props';
import faker from 'faker';
import { select } from '@storybook/addon-knobs';
import { LayoutType } from '../../../core/enums';


const vue = {
   components: {
      YLayout,
      YPage,
      YFieldTextArea,
   },
   props: {
      type: {
         default: () => select('Type', LayoutType, LayoutType.Vertical, groupId),
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


const basicFormTemplate = `
<YLayout 
   :type="type"
   :settings="settings"
>
   <template v-slot:top>
      <div style="background: #99f; height: 50px;"/>
   </template>
   
   <template v-slot:left>
      <div style="background: #f99; width: 100px; height: 100%;"/>
   </template>
   
   <template>
      ${ faker.lorem.paragraphs(7, '<br>') }
      <YFieldTextArea 
         v-model="value" 
         is-dynamic 
         is-optional
      />
   </template>

   <template v-slot:right>
      <div style="background: #9f9; width: 100px; height: 100%;"/>
   </template>
   
   <template v-slot:bottom>
      <div style="background: #999; height: 50px;"/>
   </template>
</YLayout>
`;


export default StoryBuilder.createDefault('Containers / Layout');
export const default_ = StoryBuilder.createBasicStory(vue, basicFormTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used as the top level container for a web page.
 */
`);
