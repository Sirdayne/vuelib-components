import { VueConstructor } from "vue/types/umd";
import NbAlert from "./NbAlert.vue";
import NbAutocomplete from "./NbAutocomplete.vue";
import NbBackdrop from "./NbBackdrop.vue";
import NbBtn from "./NbBtn.vue";
import NbCheckbox from "./NbCheckbox.vue";
import NbDatepicker from "./NbDatepicker.vue";
import NbDialog from "./NbDialog.vue";
import NbDocumentCard from "./NbDocumentCard.vue";
import NbDocumentCardTemplate from "./NbDocumentCardTemplate.vue";
import NbErrorMessage from "./NbErrorMessage.vue";
import NbIcon from "./NbIcon.vue";
import NbInput from "./NbInput.vue";
import NbLink from "./NbLink.vue";
import NbPassword from "./NbPassword.vue";
import NbPopup from "./NbPopup.vue";
import NbRadio from "./NbRadio.vue";
import NbSelect from "./NbSelect.vue";
import NbSpinner from "./NbSpinner.vue";
import NbSwitch from "./NbSwitch.vue";
import NbTable from "./NbTable.vue";
import NbTableAction from "./NbTableAction.vue";
import NbTableActions from "./NbTableActions.vue";
import NbTableData from "./NbTableData.vue";
import NbTableFilters from "./NbTableFilters.vue";
import NbTableHeader from "./NbTableHeader.vue";
import NbTableMenu from "./NbTableMenu.vue";
import NbTableRow from "./NbTableRow.vue";
import NbTextArea from "./NbTextArea.vue";
import NbTextField from "./NbTextField.vue";
import NbUploadedFile from "./NbUploadedFile.vue";
import NbUploader from "./NbUploader.vue";

const components = new Map<string, VueConstructor>();
components.set("nb-spinner", NbSpinner);
components.set("nb-link", NbLink);
components.set("nb-icon", NbIcon);
components.set("nb-btn", NbBtn);
components.set("nb-checkbox", NbCheckbox);
components.set("nb-switch", NbSwitch);
components.set("nb-radio", NbRadio);
components.set("nb-datepicker", NbDatepicker);
components.set("nb-error-message", NbErrorMessage);
components.set("nb-input", NbInput);
components.set("nb-text-field", NbTextField);
components.set("nb-password", NbPassword);
components.set("nb-select", NbSelect);
components.set("nb-autocomplete", NbAutocomplete);
components.set("nb-text-area", NbTextArea);
components.set("nb-uploader", NbUploader);
components.set("nb-uploaded-file", NbUploadedFile);
components.set("nb-alert", NbAlert);
components.set("nb-backdrop", NbBackdrop);
components.set("nb-popup", NbPopup);
components.set("nb-dialog", NbDialog);
components.set("nb-document-card", NbDocumentCard);
components.set("nb-document-card-template", NbDocumentCardTemplate);
components.set("nb-table", NbTable);
components.set("nb-tr", NbTableRow);
components.set("nb-th", NbTableHeader);
components.set("nb-td", NbTableData);
components.set("nb-table-filters", NbTableFilters);
components.set("nb-table-menu", NbTableMenu);
components.set("nb-table-actions", NbTableActions);
components.set("nb-table-action", NbTableAction);

function install(Vue: VueConstructor) {
  components.forEach((value, key) => Vue.component(key, value));
}

const NbComponentsPlugin = {
  install,
};

export default NbComponentsPlugin;
