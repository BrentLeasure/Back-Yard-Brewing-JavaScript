"use strict";var xhr=new XMLHttpRequest,getRequest=function(e,t){var n=arguments.length<=2||void 0===arguments[2]?void 0:arguments[2];void 0!=t?xhr.open("GET",e+t):xhr.open("GET",e),xhr.send(null),xhr.onload=function(){return 200==xhr.status?n(200,JSON.parse(xhr.responseText)):n(400,JSON.parse(xhr.responseText))}},postRequest=function(e,t,n){var o=arguments.length<=3||void 0===arguments[3]?void 0:arguments[3];t=JSON.stringify(t),xhr.open("POST",e),xhr.setRequestHeader("Content-Type",n),xhr.send(t),xhr.onload=function(){if(200==xhr.status)return o(200,xhr);var e=JSON.parse(xhr.responseText);return o(400,e)}},map,initMap=function(){map=new google.maps.Map(document.getElementById("festivals"),{center:{lat:-34.397,lng:150.644},zoom:8})},login=function e(){var e={email:null,password:null};e.email=document.getElementById("email").value,e.password=document.getElementById("password").value,postRequest("/auth/login",e,"application/json",function(e,t){200==e&&(t=JSON.parse(t.responseText),window.open("/user/"+t.username,"_parent"))})};document.getElementById("navigation-bar").innerHTML="<ul><li><button onclick='home();' id='home-link'>Home</button></li><li><a id='recipes-link' href='/recipes'>Recipes</a></li><li><a id='festivals-link' href='/festivals'>Festivals</a></li><li><button onclick='logout();' id='logout'>Home</button></li></ul>";var home=function(){getRequest("/api/me",void 0,function(e,t){200==e?(window.open("/user/"+t.username,"_parent"),document.getElementById("logout").style.display="block"):window.open("/","_parent")})},logout=function(){getRequest("/auth/logout",void 0,function(e,t){200==e&&(document.getElementById("logout").style.display="none",window.open("/","_parent"))})};document.addEventListener("DOMContentLoaded",function(e){getRequest("/recipes/getallbeertypes",void 0,function(e,t){if(200===e){var n=document.getElementById("beer-type-selection"),o=document.createElement("option");o.innerHTML="-- Select One --",o.value=null,n.appendChild(o);for(var l=0;l<t.length;l++){var s=document.createElement("option");s.innerHTML=t[l].alias,s.value=t[l].alias,n.appendChild(s)}}})});var submitRecipe=function(){var e={alias:null,description:null,category:null,instructions:null};e.alias=document.getElementById("alias").value,e.description=document.getElementById("description").value,e.category=document.getElementById("beer-type-selection").value,e.instructions=document.getElementById("instructions").value,postRequest("/createrecipe",e,"application/json",function(e,t){400===e?(document.getElementsByClassName("message")[0].style.color="red",document.getElementsByClassName("message")[0].innerHTML=t.message):(document.getElementsByClassName("message")[0].style.color="green",document.getElementsByClassName("message")[0].innerHTML="success!")})},beerList=[],search="",ready=function(){getRequest("getallbeertypes",void 0,function(e,t){if(200==e){beerList=t;for(var n=document.getElementById("beers"),o=document.createDocumentFragment(),l=0;l<t.length;l++){var s=document.createElement("li"),i=document.createElement("BUTTON");s.textContent=t[l].alias,i.appendChild(s),i.setAttribute("value",l),i.setAttribute("name",t[l].alias),i.setAttribute("onclick","moreInfo(this.getAttribute('value'))"),i.className="beer-buttons",o.appendChild(i)}n.appendChild(o)}else console.log(t.message)})},moreInfo=function(e){console.log(e),getRequest("/beer/",beerList[e].alias,function(t,n){if(200==t){document.getElementById("user-recipes").innerHTML="";var o=document.getElementById("user-recipes"),l=document.createDocumentFragment(),s=n;document.getElementById("title").textContent=beerList[e].alias,document.getElementById("about").textContent=beerList[e].about,document.getElementById("abv").textContent=beerList[e].abv;for(var i=0;i<s.length;i++){var a=document.createElement("button"),r=document.createElement("li");r.textContent=s[i].alias,a.appendChild(r),a.className="recipe-buttons",l.appendChild(a)}o.appendChild(l),document.getElementById("beer-list").style.display="none",document.getElementById("recipes").style.display="block"}})},closeBeerWindow=function(){document.getElementById("beer-list").style.display="inline-block",document.getElementById("recipes").style.display="none"},searchBeerList=function(e){if(""!=e)for(var t=0;t<beerList.length;t++){var n=beerList[t].alias.toLowerCase(),o=e.toLowerCase();n.includes(o)?"none"==document.getElementById("beers").children[t].style.display&&(document.getElementById("beers").children[t].style.display="inline-block"):document.getElementById("beers").children[t].style.display="none"}else if(""==e)for(var l=0;l<beerList.length;l++)document.getElementById("beers").children[l].style.display="inline-block"},user={};document.addEventListener("DOMContentLoaded",function(e){getRequest("/api/me",void 0,function(e,t){200===e&&(user=t,document.getElementById("username").innerHTML="Welcome back, "+user.username)})});