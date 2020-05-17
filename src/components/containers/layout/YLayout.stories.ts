import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YLayout from './YLayout.vue';
import YPage from '../page/YPage.vue';
import YFieldTextArea from '../../forms/field-text-area/YFieldTextArea.vue';
import { propsGroupId, settingsComputed, settingsProps, storyGroupId } from '.storybook/custom/knob-props';
import faker from 'faker';
import { boolean, select } from '@storybook/addon-knobs';
import { LayoutType } from '../../../core/enums';


const vue = {
   components: {
      YLayout,
      YPage,
      YFieldTextArea,
   },
   props: {
      type: {
         default: () => select('Type', LayoutType, LayoutType.Vertical, propsGroupId),
      },
      displayTop: {
         default: () => boolean('Display: Top', true, storyGroupId),
      },
      displayLeft: {
         default: () => boolean('Display: Left', true, storyGroupId),
      },
      displayRight: {
         default: () => boolean('Display: Right', true, storyGroupId),
      },
      displayBottom: {
         default: () => boolean('Display: Bottom', true, storyGroupId),
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
   <template v-slot:top v-if="displayTop">
      <div class="story-block" style="height: 50px;">
         <span>TOP</span>
      </div>
   </template>
   
   <template v-slot:left v-if="displayLeft">
      <div class="story-block" style="width: 100px;">
         <span>LEFT</span>
      </div>
   </template>
   
   <template>
      ${ faker.lorem.paragraphs(5, '<br>') }
      <YFieldTextArea 
         v-model="value" 
         is-dynamic 
         is-optional
      />
   </template>

   <template v-slot:right v-if="displayRight">
      <div class="story-block" style="width: 100px;">
         <span>RIGHT</span>
      </div>
   </template>
   
   <template v-slot:bottom v-if="displayBottom">
      <div class="story-block" style="height: 50px;">
         <span>BOTTOM</span>
      </div>
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
