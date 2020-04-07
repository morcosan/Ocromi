import YForm from './components/forms/form/YForm.vue';
import YCheckbox from './components/forms/checkbox/YCheckbox.vue';
import YFieldText from './components/forms/field-text/YFieldText.vue';
import YFieldEmail from './components/forms/field-email/YFieldEmail.vue';
import YFieldPassword from './components/forms/field-password/YFieldPassword.vue';
import YFieldTextArea from './components/forms/field-text-area/YFieldTextArea.vue';
import YFieldSelect from './components/forms/field-select/YFieldSelect.vue';
import YFieldMultiselect from './components/forms/field-multiselect/YFieldMultiselect.vue';
import YGroupCheckbox from './components/forms/group-checkbox/YGroupCheckbox.vue';
import YGroupRadio from './components/forms/group-radio/YGroupRadio.vue';
import YFieldCipher from './components/forms/field-cipher/YFieldCipher.vue';
import YFieldLink from './components/forms/field-link/YFieldLink.vue';
import YFieldNumber from './components/forms/field-number/YFieldNumber.vue';
import YSlider from './components/forms/slider/YSlider.vue';
import YSliderRange from './components/forms/slider-range/YSliderRange.vue';
import YFieldDate from './components/forms/field-date/YFieldDate.vue';
import YFieldFileUpload from './components/forms/field-file-upload/YFieldFileUpload.vue';
import YButtonSubmit from './components/buttons/button-submit/YButtonSubmit.vue';

import Vue from 'vue';
import Quasar from 'quasar';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './css/app.scss';

// @ts-ignore
Vue.use(Quasar);

export {
   YForm,
   YCheckbox,
   YFieldText,
   YFieldEmail,
   YFieldPassword,
   YFieldTextArea,
   YFieldSelect,
   YFieldMultiselect,
   YGroupCheckbox,
   YGroupRadio,
   YFieldCipher,
   YFieldLink,
   YFieldNumber,
   YSlider,
   YSliderRange,
   YFieldDate,
   YFieldFileUpload,
   YButtonSubmit,
};
