var cambiasx = function () {
    cambia("sx");
}

var cambiadx = function () {
    cambia("dx");
}

var cambiaxx = function () {
    cambia("xx");
}

var callzero = function () {
    cambia(0);
}

var cambia = function (x) {
    pills.tools.style.visibility = "hidden";
    if (bell && pills.letti > 0)
        bell.play();
    var aid = document.getElementById("aid");
    var v = document.getElementById("verso");
    current = parseInt(aid.value);
    var y = parseInt(x);
	var tutti = quanti - 1;
    if (y >= 0)
        current = y;
    if (x == "xx")
        current = Math.floor(Math.random() * tutti);
    if (x == "sx")
        current -= 1;
    if (x == "dx")
        current += 1;
    while (v.firstChild) {
        v.removeChild(v.firstChild)
    }
    if (current < 0)
        current = 0;
    else if (current > tutti)
        current = tutti;
    var e = pensieri[current].cloneNode(true);
    if (e.id == "")
        e.id = "subverso";
    if (zapp.barra) {
        e.innerHTML = e.innerHTML.replace(/\s\/\s/g, "<br>");
	} else {
		e.innerHTML = e.innerHTML.replace(/\<br>\>/g, " / ");
	}
    if (typeof(subuno) != "undefined")
        subuno(e);
    v.append(e);
    if (typeof(subdue) != "undefined")
        subdue();
    aid.value = current;
    v.scrollIntoView();
    pills.letti++;
}

var acapo = function () {
    zapp.barra = !zapp.barra;
    cambia("");
}

var menu = function () {
    document.getElementById("conta").innerHTML = pills.letti + "/" + quanti;
    pills.tools.style.top = window.scrollY + 60 + "px";
    pills.tools.style.visibility = "visible";
    return false;
}

var nopop = function () {
    pills.tools.style.visibility = "hidden";
}

var salva = function () {
    var questapagina = location.href.split("/").slice(-1)[0]; // nome pagina
    zapp.annota = document.getElementById("notes").value;
    zapp.last = document.getElementById("aid").value;
    zapp.ctext = document.getElementById("ctext").value;
    if (zapp.ctext == "#000000")
        zapp.ctext = "#d5a6bd"; // "#ffbf00"
    //console.log(zapp);
    localStorage.setItem(questapagina, JSON.stringify(zapp)); // valori default
    nopop();
}

var piede = function () {
    var piede = document.getElementById("piede");
    var d = piede.style.display;
    if (d == "none")
        d = "block";
    else
        if (d == "")
            d = "none";
        else
            if (d == "block")
                d = "none";
    piede.style.display = d;
}

var ctext = function () {
    zapp.ctext = this.value;
    document.getElementById("verso").style.color = zapp.ctext;
}

var zoom = function () {
    if (!zapp.zoom)
        zapp.zoom = 18;
    else
        zapp.zoom += 2;
    if (zapp.zoom > 48)
        zapp.zoom = 14;
    document.getElementById("verso").style.fontSize = zapp.zoom + "pt";
}

// variabili globali
var pensieri;
var quanti;
var current;
var bell = new Audio('../audioclick.mp3');
var zapp = {};
var pills = {};
// variabili globali fine

document.onreadystatechange = function () {
    if (document.readyState == "complete") {

        pills.letti = 0;

        var db = document.getElementById("dbase");
        //pensieri = db.getElementsByTagName("p");
        pensieri = db.children;
        quanti = pensieri.length;

        // testa

        var div = document.createElement("div");
        div.id = "testa";
        var table = document.createElement("table");
        var riga = document.createElement("tr");
        var cella = document.createElement("td");
        var img = document.createElement("img");
        img.src = "../mm_tools.png";
        img.style.cursor = "pointer";
        img.onclick = menu;
        cella.append(img);
        riga.append(cella);

        cella = document.createElement("td");
        cella.id = "titolo";
        cella.style.width = "100%";
        cella.align = "center";
        cella.vAlign = "top";
        cella.innerHTML = "TITOLO";
        cella.ondblclick = callzero;
        riga.append(cella);

        cella = document.createElement("td");
        img = document.createElement("img");
        img.id = "logo";
        img.src = "../mm_pills.png";
        img.style.cursor = "pointer";
        img.onclick = cambiaxx;
        cella.append(img);
        riga.append(cella);

        table.append(riga);
        div.append(table);
        document.body.append(div);

        // corpo

        div = document.createElement("div");
        div.id = "corpo";
        var div1 = document.createElement("div");
        div1.id = "verso";
        div1.className = "dentro";
        div1.oncontextmenu = menu;
        div1.ondblclick = acapo;
        div.append(div1);
        document.body.append(div);

        // sottocorpo

        div = document.createElement("div");
        div.id = "sotto";
        //div.className = "dentro";
        document.body.append(div);

        // piede

        div = document.createElement("div");
        div.id = "piede";
        div.align = "center";
        table = document.createElement("table");
        riga = document.createElement("tr");

        cella = document.createElement("td");
        cella.style.width = "40px";
        img = document.createElement("img");
        img.src = "../ArrowSx.png";
        img.onclick = cambiasx;
        cella.append(img);
        riga.append(cella);

        cella = document.createElement("td");
        var inp = document.createElement("input");
        inp.id = "aid";
        inp.size = "5";
        inp.value = "0";
        inp.maxLength = 5;
        inp.style.font = "normal 28pt monospace";
        inp.style.background = "transparent";
        inp.style.color = "grey";
        inp.style.textAlign = "center";
        inp.style.border = "0";
        cella.append(inp);
        riga.append(cella);

        cella = document.createElement("td");
        cella.style.width = "40px";
        cella.align = "right";
        img = document.createElement("img");
        img.src = "../ArrowDx.png";
        img.onclick = cambiadx;
        cella.append(img);
        riga.append(cella);

        table.append(riga);
        div.append(table);
        document.body.append(div);

        // tools

        div = document.createElement("div");
        div1 = document.createElement("div");
        div1.id = "opzioni";
        var p = document.createElement("p");
        p.id = "conta";
        p.className = "opuls";
        p.innerHTML = quanti;
        p.onclick = nopop;
        div1.append(p);
        p = document.createElement("p");
        p.innerHTML = "SALVA";
        p.className = "opuls";
        p.onclick = salva;
        div1.append(p);
        p = document.createElement("p");
        p.innerHTML = "PIEDE";
        p.className = "opuls";
        p.onclick = piede;
        div1.append(p);

        p = document.createElement("input");
        p.id = "ctext";
        p.type = "color";
        p.value = "";
        p.onchange = ctext;
        div1.append(p);

        p = document.createElement("p");
        p.innerHTML = "ZOOM";
        p.className = "opuls";
        p.onclick = zoom;
        div1.append(p);

        var ta = document.createElement("textarea");
        ta.id = "notes";
        div1.append(ta);
        div.append(div1);
        document.body.append(div);

        pills.tools = document.getElementById("opzioni");

        var questapagina = location.href.split("/").slice(-1)[0]; // nome pagina
        if (localStorage.getItem(questapagina) != null) {
            zapp = JSON.parse(localStorage.getItem(questapagina));
            //console.log(zapp);
            document.getElementById("notes").value = zapp.annota;
            document.getElementById("aid").value = zapp.last;
            document.getElementById("ctext").value = zapp.ctext;
            document.getElementById("verso").style.color = zapp.ctext;
            document.getElementById("verso").style.fontSize = zapp.zoom + "pt";
            cambia(zapp.last);
        }

        var src = document.getElementById("verso");
        src.addEventListener('touchstart', function (e) {
            ts = e.touches[0].clientX;
        }, false);

        src.addEventListener('touchend', function (e) {
            deltaX = e.changedTouches[0].clientX - ts;
            if (deltaX < -150)
                cambia("dx");
            if (deltaX > 150)
                cambia("sx");
        }, false);

        custom();

    }
}
