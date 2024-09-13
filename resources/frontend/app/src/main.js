function Crud({id, color, name}) {
    this.id = id;
    this.color = color;
    this.name = name;
}

function Link({url, label, active}) {
    this.url = url;
    this.label = label;
    this.active = active;
}

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        cruds: [],
        links: [],
        mute: false
    },
    mutations: {
        /*async read (state) {
            state.mute = true;
            const { data } = await axios.get('/api/cruds');
            data.data.forEach(crud => state.cruds.push(new Crud(crud)));
            data.links.forEach(link => state.links.push(new Link(link)));
            state.mute = false;
        },*/
        async create (state, pageNumb) {
            state.mute = true;
            const { data } = await axios.get(`/api/cruds/create?page=${pageNumb}`);
            if (state.cruds.length < 5) state.cruds.push(new Crud(data.data.at(-1)));
            state.links = [];
            data.links.forEach(link => state.links.push(new Link(link)));
            state.mute = false;
        },
        async update (state, obj) {
            state.mute = true;
            let color = obj.color, id = obj.id, pageNumb = obj.pageNumb;
            await axios.put(`/api/cruds/${id}?page=${pageNumb}`, {color});
            state.cruds.find(crud => crud.id === id).color = color;
            state.mute = false;
        },
        async del (state, obj) {
            state.mute = true;
            let id = obj.id, pageNumb = obj.pageNumb;
            const { data } = await axios.get(`/api/cruds/delete/${id}?page=${pageNumb}`);
            state.cruds = [];
            state.links = [];
            data.data.forEach(crud => state.cruds.push(new Crud(crud)));
            data.links.forEach(link => state.links.push(new Link(link)));
            state.mute = false;
        },
        async updateName (state, obj) {
            state.mute = true;
            let name = obj.name, id = obj.id, pageNumb = obj.pageNumb;
            const { data } = await axios.put(`/api/cruds/update/${id}?page=${pageNumb}`, {name});
            state.cruds.find(crud => crud.id === id).name = data.data.find(crud => crud.id === id).name;
            state.mute = false;
        },
        async paging(state, pageNumb) {
            state.mute = true;
            const { data } = await axios.get(`/api/cruds/paging/?page=${pageNumb}`);
            state.cruds = [];
            state.links = [];
            data.data.forEach(crud => state.cruds.push(new Crud(crud)));
            data.links.forEach(link => state.links.push(new Link(link)));
            state.mute = false;
        }

    },
    actions: {
        /*read ({commit}) {
            commit('read');
        },*/
        create ({commit}, pageNumb) {
            commit('create', pageNumb);
        },
        update ({commit}, obj) {
            commit('update', obj);
        },
        del ({commit}, obj) {
            commit('del', obj);
        },
        updateName ({commit}, obj) {
            commit('updateName', obj);
        },
        paging ({commit}, pageNumb) {
            commit('paging', pageNumb);
        }
    }
});

new Vue({
    el: '#app',
    components: {App},
    render: h => h(App),
    store,
    computed: {
        mute() {
            return store.state.mute;
        }
    },
    watch: {
        mute(val) {
            document.getElementById('mute').className = val ? 'on' : '';
        }
    }
});
