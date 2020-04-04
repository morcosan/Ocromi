<script lang="ts">
   /**
    * Used when user needs to upload files.
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import YBaseFormField from '../../mixins/YBaseFormField';
   import { QAvatar, QChip, QFile, QIcon, QTooltip } from 'quasar';


   @Component({
      components: { QFile, QIcon, QChip, QTooltip, QAvatar },
   })
   export default class YFieldFileUpload extends Mixins(YBaseFormField) {

      /** Content props */
      @Prop({ default: () => [] }) public value!: object[];

      /** Config props */
      @Prop({ default: () => [] }) public fileFormats!: string[]; // array of <mediatype>/<extension>
      @Prop({ default: false, type: Boolean }) public isMultiple!: boolean;
      @Prop({ default: 0 }) public maxFileSize!: number; // in KB
      @Prop({ default: 0 }) public maxTotalSize!: number; // in KB
      @Prop({ default: 0 }) public maxNumFiles!: number;

      /** Compute validation rules */
      public get finalRules() {
         const rules = [...this.rules];
         // add required rule
         if (this.isRequired) {
            rules.push((value: object[]) => (value.length > 0 || this.$locale.all.requiredField));
         }
         return rules;
      }

      /** Display counter label */
      // @ts-ignore
      public counterLabel({ totalSize, filesNumber }) {
         if (this.maxNumFiles > 0) {
            return `${ filesNumber } / ${ this.maxNumFiles } files (${ totalSize })`;
         }
         return `${ filesNumber } files (${ totalSize })`;
      }

      /** Find the appropriate file icon */
      public getFileIcon(file: object) {
         // @ts-ignore
         return file.type.indexOf('video/') === 0
            ? 'movie'
            // @ts-ignore
            : (file.type.indexOf('image/') === 0
                  ? 'photo'
                  // @ts-ignore
                  : (file.type.indexOf('audio/') === 0
                        ? 'audiotrack'
                        : 'insert_drive_file'
                  )
            );
      }

      /** Update selected files on input */
      public onInput(value: object[] | object) {
         // check if array
         if (Array.isArray(value)) {
            // add new files to existing ones
            value.forEach((file: object) => {
               // check if file name exists
               // @ts-ignore
               const exists = this.value.find(e => (e.name === file.name));
               if (!exists && this.value.length < this.maxNumFiles) {
                  this.value.push(file);
               }
            });

            // update
            this.$emit('input', this.value);
         }
         else {
            // update single file
            this.$emit('input', [value]);
         }
      }

      /** Remove selected file */
      public onClickRemoveFile(index: number, event: Event) {
         event.preventDefault();

         if (!this.isReadonly && !this.isDisabled) {
            if (index > -1) {
               // remove file
               this.value.splice(index, 1);
               // update
               this.$emit('input', this.value);
            }
            else {
               // clear all
               this.$emit('input', []);
            }
         }
      }

      /** Accessibility for file picker button */
      public onKeyDownAttachIcon(event: KeyboardEvent) {
         if (!this.isReadonly) {
            // activate button with space or enter
            if (event.key === ' ' || event.key === 'Enter') {
               event.preventDefault();
               // open file picker
               // @ts-ignore
               this.$refs.qField.pickFiles();
            }
         }
      }

      /** Open file picker on icon click */
      public onClickAttachIcon() {
         // @ts-ignore
         this.$refs.qField.pickFiles();
      }

   }
</script>


<template>
   <QFile
      @input="onInput"
      :value="value"
      :label="finalLabel"
      :placeholder="placeholder"
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
			'y-form-control-spacing': hasSpacing,
			'y-field-file-upload--empty': (value.length === 0),
		}"
      :counter-label="counterLabel"
      ref="qField"
      counter
      outlined
      lazy-rules
   >
      <template v-slot:append>
         <QIcon
            v-if="value.length === 0"
            @click="onClickAttachIcon"
            @keydown="onKeyDownAttachIcon"
            :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
            :tabindex="isReadonly ? -1 : 0"
            name="attach_file"
            color="grey-8"
         >
            <QTooltip v-if="!isReadonly">{{ $locale.fieldFileUpload.tooltipPickFiles }}</QTooltip>
         </QIcon>

         <QIcon
            v-if="value.length > 0"
            @click="onClickRemoveFile(-1, $event)"
            :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
            name="clear_all"
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
               @click="onClickRemoveFile(scope.index, $event)"
               :class="{ 'y-chip__button': true, 'cursor-pointer': !isReadonly }"
            >
               <QIcon name="close" size="20px" color="grey-7"/>
            </QAvatar>
         </QChip>

         <QTooltip v-if="!isReadonly">{{ $locale.fieldFileUpload.tooltipPickFiles }}</QTooltip>
      </template>
   </QFile>
</template>


<style scoped lang="scss">
   @import '../../../css/variables';

   .y-chip__button.cursor-pointer:hover {
      background-color: $grey-4;
   }
</style>
