// @ts-ignore
import YFieldFileUpload, { File } from './YFieldFileUpload.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsInputField, settingsComputed } from '.storybook/custom/knob-props';
import { array, boolean, number } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldFileUpload,
   },
   props: {
      ...propsInputField,
      placeholder: undefined,
      isMultiple: {
         default: () => boolean('Is Multiple', false, groupId),
      },
      maxFileSize: {
         default: () => number('Max File Size (KB)', 0, {}, groupId),
      },
      maxTotalSize: {
         default: () => number('Max Total Size (KB)', 0, {}, groupId),
      },
      maxNumFiles: {
         default: () => number('Max Num Files', 0, {}, groupId),
      },
      fileFormats: {
         default: () => array('File Formats', [], '\n', groupId),
      },
   },
   data() {
      return {
         value: [],
         value1: [],
         rules: [
            (value: File[]) => {
               let passed = true;
               value.forEach((file: File) => {
                  if (file.name.length <= 15) {
                     passed = false;
                  }
               });
               return (passed || 'File name must be longer than 15');
            },
         ],
      };
   },
   computed: settingsComputed,
   methods: {
      onClick() {
         // @ts-ignore
         this.$refs.fieldFileUpload.validate();
      },

      onClick2() {
         // @ts-ignore
         this.$refs.fieldFileUpload2.validate();
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YFieldFileUpload
            v-model="value"
            :label="label"
            :hint="hint"
            :file-formats="fileFormats"
            :max-file-size="maxFileSize"
            :max-total-size="maxTotalSize"
            :max-num-files="maxNumFiles"
            :is-multiple="isMultiple"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :error="error"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
            ref="fieldFileUpload"
         />
         <br>
         <button class="story-button" @click="onClick">Validate</button>
      `,
      states: ['value', 'typeof value', 'fileFormats'],
   },
   {
      title: 'With rules (name.length > 15)',
      template: `
         <YFieldFileUpload
            v-model="value1"
            :label="label"
            :hint="hint"
            :file-formats="fileFormats"
            :max-file-size="maxFileSize"
            :max-total-size="maxTotalSize"
            :is-multiple="isMultiple"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :rules="rules"
            :error="error"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
            ref="fieldFileUpload2"
         />
         <br>
         <button class="story-button" @click="onClick2">Validate</button>
      `,
      states: ['value1'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Field File Upload');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to upload files.
 */
`);
