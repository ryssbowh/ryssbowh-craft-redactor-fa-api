"use strict";function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}var FaGraphQl=function(){function i(e,t){_classCallCheck(this,i),this.version=e,this.license=t}return _createClass(i,[{key:"search",value:function(e){var a=this;return new Promise(function(o,t){a.query('search(version:"'+a.version+'",query:"'+e+'") {membership {free, pro},id,label}').then(function(e){var t,i=[];for(t in e.data.search){var n=e.data.search[t].membership[a.license];n.length&&i.push({id:e.data.search[t].id,label:e.data.search[t].label,styles:n})}o(i)},function(e){t(e)})})}},{key:"icons",value:function(){var n=this;return this.iconList?new Promise(function(e,t){e(n.iconList)}):new Promise(function(t,i){n.release('icons(license: "'+n.license+'") {id,label,styles}').then(function(e){t(e.data.release.icons)},function(e){i(e)})})}},{key:"release",value:function(e){return this.query('release(version:"'+this.version+'"){'+e+"}")}},{key:"query",value:function(e){var n={query:"query {"+e+"}"};return new Promise(function(t,i){$.ajax({method:"post",url:"https://api.fontawesome.com",data:n,dataType:"json"}).done(function(e){if(e.errors)return i(e.errors);t(e)})})}}]),i}();!function(){var e;Redactor.add("plugin","fontawesome",{keyupTimeout:null,modal:null,form:null,majorVersion:null,styleToPrefixV5:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"},translations:{en:(_defineProperty(e={title:Craft.t("redactor-fa-api","Font Awesome Icon"),search:Craft.t("redactor-fa-api","Enter an icon name"),cancel:Craft.t("redactor-fa-api","Cancel"),placeholder:Craft.t("redactor-fa-api","Icon name or id")},"search",Craft.t("redactor-fa-api","Search")),_defineProperty(e,"loading",Craft.t("redactor-fa-api","Loading...")),_defineProperty(e,"apiError",Craft.t("redactor-fa-api","Couldn't fetch icons from the api")),e)},modals:{fontawesome:'<div class="redactor-fa-modal">            <form action="">                <input name="icon-name" placeholder="## placeholder ##" autocomplete="off">            </form>            <div class="result-list-wrapper">                <div class="loading">## loading ##</div>                <div class="errors"></div>                <div class="result-list"></div>            </div>            </div>'},init:function(e){this.app=e,this.opts=e.opts,this.lang=e.lang,this.toolbar=e.toolbar,this.insertion=e.insertion,e.opts.redactorFaApi.preventReplaceI&&delete e.opts.replaceTags.i,"path"==this.opts.redactorFaApi.mode?this._initPath():this._initKit()},_initPath:function(){this._initVersion(this.opts.redactorFaApi.version),this.graphQl=new FaGraphQl(this.opts.redactorFaApi.version,this.opts.redactorFaApi.license)},_initKit:function(){this._initVersion(window.FontAwesomeKitConfig.version),this.graphQl=new FaGraphQl(window.FontAwesomeKitConfig.version,window.FontAwesomeKitConfig.license)},_initVersion:function(e){e=e.split(".");this.majorVersion=parseInt(e[0])},onmodal:{fontawesome:{opened:function(e,t){var i=this;this.modal=e,(this.form=t).getField("icon-name").focus(),t.getField("icon-name").on("click",function(e){e.stopPropagation()}),t.getField("icon-name").on("focus",function(e){e.target.value&&(i._initSearch(),i._search())}),t.getField("icon-name").on("keyup",function(e){clearTimeout(i.keyupTimeout),e.target.value?(i._initSearch(),i.keyupTimeout=setTimeout(function(){i._search()},300)):i._closeList()}),t.on("submit",function(e){e.preventDefault()}),document.addEventListener("click",function(){i._closeList()})}}},start:function(){var e={title:this.lang.get("title"),api:"plugin.fontawesome.open"};this.toolbar.addButton("title",e).setIcon('<i class="'.concat(5==parseInt(this.opts.redactorFaApi.version)?"fab":"fa-solid",' fa-font-awesome"></i>'))},open:function(){var e={title:this.lang.get("myplugin"),width:"600px",name:"fontawesome",handle:"fontawesome"};this.app.api("module.modal.build",e)},_search:function(){var e,t,i,n=this,o=this.form.getField("icon-name").val();o&&(e=this.modal.nodes[0].querySelector(".errors"),t=this.modal.nodes[0].querySelector(".loading"),i=this.modal.nodes[0].querySelector(".result-list"),this.graphQl.search(o).then(function(e){n._buildResults(e,i),t.style.display="none"},function(){t.style.display="none",n._showError(e)}))},_showError:function(e){e.style.display="block",e.innerHTML=this.lang.get("apiError")},_buildResults:function(e,n){var o=this;e.forEach(function(i){i.styles.forEach(function(e){var t=o._faClass(e,i),e=document.createElement("div");e.classList.add("icon"),e.innerHTML='<i class="'+t+'"></i><label><span>'+i.label+"</span><code>"+t+"</code></label>",n.append(e),e.addEventListener("click",function(){o._insert(t)})})})},_faClass:function(e,t){return 5==this.majorVersion?this.styleToPrefixV5[e]+" fa-"+t.id:"fa-"+e+" fa-"+t.id},_initSearch:function(){this.modal.nodes[0].querySelector(".loading").style.display="block",this.modal.nodes[0].querySelector(".errors").style.display="none",this.modal.nodes[0].querySelector(".result-list").innerHTML="",this.modal.nodes[0].querySelector(".result-list-wrapper").style.display="block"},_closeList:function(){this.modal.nodes[0].querySelector(".result-list-wrapper").style.display="none"},_insert:function(e){this._closeList(),this.app.api("module.modal.close");var e=e.split(" "),t=$R.dom("<span>"),i=document.createElement("i");e.forEach(function(e){i.classList.add(e)}),t.add(i),this.insertion.insertNode(t,"after")}})}();