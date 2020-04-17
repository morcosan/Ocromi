<script lang="ts">
   import { Component } from '../../../core/decorators';
   import YBaseForm from '../YBaseForm';
   import { QForm } from 'quasar';


   @Component({
      components: { QForm },
   })
   export default class YForm extends YBaseForm {}
</script>


<template>
   <QForm
      class="y-form"
      greedy
      @submit="$emit('submit')"
   >
      <slot/>
   </QForm>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
