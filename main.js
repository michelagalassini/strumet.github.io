
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
var css = "https://strumet.github.io/style.css";

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

nav = document.createElement("nav");
ul__nav = document.createElement("ul");
ul__nav.id = 'nav';

li_fly = function (x) {
	return x == '' ? '' : range_4.map(function (y) {
		return '<li><a href="projects/' + x + '_' + y +
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


header = document.createElement("header");
header.id = "strumet_header";
footer = document.createElement("footer");
footer.innerHTML = "<h3><em>-- footer will be here --</em></h3>";

ul__nav.innerHTML = li_top;
nav.innerHTML = title;
nav.appendChild(ul__nav);
header.appendChild(nav);



link_style = document.createElement("link");
link_style.rel = 'stylesheet';
link_style.href = css;
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
