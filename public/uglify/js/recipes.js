"use strict";function RecipesLoad(){GetRequest("/getallbeertypes",void 0,function(e,t){if(200==e){beerList=JSON.parse(t);for(var n=document.getElementById("beers"),l=document.createDocumentFragment(),s=0;s<beerList.length;s++){var i=document.createElement("li"),o=document.createElement("BUTTON");i.textContent=beerList[s].alias,o.appendChild(i),o.setAttribute("value",s),o.setAttribute("name",beerList[s].alias),o.setAttribute("onclick","MoreInfo( this.getAttribute( 'value' ) )"),o.className="beer-buttons",l.appendChild(o)}n.appendChild(l)}else console.log(beerList.message)})}function MoreInfo(e){GetRequest("/beer/",beerList[e].alias,function(t,n){if(200==t){document.getElementById("user-recipes").innerHTML="";var l=document.getElementById("user-recipes"),s=document.createDocumentFragment(),i=JSON.parse(n);console.log(i),document.getElementById("title").textContent=beerList[e].alias,document.getElementById("about").textContent=beerList[e].about,document.getElementById("abv").textContent=beerList[e].abv;for(var o=0;o<i.length;o++){var r=document.createElement("button"),d=document.createElement("li");d.textContent=i[o].alias,r.appendChild(d),r.className="recipe-buttons",s.appendChild(r)}l.appendChild(s),document.getElementById("beer-list").style.display="none",document.getElementById("recipes").style.display="block"}})}function CloseBeerWindow(){document.getElementById("beer-list").style.display="inline-block",document.getElementById("recipes").style.display="none"}function SearchBeerList(e){if(""!=e)for(var t=0;t<beerList.length;t++){var n=beerList[t].alias.toLowerCase(),l=e.toLowerCase();n.includes(l)?"none"==document.getElementById("beers").children[t].style.display&&(document.getElementById("beers").children[t].style.display="inline-block"):document.getElementById("beers").children[t].style.display="none"}else if(""==e)for(var s=0;s<beerList.length;s++)document.getElementById("beers").children[s].style.display="inline-block"}var beerList=[],search="";window.onload=function(){RecipesLoad(),IsLoggedIn()};