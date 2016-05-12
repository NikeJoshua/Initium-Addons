// ==UserScript==
// @author NJ
// @description Will copy the ItemId to the clipboard when right clicking on an item.
// @grant none
// @name Initium ItemId Copy
// @namespace NJ-IIC
// @include *playinitium.com/*
// @version 1.0
// ==/UserScript==

var p=false;
document.addEventListener('mouseup',function(e){
	p=false;
	if((e.which&&e.which!=3)||(e.button&&e.button!=2))return true;
	var t=e.target;
	while(t&&t.hasAttribute&&!t.hasAttribute('rel'))
		t=t.parentNode;
	if(t&&t.hasAttribute){
		var r=t.getAttribute('rel');
		console.log(r);
		r=r.split('?itemId=');
		if(typeof r[1]=='undefined')return true;
		var i=document.getElementById('njCopy');
		if(i==null){
			i=document.createElement('input');
			i.id='njCopy';
			i.setAttribute('style','left:50%;margin-left:-100px;position:fixed;top:48%;width:200px;z-index:-10000000;');
			document.body.appendChild(i);
		}
		i.value='Item('+r[1]+')';
		i.select();
		var c=false;
		if(document.execCommand)c=document.execCommand('copy');
		if(!c){
			prompt('Your browser doesn\'t seem to support direct copying to clipboard.\nPlease press Ctrl+C to copy and then close this popup.',i.value);
		}
		document.body.removeChild(i);
		if(e.preventDefault)e.preventDefault();
		if(e.stopPropagation)e.stopPropagation();
		p=e.target;
		return false;
	}
},true);
document.addEventListener('contextmenu',function(e){
	if(p&&p==e.target){
		if(e.preventDefault)e.preventDefault();
		if(e.stopPropagation)e.stopPropagation();
		p=false;
		return false;
	}
	p=false;
},true);