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

var range_4 = [1, 2, 3, 4];

var prj_group = {
	'Monterrey Duplex': {'label': 'MO-D'},
	'Monterrey Simplex': {'label': 'MO-S'},
	'Quinta Monroy Duplex': {'label': 'QM-D'},
	'Quinta Monroy Simplex': {'label': 'QM-S'},
	'Villa Verde Duplex': {'label': 'VV-D'}
};

for (g in prj_group) {
	prj_group[g].groups = range_4.map(function (x) {
		return prj_group[g].label + '_' + x;
	});
}

var title = '<h1>designing increments</h1>' +
	'<p class="subheading">20 interior design proposals for incremental houses<br>' + 
	'<em>(a course assignment)</em></p>';

var ul_first_li_top = '<li id="li_top_home" class="top">' +
		'<a href="#" class="top_link"><span>Home</span></a></li>';

var ul_last_li_top = '<li id="li_top_about" class="top">' +
		'<a href="#" class="top_link"><span>About</span></a></li>';


var li_fly = function (x) {
	return prj_group[x].groups.map(function (y) {
		return '<li><a href="' + root_folder + 'projects/' + y +
			'/index.html" class="fly">' + y + '</a></li>';
	}).join('');
};

var li_top = ul_first_li_top +
	Object.keys(prj_group).map(function (x) {
	return '<li id="li_top_' + prj_group[x].label + '" class="top">' +
		'<a href="#" class="top_link"><span>' + x + '</span></a>' +
		'<ul id="ul_sub_' + prj_group[x].label + '" class="sub">' +
		li_fly(x) + '</ul></li>';
}).join('') + ul_last_li_top;


var nav = document.createElement("nav");
var ul__nav = document.createElement("ul");
ul__nav.id = 'nav';

var header = document.createElement("header");
header.id = "strumet_header";
var footer = document.createElement("footer");
footer.id = "strumet_footer";
footer.innerHTML = "<h3><em>-- footer will be here --</em></h3>";

var link_style = document.createElement("link");
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
	for (key in prj_group) {
		ulId = 'ul_sub_' + prj_group[key].label;
		liId = 'li_top_' + prj_group[key].label;
		ul = document.getElementById(ulId);
		li = document.getElementById(liId);
		ul.style = "width: " + li.offsetWidth + "px;" +
			"top: " + li.offsetHeight + "px";
	}
}

window.onload = set_menu_position;

var thumbs = Object.keys(prj_group).map(function (x) {
	return '<ul class="ul_tmb">' + prj_group[x].groups.map(function (y) {
		return '<li class="li_tmb">' +
			'<figure class="fig_tmb" id="fig_tmb_' + y +
			'" style="background-image: url(\'img/' + y + '.jpg\')">' +
				'<a class="a_tmb" href="' + root_folder + 'projects/' +
		   			y + '/index.html"><div class="div_tmb"></div>' +
					'<figcaption id="cpt_tmb_' + y + '">' + y + '</figcaption>' +
			'</a></figure></li>';
	}).join('') + '</ul>';
}).join('');

function fix_caption() {
	for (i in prj_group) {
		for (j=0; j<prj_group[i].groups.length; j++) {
			cpt = document.getElementById('cpt_tmb_' + prj_group[i].groups[j]);
			cpt.style.bottom = cpt.offsetHeight + 'px';
		}
	}
}
