var segnalibro = "C1 V1";

var trova = function () {
    var edizione = "CEI2008";
    var libro = document.getElementById("libro").value;
    var sigla = document.getElementById("sigla").innerHTML;
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
        p.ondblclick = studioverso;
        p.onclick = colora;
        p.append(" " + a[i].innerHTML);
        ol.append(p);
    }
    el.append(ol);
    var verso = document.getElementsByClassName(segnalibro)[0];
    el.scrollTop = verso.offsetTop - 54;
}

function colora() {
    var c = this.style.color;
    if (c)
        this.style.color = "";
    else
        this.style.color = "yellow";
}

function next() {
    var c = parseInt(document.getElementById("capitolo").value);
    c++;
    document.getElementById("capitolo").value = c;
    trova();
}

function books() {
    window.location.href = "../XBIBBIA.html";
}

function studionext() {
    var a = this.className.split(" ");
	var prima = a[1];
	var dopo = prima.replace("V","");
	var n = parseInt(dopo)+1;
	dopo = "V"+n;
	segnalibro = a[0]+" "+dopo;
	studiouno(segnalibro);
}

function studioverso() {
	segnalibro = this.className;
    studiouno(segnalibro);
}

var studiouno = function (segnalibro) {
    var leggo = document.getElementById("leggo");
    var libro = document.getElementById("libro").value;
    var e;
    var l;
    var i;
    var p;
    var n;
    var h;
    var edizioni = document.getElementsByClassName("edizione");
    while (leggo.firstChild)
        leggo.removeChild(leggo.firstChild);
	p = document.createElement("p");
	p.append(">>>");
	p.className = segnalibro;
	p.onclick = studionext;
	leggo.append(p);
    for (e = 0; e < edizioni.length; e++) {
        var libri = edizioni[e].getElementsByClassName(libro);
        var a = libri[0].getElementsByClassName(segnalibro);
		if (a.length==0) continue;
        p = document.createElement("p");
        p.append(edizioni[e].className + " " + libri[0].className + " " + segnalibro);
        p.ondblclick = trova;
        leggo.append(p);
        for (i = 0; i < a.length; i++) {
            h = document.createElement("hr");
            p = document.createElement("p");
            p.className = a[i].className + " abcd";
            p.append(" " + a[i].innerHTML);
            leggo.append(p);
            leggo.append(h);
        }
    }
	p = document.createElement("p");
	p.append(">>>");
	p.className = segnalibro;
	p.onclick = studionext;
	leggo.append(p);
    leggo.scrollTop = 0;
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.getElementById("libro").value = document.getElementById("sigla").innerHTML;
        trova();
    }
}
