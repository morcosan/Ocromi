import { Component, Mixins, Prop, Vue, Watch } from 'vue-property-decorator';
import { debounce } from 'quasar';


/**
 * Empty decorator
 * Used to represent methods that override previous implementations
 */
function Override(target: any, key: string, descriptor: PropertyDescriptor) {}


/**
 * Used to create the debounced version of the function
 */
function Debounce(milliseconds: number) {
   return function(target: any, key: string, descriptor: PropertyDescriptor) {
      descriptor.value = debounce(descriptor.value, milliseconds);
      return descriptor;
   };
}


export {
   // from vue
   Component,
   Mixins,
   Prop,
   Vue,
   Watch,

   // custom
   Override,
   Debounce,
};
