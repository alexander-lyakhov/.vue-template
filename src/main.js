import './styles/reset.css';
import './styles/index.css';

import Vue from 'vue';
import app from './components/app/app.vue';

window.app.root = new Vue({
    el: '#app',
    render: compile => compile(app)
});

export default window.app;