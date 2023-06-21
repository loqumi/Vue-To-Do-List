<template>
  <form @submit.prevent="handleSubmit" class="form">
    <input class="input" v-if="!editingTask" type="text" v-model="taskName" placeholder="Write what you want to do" />
    <button class="button" type="submit">ADD</button>
  </form>
</template>

<script>
export default {
  props: ['editingTask'],
  data() {
    return {
      taskName: '',
    };
  },
  computed: {
    editingTaskName: {
      get() {
        return this.editingTask ? this.editingTask.name : '';
      },
      set(value) {
        if (this.editingTask) {
          this.$store.commit('updateTask', {
            taskId: this.editingTask.id,
            updatedTask: { name: value },
          });
        }
      },
    },
  },
  watch: {
    editingTask: {
      immediate: true,
      handler(value) {
        if (value) {
          this.taskName = value.name;
        }
      },
    },
  },
  methods: {
    handleSubmit() {
      if (this.taskName.trim() !== '') {
        if (this.editingTask) {
          this.editingTaskName = this.taskName;
          this.taskName = '';
          this.$store.commit('setEditingTaskId', null);
        } else {
          this.$store.dispatch('addTask', { name: this.taskName });
          this.taskName = '';
        }
      }
    },
  },
};
</script>
