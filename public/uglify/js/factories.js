"use strict";function GetRequest(e,t){var n=arguments.length<=2||void 0===arguments[2]?void 0:arguments[2],o=new XMLHttpRequest;void 0!=t?o.open("GET",e+t):o.open("GET",e),o.send(null),o.onload=function(){return n(o.status,o.responseText)}}function PostRequest(e,t,n){var o=arguments.length<=3||void 0===arguments[3]?void 0:arguments[3],i=new XMLHttpRequest;t=JSON.stringify(t),i.open("POST",e),i.setRequestHeader("Content-Type",n),i.send(t),i.onload=function(){return o(i.status,i.responseText)}}function GetCookie(e){for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var i=n[o];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(t))return i.substring(t.length,i.length)}return""}function DeleteCookies(){for(var e="expires=Thu, 01 Jan 1970 00:00:00 GMT;",t=document.cookie.split(";"),n=0;n<t.length;n++){var o=t[n].split("=")[0];document.cookie=o+"=;"+e}}function IsLoggedIn(){GetRequest("/api/me",void 0,function(e,t){200==e?document.getElementById("logout-button").style.display="inline-block":document.getElementById("logout-button").style.display="none"})}function FileReadImage(e,t){var n,o=new FileReader;o.onload=function(){n=this.result.replace(/^data:image\/(png|jpg|jpeg);base64,/,""),t(JSON.stringify(n))},o.readAsDataURL(e)}