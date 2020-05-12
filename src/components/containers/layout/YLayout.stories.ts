import StoryBuilder from '.storybook/custom/story-builder';
import '.storybook/custom/story-builder.scss';
import YLayout from './YLayout.vue';
import YPage from '../page/YPage.vue';
import { settingsComputed } from '../../../../.storybook/custom/knob-props';


const vue = {
   components: {
      YLayout,
      YPage,
   },
   props: {},
   computed: settingsComputed,
};


const basicFormTemplate = `
<YLayout 
   :settings="settingsComputed"
>
   <YPage>
      Hello world.
   </YPage>
</YLayout>
`;


export default StoryBuilder.createDefault('Containers / Layout');
export const default_ = StoryBuilder.createBasicStory(vue, basicFormTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used as the top level container for a web page.
 */
`);
