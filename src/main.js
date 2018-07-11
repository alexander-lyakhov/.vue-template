import './styles/reset.css';
import './styles/index.css';

import Vue from 'vue';
import App from './components/app/app.vue';

window.app.root = new Vue({
    el: '#app',
    template: '<App />',
    components: {App}
    //render: compile => compile(app)
});