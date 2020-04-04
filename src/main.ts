import YForm from './components/containers/form/YForm.vue';
import YCheckbox from './components/form-controls/checkbox/YCheckbox.vue';
import YFieldText from './components/form-controls/field-text/YFieldText.vue';
import YFieldEmail from './components/form-controls/field-email/YFieldEmail.vue';
import YFieldPassword from './components/form-controls/field-password/YFieldPassword.vue';
import YFieldTextArea from './components/form-controls/field-text-area/YFieldTextArea.vue';
import YFieldSelect from './components/form-controls/field-select/YFieldSelect.vue';
import YFieldMultiselect from './components/form-controls/field-multiselect/YFieldMultiselect.vue';
import YGroupCheckbox from './components/form-controls/group-checkbox/YGroupCheckbox.vue';
import YGroupRadio from './components/form-controls/group-radio/YGroupRadio.vue';
import YFieldCipher from './components/form-controls/field-cipher/YFieldCipher.vue';
import YFieldHyperlink from './components/form-controls/field-hyperlink/YFieldHyperlink.vue';
import YFieldNumber from './components/form-controls/field-number/YFieldNumber.vue';
import YSlider from './components/form-controls/slider/YSlider.vue';
import YSliderRange from './components/form-controls/slider-range/YSliderRange.vue';
import YFieldDate from './components/form-controls/field-date/YFieldDate.vue';
import YFieldFileUpload from './components/form-controls/field-file-upload/YFieldFileUpload.vue';
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
   YFieldHyperlink,
   YFieldNumber,
   YSlider,
   YSliderRange,
   YFieldDate,
   YFieldFileUpload,
   YButtonSubmit,
};
