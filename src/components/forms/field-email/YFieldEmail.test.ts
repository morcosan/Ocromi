import { mount, shallowMount } from '@vue/test-utils';
import YFieldEmail from './YFieldEmail.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldEmail', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YFieldEmail, { i18n });
      expect(wrapper.is(YFieldEmail)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YFieldEmail, { i18n });
      expect(wrapper.is(YFieldEmail)).toBe(true);
   });

});


