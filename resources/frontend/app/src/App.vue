<template>
  <div id="app">
      <div class="heading">
          <h1>Пришельцы</h1>
      </div>
      <CrudComponent v-for="crud in cruds"
                     v-bind="crud"
                     :key="crud.id"
                     @update="update"
                     @del="del"
                     @updateName="updateName"
                     >
      </CrudComponent>
      <div>
          <button type="button" @click="create" class="add-btn">Добавить</button>
      </div>
      <linksPaginate @paging="paging"></linksPaginate>
  </div>
</template>

<script>

import CrudComponent from './components/CrudComponent.vue';
import linksPaginate from './components/linksPaginate.vue';

export default {
    name: 'App',
    components: {
        CrudComponent,
        linksPaginate
    },
    computed: {
        cruds() {
            return this.$store.state.cruds;
        }
    },
    methods: {
        /*read() {
            this.mute = true;
            this.$store.dispatch('read');
            this.mute = false;
        },*/
        create() {
            let pageNumb;
            pageNumb = this.$store.state.links.find(link => link.url != null && link.label != '...' && link.active === true).label;
            this.$store.dispatch('create', pageNumb);
        },
        update(id, color, pageNumb) {
            let obj = {
                'id': id,
                'color': color,
                'pageNumb': pageNumb
            }
            this.$store.dispatch('update', obj);
        },
        del(id, pageNumb) {
            let obj = {
                'id': id,
                'pageNumb': pageNumb
            }
            this.$store.dispatch('del', obj);
            //let index = this.cruds.findIndex(crud => crud.id === id);
            //this.cruds.splice(index, 1);
        },
        updateName(id, name, pageNumb) {
            let obj = {
                'id': id,
                'name': name,
                'pageNumb': pageNumb
            }
            this.$store.dispatch('updateName', obj);
        },
        paging(pageNumb) {
            this.$store.dispatch('paging', pageNumb);
        }
    },
    created() {
        this.paging();
    }
}
</script>

<style>
    body {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: 'Verdana';
    }
    h1 {
        text-align: center;
        margin-top: 15px;
        margin-top: 10px;
    }
    #mute {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background-color: #eee;
        display: none;
        opacity: 0;
    }
    #mute.on {
        display: block;
        opacity: 0.7;
    }
    .paginate {
        text-align: center;
        margin-bottom: 15px;
    }
    .paginate__span-prev, .paginate__link-prev, .paginate__link-active, .paginate__link, .paginate__dots, .paginate__link-next, .paginate__span-next {
        display: inline-block;
        margin-left: 5px;
        margin-right: 5px;
        cursor: pointer;
        text-decoration: underline;
    }
    .paginate__dots, .paginate__span-prev, .paginate__link-active, .paginate__span-next {
        color: #888;
        cursor: default;
        text-decoration: none;
    }
    .add-btn {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        margin-bottom: 40px;
        cursor: pointer;
        width: 150px;
        text-align: center;
        height: 40px;
        border: none;
        border-radius: 5px;
        box-sizing: border-box;
        padding-top: 2px;
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        background-color: #2055aa;
        transition: all .4s ease;
    }
    .add-btn:hover {
        background-color: #1265ba;
    }
</style>
