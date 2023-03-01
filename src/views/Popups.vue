<template lang="pug">
#popups
  .row.wrap
    nb-btn.ma-1(label="Welcome", @click="popups.welcome = true")
    nb-btn.ma-1(label="Checklist", @click="popups.checklist = true")
    nb-btn.ma-1(label="Success", @click="popups.success = true")
    nb-btn.ma-1(long, label="Success task", @click="popups.successTask = true")
    nb-btn.ma-1(label="Finish later", @click="popups.finishLater = true")
    nb-btn.ma-1(long, label="Save changes", @click="popups.saveChanges = true")
    nb-btn.ma-1(long, label="Warning", @click="popups.warning = true")
    nb-btn.ma-1(long, label="Warning answer", @click="popups.warningAnswer = true")
    nb-btn.ma-1(long, label="Success flow", @click="popups.successFlow = true")
    nb-btn.ma-1(long, label="Empty dialog", @click="popups.dialog = true")

  nb-popup(v-model="popups.welcome", type="welcome", title="Welcome to Nation.better")
    span
      | Please help us set up your account
      | by answering the questions that follow.

    template(#actions)
      nb-btn(label="Start", @click="popups.welcome = false")

  nb-popup(v-model="popups.checklist", type="attention", title="Checklist")
    span
      | This checklist will help your Company to stay compliant
      | and fulfill duties and responsibilities as a Sponsor.
      br
      br
      | It is critiсal you go through the checklist
      | and mark all changes that were not reported before
      | or will happen this quarter.

    template(#actions)
      nb-btn(secondary, label="Cancel", @click="popups.checklist = false")
      nb-btn(label="Continue", @click="popups.checklist = false")

  nb-popup(v-model="popups.success", type="success", title="Success!")
    span
      | You’ve completed the checklist.
      | Please update required information in the task list.

    template(#actions)
      nb-btn(label="Ok", @click="popups.success = false")

  nb-popup(v-model="popups.successTask", type="success", title="Success!")
    span
      | You’ve completed the task.

    template(#actions)
      nb-btn(label="Ok", @click="popups.successTask = false")

  nb-popup(v-model="popups.finishLater", type="ask", title="Finish later?")
    span
      | Your answers will be saved.
      br
      | You can continue answering questions later.

    template(#actions)
      nb-btn(secondary, label="Cancel", @click="popups.finishLater = false")
      nb-btn(long, label="Save and close", @click="popups.finishLater = false")

  nb-popup(v-model="popups.saveChanges", type="ask", title="Save changes?")
    span
      | Your unsaved changes will be lost.
      br
      | Save changes?

    template(#actions)
      nb-btn(secondary, label="Don’t save", @click="popups.saveChanges = false")
      nb-btn(label="Yes, save", @click="popups.saveChanges = false")

  nb-popup(v-model="popups.warning", type="warning", title="Warning")
    span
      | Are you sure you want
      br
      | to permanently delete this item?

    template(#actions)
      nb-btn(secondary, label="Cancel", @click="popups.warning = false")
      nb-btn(error, label="Continue", @click="popups.warning = false")

  nb-popup(v-model="popups.warningAnswer", type="warning", title="Warning")
    span
      | A change in the answer to this question
      | will entail a change
      | in the composition of the questions
      br
      | and other answers may be deleted.
      | Do you want to continue?

    template(#actions)
      nb-btn(secondary, label="Cancel", @click="popups.warningAnswer = false")
      nb-btn(label="Continue", @click="popups.warningAnswer = false")

  nb-popup(v-model="popups.successFlow", type="success", title="Success!")
    span
      | You’ve completed the flow.
      | Would you like to continue answering questions
      | for the next flow?

    template(#actions)
      nb-btn(long, secondary, label="No, finish for now", @click="popups.successFlow = false")
      nb-btn(long, label="Yes, continue", @click="popups.successFlow = false")

  nb-dialog(v-model="popups.dialog")
    span
      | You’ve completed the flow.
      | Would you like
      | to continue answering questions
      | for the next flow?

    template(#actions)
      nb-btn(secondary, label="Cancel", @click="popups.dialog = false")
      nb-btn(label="Upload", @click="popups.dialog = false")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Popups extends Vue {
  popups = {
    welcome: false,
    checklist: false,
    success: false,
    successTask: false,
    finishLater: false,
    saveChanges: false,
    warning: false,
    warningAnswer: false,
    successFlow: false,
    dialog: false,
  };

  files: File[] = [];

  uploaderProps = {
    hint: "You can upload a few PDF files,\nup to 10 MB each",
    maxFileSize: 10,
  };
}
</script>
