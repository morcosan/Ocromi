<script lang="ts">
   /**
    * Used when displaying form controls.
    */

   import { Component, Vue } from 'vue-property-decorator';
   import { QForm } from 'quasar';


   @Component({
      components: { QForm },
   })
   export default class YForm extends Vue {

      // code here

   }
</script>


<template>
   <QForm
      @submit="$emit('submit')"
      greedy
   >
      <slot/>
   </QForm>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
