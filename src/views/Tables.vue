<template lang="pug">
#tables
  nb-table
    thead
      nb-tr
        nb-th Task
        nb-th Priority
        nb-th Compliance section
        nb-th(:filters="actionByFilters") Action by
        nb-th(:hint="hints.expDate") Due Date
        nb-th

    tbody
      nb-tr(
        v-for="task in filteredTasks",
        :key="task.id",
        :inactive="task.isArchived",
        @click="logTask(task)"
      )
        nb-td {{ task.name }}
        nb-td {{ task.priority }}
        nb-td {{ task.complianceSection || '-' }}
        nb-td {{ task.actionBy }}
        nb-td(:invalid="!task.isValid") {{ task.dueDate }}
        nb-td(actions)
          nb-table-actions(v-if="!task.isArchived")
            nb-table-action(type="error", @click="archiveTask(task)") Delete

  nb-table.mt-4
    thead
      nb-tr
        nb-th Task
        nb-th Priority
        nb-th Compliance section
        nb-th Action by
        nb-th(:hint="hints.expDate") Due Date
        nb-th(:hint="hints.dueDate") Exp. Date
        nb-th

    tbody
      nb-tr(v-for="task in tasks", :key="task.id", :inactive="task.isArchived")
        nb-td {{ task.name }}
        nb-td {{ task.priority }}
        nb-td {{ task.complianceSection || '-' }}
        nb-td {{ task.actionBy }}
        nb-td(:invalid="!task.isValid") {{ task.dueDate }}
        nb-td {{ task.expDate || '-' }}
        nb-td(actions)
          nb-table-actions(v-if="!task.isArchived")
            nb-table-action(type="error", @click="archiveTask(task)") Delete

  nb-table.mt-4
    thead
      nb-tr
        nb-th Task
        nb-th Archived by
        nb-th Completion date

    tbody
      nb-tr.archived(v-for="task in archivedTasks", :key="task.id")
        nb-td {{ task.name }}
        nb-td {{ task.archivedBy }}
        nb-td {{ task.completionDate }}
</template>

<script lang="ts">
import { TTableFilter } from "@/models/Table";
import { Component, Vue, Watch } from "vue-property-decorator";

interface ITask {
  id: number;
  name: string;
  priority: string;
  complianceSection: string;
  actionBy: string;
  dueDate: string;
  expDate: string;
  isArchived: boolean;
  isValid: boolean;
}

interface IArchivedTask {
  id: number;
  name: string;
  archivedBy: string;
  completionDate: string;
}

@Component
export default class Tables extends Vue {
  actionByFilters: TTableFilter[] = [
    { label: "All employees", value: true },
    { label: "Larisa Budaeva", value: false },
    { label: "Elena Ivanova", value: false },
    { label: "Natalia Smirnova", value: false },
    { label: "Artem Petrov", value: false },
    { label: "John Smiths", value: false },
  ];

  filteredTasks: ITask[] = [];

  tasks: ITask[] = [
    {
      id: 1,
      name: "Update Company phone number",
      priority: "High",
      complianceSection: "Company info",
      actionBy: "Larisa Budaeva",
      dueDate: "31/01/2021",
      expDate: "",
      isArchived: false,
      isValid: false,
    },

    {
      id: 2,
      name: "Onboard new employee",
      priority: "Medium",
      complianceSection: "",
      actionBy: "Larisa Budaeva",
      dueDate: "31/01/2021",
      expDate: "",
      isArchived: false,
      isValid: true,
    },

    {
      id: 3,
      name: "Fill in checklist",
      priority: "Medium",
      complianceSection: "Employees checklist",
      actionBy: "John Smiths",
      dueDate: "15/02/2021",
      expDate: "",
      isArchived: true,
      isValid: true,
    },

    {
      id: 4,
      name: "Fill in checklist",
      priority: "Medium",
      complianceSection: "Employees checklist",
      actionBy: "Natalia Smirnova",
      dueDate: "15/02/2021",
      expDate: "",
      isArchived: true,
      isValid: false,
    },

    {
      id: 5,
      name: "Update Tier 2 visa",
      priority: "Medium",
      complianceSection: "Employees documents",
      actionBy: "Elena Ivanova",
      dueDate: "01/03/2021",
      expDate: "01/05/2021",
      isArchived: true,
      isValid: false,
    },
  ];

  archivedTasks: IArchivedTask[] = [
    {
      id: 1,
      name: "Update Company phone number",
      archivedBy: "Larisa Budaeva",
      completionDate: "31/01/2021",
    },

    {
      id: 2,
      name: "Update Tier 2 visa",
      archivedBy: "Elena Ivanova",
      completionDate: "16/02/2021",
    },

    {
      id: 3,
      name: "Update Tier 2 visa",
      archivedBy: "Natalia Smirnova",
      completionDate: "25/02/2021",
    },

    {
      id: 4,
      name: "Update passport scan",
      archivedBy: "Artem Petrov",
      completionDate: "01/03/2021",
    },
  ];

  hints = {
    dueDate: "By this date you should finish this task to be compliant",
    expDate:
      "By this date you should" +
      " renew the licence/visa" +
      " so that your migrant actionByFilters" +
      " have the right to work in the UK",
  };

  logTask(task: ITask) {
    console.log(task);
  }

  archiveTask(task: ITask) {
    task.isArchived = !task.isArchived;
  }

  @Watch("actionByFilters", { immediate: true, deep: true })
  onValueChange() {
    this.setFilteredTasks();
  }

  private setFilteredTasks() {
    const needsFiltering = !this.actionByFilters[0].value;
    if (needsFiltering) {
      this.filteredTasks = this.tasks.filter(
        ({ actionBy }) => !!this.actionByFilters.find(({ label }) => label === actionBy)?.value
      );
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }

  created() {
    this.setFilteredTasks();
  }
}
</script>
