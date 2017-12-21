<template>
    <div class="wrap">
        <div class="endless-list-container">
            <h1>EndlessList
                <a>({{listNumRows}}条数据)</a>
            </h1>
            <div class="action">
                <div>
                    <label>Num rows (min is 1000)</label>
                    <input type="text" v-model="listNumRows">
                </div>
                <div>
                    <label>scale (min is 100)</label>
                    <input type="text" v-model="listScale">
                </div>
            </div>
            <EndlessList :data="dataList" :scale="Number(listScale)">
                <template scope="props" slot="node">
                    <div :title="props.node.name">
                        <span class="circle" :style="{'background': color[Math.random(5)]}"></span>
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
        <div class="endless-tree-container">
            <h1>EndlessTree
                <a>(每层{{TreeNumRows}}条，共10层)</a>
            </h1>
            <div class="action">
                <div>
                    <label>LEVEL(构造数据，默认假数据10层)</label>
                    <input type="text" v-model="TreeNumRows">
                </div>
                <div>
                    <label>scale (min is 100)</label>
                    <input type="text" v-model="TreeScale">
                </div>
            </div>
            <EndlessTree
                    ref="endlessTree"
                    :treeData="treeData"
                    :searchWord="searchWord"
                    :extendLevel="extendLevel"
                    attrText="name">
            </EndlessTree>
        </div>
    </div>
</template>

<script>
    import EndlessTree from './EndlessTree/Tree.vue'
    import EndlessList from './EndlessList.vue'
    export default {
        name: 'Demo',
        data () {
            return {
                color: ['red', 'blue', 'orange', 'black', 'gray', 'pink', 'yellow', 'lightskyblue'],
                listNumRows: 100000,
                listScale: 210,
                TreeNumRows: 10,
                TreeScale: 210,
                searchWord: '',
                dataList: [],
                extendLevel: -1,
                treeData: []
            }
        },
        watch: {
            listNumRows(nv, ov) {
                if (nv && nv > 999) {
                    this.dataList = this.getList(nv);
                } else {
                    this.listNumRows = 1000;
                }
            },
            TreeNumRows(nv, ov) {
                this.treeData = this.makeTree(nv, 10); // 10的10次方
            }
        },
        mounted() {
            this.dataList = this.getList(this.listNumRows);
            this.treeData = this.makeTree(this.TreeNumRows, 10);
            this.extendLevel = 10;
        },
        methods: {
            // 构造LIST
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
            },
            // 构造Tree
            makeTree(level, num) {
                let tree = [];
                let i = 0;
                while (num) {
                    if (num) {
                        tree.push({
                            name: 'level' + '-' + level + '-' + num + '-' + i,
                            id: 'level' + '-' + level + '-' + num + '-' + i,
                            checked: false,
                            children: makeChildren(level, num, ++i)
                        });
                    }
                    num--;
                }
                function makeChildren(level, num, name) {
                    let nodeArray = [];
                    if (level) {
                        Array.from(new Array(num).keys()).map(item => {
                            nodeArray.push({
                                checked: false,
                                id: 'level' + '-' + level + '-' + item + '-' + i,
                                name: 'level' + '-' + level + '-' + item + '-' + i,
                                children: level ? makeChildren(--level, num, ++name) : []
                            });
                        });
                    }
                    return nodeArray;
                }

                return tree;
            }
        },
        components: {
            EndlessList,
            EndlessTree
        }
    }
</script>
<style lang="less">
    .wrap {
        width: 100%;
        height: 100%;
        display: flex;
    }
    .endless-tree-container , .endless-list-container{
        flex:1;
        h1 {
            a {
                font-size:12px;
            }
        }
    }
    .endless-list, .endless-tree {
        width: 80%;
        height: 400px;
        border: 1px solid #999;
    }
    .endless-list {
        @btn-color: #5e9bfb;
        @item-bg-color:#eee;
        input {
            width: 10px;
        }
        .endless-list-content {
            .endless-list-item {
                text-align: left;
            }
        }
        .endless-list-item:nth-child(odd) {
            background: @item-bg-color;
        }
        .circle {
            width: 27px;
            height: 27px;
            text-align: center;
            border-radius: 100%;
            display: inline-block;
            line-height: 27px;
        }
        .action-group {
            float: right;
            a {
                color: @btn-color
            }
        }
    }

    .action {
        @input-border: #e0e0e0;
        @lebal-color: bdbdbd;
        display: flex;
        flex-direction: row;
        div {
            flex: 1;
            min-width: 0;
            margin: 0 10px 5px 0;
        }
        label {
            color: @lebal-color;
            font-size: .12px;
            margin-bottom: 5px;
            font-weight: 100;
        }
        input {
            border: 0;
            border-bottom: 1px solid @input-border;
            padding: 5px 0;
            font-size: 12px;
            font-weight: 300;
            background-color: transparent;
            text-rendering: auto;
            color: initial;
            letter-spacing: normal;
            word-spacing: normal;
            text-transform: none;
            text-indent: 0;
            text-shadow: none;
            display: inline-block;
            text-align: start;
            margin: 0;
        }
        input:focus {
            outline: none;
        }
    }
    .endless-tree {
        ul {
            padding: 0;
        }
        p {
            text-align: left;
        }
    }
</style>
