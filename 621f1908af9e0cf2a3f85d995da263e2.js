require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({5:[function(require,module,exports) {
"use strict";var e;exports.__esModule=!0,function(e){e.UpdateScale="UPDATE_SCALE",e.UpdateDesktopBaseSize="UPDATE_DESKTOP_BASE_SIZE",e.UpdateMobileBaseSize="UPDATE_MOBILE_BASE_SIZE",e.UpdateDisplay="UPDATE_DISPLAY",e.UpdateRatio="UPDATE_RATIO"}(e||(e={})),exports.Msg=e;
},{}],9:[function(require,module,exports) {
"use strict";function x(x){return Math.round(100*x)/100}function e(e,l){var t=e,r=x(t/l),n=x(r/l),s=x(n/l),o=x(t*l),a=x(o*l);return{xxs:s,xs:n,sm:r,md:t,lg:o,xl:a,xxl:x(a*l)}}function l(e,l){var t=e/e,r=x(t/l),n=x(r/l),s=x(n/l),o=x(t*l),a=x(o*l);return{xxs:s,xs:n,sm:r,md:t,lg:o,xl:a,xxl:x(a*l)}}function t(x,e){var l=x*e,t=x-l,r=t-l,n=x+l,s=n+l;return{xxs:r-l,xs:r,sm:t,md:x,lg:n,xl:s,xxl:s+l}}function r(x,e){var l=x/x,t=l-e,r=t-e,n=l+e,s=n+e;return{xxs:r-e,xs:r,sm:t,md:l,lg:n,xl:s,xxl:s+e}}exports.__esModule=!0,exports.exponentialScaleAbsolute=e,exports.exponentialScaleRelative=l,exports.linearScaleAbsolute=t,exports.linearScaleRelative=r;
},{}],6:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./types"),a=require("./scale");function o(t,s){var l=window.Model.domElements;switch(t){case"UPDATE_RATIO":window.Model.ratio=s.ratio,o(e.Msg.UpdateScale);break;case"UPDATE_SCALE":var i=window.Model.desktopFontSize,r=window.Model.ratio,d=a.exponentialScaleRelative(i,r),n=a.exponentialScaleAbsolute(i,r);window.Model.relativeScale=d,window.Model.absoluteScale=n,Object.keys(d).map(function(e){l.root.style.setProperty("--space-"+e,d[e]+"rem")}),o(e.Msg.UpdateDisplay);break;case"UPDATE_DESKTOP_BASE_SIZE":var c=s.size;l.root.style.setProperty("--desktop-font-size",c+"px"),window.Model.desktopFontSize=c,o(e.Msg.UpdateScale);break;case"UPDATE_MOBILE_BASE_SIZE":break;case"UPDATE_DISPLAY":l.relativeDisplays.map(function(e){var a=e.dataset.scale;e.innerHTML=window.Model.relativeScale[a]+" rem"}),l.absoluteDisplays.map(function(e){var a=e.dataset.scale;e.innerHTML=window.Model.absoluteScale[a]+" px"})}}exports.update=o;
},{"./types":5,"./scale":9}],3:[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./types"),t=require("./update");window.Model={},function(){var a={root:document.documentElement,relativeDisplays:Array.from(document.querySelectorAll('[data-behavior~="get-relative-size"]')),absoluteDisplays:Array.from(document.querySelectorAll('[data-behavior~="get-absolute-size"]')),desktopScale:document.querySelector('[data-behavior~="change-base-desktop"]'),exponentialToggles:Array.from(document.querySelectorAll('[data-behavior~="get-new-scale"]'))},o={domElements:a,mobileFontSize:14,desktopFontSize:18,relativeScale:{xxs:.2,xs:.4,sm:.8,md:1,lg:1.5,xl:2,xxl:4},absoluteScale:{xxs:3,xs:7,sm:14,md:18,lg:27,xl:36,xxl:72},ratio:1.618};window.Model=o,a.exponentialToggles.map(function(a){a.addEventListener("change",function(){var a=parseFloat(this.value);t.update(e.Msg.UpdateRatio,{ratio:a})})}),a.desktopScale.addEventListener("change",function(){var a=parseInt(this.value);t.update(e.Msg.UpdateDesktopBaseSize,{size:a})}),t.update(e.Msg.UpdateDisplay)}();
},{"./types":5,"./update":6}]},{},[3])