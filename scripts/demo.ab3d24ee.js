function escapeHtml(a){return String(a).replace(/[&<>"'\/]/g,function(a){return entityMap[a]})}function trimIndent(a){for(var b=a.split("\n"),c=0,d=b.length-1;null==nonSpace.exec(b[c])&&c<b.length;)c+=1;for(;null==nonSpace.exec(b[d])&&d>=c;)d-=1;for(var e=nonSpace.exec(b[c]).index,f="",g=c;g<=d;g++)f=f+b[g].slice(e-1)+(g<d?"\n":"");return f.replaceAll("\t","&nbsp;&nbsp;")}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},nonSpace=/\S/;String.prototype.replaceAll=function(a,b){var c=this;return c.replace(new RegExp(a,"g"),b)};var demo=angular.module("demo",["ui.router","ui.bootstrap","demo.utils.strings","hl.css.ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("root",{"abstract":!0,url:"",views:{"@":{templateUrl:"views/layout.html",controller:"RootController"},"header@root":{templateUrl:"views/header.html"},"footer@root":{templateUrl:"views/footer.html"}}}).state("root.home",{url:"/",views:{"content@root":{templateUrl:"views/getting-started.html"}}}).state("root.api",{"abstract":!0,url:"/api",views:{"content@root":{templateUrl:"views/api/document.html"}}}).state("root.api.directive",{url:"/directive/:name",templateUrl:function(a){return"views/api/directives/"+a.name+".html"}}).state("root.api.service",{url:"/service/:name",templateUrl:function(a){return"views/api/services/"+a.name+".html"}})}]).controller("RootController",["$rootScope","$document",function(a,b){a.$on("$stateChangeSuccess",function(){b[0].body.scrollTop=b[0].documentElement.scrollTop=0})}]).filter("firstToUpperCase",["s",function(a){return function(b){return a.firstToUpperCase(b)}}]).factory("$savedContent",function(){return{}}).directive("saveContent",["$savedContent",function(a){return{restrict:"A",compile:function(b,c){a[c.saveContent]=b.html()}}}]).directive("applyContent",["$savedContent",function(a){return{restrict:"EAC",compile:function(b,c){var d=b.html();return function(b,c,e){function f(){var b=a[e.applyContent];b||(b=d);var f=e.highlightLang;"html"==f&&(b=escapeHtml(b)),b=trimIndent(b);var g=prettyPrintOne(b,f);c.html(g)}angular.isDefined(e.contentWatch)?b.$watch(f):f()}}}}]).directive("scrollTo",["$log","offset",function(a,b){return{restrict:"A",priority:100,link:function(c,d,e){angular.isDefined(e.scrollTo)||""===e.scrollTo||a.error('Directive "scroll-to" must have a value. E.g.: scroll-to="element-id"');var f=null;$(d).mousedown(function(){c.$apply(function(){f||(f=document.getElementById(e.scrollTo),null===f&&a.warn('Element with id "'+e.scrollTo+'" does not exist')),b.scrollToElement(f)})}),c.$on("$destroy",function(){f=null})}}}]);angular.module("demo.utils.strings",[]).factory("s",function(){var a={};return a.textFromHtml=function(a){return a?String(a).replace(/<[^>]+>/gm,""):""},a.firstToUpperCase=function(a){var b=a.trim();return b.substr(0,1).toUpperCase()+b.substr(1)},a.firstToLowerCase=function(a){var b=a.trim();return b.substr(0,1).toLowerCase()+b.substr(1)},a.camelCase=function(a){return a.toLowerCase().replace(/-(.)/g,function(a,b){return b.toUpperCase()})},a}),angular.module("demo").config(["$stateProvider",function(a){a.state("root.demo",{url:"/demo",views:{"content@root":{templateUrl:"views/demo/demo.html",controller:"DemoCtrl"}},data:{css:{root:"/styles/demo/core.css"}}}).state("root.demo.home",{url:"/home",templateUrl:"views/demo/pages/home.html",data:{css:"/styles/demo/pages/home.css"}}).state("root.demo.about",{"abstract":!0,url:"/about",templateUrl:"views/demo/pages/about.html",data:{css:{about:"/styles/demo/pages/about.css"}}}).state("root.demo.about.me",{url:"/me",templateUrl:"views/demo/pages/about-me.html",data:{css:["/styles/demo/pages/about-me.css"]}}).state("root.demo.about.the-project",{url:"/the-project",templateUrl:"views/demo/pages/about-the-project.html",data:{css:{about:null,aboutTheProject:"/styles/demo/pages/about-the-project.css"}}}).state("root.demo.contact",{url:"/contact",templateUrl:"views/demo/pages/contact.html",data:{css:["/styles/demo/pages/contact.css"]}}).state("root.demo.contact.employee",{url:"?employee",templateUrl:"views/demo/pages/contact-employee.html",controller:["$scope","$transition$",function(a,b){var c=b.params();a.employee={name:c.employee}}],data:{css:{employeeCore:"/styles/demo/employees/core.css",employee:["$transition$",function(a){return"/styles/demo/employees/"+a.params().employee+".css"}]}}})}]).controller("DemoCtrl",["$rootScope","$scope","hlUiRouterCss","$state",function(a,b,c,d){function e(){g&&g()}function f(){e(),b.theme.path="/styles/demo/themes/"+b.theme.model+".css",g=c.injectStyleDefinitions(b.theme.path)}b.definitions=[],a.$on("uiRouterCss.loadingStarted",function(a,c){b.definitions=c}),"root.demo"===d.$current.name&&d.go("root.demo.home"),b.theme={model:"light"};var g;b.themeChange=function(){f()},f(),b.$on("$destroy",function(){e()})}]),function(a,b){"use strict";function c(a){throw Error('Error "angular-ui-router-css": '+a)}function d(a){return Number(a)===a&&a%1===0}function e(){return"@resource~"+t++}function f(b){return a.isFunction(b)||a.isArray(b)&&a.isFunction(b[b.length-1])}function g(b,g){return f(b)||(!a.isString(b)&&b||(b={url:b}),a.isUndefined(b.url)&&c("The definition needs to contain a URL: "+JSON.stringify(b)),b.id&&(g=b.id),d(g)&&(g=e()),b.id=g),b}function h(b){if(f(b))return b;a.isString(b)&&(b=[b]);var c={};return a.forEach(b,function(a,b){var d=g(a,b);c[d.id]=d}),c}function i(a,c){var d=m.defer();return a.element=b.loadStylesheet(a.url,function(){d.resolve()},c),d.promise}function j(b){function c(a){return n.invoke(a,null,k)}u=u.concat(v),v=[],p=null;var d=b.to(),e=[];if(d.data&&d.data.css)for(var j=d.data;null!==j;)e.unshift(j.css),j=Object.getPrototypeOf(j);var k={$transition$:b},t={};a.forEach(e,function(b){f(b)&&(b=h(c(b))),a.extend(t,b)}),t=a.copy(t);var w=[];return a.forEach(t,function(a){if(f(a)&&(a=g(c(a))),a.url){var b=i(a,{insertBefore:o});a.element.disabled=!0,a.promise=b,p||(p=a),w.push(b),v.push(a)}}),l.$broadcast(q+"."+r,v),m.all(w).then(function(){l.$broadcast(q+"."+s)})}function k(){a.forEach(v,function(a){a.element.disabled=!1});for(var b;b=u.pop();)b.element.remove()}a.isUndefined(b.DEBUG)&&(b.DEBUG=!0);var l,m,n,o,p,q="uiRouterCss",r="loadingStarted",s="loadingFinished",t=1,u=[],v=[];a.module("hl.css.ui.router",["ui.router"]).config(["$stateProvider",function(a){a.decorator("data",function(a,b){var c=b(a);return c&&c.css&&(c.css=h(c.css)),c})}]).run(["$rootScope","$state","$transitions","$timeout","$q","$injector",function(a,b,c,d,e,f){l=a,m=e,n=f,c.onBefore({},function(a){a.addResolvable({token:"@css",resolveFn:function(){return j(a)}})}),c.onSuccess({},function(){k()})}]).directive("uiCss",function(){return{restrict:"A",link:function(a,b,c){o=b[0]}}}).service("hlUiRouterCss",["$timeout",function(b){this.injectStyleDefinitions=function(c){return c=h(c),b(function(){a.forEach(c,function(a){i(a,{insertBefore:p?p.element:o})})}),function(){a.forEach(c,function(a){a.element.remove()})}}}])}(angular,window);