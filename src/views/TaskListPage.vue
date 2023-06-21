<template>
  <div class="container">
    <div class="box">
      <h2 class="sub_title">To-Do list</h2>
      <TaskForm @task-added="addTask" />
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <div class="task" v-if="!task.isEditing">
            <p class="task_name">{{ task.name }}</p>
            <button class="button" @click="startEditing(task)">Edit</button>
            <button class="button" @click="deleteTask(task.id)">Delete</button>
          </div>
          <div class="task" v-else>
            <input class="input" type="text" v-model="task.editedName" />
            <button class="button" type="submit" @click="saveTask(task)">Save</button>
            <button class="button" @click="cancelEditing(task)">Cancel</button>
          </div>
        </li>
      </ul>
      <router-link to="/" class="back_button">back</router-link>
    </div>
  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue';

export default {
  components: {
    TaskForm,
  },
  computed: {
    tasks() {
      return this.$store.getters.getTasks;
    },
  },
  methods: {
    addTask(task) {
      this.$store.dispatch('addTask', task);
    },
    deleteTask(taskId) {
      this.$store.dispatch('deleteTask', taskId);
    },
    startEditing(task) {
      this.$store.commit('startEditingTask', task);
    },
    saveTask(task) {
      this.$store.commit('saveEditedTask', task);
    },
    cancelEditing(task) {
      this.$store.commit('cancelEditingTask', task);
    },
  },
  created() {
    this.$store.dispatch('fetchTasks');
  },
};
</script>
