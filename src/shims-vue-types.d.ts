import Vue from 'vue';

// export added to avoid import optimization
export default Vue;

// TS typing for custom variables
declare module 'vue/types/vue' {
   interface Vue {
      readonly YLocale: any;
      readonly YSettings: any;
   }
}
