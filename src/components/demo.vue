<template>
    <div class="hello">
        <div class="action">
            <div>
                <label>Num rows (min is 1000)</label>
                <input type="text" v-model="numRows">
            </div>
            <div>
                <label>scale (min is 100)</label>
                <input type="text" v-model="scale">
            </div>
        </div>
        <EndlessList :data="dataList" :scale="Number(scale)">
            <template scope="props" slot="node">
                <div :title="props.node.name">
                    <span v-text="props.node.name" class="circle"></span>
                    <input type="checkbox">
                    <span v-text="props.node.name"></span>
                    <div class="action-group">
                        <a>编辑</a>
                        <a>删除</a>
                    </div>
                </div>
            </template>
        </EndlessList>
    </div>
</template>

<script>
    import EndlessList from './EndlessList.vue'
    export default {
        name: 'Demo',
        data () {
            return {
                numRows:100000,
                scale: 210,
                dataList: [],
            }
        },
        watch: {
            numRows(nv, ov) {
                if(nv && nv > 999) {
                    this.dataList = this.getList(nv);
                } else {
                    this.numRows = 1000;
                }
            }
        },
        created() {
            this.dataList = this.getList(this.numRows);
        },
        methods: {
            getList(num) {
                let i = 0;
                let data = [];
                while (i < num) {
                    data.push({
                        name: i
                    });
                    i++;
                }
                return data;
            }
        },
        components: {
            EndlessList
        }
    }
</script>
<style lang="less">
    .endless-list {
        @btn-color: #5e9bfb;
        width: 300px;
        height: 400px;
        border: 1px solid #999;
        input {
            width: 10px;
        }
        .endless-list-content {
            .endless-list-item {
                text-align: left;
            }
        }
        .endless-list-item:nth-child(odd) {
            background: #eee;
        }
        .circle {
            width: 27px;
            height: 27px;
            text-align: center;
            border-radius: 100%;
            display: inline-block;
            line-height: 27px;
            background: lightskyblue;
        }
        .action-group {
            float:right;
            a {
                color: @btn-color
            }
        }
    }
    .action {
        display: flex;
        flex-direction: row;
        div {
            flex: 1;
            min-width: 0;
            margin: 0 10px 5px 0;
        }
        label {
            color: #bdbdbd;
            font-size: .75em;
            margin-bottom: 5px;
            font-weight: 100;
        }
        input {
            border: 0;
            border-bottom: 1px solid #e0e0e0;
            padding: 5px 0;
            font-size: 1em;
            font-weight: 300;
            background-color: transparent;
            text-rendering: auto;
            color: initial;
            letter-spacing: normal;
            word-spacing: normal;
            text-transform: none;
            text-indent: 0px;
            text-shadow: none;
            display: inline-block;
            text-align: start;
            margin: 0em;
        }
        input:focus {
            outline: none;
        }
    }
</style>
