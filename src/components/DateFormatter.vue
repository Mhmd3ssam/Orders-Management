<template>
  <div class="date-formatter">
    <Calendar
      :model-value="parsedDate"
      :show-time="showTime || showBoth"
      :show-seconds="false"
      :hour-format="'12'"
      :date-format="dateFormat"
      disabled
    >
      <template #date="slotProps">
        <div
          :class="{
            'date-display': true,
            'mb-2': showBoth,
            'text-lg': showBoth || showDate,
            'text-sm': showTime && !showDate,
          }"
        >
          {{ formatDate(slotProps.date, showDate) }}
        </div>
      </template>
      <template #hour="slotProps">
        <div
          v-if="showTime || showBoth"
          :class="{
            'time-display': true,
            'text-base': showBoth || showTime,
          }"
        >
          {{ formatTime(slotProps.date) }}
        </div>
      </template>
    </Calendar>
  </div>
</template>

<script>
import Calendar from "primevue/calendar";

export default {
  name: "DateFormatter",
  components: {
    Calendar,
  },
  props: {
    date: {
      type: String,
      required: true,
    },
    showDate: {
      type: Boolean,
      default: true,
    },
    showTime: {
      type: Boolean,
      default: false,
    },
    showBoth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    parsedDate() {
      return new Date(this.date);
    },
    dateFormat() {
      return this.showDate || this.showBoth ? "dd MMM yy" : "";
    },
  },
  methods: {
    formatDate(date, show) {
      if (!show) return "";
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    },
    formatTime(date) {
      const options = { hour: "numeric", minute: "2-digit", hour12: true };
      return date.toLocaleTimeString("en-US", options);
    },
  },
};
</script>

<style scoped>
.date-formatter {
  display: inline-block;
}
.date-formatter :deep(.p-calendar) {
  min-width: auto;
}
.date-formatter :deep(.p-calendar .p-inputtext) {
  display: none;
}
.date-formatter :deep(.p-datepicker) {
  border: none;
  padding: 0;
}
.date-formatter :deep(.p-datepicker-calendar),
.date-formatter :deep(.p-timepicker-seconds),
.date-formatter :deep(.p-separator) {
  display: none !important;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
