import { Component, Mixins, Prop, Vue, Watch } from 'vue-property-decorator';


/**
 * Empty decorator
 * Used to represent methods that override previous implementations
 */
function Override(target: any, key: string, descriptor: PropertyDescriptor) {}


export {
   Override,
   Component,
   Mixins,
   Prop,
   Vue,
   Watch,
};
