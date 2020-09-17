zapp = {}
zapp.questapagina = location.href.split("/").slice(-1)[0]; // nome pagina
zapp.nomefont = 0;
zapp.ciclo = []; // lista elementi selezionati
zapp.inid = "0"; // id inserito nella textbox
zapp.vedo = "?"; // div visualizzato
zapp.guida = []; // array elementi di ricerca
zapp.scromem = 0;

zapp.dft = {
	inizio: 0,
	zoompt: 18,
	coloretesto: "#E6C300",
	coloresfondo: "#000000"
}

if (localStorage.getItem("zapp") === null) {
	localStorage.setItem("zapp", JSON.stringify(zapp.dft));
}

prandom = function () {
	zapp.guida = document.getElementById("corpo").querySelectorAll('p');
	var x = Math.floor(Math.random() * zapp.guida.length);
	zapp.guida[x].scrollIntoView();
	window.scrollBy(0, -60);
}

nosup = function () {
	var x = document.getElementsByTagName("sup");
	for (let cell of x) {
		cell.style.display="none";
	}
}

zapp.fisa = function (o) {
	var d = o.innerHTML;
	if (zapp.prima && d != zapp.prima) {
		document.getElementById(zapp.prima).style.display = "none";
	}
	var z = document.getElementById(d);
	zapp.prima = d;
	var v = z.style.display;
	v = (v == "" || v == "none") ? "block" : "none";
	z.style.display = v;
	window.scrollBy(0, 100);
}

// segue ZDWSPR

ktao = function () {
	var h = screen.width+" x "+screen.height;
	document.getElementById("barratesta").innerHTML = h;
}

zapp.suona = function (uno,due) {
	uno = "https://drive.google.com/uc?authuser=0&id="+uno+"&export=download";
	var p = document.getElementById("myplayer");
	p.src = uno;
	if (due) p.loop=true;
	p.load();
	p.play();
}

function spr_zoom() {
	var x = zapp.corpo.style.fontSize.replace(/[^0-9]/g, '');
	x = parseInt(x);
	x = (x < 24) ? (x += 2) : 14;
	zapp.dft.zoompt = x + "pt";
	zapp.corpo.style.fontSize = zapp.dft.zoompt;
	document.getElementById("zoom").innerHTML = zapp.dft.zoompt;
	zoombis(zapp.dft.zoompt);
}

function pills_zoom() {
	var o = document.getElementById("huno");
	var x = o.style.fontSize.replace(/[^0-9]/g, '');
	x = parseInt(x);
	x = (x < 24) ? (x += 2) : 14;
	zapp.dft.zoompt = x + "pt";
	zapp.corpo.style.fontSize = zapp.dft.zoompt;
	document.getElementById("zoom").innerHTML = zapp.dft.zoompt;
	o.style.fontSize = zapp.dft.zoompt;
}

function zoombis(f) {
	f += " ";
	f = f.replace(/[^0-9]/g, '');
	var n = parseInt(f) + 2;
	f = n + "pt";
	var x = document.getElementsByClassName("bottone");
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].style.fontSize = f;
	}
	//document.getElementById("albero").style.fontSize = f;
}

function salva() {
	zapp.tools.style.visibility = "hidden";
	zapp.dft.inizio = Math.round(window.scrollY);
	document.getElementById("pixy").innerHTML = zapp.dft.inizio;
	zapp.dft.zoompt = zapp.corpo.style.fontSize.replace(/[^0-9]/g, '');
	zapp.dft.coloretesto = document.getElementById("cdue").value;
	zapp.dft.coloresfondo = document.getElementById("cuno").value;
	zapp.dft.annota = document.getElementById("note").value;
	localStorage.setItem(zapp.questapagina, JSON.stringify(zapp.dft)); // valori default
}

function perh() { // percentuale del segnalibro
	var h = parseInt(document.body.offsetHeight);
	var t = parseInt(document.body.scrollTop);
	var p = pageYOffset / h * 100;
	document.getElementById("pixh").innerHTML = parseInt(p);
	if (confirm("SALVARE SCROLL ?"))
		salva();
}

function chiudimi() {
	zapp.tools.style.visibility = "hidden";
}

function leggi() {
	zapp.tools.style.visibility = "hidden";
	window.scrollTo(0, zapp.dft.inizio);
}

function tools() {
	document.getElementById("albero").style.visibility = "hidden";
	var s = document.getElementById("barratesta").offsetHeight;
	zapp.tools.style.top = (window.scrollY + s) + "px";
	zapp.tools.style.visibility = "visible";
}

function moff() {
	zapp.tools.style.visibility = "hidden";
	document.getElementById("albero").style.visibility = "hidden";
}

function tree() {
	var t = document.getElementById("albero");
	var s = document.getElementById("barratesta").offsetHeight;
	t.style.top = (window.scrollY + s) + "px";
	t.style.visibility = (t.style.visibility == "visible") ? "hidden" : "visible";
}

function htotree() {
	document.getElementById('albero').innerHTML = "";
	var allElements = zapp.corpo.getElementsByTagName("*");
	var l = allElements.length;
	var a = document.createElement('p');
	var linkText = document.createTextNode("INDEX");
	a.appendChild(linkText);
	a.id = "notree";
	a.setAttribute("onclick", "moff()");
	document.getElementById('albero').appendChild(a);
	var c = ["red","green","yellow","cyan","grey"]
	for (var i = 0; i < l; i++) {
		var child = allElements[i];
		var h = ['H1', 'H2', 'H3', 'H4', 'H5'].indexOf(child.tagName);
		if (h >= 0) {
			var n = parseInt(child.tagName.substr(1, 1));
			var str = new Array(n + 1).join("›");
			a = document.createElement('p');
			linkText = document.createTextNode(str + " " + child.innerHTML);
			allElements[i].id = "h" + child.tagName + i;
			a.appendChild(linkText);
			a.id = child.tagName + i;
			a.setAttribute("onclick", "javascript:jumph(this.id);");
			a.style.color=c[h];
			document.getElementById('albero').appendChild(a);
		}
	}
	tree();
	zapp.tools.style.visibility = "hidden";
}

function provadue() {
	document.getElementById("provadue").value = zapp.dft.inizio;
}

function coloresfondo() {
	var o = zapp.corpo;
	var c = o.style.backgroundColor;
	if (!c)
		c = "black";
	else if (c == "black")
		c = "darkblue";
	else if (c == "darkblue")
		c = "#202020";
	else
		c = null;
	o.style.backgroundColor = c;
}

function coloretesto() {
	var o = zapp.corpo;
	var c = o.style.color;
	if (!c)
		c = "yellow";
	else if (c == "yellow")
		c = "cyan";
	else if (c == "cyan")
		c = "whitesmoke";
	else if (c == "whitesmoke")
		c = "gray";
	else
		c = null;
	o.style.color = c;
}

function cambiabg() {
	zapp.corpo.style.backgroundColor = this.value;
}

function cambiafg() {
	zapp.corpo.style.color = this.value;
}

function next() {
	alert('AZIONE DA DEFINIRE');
}

function rls() {
	var m = "RESET LOCAL STORAGE " + window.localStorage.length;
	if (!confirm(m))
		return;
	window.localStorage.clear();
}

function jumph(hh) {
	hh = "h" + hh;
	var elmnt = document.getElementById(hh);
	elmnt.scrollIntoView();
	window.scrollBy(0, -60);
	document.getElementById("albero").style.visibility = "hidden";
}

function cara() {
	var f = [
		"Georgia, Times, serif",
		'"Open Sans",Georgia,sans-serif',
		"Arial, Times, serif",
		"Verdana, Times, serif"
	];
	zapp.nomefont++;
	if (zapp.nomefont > 3)
		zapp.nomefont = 0;
	zapp.corpo.style.fontFamily = f[zapp.nomefont];
}

// SEGUE ZDWPILLS


function tutti() {
	zapp.ciclo = document.getElementById("AX").querySelectorAll('p');
	zapp.inid.value = "1";
	scorri(0);
}

function acaso() {
	// punto ad un testo casuale tra quelli filtrati
	var x = Math.floor(Math.random() * zapp.ciclo.length);
	zapp.inid.value = x;
	scorri(0);
}

function ktx(o) {
	document.getElementById("cerca").value = o.id;
	zapp.vedo.innerHTML = "?";
}

function sel() {
	var c = document.getElementById("idx").innerHTML;
	var j;
	if (c === "TX")
		j = 0;
	if (c === "GX")
		j = 1;
	if (c === "SX")
		j = 2;
	if (c === "XX")
		j = 3;
	var i;
	var a;
	var e;
	var t;
	if (j == 3)
		a = this.id.split("-");
	for (i = 0; i < 3; i++) {
		e = "CLS" + [i];
		t = "";
		if (i === j)
			t = this.id;
		if (j === 3)
			t = a[i];
		if (t != "") {
			document.getElementById(e).value = t;
			document.getElementById(e).style.color = "red";
			document.getElementById((e + "D")).innerHTML = "---";
		}
	}
	var y = document.getElementById("CLS0").offsetTop - 40;
	zapp.scromem = document.body.scrollTop;
	document.body.scrollTop = y;
}

function cercaxcls() {
	var e;
	var i;
	var c = "";
	for (i = 0; i < 3; i++) {
		e = "CLS" + [i];
		c = c + document.getElementById(e).value + " ";
	}
	zapp.ciclo = document.getElementsByClassName(c);
	zapp.inid.value = "1";
	scorri(0);
}

function percls(c) {
	zapp.ciclo = document.getElementsByClassName(c);
	zapp.inid.value = "1";
	scorri(0);
}

function scorri(x) {
	var n = parseInt(zapp.inid.value) + x;
	if (n > zapp.ciclo.length)
		n = 1;
	if (n < 1)
		n = zapp.ciclo.length;
	zapp.inid.value = n;
	document.getElementById("nsel").innerHTML = zapp.ciclo.length;
	var conta = n - 1;
	var e = zapp.ciclo[conta];
	zapp.vedo.innerHTML = e.innerHTML;
	var a = e.getAttribute("class").split(" ");
	var i;
	var b = ""
		for (i in a) {
			b = "CLS" + i;
			document.getElementById(b).value = a[i];
			document.getElementById(b).style.color = "yellow";
			b += "D";
			document.getElementById(b).innerHTML = document.getElementById(a[i]).innerHTML;
		}
		document.location.href = "#top";
}

function invio(e) {
	if (e.keyCode == 13) {
		scorri(0);
		return false;
	}
}

function getAllElementsWithAttribute(attribute) {
	var matchingElements = [];
	var allElements = document.getElementsByTagName('*');
	for (var i = 0, n = allElements.length; i < n; i++) {
		if (allElements[i].getAttribute(attribute) !== null) {
			matchingElements.push(allElements[i]);
		}
	}
	return matchingElements;
}

function filtra() {
	var c = document.getElementById("cerca").value.toLowerCase();
	var e;
	var h;
	var s;
	for (e in zapp.guida) {
		h = zapp.guida[e].innerHTML.toLowerCase();
		s = h.indexOf(c);
		zapp.guida[e].className = (s < 0) ? "nv" : "yv";
	}
}

function cercaidx() {
	var c = document.getElementById("cerca").value.toLowerCase();
	var e;
	var h;
	var s;
	var i = document.getElementById('idx').innerHTML;
	vedoallidx(i);
	for (e in zapp.guida) {
		h = zapp.guida[e].innerHTML.toLowerCase();
		s = h.indexOf(c);
		zapp.guida[e].className = (s < 0) ? "nv" : "yv";
	}
}

function cercaindice(i) {
	var c = document.getElementById("cerca").value.toLowerCase();
	var e;
	var h;
	var s;
	vedoidx(i);
	var y = document.getElementById("idx").offsetTop - 40;
	document.body.scrollTop = y;

	for (e in zapp.guida) {
		h = zapp.guida[e].innerHTML.toLowerCase();
		s = h.indexOf(c);
		zapp.guida[e].className = (s < 0) ? "nv" : "yv";
	}
}

function salta(s) {
	var c = document.getElementById("cerca").value.substr(0, 1).toLowerCase();
	var e;
	var h;
	for (e in zapp.guida) {
		h = zapp.guida[e].innerHTML.substr(0, 1).toLowerCase();
		if (c == h) {
			break
		}
	}
	document.location.href = "#" + zapp.guida[e].id;
}

function cercanelcorpo() {
	var c = document.getElementById("cerca").value.toLowerCase();
	var e;
	var h;
	var s;
	var corpo = document.getElementById("AX").querySelectorAll("p");
	zapp.ciclo = [];
	for (i = 0; i < corpo.length; i++) {
		h = corpo[i].innerHTML.toLowerCase();
		s = h.indexOf(c);
		if (s >= 0) {
			zapp.ciclo.push(corpo[i]);
		}
	}
	if (zapp.ciclo.length < 1) {
		tutti();
	} else {
		zapp.inid.value = "1";
		scorri(0);
	}
}

function gotop() {
	window.scrollTo(0, 0);
	zapp.tools.style.visibility = "hidden";
}

function oggi() {
	var d = new Date();
	var n = d.getDate();
	var m = 1 + d.getMonth();
	var s = "DXD";
	if (m < 10)
		s += "0";
	s += m;
	if (n < 10)
		s += "0";
	s += n;
	document.getElementById('cerca').value = s;
	vedoidx("XX");
	cercaidx();
}

function vedoidx(i) {
	document.getElementById("TX").style.display = "none";
	document.getElementById("GX").style.display = "none";
	document.getElementById("SX").style.display = "none";
	document.getElementById("XX").style.display = "none";
	document.getElementById(i).style.display = "block";
	document.getElementById("idx").innerHTML = i;
	vedoallidx(i);
}

function vedoallidx(i) {
	var e;
	zapp.guida = document.getElementById(i).querySelectorAll('*');
	for (e in zapp.guida) {
		zapp.guida[e].className = "yv";
		zapp.guida[e].onclick = sel;
	}
}

function zcerca() {
	document.getElementById("cerca").value = "";
}

function zbox() {
	var e = document.getElementById("content");
	var w = e.style.width;
	if (w.length === 0) {
		e.style.width = "480px";
	} else {
		e.style.width = null;
	}
}

function setcgs() {
	var e,
	c,
	g,
	s,
	t;
	zapp.guida = document.getElementById("XX").querySelectorAll('*');
	zapp.guida.forEach(function (e) {
		t = e.id;
		c = t.substr(0, 5);
		g = t.substr(6, 5);
		s = t.substr(12, 5);
		t = document.getElementById(c).innerHTML + "|";
		t += document.getElementById(g).innerHTML + "|";
		t += document.getElementById(s).innerHTML;
		e.innerHTML = t;
	});
}

function txtcol() {
	var n = parseInt(document.getElementById("TCN").value.substr(2, 1));
	n++;
	var c;
	if (n > 4)
		n = 0;
	if (n === 0)
		c = "whitesmoke";
	if (n === 1)
		c = "gold";
	if (n === 2)
		c = "cyan";
	if (n === 3)
		c = "yellow";
	if (n === 4)
		c = "grey";
	document.getElementById("huno").style.color = c;
	document.getElementById("TCN").value = "TC" + n;
}

zapp.adde = function (tipo, stile, todo, testo, chiave) {
	var node = document.createElement(tipo);
	node.className = stile;
	node.onclick = todo;
	node.innerHTML = testo;
	node.id = chiave;
	zapp.testa.appendChild(node);
}

zapp.home = function () {
	window.open("../index.html", "_self");
}

zapp.load = function (url, element) {
	req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send(null);
	element.innerHTML = req.responseText;
}

let cipher = salt => {
	let textToChars = text => text.split('').map(c => c.charCodeAt(0))
		let byteHex = n => ("0" + Number(n).toString(16)).substr(-2)
		let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)
		return text => text.split('')
		.map(textToChars)
		.map(applySaltToChar)
		.map(byteHex)
		.join('')
}

let decipher = salt => {
	let textToChars = text => text.split('').map(c => c.charCodeAt(0))
		let saltChars = textToChars(salt)
		let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)
		return encoded => encoded.match(/.{1,2}/g)
		.map(hex => parseInt(hex, 16))
		.map(applySaltToChar)
		.map(charCode => String.fromCharCode(charCode))
		.join('')
}

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		zapp.dft = JSON.parse(localStorage.getItem("zapp"));

		if (localStorage.getItem(zapp.questapagina) != null) {
			zapp.dft = JSON.parse(localStorage.getItem(zapp.questapagina));
		}

		zapp.tools = document.getElementById("tools");
		var p;
		
		p = document.createElement("audio");
		p.id="myplayer";
		p.src="../audiobell.mp3";
		p.type="audio/mpeg";
		p.setAttribute("controls","");
		p.setAttribute("preload","none");
		p.style.width = "100%";
		zapp.tools.append(p);
		
		p = document.createElement("div");
		p.onclick=gotop;
		p.className="abcde";
		p.append("TOP");
		zapp.tools.append(p);

		p = document.createElement("div");
		p.onclick=chiudimi;
		p.className="abcde";
		p.append("HIDE");
		zapp.tools.append(p);

		p = document.createElement("div");
		p.onclick=salva;
		p.className="abcde";
		p.append("SALVA");
		zapp.tools.append(p);

		p = document.createElement("div");
		p.id="zoom";
		p.className="abcde";
		p.onclick=spr_zoom;
		p.append("ZOOM");
		zapp.tools.append(p);

		p = document.createElement("div");
		p.onclick=provadue;
		p.className="abcde";
		p.append("TOPX");
		zapp.tools.append(p);

		p = document.createElement("div");
		p.onclick=rls;
		p.className="abcde";
		p.append("RLS");
		zapp.tools.append(p);

		p = document.createElement("div");
		p.onclick=cara;
		p.className="abcde";
		p.append("FONT");
		zapp.tools.append(p);
		
		p = document.createElement("input");
		p.id="cuno";
		p.type="color";
		p.value = zapp.dft.coloresfondo;
		p.onchange = cambiabg;
		zapp.tools.append(p);
		
		p = document.createElement("input");
		p.id="cdue";
		p.type="color";
		p.value = zapp.dft.coloretesto;
		p.onchange = cambiafg;
		zapp.tools.append(p);

		p = document.createElement("textarea");
		p.id="note";
		p.className="fghil";
		p.value = zapp.dft.annota;
		zapp.tools.append(p);


		gosu = gotop; // per compatibilità
		zapp.testa = document.getElementById("barratesta");
		zapp.testa.innerHTML = "";
		zapp.adde("button", "bottone", tools, "M", "menu");
		zapp.adde("button", "bottone", htotree, "T", "tree");
		zapp.adde("button", "bottone", leggi, "0", "pixy");
		zapp.adde("button", "bottone", perh, "0", "pixh");
		zapp.adde("button", "bottone", moff, "X", "moff");
		document.getElementById("zoom").innerHTML = zapp.dft.zoompt + "pt";
		document.getElementById("pixy").innerHTML = zapp.dft.inizio;
		if (document.getElementById("spr")) {
			zapp.corpo = document.getElementById("corpo");
			zapp.corpo.style.fontSize = zapp.dft.zoompt + "pt";
			zapp.corpo.style.backgroundColor = zapp.dft.coloresfondo;
			zapp.corpo.style.color = zapp.dft.coloretesto;
			document.getElementById("menu").value = "M";
			document.getElementById("moff").value = "X";
		}
		if (document.getElementById("pills")) {
			zapp.adde("button", "bottone", tutti, "0", "bidx");
			zapp.adde("button", "bottone", acaso, "9", "nsel");
			zapp.adde("button", "bottone", scorri, "0", "tnxt");
			zapp.vedo = document.getElementById("huno");
			zapp.inid = document.getElementById("bcurid");
			zapp.ciclo = document.getElementById("AX").querySelectorAll("p");
			document.getElementById("huno").style.fontSize = "18pt";
			document.getElementById("zoom").innerHTML = "Z";
			document.getElementById("bidx").value = "A";
			document.getElementById("tnxt").value = "+";
			acaso();
			setcgs();
		}

		var w = screen.width-14;
		zapp.corpo.style.width = w+"px";
		if (w>600) zapp.corpo.style.width = "440px";
		if (w>600) zapp.testa.style.width = "440px";
		zapp.corpo.style.top = zapp.testa.offsetHeight+"px";
		zapp.adde("button", "bottone", zapp.home, "Z", "zhome");
		var doy = "R" + Math.floor((Date.now() - Date.parse(new Date().getFullYear(), 0, 0)) / 86400000);
		zapp.adde("button", "bottone", prandom, doy, "prandom");
		zapp.adde("button", "bottone", nosup, "SUP", "nosup");
		zapp.adde("button", "bottone", zbox, "W", "zbox");
		zoombis(zapp.dft.zoompt);
		window.scrollTo(0, zapp.dft.inizio);
		document.getElementById("content").style.visibility="visible";
	}
}
