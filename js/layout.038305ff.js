(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["layout"],{1058:function(e,t,n){},"3e9a":function(e,t,n){},"51a8":function(e,t,n){"use strict";var r=n("1058"),s=n.n(r);s.a},"61f7":function(e,t,n){"use strict";function r(e){return/^(https?:|mailto:|tel:)/.test(e)}function s(e){var t=/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;return t.test(e)}n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return s}))},"63e3":function(e,t,n){"use strict";var r=n("3e9a"),s=n.n(r);s.a},"93bf":function(e,t,n){
/*!
* screenfull
* v5.0.2 - 2020-02-13
* (c) Sindre Sorhus; MIT License
*/
(function(){"use strict";var t="undefined"!==typeof window&&"undefined"!==typeof window.document?window.document:{},n=e.exports,r=function(){for(var e,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],r=0,s=n.length,l={};r<s;r++)if(e=n[r],e&&e[1]in t){for(r=0;r<e.length;r++)l[n[0][r]]=e[r];return l}return!1}(),s={change:r.fullscreenchange,error:r.fullscreenerror},l={request:function(e){return new Promise(function(n,s){var l=function(){this.off("change",l),n()}.bind(this);this.on("change",l),e=e||t.documentElement;var a=e[r.requestFullscreen]();a instanceof Promise&&a.then(l).catch(s)}.bind(this))},exit:function(){return new Promise(function(e,n){if(this.isFullscreen){var s=function(){this.off("change",s),e()}.bind(this);this.on("change",s);var l=t[r.exitFullscreen]();l instanceof Promise&&l.then(s).catch(n)}else e()}.bind(this))},toggle:function(e){return this.isFullscreen?this.exit():this.request(e)},onchange:function(e){this.on("change",e)},onerror:function(e){this.on("error",e)},on:function(e,n){var r=s[e];r&&t.addEventListener(r,n,!1)},off:function(e,n){var r=s[e];r&&t.removeEventListener(r,n,!1)},raw:r};r?(Object.defineProperties(l,{isFullscreen:{get:function(){return Boolean(t[r.fullscreenElement])}},element:{enumerable:!0,get:function(){return t[r.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){return Boolean(t[r.fullscreenEnabled])}}}),n?e.exports=l:window.screenfull=l):n?e.exports={isEnabled:!1}:window.screenfull={isEnabled:!1}})()},bc22:function(e,t,n){},c1f7:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticClass:"app-wrapper"},[n("ch-sidebar",{class:e.isCollapse?"sidebar-collaps":"sidebar-expand",attrs:{routes:e.asyncRouter,"is-collapse":e.isCollapse},on:{"update:isCollapse":function(t){e.isCollapse=t},"update:is-collapse":function(t){e.isCollapse=t}}}),e.isCollapse?e._e():n("div",{staticClass:"mask",on:{click:function(t){e.isCollapse=!e.isCollapse}}}),n("el-container",{staticClass:"main-container",class:e.isCollapse?"container-collaps":"container-expand"},[n("el-header",[n("ch-header",{attrs:{"is-collapse":e.isCollapse},on:{"update:isCollapse":function(t){e.isCollapse=t},"update:is-collapse":function(t){e.isCollapse=t}}})],1),n("el-main",{staticClass:"relative"},[n("router-view",{key:e.key})],1)],1)],1)},s=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sidebar-container"},[n("el-scrollbar",{attrs:{"wrap-class":"scrollbar-wrapper"}},[n("el-menu",{attrs:{"default-active":e.activeMenu,collapse:e.isCollapse,"unique-opened":!1,"collapse-transition":!1,mode:"vertical","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"},on:{select:e.handleSelect}},[e._l(e.routes,(function(t){return[t.hidden?e._e():n("sidebar-item",{key:t.path,attrs:{route:t,"base-path":t.path}})]}))],2)],1)],1)},a=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("fragment",[e.route.meta?e.route.children?n("el-submenu",{attrs:{index:e.basePath,"popper-append-to-body":""}},[n("template",{slot:"title"},[e.route.meta.icon?n("ch-svg",{staticClass:"m-r5",attrs:{size:14,"icon-class":e.route.meta.icon}}):e._e(),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.route.meta.label))])],1),e._l(e.route.children,(function(t){return n("sidebar-item",{key:t.path,attrs:{route:t,"base-path":e.resolvePath(t.path)}})}))],2):n("el-menu-item",{attrs:{index:e.basePath}},[e.route.meta.icon?n("ch-svg",{staticClass:"m-r5",attrs:{size:14,"icon-class":e.route.meta.icon}}):e._e(),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.route.meta.label))])],1):n("el-menu-item",{attrs:{index:e.basePath}},[n("ch-svg",{staticClass:"m-r5",attrs:{size:14,"icon-class":e.route.children[0].meta.icon}}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(" "+e._s(e.route.children[0].meta.label)+" ")])],1)],1)},i=[],c=n("df7c"),u=n.n(c),f={name:"SidebarItem",props:{route:{type:Object,required:!0,default:function(){}},basePath:{type:String,required:!0,default:""}},methods:{resolvePath:function(e){return u.a.resolve(this.basePath,e)}}},d=f,p=n("2877"),h=Object(p["a"])(d,o,i,!1,null,null,null),m=h.exports,b=n("61f7"),v={name:"Sidebar",components:{sidebarItem:m},props:{routes:{type:Array,required:!0,default:function(){return[]}},isCollapse:{type:Boolean,required:!0,default:!0}},computed:{activeMenu:function(){var e=this.$route.path;return"/home"===e?"/":e.replace("/index","")}},methods:{handleSelect:function(e){Object(b["a"])(e)?window.open(e):this.$router.push(e),window.innerWidth<=768&&this.$emit("update:is-collapse",!this.isCollapse)}}},g=v,w=(n("51a8"),Object(p["a"])(g,l,a,!1,null,null,null)),C=w.exports,y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header-container"},[n("div",{staticClass:"header-container-left"},[n("i",{class:e.isCollapse?"el-icon-s-unfold":"el-icon-s-fold",on:{click:e.collapseChange}}),n("breadcrumb",{staticClass:"m-l20"})],1),n("div",{staticClass:"header-container-right"},[n("screenfull"),n("el-dropdown",{on:{command:e.handleCommand}},[n("span",{staticClass:"el-dropdown-link"},[n("el-avatar",{attrs:{shape:"square",size:"medium",src:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"}}),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})],1),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",[e._v("个人中心")]),n("el-dropdown-item",{attrs:{command:"logout",divided:""}},[e._v(" 退出登录 ")])],1)],1)],1)])},E=[],F=n("2f62"),_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-breadcrumb",{attrs:{separator:"/"}},e._l(e.levelList,(function(t,r){return n("el-breadcrumb-item",{key:r},[t.path!==e.$route.path?n("router-link",{attrs:{to:t.path}},[e._v(" "+e._s(t.meta.label)+" ")]):n("span",{staticStyle:{color:"#97a8be"}},[e._v(" "+e._s(t.meta.label)+" ")])],1)})),1)},k=[],O={name:"Breadcrumb",data:function(){return{levelList:[]}},watch:{$route:function(){this.getBreadcrumb()}},created:function(){this.getBreadcrumb()},methods:{getBreadcrumb:function(){var e=this.$route.matched.filter((function(e){return e.meta&&e.meta.label})),t=e[0];this.isHome(t)||(e=[{path:"/home",meta:{label:"主页"}}].concat(e)),this.levelList=e.filter((function(e){return e.meta&&e.meta.label}))},isHome:function(e){var t=e&&e.name;return!!t&&"home"===t}}},x=O,S=(n("cb6b"),Object(p["a"])(x,_,k,!1,null,null,null)),j=S.exports,P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{on:{click:e.handleFullscreen}},[n("ch-svg",{staticClass:"m-r20 cursor",attrs:{color:"#5a5e66","icon-class":e.isFullscreen?"exitFullscreen":"fullscreen",size:20}})],1)},$=[],z=n("93bf"),q=n.n(z),B={name:"Screenfull",data:function(){return{isFullscreen:!1}},mounted:function(){this.init()},beforeDestroy:function(){this.destroy()},methods:{handleFullscreen:function(){if(console.log(q.a),!q.a.isEnabled)return this.$message({message:"您的浏览器无法全屏",type:"warning"}),!1;q.a.toggle()},change:function(){this.isFullscreen=q.a.isFullscreen},init:function(){q.a.isEnabled&&q.a.on("change",this.change)},destroy:function(){q.a.isEnabled&&q.a.off("change",this.change)}}},L=B,A=Object(p["a"])(L,P,$,!1,null,null,null),D=A.exports;function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){M(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function M(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var H={name:"Header",components:{breadcrumb:j,screenfull:D},props:{isCollapse:{type:Boolean,default:!0}},methods:Z({},Object(F["b"])(["logout"]),{handleCommand:function(e){"logout"===e&&this.logout()},collapseChange:function(){this.$emit("update:is-collapse",!this.isCollapse)}})},I=H,J=(n("fabc"),Object(p["a"])(I,y,E,!1,null,null,null)),T=J.exports,W=n("e9a4"),G={name:"Layout",components:{chSidebar:C,chHeader:T},data:function(){return{isCollapse:!0}},computed:{asyncRouter:function(){return this.$ls.get(W["b"])},key:function(){return this.$route.path}},beforeMount:function(){window.addEventListener("resize",this.setSidebarCollapse)},beforeDestroy:function(){window.removeEventListener("resize",this.setSidebarCollapse)},mounted:function(){this.setSidebarCollapse()},methods:{setSidebarCollapse:function(){var e=this;this.$nextTick((function(){e.isCollapse=!0}))}}},K=G,N=(n("63e3"),Object(p["a"])(K,r,s,!1,null,null,null));t["default"]=N.exports},cb6b:function(e,t,n){"use strict";var r=n("cf511"),s=n.n(r);s.a},cf511:function(e,t,n){},fabc:function(e,t,n){"use strict";var r=n("bc22"),s=n.n(r);s.a}}]);