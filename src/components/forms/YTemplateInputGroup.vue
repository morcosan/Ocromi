<script lang="ts">
   import { Component, Prop, Vue } from '../../core/decorators';
   import YTemplateInput from './YTemplateInput.vue';


   @Component({
      components: { YTemplateInput },
   })
   export default class YTemplateInputGroup extends Vue {

      @Prop({ default: '' }) public label!: string;
      @Prop({ default: '' }) public error!: string;
      @Prop({ default: '' }) public sideLabelWidth!: string;
      @Prop({ default: '' }) public bgColor!: string;
      @Prop({ default: false, type: Boolean }) public isMini!: boolean;
      @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
      @Prop({ default: false, type: Boolean }) public isReadonly!: boolean;

   }
</script>


<template>
   <YTemplateInput
      :is-mini="isMini"
      :side-label-width="sideLabelWidth"
      :label="label"
      :error="error"
   >
      <div
         :class="{
            ['y-base-input__fieldset bg-' + bgColor]: true,
            'has-error': error,
            'has-label': (isMini && label),
            'is-disabled': isDisabled,
            'is-readonly': isReadonly,
         }"
      >
         <div v-if="isMini && label" :class="{ ['y-base-input__fieldset-label bg-' + bgColor]: true }">
            {{ label }}
         </div>

         <slot/>
      </div>
   </YTemplateInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
