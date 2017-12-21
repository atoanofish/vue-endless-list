<!--
 @file vue endless-lit (无尽的列表)
 @author majian
 组件配置：
         @param {Array}      :data:Array // 数据
         @param {NUMBER}    :nodeHeight  //内容高度
         @param {NUMBER}    :scale:      // 每次加载条数
-->
<template>
    <div class="endless-list" @scroll="scrollHandler">
        <div class="endless-wrap" :style="{'height':nodeNum * nodeHeight + 'px'}">
            <ul class="endless-list-content" :style="{'top':start * nodeHeight + 'px'}">
                <li v-for="item in list" :style="{'height':nodeHeight + 'px'}" class="endless-list-item">
                    <template>
                        <slot name="node" :node="item"></slot>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EndlessList',
        data() {
            return {
                start: 0,
                end: 0,
                nodeNum: 0,
                startTime: null,
                scrollT: 0,
                run: false
            };
        },
        props: {
            data: {
                type: Array,
                default: []
            },
            nodeHeight: {
                type: Number,
                default: 27
            },
            scale: {
                type: Number,
                default: 210
            }
        },
        computed: {
            bufferSize() {
                if (this.scale > 100) {
                    return parseInt(this.scale / 10);
                } else {
                    return 20;
                }
            },
            list() {
                let result = [];
                if (this.data.length) {
                    this.nodeNum = this.data.length;
                    result = this.data.slice(this.start, this.end);
                }
                return result;
            }
        },
        created() {
            this.end = this.start + this.scale;
        },
        methods: {
            scrollHandler() {
                this.updateRender();
            },
            updateRender() {
                let scrollT = this.$el.scrollTop;
                let {scale, nodeNum, bufferSize} = this;
                let bufferStart = (this.start + bufferSize) * this.nodeHeight;
                let bufferEnd = (this.end - bufferSize) * this.nodeHeight;
                if (scrollT > bufferStart && scrollT < bufferEnd) {
                    return;
                }
                if (scrollT < ((scale - bufferSize) / 2) * this.nodeHeight) {
                    this.start = 0;
                    this.end = scale;
                } else if (scrollT > (nodeNum - scale) * this.nodeHeight) {
                    this.end = nodeNum;
                    this.start = nodeNum - scale;
                } else {
                    this.start = Math.ceil(scrollT / this.nodeHeight) - ((scale - bufferSize) / 2);
                    this.end = this.start + scale;
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    .endless-list {
        overflow: auto;
    }

    .endless-list-content {
        position: relative;
        padding: 0;
        margin: 0;
        .top-div {
            position: relative;
        }
        .endless-list-item {
            list-style-type: none;
            line-height: 26px;
            height: 26px;
        }
    }
</style>
