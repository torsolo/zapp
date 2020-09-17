

function trova(cosa) {
    var edizione = document.getElementById("edizione").value;
    var libro = document.getElementById("libro").value;
    var sigla = document.getElementById("sigla").innerHTML;
    if (cosa)
        libro = cosa;
    if (libro !== sigla)
        window.location.href = "XBIBBIA_LIBRO_" + libro + ".html";
    var c = document.getElementById("capitolo").value;
    var cerca = "C" + c;
    var v = document.getElementById("verso").value;
    if (v !== "")
        cerca = cerca + " V" + v;
    edizione = document.getElementsByClassName(edizione);
    libro = edizione[0].getElementsByClassName(libro);
    var a = libro[0].getElementsByClassName(cerca);
    var el = document.getElementById("leggo");
    while (el.firstChild)
        el.removeChild(el.firstChild);
    var ol = document.createElement("ol");
    var p;
    var n;
    var i;
    for (i = 0; i < a.length; i++) {
        p = document.createElement("li");
        p.className = a[i].className;
        p.ondblclick = studio;
        p.onclick = colora;
        p.append(" " + a[i].innerHTML);
        ol.append(p);
    }
    el.append(ol);
}

function colora() {
    document.getElementById("studio").style.display = "none";
    this.style.color = "yellow";
}

function nostudio() {
    document.getElementById("studio").style.display = "none";
}

function next() {
    var c = parseInt(document.getElementById("capitolo").value);
    c++;
    document.getElementById("capitolo").value = c;
    trova();
}

function books() {
    window.location.href="../XBIBBIA.html";
}

var studio = function () {
    var studio = document.getElementById("studio");
    while (studio.firstChild)
        studio.removeChild(studio.firstChild);
    var cerca = this.className;
    var libro = document.getElementById("libro").value;
    var e;
    var l;
    var i;
    var p;
    var n;
	var h;
    var edizioni = document.getElementsByClassName("edizione");
    for (e = 0; e < edizioni.length; e++) {
        var libri = edizioni[e].getElementsByClassName(libro);
        var a = libri[0].getElementsByClassName(cerca);
        p = document.createElement("p");
        p.append(edizioni[e].className + " " + libri[0].className + " " + this.className);
        studio.append(p);
        for (i = 0; i < a.length; i++) {
            h = document.createElement("hr");
			p = document.createElement("p");
            p.className = a[i].className + " abcd";
            p.append(" " + a[i].innerHTML);
            studio.append(p);
			studio.append(h);
        }
    }
    var t = (window.scrollY + 48) + "px";
    document.getElementById("studio").style.top = t;
    document.getElementById("studio").style.display = "block";
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.getElementById("libro").value = document.getElementById("sigla").innerHTML;
		trova();
		var w = screen.width;
		if (w>600) document.getElementById("content").style.width = "430px";
    }
}
