<template>
    <div class="wrapper clearfix">
        <div class="left-crud">
            <img :src="image" alt="" class="left-crud__img">
        </div>
        <div class="right-crud">
            <div class="right-crud__header">Имя: <span class="crud-name" @dblclick="updateName" style="display: input;">{{name | ProperCase}}</span><input type="text" class="right-crud__input" style="display: none;" :value="name | ProperCase" @change="updateAx" @blur="updateAx"></div>
            <div class="right-crud__row">
                <select @change="update" class="crud-select">
                    <option v-for="(col, index) in ['red', 'green']"
                            :value="col"
                            :key="index"
                            :selected="col === color ? 'selected' : ''">
                        {{colorPicker(col)}}
                    </option>
                </select>
                <button type="button" @click="del" class="del-btn">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CrudComponent',
    data: function() {
        return {
            showSpan: 'input',
            showInp: 'none'
        }
    },
    props: ['id', 'color', 'name'],
    filters: {
        ProperCase(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
    computed: {
        image() {
            return 'assets/app/images/' + this.color + '.png';
        }
    },
    methods: {
        update(val) {
            let pageNumb;
            pageNumb = this.$store.state.links.find(link => link.url != null && link.label != '...' && link.active === true).label;
            this.$emit('update', this.id, val.target.selectedOptions[0].value, pageNumb);
        },
        del() {
            let pageNumb;
            pageNumb = this.$store.state.links.find(link => link.url != null && link.label != '...' && link.active === true).label;
            this.$emit('del', this.id, pageNumb);
        },
        updateName(e) {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'inline-block';
            e.target.nextElementSibling.focus();
        },
        updateAx(e) {
            let pageNumb;
            pageNumb = this.$store.state.links.find(link => link.url != null && link.label != '...' && link.active === true).label;
            this.$emit('updateName', this.id, e.target.value, pageNumb);
            e.target.style.display = 'none';
            e.target.previousElementSibling.style.display = 'inline-block';
        },
        colorPicker(col) {
            if (col === 'red') {
                return 'Красный';
            } else if (col === 'green') {
                return 'Зеленый';
            }
        }
    }
}
</script>

<style scoped>
    .wrapper {
        margin-left: auto;
        margin-right: auto;
        max-width: 500px;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #eee;
        margin-bottom: 10px;
    }
    .clearfix:before, .clearfix:after {
        content: '';
        display: table;
    }
    .clearfix:after {
        clear: both;
    }
    .left-crud {
        width: 30%;
        float: left;
    }
    .crud-select {
		height: 30px;
    }
    .crud-name {
		padding: 8px;
		border: 1px solid #555;
		border-radius: 5px;
    }
    .right-crud {
        width: 55%;
        margin-top: 5px;
        margin-left: 5%;
        float: right;
		text-align: right;
		padding-right: 10%;
    }
    .right-crud__input {
		padding: 8px;
		border-radius: 5px;
		border: 1px solid #555;
		text-align: center;
    }
    .left-crud__img {
        width: 100%;
        height: auto;
    }
    .right-crud__header {
        font-size: 18px;
        font-weight: bold;
    }
    .right-crud__row {
		margin-top: 25px;
    }
    .del-btn {
		margin-left: 9px;
		cursor: pointer;
		height: 30px;
    }
</style>
