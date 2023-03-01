<template lang="pug">
.nb-datepicker__container(v-click-outside="closeCalendar")
  nb-input(
    v-model="text",
    :label="label",
    placeholder="DD/MM/YYYY",
    icon-append="calendar-outline",
    :rules="rules",
    :disabled="disabled",
    @focus="type = 'days'"
    v-mask="'##/##/####'"
  )

  .nb-datepicker(v-if="type === 'years'")
    .nb-datepicker__table
      .nb-datepicker__slider
        .nb-datepicker__slider__icon(@click="setPreviousYears()")
          ion-icon.ion-icon(name="chevron-back")

        .nb-datepicker__slider__date.nb-datepicker__slider__date_disabled
          | {{ calendarDate.getFullYear() + yearsOffset * 12 - 5 }}
          | -
          | {{ calendarDate.getFullYear() + yearsOffset * 12 + 6 }}

        .nb-datepicker__slider__icon(@click="setNextYears()")
          ion-icon.ion-icon(name="chevron-forward")

      .nb-datepicker__row.nb-datepicker__row_years
        .nb-datepicker__year(
          v-for="year in years",
          :key="year.date.toLocaleDateString()",
          :class="getYearClasses(year)",
          @click="setDateFromYears(year)"
        ) {{ year.date.getFullYear() }}

  .nb-datepicker(v-else-if="type === 'months'")
    .nb-datepicker__table
      .nb-datepicker__slider
        .nb-datepicker__slider__icon(@click="setPreviousYear()")
          ion-icon.ion-icon(name="chevron-back")

        .nb-datepicker__slider__date.nb-datepicker__slider__date_pointer(@click="type = 'years'")
          | {{ calendarDate.getFullYear() }}

        .nb-datepicker__slider__icon(@click="setNextYear()")
          ion-icon.ion-icon(name="chevron-forward")

      .nb-datepicker__row.nb-datepicker__row_years
        .nb-datepicker__year(
          v-for="month in months",
          :key="month.date.toLocaleDateString()",
          :class="getMonthClasses(month)",
          @click="setDateFromMonths(month)"
        ) {{ month.date.toLocaleString('en-GB', { month: 'short' }) }}

  .nb-datepicker(v-else-if="type === 'days'")
    .nb-datepicker__table
      .nb-datepicker__slider
        .nb-datepicker__slider__icon(@click="setPreviousMonth()")
          ion-icon.ion-icon(name="chevron-back")

        .nb-datepicker__slider__date.nb-datepicker__slider__date_pointer(@click="type = 'months'")
          | {{ calendarDate.toLocaleString('en-GB', { month: 'long' }) }}
          | {{ calendarDate.getFullYear() }}

        .nb-datepicker__slider__icon(@click="setNextMonth()")
          ion-icon.ion-icon(name="chevron-forward")

      .nb-datepicker__row
        .nb-datepicker__week-day(v-for="(weekDay, i) in weekDays", :key="i")
          | {{ weekDay }}

      .nb-datepicker__row
        .nb-datepicker__cell(
          v-for="monthDate in monthDates",
          :key="monthDate.date.toLocaleDateString()",
          :class="getCellClasses(monthDate)",
          @click="setDateFromDays(monthDate)"
        ) {{ monthDate.date.getDate() }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TInputRule } from "@/models/Input";

interface IDate {
  date: Date;
  disabled: boolean;
}

@Component
export default class NbDatepicker extends Vue {
  @Prop({ type: String, required: true }) readonly value!: string;
  @Prop({ type: String }) readonly label!: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Date }) readonly minDate?: Date;
  @Prop({ type: Date }) readonly maxDate?: Date;
  @Prop({ type: Boolean }) readonly tillPresent?: boolean;
  @Prop({ type: Array, default: () => [] }) readonly rules!: TInputRule[];

  myDate = new Date();

  date: Date = new Date();
  calendarDate: Date = new Date();
  today = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), 1);

  weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  monthDates: IDate[] = [];
  months: IDate[] = [];
  years: IDate[] = [];

  yearsOffset = 0;

  type = "closed";

  get text() {
    return this.value;
  }

  set text(v) {
    this.setDateFromLocaleString(v);
    this.setMonthDays();
    this.$emit("input", v);
  }

  private setDateFromLocaleString(value: string) {
    const parts = value.split("/").map((part) => parseInt(part));
    if (parts[2] && parts[1] && parts[0]) {
      this.calendarDate = new Date(parts[2], parts[1] - 1, parts[0]);
    }
  }

  setMonthDays() {
    this.today = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), 1);
    this.monthDates = [];
    this.setPreviousMonthDays();
    this.setCurrentMonthDays();
    this.setNextMonthDays();
    this.setMonthsCalendar();
    this.setYearsCalendar();
  }

  setPreviousMonthDays() {
    const numOfPreviousDays = this.today.getDay();
    for (let i = numOfPreviousDays; i > 0; i -= 1) {
      const year = this.today.getFullYear();
      const month = this.today.getMonth();
      const day = this.today.getDate() - i;
      this.monthDates.push({
        date: new Date(year, month, day),
        disabled: true,
      });
    }
  }

  private getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  private setCurrentMonthDays() {
    const numOfDays = this.getDaysInMonth(
      this.calendarDate.getFullYear(),
      this.calendarDate.getMonth() + 1
    );
    for (let i = 0; i < numOfDays; i += 1) {
      this.pushMonthDatesWithRestrictions(
        new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), i + 1)
      );
    }
  }

  private pushMonthDatesWithRestrictions(date: Date) {
    let disabled = false;
    if (this.minDate && this.getMaxDate) {
      disabled = date < this.minDate || date > this.getMaxDate;
    } else if (this.minDate) {
      disabled = date < this.minDate;
    } else if (this.getMaxDate) {
      disabled = date > this.getMaxDate;
    }
    this.monthDates.push({
      date,
      disabled,
    });
  }

  setNextMonthDays() {
    const lastWeekDay = this.monthDates[this.monthDates.length - 1].date.getDay();
    const numOfDaysInWeek = 7;
    for (let i = 1; i < numOfDaysInWeek - lastWeekDay; i += 1) {
      this.monthDates.push({
        date: new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, i),
        disabled: true,
      });
    }
  }

  private setMonthsCalendar() {
    const dayDate = 1;
    this.months = [];
    const currentYear = this.calendarDate.getFullYear();
    for (let i = 0; i < 12; i += 1) {
      this.pushMonthsWithRestrictions(new Date(currentYear, i, dayDate));
    }
  }

  private pushMonthsWithRestrictions(date: Date) {
    let disabled = false;
    if (this.minDate && this.getMaxDate) {
      disabled =
        (date.getMonth() < this.minDate.getMonth() &&
          date.getFullYear() === this.minDate.getFullYear()) ||
        date.getFullYear() < this.minDate.getFullYear() ||
        (date.getMonth() > this.getMaxDate.getMonth() &&
          date.getFullYear() === this.getMaxDate.getFullYear()) ||
        date.getFullYear() > this.getMaxDate.getFullYear();
    } else if (this.minDate) {
      disabled =
        (date.getMonth() < this.minDate.getMonth() &&
          date.getFullYear() === this.minDate.getFullYear()) ||
        date.getFullYear() < this.minDate.getFullYear();
    } else if (this.getMaxDate) {
      disabled =
        (date.getMonth() > this.getMaxDate.getMonth() &&
          date.getFullYear() === this.getMaxDate.getFullYear()) ||
        date.getFullYear() > this.getMaxDate.getFullYear();
    }
    this.months.push({ date, disabled });
  }

  setYearsCalendar() {
    this.years = [];
    const dayDate = 1;
    const currentYear = this.calendarDate.getFullYear() + 12 * this.yearsOffset;
    const currentMonth = this.calendarDate.getMonth();
    let date: Date;
    for (let i = 5; i > 0; i -= 1) {
      date = new Date(currentYear - i, currentMonth, dayDate);
      this.pushYearsWithRestrictions(date);
    }
    date = new Date(currentYear, currentMonth, dayDate);
    this.pushYearsWithRestrictions(date);
    for (let i = 1; i < 7; i += 1) {
      date = new Date(currentYear + i, currentMonth, dayDate);
      this.pushYearsWithRestrictions(date);
    }
  }

  private pushYearsWithRestrictions(date: Date) {
    let disabled = false;
    if (this.minDate && this.getMaxDate) {
      disabled =
        date.getFullYear() < this.minDate.getFullYear() ||
        date.getFullYear() > this.getMaxDate.getFullYear();
    } else if (this.minDate) {
      disabled = date.getFullYear() < this.minDate.getFullYear();
    } else if (this.getMaxDate) {
      disabled = date.getFullYear() > this.getMaxDate.getFullYear();
    }
    this.years.push({ date, disabled });
  }

  setPreviousMonth() {
    const date = new Date(this.calendarDate.setMonth(this.calendarDate.getMonth() - 1));
    this.setCalendarDate(date);
    this.setMonthDays();
  }

  setNextMonth() {
    const date = new Date(this.calendarDate.setMonth(this.calendarDate.getMonth() + 1));
    this.setCalendarDate(date);
    this.setMonthDays();
  }

  setPreviousYear() {
    const date = new Date(this.calendarDate.setFullYear(this.calendarDate.getFullYear() - 1));
    this.setCalendarDate(date);
    this.setMonthDays();
  }

  setNextYear() {
    const date = new Date(this.calendarDate.setFullYear(this.calendarDate.getFullYear() + 1));
    this.setCalendarDate(date);
    this.setMonthDays();
  }

  setPreviousYears() {
    this.yearsOffset -= 1;
    this.setYearsCalendar();
  }

  setNextYears() {
    this.yearsOffset += 1;
    this.setYearsCalendar();
  }

  private setCalendarDate(date: Date) {
    this.calendarDate = new Date(date.toISOString());
  }

  setDateFromMonths(monthDate: IDate) {
    if (!monthDate.disabled) {
      this.setDate(monthDate.date);
      this.setMonthDays();
      this.type = "days";
    }
  }

  setDateFromYears(monthDate: IDate) {
    if (!monthDate.disabled) {
      this.setDate(monthDate.date);
      this.setMonthDays();
      this.type = "months";
    }
  }

  setDateFromDays(monthDate: IDate) {
    if (!monthDate.disabled) {
      this.setDate(monthDate.date);
      this.type = "closed";
    }
  }

  private setDate(date: Date) {
    this.date = new Date(date.toISOString());
    this.text = this.toDateString(this.date);
  }

  closeCalendar() {
    this.type = "closed";
  }

  private toDateString(date: Date) {
    return `${this.getRealDay(date)}/${this.getRealMonth(date)}/${date.getFullYear()}`;
  }

  private getRealDay(date: Date) {
    const day = date.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  }

  private getRealMonth(date: Date) {
    const month = date.getMonth() + 1;
    return month < 10 ? `0${month}` : `${month}`;
  }

  getMonthClasses(month: IDate) {
    const isSelected =
      this.date.getMonth() === month.date.getMonth() &&
      this.date.getFullYear() === month.date.getFullYear();
    return {
      "nb-datepicker__year_selected": isSelected,
      "nb-datepicker__year_disabled": month.disabled,
    };
  }

  getYearClasses(year: IDate) {
    const isSelected = this.date.getFullYear() === year.date.getFullYear();
    return {
      "nb-datepicker__year_selected": isSelected,
      "nb-datepicker__year_disabled": year.disabled,
    };
  }

  getCellClasses(monthDate: IDate) {
    const isSelected = this.date.toLocaleDateString() === monthDate.date.toLocaleDateString();
    return {
      "nb-datepicker__cell_selected": isSelected,
      "nb-datepicker__cell_disabled": monthDate.disabled,
    };
  }

  mounted() {
    this.setMonthDays();
    if (this.value) {
      this.setDateFromLocaleString(this.value);
      this.setDate(this.calendarDate);
    }
  }

  get getMaxDate() {
    return this.tillPresent ? new Date() : this.maxDate;
  }
}
</script>

<style lang="sass" scoped>
.nb-datepicker
  position: absolute
  left: 0
  top: 52px
  z-index: 3
  box-sizing: border-box
  width: 272px
  padding: 12px
  border: solid 1px #c8d3e5
  border-radius: 4px
  background: #ffffff

  &__container
    position: relative

  &__slider
    margin: 0 8px
    display: flex
    justify-content: space-between

    &__icon
      cursor: pointer

      .ion-icon
        color: #7d91b2
        font-size: 16px

    &__date
      height: 21px
      color: #00a69b
      font-size: 14px
      font-weight: 600

      &_disabled
        color: #a7b6cf

      &_pointer
        cursor: pointer

  &__row
    display: flex
    justify-content: flex-start
    flex-wrap: wrap

    &_years
      margin-top: 12px

  &__week-day
    width: 32px
    height: 32px
    margin: 0 1px
    font-size: 12px
    line-height: 1.33
    display: flex
    justify-content: center
    align-items: center

  &__year, &__cell
    cursor: pointer
    border-radius: 50%
    font-size: 12px
    line-height: 1.33
    display: flex
    justify-content: center
    align-items: center

    &:hover
      background: #ebf8f7
      color: #00a69b

    &_selected, &_selected:hover
      background: #00a69b
      color: #ffffff

    &_disabled, &_disabled:hover
      cursor: default
      background: #ffffff
      color: #c8d3e5

  &__cell
    $a: 32px
    width: $a
    height: $a
    margin: 0 1px

  &__year
    $a: 60px
    width: $a
    height: $a
</style>
