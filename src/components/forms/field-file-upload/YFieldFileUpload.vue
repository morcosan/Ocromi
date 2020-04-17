<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QAvatar, QChip, QFile, QIcon, QTooltip } from 'quasar';


   export type File = {
      type: string;
      name: string;
   }


   type FileData = {
      totalSize: number;
      filesNumber: number;
   }


   @Component({
      components: { QFile, QIcon, QChip, QTooltip, QAvatar, YTemplateInput },
   })
   export default class YFieldFileUpload extends YBaseInputField {

      @Prop({ default: () => [] }) public value!: File[];
      @Prop({ default: () => [] }) public fileFormats!: string[]; // array of <mediatype>/<extension>
      @Prop({ default: false, type: Boolean }) public isMultiple!: boolean;
      @Prop({ default: 0 }) public maxFileSize!: number; // in KB
      @Prop({ default: 0 }) public maxTotalSize!: number; // in KB
      @Prop({ default: 0 }) public maxNumFiles!: number;


      public hintOnRight: string = '';


      @Override
      public get finalValue() {
         return this.value;
      }


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: object[]) => (value.length > 0 || this.$locale.all.requiredError));
         }

         return rules;
      }


      public setHintOnRight({ totalSize, filesNumber }: FileData) {
         if (this.maxNumFiles > 0) {
            this.hintOnRight = `${ filesNumber } / ${ this.maxNumFiles } files (${ totalSize })`;
         }
         this.hintOnRight = `${ filesNumber } files (${ totalSize })`;
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
               const isNew = !this.value.find(e => (e.name === file.name));
               const isNotFull = (this.maxNumFiles === 0 || this.value.length < this.maxNumFiles);
               if (isNew && isNotFull) {
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


      public openFilePicker() {
         (this.$refs.qField as QFile).pickFiles();
      }

   }
</script>


<template>
   <YTemplateInput
      :class="'y-field-file-upload ' + (value.length === 0 ? 'is-empty' : '')"
      :is-mini="isMini"
      :side-label-width="sideLabelWidth"
      :final-label="finalLabel"
      :final-error="finalError"
   >
      <QFile
         :value="value"
         :label="(isMini ? finalLabel : undefined)"
         :placeholder="finalPlaceholder"
         :multiple="isMultiple"
         :accept="fileFormats.join(',')"
         :max-file-size="maxFileSize > 0 ? (maxFileSize * 1024) : undefined"
         :max-total-size="maxTotalSize > 0 ? (maxTotalSize * 1024) : undefined"
         :max-files="maxNumFiles > 0 ? maxNumFiles : undefined"
         :readonly="isReadonly"
         :disable="isDisabled"
         :error="!!finalError"
         :bg-color="bgColor"
         :counter-label="setHintOnRight"
         counter
         outlined
         lazy-rules
         hide-bottom-space
         @input="onInput"
         @blur="onBlur"
         ref="qField"
      >
         <template v-slot:append>
            <QIcon
               v-if="value.length === 0"
               :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
               :tabindex="isReadonly ? -1 : 0"
               name="attach_file"
               color="grey-8"
               @click="openFilePicker"
               @keydown="onKeyDownAttachIcon"
            >
               <QTooltip v-if="!isReadonly">{{ $locale.fieldFileUpload.tooltipPickFiles }}</QTooltip>
            </QIcon>

            <QIcon
               v-if="value.length > 1 && !isReadonly && !isDisabled"
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
                  v-if="!isReadonly && !isDisabled"
                  class="y-chip__button cursor-pointer"
                  @click="onClickRemoveFile(scope.index, $event)"
               >
                  <QIcon name="close" size="20px" color="grey-7"/>
                  <QTooltip>{{ $locale.fieldFileUpload.tooltipRemoveFile }}</QTooltip>
               </QAvatar>
            </QChip>

            <QTooltip v-if="!isReadonly">{{ $locale.fieldFileUpload.tooltipPickFiles }}</QTooltip>
         </template>
      </QFile>


      <template v-slot:bottom-left>
         <div v-if="!finalError && hint">{{ hint }}</div>
      </template>


      <template v-slot:bottom-right>
         {{ hintOnRight }}
      </template>

   </YTemplateInput>
</template>


<style scoped lang="scss">
   @import '../../../css/variables';

   // change color of close button on hover
   .y-chip__button.cursor-pointer:hover {
      background-color: $grey-5;
   }

   .y-field-file-upload {
      // place the error icon before the attach icon
      &.is-empty /deep/ .q-field__append.q-anchor--skip {
         position: absolute;
         right: 34px;
         padding-right: 0;
      }

      // reset height for input
      &:not(.is-empty) /deep/ .q-file.q-field--auto-height .q-field__control {
         height: auto;
      }

      // swap position for error icon when files selected
      &:not(.is-empty) /deep/ .q-file.q-field--error .q-field__append:not(.q-anchor--skip) {
         position: relative;
         left: 30px;
      }
      &:not(.is-empty) /deep/ .q-file.q-field--error .q-field__append.q-anchor--skip {
         position: relative;
         right: 36px;
         padding-right: 0;
      }
   }
</style>
