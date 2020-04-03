import { mount, shallowMount } from '@vue/test-utils';
import YFieldHyperlink from './YFieldHyperlink.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldHyperlink', () => {

   test('creates component - shallow', () => {
      const wrapper = shallowMount(YFieldHyperlink, { i18n });
      expect(wrapper.is(YFieldHyperlink)).toBe(true);
   });

   test('creates component - full', () => {
      const wrapper = mount(YFieldHyperlink, { i18n });
      expect(wrapper.is(YFieldHyperlink)).toBe(true);
   });

});


