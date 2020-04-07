<script lang="ts">
   import { Component, Mixins, Override, Prop, Vue, Watch } from '../src/core/decorators';


   @Component({
      components: {},
   })
   export default class ExampleMixin extends Vue {}


   @Component({
      components: {},
   })
   export default class ExampleComponent extends Mixins(ExampleMixin) {

      @Prop({ default: '' }) public prop1!: string;
      @Prop({ default: 0 }) public prop2!: number;
      @Prop({ default: false, type: Boolean }) public prop3!: boolean;


      public state1!: string;
      public state2!: string;
      public state3!: string;


      @Watch('prop1')
      public onChange_prop1(value: string, oldValue: string) {}

      @Watch('prop2')
      public onChange_prop2(value: number, oldValue: number) {}

      @Watch('prop3')
      public onChange_prop3(value: boolean, oldValue: boolean) {}


      public get computed1() { return ''; }

      public get computed2() { return ''; }


      @Override
      public created() {}


      @Override
      public mounted() {}


      @Override
      public updated() {}


      @Override
      public destroyed() {}


      public callMethod1() {}


      public callMethod2() {}

   }
</script>


<template>
   <div>I'm an empty component :)</div>
</template>


<style scoped lang="scss">
   //@import '../../../css/variables';
</style>
