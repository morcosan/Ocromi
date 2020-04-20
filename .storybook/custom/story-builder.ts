import { withKnobs } from '@storybook/addon-knobs';
import i18n from '../../src/i18n';
import './story-builder.scss';


export type StoryLine = {
   template: string,
   title: string,
   states?: string[],
}


export default class StoryBuilder {

   public static createDefault(title: string) {
      return {
         // @ts-ignore
         title: (process.Ocromi.version + ' | ' + title),
         decorators: [withKnobs],
      };
   }


   public static createStory(vue: object, stories: StoryLine[]) {
      let storyTemplate = '';
      stories.forEach((story: StoryLine) => {
         let statesTemplate = '';
         if (story.states) {
            story.states.forEach((state: string) => {
               statesTemplate += `<div class="story__state">{{ ${ state } }}</div>`;
            });
         }

         storyTemplate += `
            <div class="story">
               <div class="story_header">
                  <h6 class="story__title">${ story.title }</h6>
                  ${ statesTemplate }
               </div>
               ${ story.template }
            </div>
         `;
      });

      return () => ({
         ...vue,
         i18n,
         template: `
            <div class="story-display">
               ${ storyTemplate }
            </div>
         `,
      });
   }


   public static createDocs(docsStr: string) {
      return () => `
         <div class="story-display">
            <pre>${ docsStr }</pre>
         </div>
      `;
   }


   public static createBasicStory(vue: object, template: string) {
      return () => ({
         ...vue,
         i18n,
         template,
      });
   }

}
