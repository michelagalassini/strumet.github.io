/*\
|*|
|*|  IE-specific polyfill that enables the passage of arbitrary arguments to the
|*|  callback functions of javascript timers (HTML5 standard syntax).
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/window.setInterval
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  Syntax:
|*|  var timeoutID = window.setTimeout(func, delay[, param1, param2, ...]);
|*|  var timeoutID = window.setTimeout(code, delay);
|*|  var intervalID = window.setInterval(func, delay[, param1, param2, ...]);
|*|  var intervalID = window.setInterval(code, delay);
|*|
\*/

if (document.all && !window.setTimeout.isPolyfill) {
  var __nativeST__ = window.setTimeout;
  window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
    var aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeST__(vCallback instanceof Function ? function () {
      vCallback.apply(null, aArgs);
    } : vCallback, nDelay);
  };
  window.setTimeout.isPolyfill = true;
}

if (document.all && !window.setInterval.isPolyfill) {
  var __nativeSI__ = window.setInterval;
  window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
    var aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeSI__(vCallback instanceof Function ? function () {
      vCallback.apply(null, aArgs);
    } : vCallback, nDelay);
  };
  window.setInterval.isPolyfill = true;
}
////////////////////////////////////////////////////////////////


function readTextFile(file){
	var text = '1'
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
				text = allText;
            }
        }
    }
    rawFile.send(null);
	return text
}


var href = window.location.href;
var root_end = 'strumet.github.io/'.length;
var root_start = href.indexOf('strumet.github.io/');
var root_folder = href.substring(0, root_start + root_end);
var css = root_folder + "style.css";

menu = {'Home':'',
	'Monterrey Duplex': 'MO-D',
	'Monterrey Simplex': 'MO-S',
	'Quinta Monroy Duplex': 'QM-D',
	'Quinta Monroy Simplex': 'QM-S',
	'Villa Verde Duplex': 'VV-D',
	'About':''
};
range_4 = [1, 2, 3, 4];


title = '<h1>designing increments</h1>' +
	'<p class="subheading">20 interior design proposals ' +
	'for incremental houses<br>' + 
	'<em>(an course assignment)</em></p>';

li_fly = function (x) {
	return x == '' ? '' : range_4.map(function (y) {
		return '<li><a href="' + root_folder + 'projects/' + x + '_' + y +
			'/index.html" class="fly">' +
			x + '_' + y + '</a></li>';
	}).join('');
};

li_top = Object.keys(menu).map(function (x) {
	return '<li id="li_top_' + menu[x] + '" class="top">' +
		'<a href="#" class="top_link">' +
		'<span>' + x + '</span></a>' +
		'<ul id="ul_sub_' + menu[x] + '" class="sub">' +
		li_fly(menu[x]) + '</ul></li>';
}).join('');


nav = document.createElement("nav");
ul__nav = document.createElement("ul");
ul__nav.id = 'nav';

header = document.createElement("header");
header.id = "strumet_header";
footer = document.createElement("footer");
footer.id = "strumet_footer";
footer.innerHTML = "<h3><em>-- footer will be here --</em></h3>";

link_style = document.createElement("link");
link_style.rel = 'stylesheet';
link_style.href = css;

ul__nav.innerHTML = li_top;
header.innerHTML = title;
nav.appendChild(ul__nav);
header.appendChild(nav);

document.head.appendChild(link_style);
document.body.insertBefore(header, document.body.firstChild);
document.body.appendChild(footer);


function set_menu_position() {
	for (key in menu) {
		if (menu[key] != ''){
			ulId = 'ul_sub_' + menu[key];
			liId = 'li_top_' + menu[key];
			ul = document.getElementById(ulId);
			li = document.getElementById(liId);
			ul.style = "width: " + li.offsetWidth + "px;" +
				"top: " + li.offsetHeight + "px";
		}
	}
}

window.onload = set_menu_position;

img_url = function(x,y) {
	var url = 'img/' + menu[x] + '_' + y +'.jpg';
	return url;
}

var interv; 
var start_size = 200;
var max_size = 224;
//TODO: create an array of temp_size (maybe an object useful also for menu obj) for each fig
//fix independent interv and collect object (menu, project, prj)
var temp_size = start_size;

project = Object.keys(menu).map(function (x) {
	return menu[x] == '' ? '' : range_4.map(function (y) {
		return menu[x] + '_' + y;
	});
}).filter(function(z){
	return z != '';
});

var prj = {};

//for (i=0; i<project.length; i++) {
//	for (j=0; j<project[i].length; j++) {
//		prj[project[i][j]] = [200,''];
//	}
//}


thumbs = Object.keys(menu).map(function (x) {
	return menu[x] == '' ? '' : '<ul class="ul_tmb">' + range_4.map(function (y) {
		return '<li class="li_tmb">' +
			'<figure class="fig_tmb" id="fig_tmb_' + menu[x] + '_' + y +
			'" style="background-image: url(\'' + img_url(x,y) + '\')">' +
				'<a class="a_tmb" href="' + root_folder + 'projects/' +
		   			menu[x] + '_' + y + '/index.html">' +
					'<div class="div_tmb"></div>' +
					'<figcaption id="cpt_tmb_' + menu[x] + '_' + y + '">' +
					menu[x] + '_' + y + '</figcaption>' +
			'</a></figure></li>';
	}).join('') + '</ul>';
}).join('');

function fix_caption() {
	for (i=0; i<project.length; i++){
		for (j=0; j<project[i].length; j++){
			cpt = document.getElementById('cpt_tmb_' + project[i][j]);
			cpt.style.bottom = cpt.offsetHeight + 'px';
		}
	}
}
