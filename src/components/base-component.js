export default {
    mounted: function() {

        let app = window.app = window.app || {};

        if (!app.componentByID) {
            app.componentByID = {};
        }

        if (!app.components) {
            app.components = {};
        }

        if (this.$el.id) {
            app.componentByID[this.$el.id] = this;
        }

        var componentName = this.$options.name;

        if (app.components[componentName] === undefined) {
            app.components[componentName] = [];
        }

        app.components[componentName].push(this);
    },

    methods: {
        //============================================================================
        //
        //============================================================================
        getChildComponent: function(name) {
            return this.$children.find(component => component.$options.name === name);
        },

        //============================================================================
        //
        //============================================================================
        getChildrenComponents: function(name) {
            return this.$children.filter(component => component.$options.name === name);
        }
    }
};