<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import { QAvatar, QChip, QFile, QIcon, QTooltip } from 'quasar';


   export interface File {
      type: string;
      name: string;
   }


   @Component({
      components: { QFile, QIcon, QChip, QTooltip, QAvatar },
   })
   export default class YFieldFileUpload extends Mixins(YBaseInputField) {

      @Prop({ default: () => [] }) public value!: File[];
      @Prop({ default: () => [] }) public fileFormats!: string[]; // array of <mediatype>/<extension>
      @Prop({ default: false, type: Boolean }) public isMultiple!: boolean;
      @Prop({ default: 0 }) public maxFileSize!: number; // in KB
      @Prop({ default: 0 }) public maxTotalSize!: number; // in KB
      @Prop({ default: 0 }) public maxNumFiles!: number;


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: object[]) => (value.length > 0 || this.$locale.all.requiredError));
         }

         return rules;
      }


      // @ts-ignore
      public getCounterLabel({ totalSize, filesNumber }) {
         if (this.maxNumFiles > 0) {
            return `${ filesNumber } / ${ this.maxNumFiles } files (${ totalSize })`;
         }
         return `${ filesNumber } files (${ totalSize })`;
      }


      public getFileIcon(file: File) {
         const isVideo = (file.type.indexOf('video/') === 0);
         const isImage = (file.type.indexOf('image/') === 0);
         const isAudio = (file.type.indexOf('audio/') === 0);

         return (isVideo ? 'movie' : (isImage ? 'photo' : (isAudio ? 'audiotrack' : 'insert_drive_file')));
      }


      public onInput(value: File[] | File) {
         if (Array.isArray(value)) {
            // add new files to existing ones
            value.forEach((file: File) => {
               const exists = this.value.find(e => (e.name === file.name));
               if (!exists && this.value.length < this.maxNumFiles) {
                  this.value.push(file);
               }
            });

            this.updateValueProp(this.value);
         }
         else {
            this.updateValueProp([value]);
         }
      }


      public onClickRemoveFile(index: number, event: Event) {
         event.preventDefault();

         if (!this.isReadonly && !this.isDisabled) {
            if (index > -1) {
               // remove file at index
               this.value.splice(index, 1);

               this.updateValueProp(this.value);
            }
            else {
               this.updateValueProp([]);
            }
         }
      }


      public onKeyDownAttachIcon(event: KeyboardEvent) {
         if (!this.isReadonly) {
            // activate button with space or enter
            if (event.key === ' ' || event.key === 'Enter') {
               event.preventDefault();
               this.openFilePicker();
            }
         }
      }


      public onClickAttachIcon() {
         this.openFilePicker();
      }


      private openFilePicker() {
         (this.$refs.qField as QFile).pickFiles();
      }

   }
</script>


<template>
   <QFile
      :value="value"
      :label="finalLabel"
      :placeholder="finalPlaceholder"
      :hint="hint"
      :multiple="isMultiple"
      :accept="fileFormats.join(',')"
      :max-file-size="maxFileSize > 0 ? (maxFileSize * 1024) : undefined"
      :max-total-size="maxTotalSize > 0 ? (maxTotalSize * 1024) : undefined"
      :max-files="maxNumFiles > 0 ? maxNumFiles : undefined"
      :readonly="isReadonly"
      :disable="isDisabled"
      :error="!!error"
      :error-message="error"
      :rules="finalRules"
      :bg-color="bgColor"
      :class="{
         'y-base-input y-field-file-upload': true,
			'y-field-file-upload--empty': (value.length === 0),
		}"
      :counter-label="getCounterLabel"
      counter
      outlined
      lazy-rules
      @input="onInput"
      ref="qField"
   >
      <template v-slot:append>
         <QIcon
            v-if="value.length === 0"
            :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
            :tabindex="isReadonly ? -1 : 0"
            name="attach_file"
            color="grey-8"
            @click="onClickAttachIcon"
            @keydown="onKeyDownAttachIcon"
         >
            <QTooltip v-if="!isReadonly">{{ $locale.fieldFileUpload.tooltipPickFiles }}</QTooltip>
         </QIcon>

         <QIcon
            v-if="value.length > 0"
            :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
            name="clear_all"
            @click="onClickRemoveFile(-1, $event)"
         >
            <QTooltip v-if="!isReadonly">{{ $locale.fieldFileUpload.tooltipRemoveFiles }}</QTooltip>
         </QIcon>
      </template>


      <template v-slot:file="scope">
         <QChip
            :class="{ 'q-mb-xs q-px-none q-mx-none row': true, 'cursor-not-allowed': isReadonly }"
            style="width: 100%"
            square
         >
            <QIcon
               :name="scope ? getFileIcon(scope.file) : ''"
               size="xs"
               color="grey-7"
               class="q-mx-xs"
            />

            <div class="ellipsis relative-position col"> {{ scope ? scope.file.name : '' }}</div>

            <QAvatar
               :class="{ 'y-chip__button': true, 'cursor-pointer': !isReadonly }"
               @click="onClickRemoveFile(scope.index, $event)"
            >
               <QIcon
                  name="close"
                  size="20px"
                  color="grey-7"
               />
            </QAvatar>
         </QChip>

         <QTooltip v-if="!isReadonly">{{ $locale.fieldFileUpload.tooltipPickFiles }}</QTooltip>
      </template>
   </QFile>
</template>


<style scoped lang="scss">
   @import '../../../css/variables';

   // change color of close button on hover
   .y-chip__button.cursor-pointer:hover {
      background-color: $red-4;
   }
</style>
