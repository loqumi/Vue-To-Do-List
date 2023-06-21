import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const TASKS_STORAGE_KEY = 'task-manager-tasks';

export default new Vuex.Store({
    state: {
        tasks: [],
    },
    getters: {
        getTasks(state) {
            return state.tasks;
        },
        getTaskById: (state) => (id) => {
            return state.tasks.find((task) => task.id === id);
        },
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        addTask(state, task) {
            state.tasks.unshift(task);
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
        },
        deleteTask(state, taskId) {
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
        },
        startEditingTask(state, task) {
            task.isEditing = true;
            task.editedName = task.name;
        },
        saveEditedTask(state, task) {
            task.isEditing = false;
            task.name = task.editedName;
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
        },
        cancelEditingTask(state, task) {
            task.isEditing = false;
            task.editedName = '';
        },
    },
    actions: {
        fetchTasks({ commit }) {
            const savedTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
            if (savedTasks) {
                commit('setTasks', savedTasks);
            } else {
                const tasks = [];
                commit('setTasks', tasks);
                localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
            }
        },
        addTask({ commit }, task) {
            task.id = Date.now();
            task.isEditing = false;
            task.editedName = '';
            commit('addTask', task);
        },
        deleteTask({ commit }, taskId) {
            commit('deleteTask', taskId);
        },
    },
});
