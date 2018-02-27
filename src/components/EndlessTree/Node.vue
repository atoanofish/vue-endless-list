/**
* @endless tree
* @author majian
*
*/

<template>
    <li>
        <p :style="{'margin-left': 20 * node.level + 'px'}">
            <input type="checkbox" :checked="node.checked" @change="selectNode($event, node)">
            <template v-if="node.children">
                <span class="expand-btn" @click="nodeExpand(node, node.expand)">
                    <a v-if="node.expand" class="tree-operation" >-</a>
                    <a v-else="node.expand" class="tree-operation">+</a>
                </span>
            </template>
            <span class="content" :title="node.name"  @click.stop="nodeExpand(node, node.expand)">{{ node.name }}</span>
        </p>
    </li>
</template>

<script>
export default {
  name: "node",
  data() {
    return {};
  },
  props: {
    node: {
      type: [Number, String, Object, Array],
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    },
    checkHandle: {
      type: [Function],
      required: true
    },
    nodeClick: {
      type: [Function],
      required: true
    }
  },
  methods: {
    nodeExpand(model) {
      this.nodeClick(model);
    },
    selectNode(e, node) {
      this.checkHandle(e.target.checked, node);
    },
    isFolder(item) {
      let folderClass = "";
      if (!item[this.folderAttr]) {
        this.expand ? (folderClass = "folder-open") : (folderClass = "folder");
      } else if (item[this.folderAttr] && this.iconInit) {
        folderClass = this.iconInit(item);
      }
      return folderClass;
    }
  }
};
</script>

<style lang="less" scoped>
p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666666;
  & > span {
    /*display: inline-block;*/
    vertical-align: middle;
  }
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*width: 89%;*/
  }
  .expand-btn {
    width: 20px;
    height: 20px;
    display: inline-block;
    border: 1px solid #eee;
    text-align: center;
    line-height: 20px;
  }
  .folder {
    position: relative;
    top: 3px;
    color: #979797;
  }
  .file {
    position: relative;
    top: 2px;
    margin-left: 4px;
  }
}
</style>
