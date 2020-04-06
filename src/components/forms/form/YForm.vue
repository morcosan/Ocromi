<script lang="ts">
   import { Component, Vue } from '../../../core/decorators';
   import { QForm } from 'quasar';


   @Component({
      components: { QForm },
   })
   export default class YForm extends Vue {}
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
