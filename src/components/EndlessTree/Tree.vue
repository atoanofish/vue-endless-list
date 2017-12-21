/**
* @file endless-tree
* @author majian
*/

<template>
    <div class="endless-tree" @scroll="scrollHandler">
        <div class="endless-wrap" :style="{'height':nodeNum * nodeHeight + 'px'}">
            <ul class="endless-tree-content" v-if="renderList.length > 0" :style="{'top':start * nodeHeight + 'px'}">
                <template v-for="(item, idx) in renderList">
                    <node :node="item" :checkHandle="checkHandle" :nodeClick="nodeClick"></node>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
    import node from './Node.vue';
    export default {
        name: 'endless-tree',
        data() {
            return {
                originList: [],
                catchList: [],
                originMap: {},
                start: 0,
                end: 0,
                nodeNum: 0,
                startTime: null
            };
        },
        components: {
            node
        },
        props: {
            treeData: {
                type: Array,
                default: []
            },
            extendLevel: {
                type: Number,
                default: 0
            },
            element: {
                type: Object
            },
            getList: {
                type: Function
            },
            searchWord: {
                type: String,
                default: ''
            },
            scale: {
                type: Number,
                default: 210
            },
            attrText: {
                type: String,
                default: 'id'
            },
            nodeHeight: {
                type: Number,
                default: 27
            }
        },
        computed: {
            list() {
                let result = [];
                if (this.catchList.length) {
                    result = this.catchList.filter(item => ((item.parent && item.parent.expand) || item.level === 0
                    && item.checked !== void 0));
                    this.nodeNum = result.length;
                }
                return result;
            },
            renderList() {
                return this.list.slice(this.start, this.end);
            },
            bufferSize() {
                if (this.scale > 100) {
                    return parseInt(this.scale / 10);
                } else {
                    return 20;
                }
            }
        },
        watch: {
            treeData(nv, ov) {
                if (nv && nv !== ov) {
                    this.initCacheList(nv, 'first');
                }
            },
            extendLevel(nv, ov) {
                if (nv !== '' && nv !== null && nv !== void 0 && nv !== ov) {
                    this.catchList.forEach((item) => {
                        item.expand = item.level < nv;
                    });
                }
            },
            searchWord(nv, ov) {
                if (nv === '' && nv !== ov) {
                    this.originList.forEach(item => {
                        item.expand = false;
                    });
                    this.catchList = this.originList;
                } else if (nv !== '' && nv !== ov) {
                    this.catchList = this.originList
                        .filter((node, index) => this.filterBySearch(node, index));
                }
                this.$emit('get-list', this.originList);
            }
        },
        created() {
            this.end = this.start + this.scale;
        },
        methods: {
            custorCacheList(list) {
                let treeList = [];
                let goDownTree = (n, arr, parent) => {
                    let len = arr.length;
                    for (let i = 0; i < len; i++) {
                        let newNode = {...arr[i]};
                        newNode.level = n;
                        newNode.expand = false;
                        newNode.children = 0;
                        newNode.parent = parent;
                        treeList.push(newNode);
                        this.originMap[arr[i][this.attrText]] = {
                            data: newNode,
                            children: arr[i].children
                        };
                        if (arr[i].children && arr[i].children.length) {
                            newNode.children = arr[i].children.length;
                            goDownTree(n + 1, arr[i].children, newNode);
                        }
                    }
                };

                goDownTree(0, list);
                this.nodeNum = treeList.length;
                return treeList;
            },
            initCacheList(list, type) {
                this.catchList = this.custorCacheList(list);
                if (type === 'first') {
                    this.originList = this.catchList;
                    this.$emit('get-list', this.originList);
                }
            },
            scrollHandler() {
                this.updateRender();
            },
            updateRender() {
                let scrollT = this.$el.scrollTop;
                let {scale, nodeNum, nodeHeight, bufferSize} = this;
                let bufferStart = (this.start + bufferSize) * nodeHeight;
                let bufferEnd = (this.end - bufferSize) * nodeHeight;
                if (scrollT > bufferStart && scrollT < bufferEnd) {
                    return;
                }
                if (scrollT < ((scale - bufferSize) / 2) * nodeHeight) {
                    this.start = 0;
                    this.end = scale;
                } else if (scrollT > (nodeNum - scale) * nodeHeight) {
                    this.end = nodeNum;
                    this.start = nodeNum - scale;
                } else {
                    this.start = Math.ceil(scrollT / nodeHeight) - ((scale - bufferSize) / 2);
                    this.end = this.start + scale;
                }
            },
            nodeClick(model) {
                this.originMap[model[this.attrText]].data.expand = !model.expand;
                this.$emit('get-list', this.originList);
                if (model.children) {
                    this.expandChildren(this.originMap[model[this.attrText]].children, model.expand);
                }
            },
            expandChildren(list, type) {
                if (!type) {
                    list.map(item => {
                        this.originMap[item[this.attrText]].data.expand = type;
                        this.$emit('get-list', this.originList);
                        if (item.children && item.children.length && !type) {
                            this.expandChildren(item.children, type);
                        }
                    });
                }
            },
            checkHandle(checked, node) {
                this.originMap[node[this.attrText]].data.checked = checked;
                this.$emit('get-list', this.originList);
                if (node.expand && node.children) {
                    this.checkedChild(this.originMap[node[this.attrText]].children, checked);
                }
            },
            checkedChild(list, checked) {
                if (list && list.length) {
                    list.map(item => {
                        this.originMap[item[this.attrText]].data.checked = checked;
                        if (this.originMap[item[this.attrText]].data.children && this.originMap[item[this.attrText]].data.expand) {
                            this.checkedChild(this.originMap[item[this.attrText]].children, checked);
                        }
                    });
                    this.$emit('get-list', this.originList);
                }
            },
            filterBySearch(node) {
                if (this.matchByWord(node) || this.findByChildren(node)) {
                    this.expandParent(node);
                    return node;
                }
            },
            expandParent(node) {
                if (node.parent) {
                    node.parent.expand = true;
                    this.expandParent(node.parent);
                }
            },
            findByChildren(node) {
                let flag = false;
                let list = this.originMap[node[this.attrText]].children;
                if (list && list.length) {
                    for (let i = 0; i < list.length; i++) {
                        if (this.matchByWord(list[i])) {
                            flag = true;
                            break;
                        } else {
                            if (list[i].children !== void 0 && list[i].children.length) {
                                flag = this.findByChildren(list[i]);
                            }
                        }
                    }
                }
                return flag;
            },
            matchByWord(node) {
                return (node.text || node.name).toLowerCase().indexOf(this.searchWord.toLowerCase()) !== -1;
            }
        }
    };
</script>

<style lang="less" scoped>
    .endless-tree {
        overflow: auto;
        .endless-tree-content {
            position: relative;
        }
        & > ul {
            margin-left: 0 !important;
        }
        ul {
            margin-left: 20px;
        }
        li {
            list-style-type: none;
            line-height: 26px;
        }
        i {
            vertical-align: middle;
            margin-top: -2px;
        }
        p {
            padding: 0;
            &:hover {
                color: #4B98F8;
            }
        }
    }
</style>
