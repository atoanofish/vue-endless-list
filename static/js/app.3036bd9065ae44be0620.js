webpackJsonp([1],{NB6F:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},a=n("VU/8")({name:"app"},s,!1,function(t){n("dxVl")},null,null).exports,r=n("/ocq"),o=n("c/Tr"),l=n.n(o),d=n("Dd8w"),c=n.n(d),h={name:"node",data:function(){return{}},props:{node:{type:[Number,String,Object,Array],required:!0},checked:{type:Boolean,default:!1},checkHandle:{type:[Function],required:!0},nodeClick:{type:[Function],required:!0}},methods:{nodeExpand:function(t){this.nodeClick(t)},selectNode:function(t,e){this.checkHandle(t.target.checked,e)},isFolder:function(t){var e="";return t[this.folderAttr]?t[this.folderAttr]&&this.iconInit&&(e=this.iconInit(t)):e=this.expand?"folder-open":"folder",e}}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("p",{style:{"margin-left":20*t.node.level+"px"}},[n("input",{attrs:{type:"checkbox"},domProps:{checked:t.node.checked},on:{change:function(e){t.selectNode(e,t.node)}}}),t._v(" "),t.node.children?[n("span",{staticClass:"expand-btn",on:{click:function(e){t.nodeExpand(t.node,t.node.expand)}}},[t.node.expand?n("a",{staticClass:"tree-operation"},[t._v("-")]):n("a",{staticClass:"tree-operation"},[t._v("+")])])]:t._e(),t._v(" "),n("span",{staticClass:"content",attrs:{title:t.node.name},on:{click:function(e){e.stopPropagation(),t.nodeExpand(t.node,t.node.expand)}}},[t._v(t._s(t.node.name))])],2)])},staticRenderFns:[]},p={name:"endless-tree",data:function(){return{originList:[],catchList:[],originMap:{},start:0,end:0,nodeNum:0,startTime:null}},components:{node:n("VU/8")(h,u,!1,function(t){n("TwLb")},"data-v-6f459d86",null).exports},props:{treeData:{type:Array,default:[]},extendLevel:{type:Number,default:0},element:{type:Object},getList:{type:Function},searchWord:{type:String,default:""},scale:{type:Number,default:210},attrText:{type:String,default:"id"},nodeHeight:{type:Number,default:27}},computed:{list:function(){var t=[];return this.catchList.length&&(t=this.catchList.filter(function(t){return t.parent&&t.parent.expand||0===t.level&&void 0!==t.checked}),this.nodeNum=t.length),t},renderList:function(){return this.list.slice(this.start,this.end)},bufferSize:function(){return this.scale>100?parseInt(this.scale/10):20}},watch:{treeData:function(t,e){t&&t!==e&&this.initCacheList(t,"first")},extendLevel:function(t,e){""!==t&&null!==t&&void 0!==t&&t!==e&&this.catchList.forEach(function(e){e.expand=e.level<t})},searchWord:function(t,e){var n=this;""===t&&t!==e?(this.originList.forEach(function(t){t.expand=!1}),this.catchList=this.originList):""!==t&&t!==e&&(this.catchList=this.originList.filter(function(t,e){return n.filterBySearch(t,e)})),this.$emit("get-list",this.originList)}},created:function(){this.end=this.start+this.scale},methods:{custorCacheList:function(t){var e=this,n=[];return function t(i,s,a){for(var r=s.length,o=0;o<r;o++){var l=c()({},s[o]);l.level=i,l.expand=!1,l.children=0,l.parent=a,n.push(l),e.originMap[s[o][e.attrText]]={data:l,children:s[o].children},s[o].children&&s[o].children.length&&(l.children=s[o].children.length,t(i+1,s[o].children,l))}}(0,t),this.nodeNum=n.length,n},initCacheList:function(t,e){this.catchList=this.custorCacheList(t),"first"===e&&(this.originList=this.catchList,this.$emit("get-list",this.originList))},scrollHandler:function(){this.updateRender()},updateRender:function(){var t=this.$el.scrollTop,e=this.scale,n=this.nodeNum,i=this.nodeHeight,s=this.bufferSize,a=(this.start+s)*i,r=(this.end-s)*i;t>a&&t<r||(t<(e-s)/2*i?(this.start=0,this.end=e):t>(n-e)*i?(this.end=n,this.start=n-e):(this.start=Math.ceil(t/i)-(e-s)/2,this.end=this.start+e))},nodeClick:function(t){this.originMap[t[this.attrText]].data.expand=!t.expand,this.$emit("get-list",this.originList),t.children&&this.expandChildren(this.originMap[t[this.attrText]].children,t.expand)},expandChildren:function(t,e){var n=this;e||t.map(function(t){n.originMap[t[n.attrText]].data.expand=e,n.$emit("get-list",n.originList),t.children&&t.children.length&&!e&&n.expandChildren(t.children,e)})},checkHandle:function(t,e){this.originMap[e[this.attrText]].data.checked=t,this.$emit("get-list",this.originList),e.expand&&e.children&&this.checkedChild(this.originMap[e[this.attrText]].children,t)},checkedChild:function(t,e){var n=this;t&&t.length&&(t.map(function(t){n.originMap[t[n.attrText]].data.checked=e,n.originMap[t[n.attrText]].data.children&&n.originMap[t[n.attrText]].data.expand&&n.checkedChild(n.originMap[t[n.attrText]].children,e)}),this.$emit("get-list",this.originList))},filterBySearch:function(t){if(this.matchByWord(t)||this.findByChildren(t))return this.expandParent(t),t},expandParent:function(t){t.parent&&(t.parent.expand=!0,this.expandParent(t.parent))},findByChildren:function(t){var e=!1,n=this.originMap[t[this.attrText]].children;if(n&&n.length)for(var i=0;i<n.length;i++){if(this.matchByWord(n[i])){e=!0;break}void 0!==n[i].children&&n[i].children.length&&(e=this.findByChildren(n[i]))}return e},matchByWord:function(t){return-1!==(t.text||t.name).toLowerCase().indexOf(this.searchWord.toLowerCase())}}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"endless-tree",on:{scroll:t.scrollHandler}},[n("div",{staticClass:"endless-wrap",style:{height:t.nodeNum*t.nodeHeight+"px"}},[t.renderList.length>0?n("ul",{staticClass:"endless-tree-content",style:{top:t.start*t.nodeHeight+"px"}},[t._l(t.renderList,function(e,i){return[n("node",{attrs:{node:e,checkHandle:t.checkHandle,nodeClick:t.nodeClick}})]})],2):t._e()])])},staticRenderFns:[]},m=n("VU/8")(p,f,!1,function(t){n("NB6F")},"data-v-e87a73f4",null).exports,v={name:"EndlessList",data:function(){return{start:0,end:0,nodeNum:0,startTime:null,scrollT:0,run:!1}},props:{data:{type:Array,default:[]},nodeHeight:{type:Number,default:27},scale:{type:Number,default:210}},computed:{bufferSize:function(){return this.scale>100?parseInt(this.scale/10):20},list:function(){var t=[];return this.data.length&&(this.nodeNum=this.data.length,t=this.data.slice(this.start,this.end)),t}},created:function(){this.end=this.start+this.scale},methods:{scrollHandler:function(){this.updateRender()},updateRender:function(){var t=this.$el.scrollTop,e=this.scale,n=this.nodeNum,i=this.bufferSize,s=(this.start+i)*this.nodeHeight,a=(this.end-i)*this.nodeHeight;t>s&&t<a||(t<(e-i)/2*this.nodeHeight?(this.start=0,this.end=e):t>(n-e)*this.nodeHeight?(this.end=n,this.start=n-e):(this.start=Math.ceil(t/this.nodeHeight)-(e-i)/2,this.end=this.start+e))}}},g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"endless-list",on:{scroll:t.scrollHandler}},[n("div",{staticClass:"endless-wrap",style:{height:t.nodeNum*t.nodeHeight+"px"}},[n("ul",{staticClass:"endless-list-content",style:{top:t.start*t.nodeHeight+"px"}},t._l(t.list,function(e){return n("li",{staticClass:"endless-list-item",style:{height:t.nodeHeight+"px"}},[[t._t("node",null,{node:e})]],2)}))])])},staticRenderFns:[]},x={name:"Demo",data:function(){return{color:["red","blue","orange","black","gray","pink","yellow","lightskyblue"],listNumRows:1e5,listScale:210,TreeNumRows:10,TreeScale:210,searchWord:"",dataList:[],extendLevel:-1,treeData:[]}},watch:{listNumRows:function(t,e){t&&t>999?this.dataList=this.getList(t):this.listNumRows=1e3},TreeNumRows:function(t,e){this.treeData=this.makeTree(t,10)}},mounted:function(){this.dataList=this.getList(this.listNumRows),this.treeData=this.makeTree(this.TreeNumRows,10),this.extendLevel=10},methods:{getList:function(t){for(var e=0,n=[];e<t;)n.push({name:e}),e++;return n},makeTree:function(t,e){function n(t,e,i){var a=[];return t&&l()(new Array(e).keys()).map(function(r){a.push({checked:!1,id:"level-"+t+"-"+r+"-"+s,name:"level-"+t+"-"+r+"-"+s,children:t?n(--t,e,++i):[]})}),a}for(var i=[],s=0;e;)e&&i.push({name:"level-"+t+"-"+e+"-"+s,id:"level-"+t+"-"+e+"-"+s,checked:!1,children:n(t,e,++s)}),e--;return i}},components:{EndlessList:n("VU/8")(v,g,!1,function(t){n("zXxf")},"data-v-7e2d776a",null).exports,EndlessTree:m}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap"},[n("div",{staticClass:"endless-list-container"},[n("h1",[t._v("EndlessList\n            "),n("a",[t._v("("+t._s(t.listNumRows)+"条数据)")])]),t._v(" "),n("div",{staticClass:"action"},[n("div",[n("label",[t._v("Num rows (min is 1000)")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.listNumRows,expression:"listNumRows"}],attrs:{type:"text"},domProps:{value:t.listNumRows},on:{input:function(e){e.target.composing||(t.listNumRows=e.target.value)}}})]),t._v(" "),n("div",[n("label",[t._v("scale (min is 100)")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.listScale,expression:"listScale"}],attrs:{type:"text"},domProps:{value:t.listScale},on:{input:function(e){e.target.composing||(t.listScale=e.target.value)}}})])]),t._v(" "),n("EndlessList",{attrs:{data:t.dataList,scale:Number(t.listScale)},scopedSlots:t._u([{key:"node",fn:function(e){return[n("div",{attrs:{title:e.node.name}},[n("span",{staticClass:"circle",style:{background:t.color[Math.random(5)]}}),t._v(" "),n("input",{attrs:{type:"checkbox"}}),t._v(" "),n("span",{domProps:{textContent:t._s(e.node.name)}}),t._v(" "),n("div",{staticClass:"action-group"},[n("a",[t._v("编辑")]),t._v(" "),n("a",[t._v("删除")])])])]}}])})],1),t._v(" "),n("div",{staticClass:"endless-tree-container"},[n("h1",[t._v("EndlessTree\n            "),n("a",[t._v("(每层"+t._s(t.TreeNumRows)+"条，共10层)")])]),t._v(" "),n("div",{staticClass:"action"},[n("div",[n("label",[t._v("LEVEL(构造数据，默认假数据10层)")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.TreeNumRows,expression:"TreeNumRows"}],attrs:{type:"text"},domProps:{value:t.TreeNumRows},on:{input:function(e){e.target.composing||(t.TreeNumRows=e.target.value)}}})]),t._v(" "),n("div",[n("label",[t._v("scale (min is 100)")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.TreeScale,expression:"TreeScale"}],attrs:{type:"text"},domProps:{value:t.TreeScale},on:{input:function(e){e.target.composing||(t.TreeScale=e.target.value)}}})])]),t._v(" "),n("EndlessTree",{ref:"endlessTree",attrs:{treeData:t.treeData,searchWord:t.searchWord,extendLevel:t.extendLevel,attrText:"name"}})],1)])},staticRenderFns:[]},L=n("VU/8")(x,_,!1,function(t){n("lprX")},null,null).exports;i.a.use(r.a);var y=new r.a({routes:[{path:"/",name:"Demo",component:L}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:y,template:"<App/>",components:{App:a}})},TwLb:function(t,e){},dxVl:function(t,e){},lprX:function(t,e){},zXxf:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.3036bd9065ae44be0620.js.map