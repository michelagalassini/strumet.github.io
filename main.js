
main = document.getElementsByTagName("main");

header = document.createElement("header");
header.innerHTML = "<h3><em>-- insert header here --</em></h3>";

footer = document.createElement("footer");
footer.innerHTML = "<h3><em>-- insert footer here --</em></h3>";

document.body.insertBefore(header, main[0]);
document.body.appendChild(footer);

