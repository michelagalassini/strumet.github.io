
//main = document.getElementsByTagName("main");

header = document.createElement("header");
header.innerHTML = "<h3><em>-- header will be here --</em></h3>";

footer = document.createElement("footer");
footer.innerHTML = "<h3><em>-- footer will be here --</em></h3>";

document.body.insertBefore(header, document.body.firstChild);
document.body.appendChild(footer);

