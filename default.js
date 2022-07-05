// S E G M E N T O	///////////////////////////////////////////////////////////////////////////////////
//Dos digitos que indican hora minuto o segundo del relog
//(Posicion X,Posicion Y,Nombre,Velocidad,Lado de los cubos,Separación de los cubos,Dimensiones en cubos 2 x 2 pej)
function Segmento(OB, x, y, n, v, AC, SE, f, DIM) {
	this.x = x; this.y = y; this.n = n; this.v = v; this.f = f; this.f4;
	this.m = false; this.con = 1; this.AC = AC; this.SE = SE; this.DIM = DIM;
	this.motor; this.cubsel; this.d; this.dt; this.OB = OB;
	this.cubo = new Array(); this.posini = new Array(); this.s = this.AC + this.SE;
}
Segmento.prototype.st = new Array('cubofondo', 'cubo');
Segmento.prototype.col = new Array('#363030', '#363030', '#363030', '#363030', '#464040', '#464040', '#464040', '#464040');
Segmento.prototype.Tmes = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
Segmento.prototype.Tdia = new Array('Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', ' Viernes', ' Sabado');
//FUNCIONES**************************************************************************************
Segmento.prototype.X = function (ob) {
	return Number(ob.style.left.slice(0, -2));
}
Segmento.prototype.Y = function (ob) {
	return Number(ob.style.top.slice(0, -2));
}
Segmento.prototype.resuelveCubo = function (i) {
	var s = new Array();
	for (var i = 4; i < this.cubo.length; i++) {
		if ((this.X(this.cubo[i]) == this.d[0] & this.Y(this.cubo[i]) != this.d[1]) |
			(this.X(this.cubo[i]) != this.d[0] & this.Y(this.cubo[i]) == this.d[1])) {
			s.push(this.cubo[i]);
		}
	}
	return s[Math.floor(s.length * Math.random())];
}
Segmento.prototype.cambiaFondo = function (d) {
	for (var i = 0; i < 4; i++) {
		if (this.X(this.cubo[i]) == d[0] & this.Y(this.cubo[i]) == d[1])
			this.cubo[i].innerHTML = pinta(this.f4, this.AC, this.f + 8);
	}
}
//----------------------------------------------------------------------------------------------
Segmento.prototype.desplaza = function (ob) {
	var att = [ob.X(ob.cubsel), ob.Y(ob.cubsel)];
	var xy = [[(att[0] == ob.d[0]), (att[1] == ob.d[1])], [att[0], att[1]]];
	if (ob.m) {
		ob.dt = ob.dt;
	} else {
		ob.dt = att;
		ob.cambiaFondo(ob.dt);
	}
	ob.m = true;
	if (xy[0][0]) {
		var s = (att[1] > ob.d[1]) ? -1 : +1;
		ob.cubsel.style.top = (att[1] + s) + 'px';
	} else if (xy[0][1]) {
		var s = (att[0] > ob.d[0]) ? -1 : +1;
		ob.cubsel.style.left = (att[0] + s) + 'px';
	}
	if (xy[0][0] & xy[0][1]) {
		ob.cubsel.style.left = (att[0]) + 'px';
		ob.cubsel.style.top = (att[1]) + 'px';
		ob.m = false;
		ob.d = ob.dt;
		ob.cubsel = ob.resuelveCubo();
		ob.actualiza(ob);
	}
	//var CT = ob.cubsel.getAttribute('id');
	//document.getElementById('salida').innerHTML ='var d = '+ob.d+'<br />var att = ['+ att+'];<br />var xy =  [['+ xy[0]+'],['+ xy[1]+']];<br />cubo.id ='+CT;
}
//----------------------------------------------------------------------------------------------
Segmento.prototype.crea = function () {
	this.grafico = document.createElement("div");
	this.grafico.setAttribute("className", "segmento");
	this.grafico.setAttribute("class", "segmento");
	this.grafico.style.top = this.x + 'px';
	this.grafico.style.left = this.y + 'px';
	this.grafico.setAttribute("id", "segmento" + this.n);
	var ob = this.OB.appendChild(this.grafico);
	for (var k = 0; k < 2; k++) {
		for (var i = 0; i < this.DIM[0]; i++) {
			for (var j = 0; j < this.DIM[1]; j++) {
				this.cubo.push(this.creacubo(this.grafico, (i * this.s), (j * this.s), this.st[k], this.con++, this.AC));
				this.posini.push([(i * this.s), (j * this.s)]);
			}
		}
	}
	ob.removeChild(this.cubo.pop());
	this.d = this.dt = this.posini.pop();
	this.posini.splice(4);
	ob.style.width = this.DIM[0] * this.s + 'px';
	ob.style.height = this.DIM[1] * this.s + 'px';
	//
	this.cubsel = this.cubo[5];
	this.actualiza(this);
	this.motor = setInterval(this.desplaza, this.v, this);
}
//---------------------------------------------------------------------------------------------------
// C U B O   M O V I L //////////////////////////
Segmento.prototype.creacubo = function (ob, x, y, c, id, AC) {
	// c = nombre de la clase de style
	var g = document.createElement("div");
	g.setAttribute("className", c); g.setAttribute("class", c);
	g.style.top = x + 'px'; g.style.left = y + 'px';
	g.style.width = AC + 'px'; g.style.height = AC + 'px';
	g.setAttribute("id", 'cubo' + id); g.style.backgroundColor = this.col[Number(id) - 1];
	return ob.appendChild(g);
}
//---------------------------------------------------------------------------------------------------
// C A L E N D A R I O   M E N S U A L //////////////////////////
Segmento.prototype.creames = function () {
	var AH = new Date();												//Dia de la semana del dia 1	
	var di = ((new Date(AH.getFullYear(), AH.getMonth(), 1)).getDay() == 0) ? 7 : (new Date(AH.getFullYear(), AH.getMonth(), 1)).getDay();
	var dm = (new Date(AH.getFullYear(), (AH.getMonth() + 1), 0)).getDate();//Dias del mes
	var fi = Math.ceil(((di - 1) + dm) / 7);
	var ca = new Array('L', 'M', 'M', 'J', 'V', 'S', 'D');
	var d = 1;
	var S = '<center><table class="mes" border="0" cellpadding="1" cellspacing="1" width="' + (this.AC + 4) + '" height="' + (this.AC + 4) + '"><tr style="border:none">';
	for (var i = 0; i < 7; i++) { S += '<td style="color:#666;background-color:#363030;">' + ca[i] + '</td>'; } S += '</tr>';
	for (var c = 0; c < fi; c++) {
		S += '<tr>';
		for (var f = 1; f <= 7; f++) {
			var tm = (c == 0 & f < di) ? '&nbsp;' : d++;
			var td = (AH.getDate() == (d - 1)) ? '<td style="outline:1px solid #999;">' : '<td style="color:#999">';
			S += td + tm + '</td>';
		}
		S += '</tr>';
	}
	S += '</table></center>';
	//document.getElementById('salida').innerHTML = S;
	return S;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
function rellena(c, n) {
	var a = String(c).split('').length; var b = '';
	for (var i = 0; i < n - a; i++) { b += '0'; }
	return b + String(c);
}
function pinta(n, m, f) {
	return '<span class="cubo" style="margin-top:' + Math.floor((m - (f + (f / 3))) / 2) + 'px;font-size:' + f + 'px">' + n + '</span>';
}
window.onload = function () {
	//HORAS y MINUTOS
	var contenedor = document.getElementById('relog');
	var horas = new Segmento(contenedor, 8, 8, 'hora', 10, 210, 5, 50, [2, 2]);
	horas.actualiza = function (ob) {
		var AH = new Date();
		ob.f4 = horas.creames();
		ob.cubo[4].innerHTML = pinta(rellena(AH.getHours(), 2) + ' h', ob.AC, ob.f+20);
		ob.cubo[5].style.backgroundColor = this.col[0];
		var fecha = '<span style="color:#fff;font-size:90px;">' + AH.getDate() + '</span><br /><div style="text-align:left">&nbsp;';
		fecha += ob.Tmes[AH.getMonth()] + '</div><div style="color:#fff;background-color:#565050;font-size:60px;">';
		fecha += AH.getFullYear() + '</div>';
		ob.cubo[6].innerHTML = '<span class="cubo" style="margin-top:20px;font-size:30px">' + fecha + '</span>';
	}

	horas.crea();
	//SEGUNDOS Y MILISEGUNDOS
	var segundos = new Segmento(horas.cubo[5], 3, 3, 'hora', 10, 97, 5, 22, [2, 2]);
	segundos.actualiza = function (ob) {
		var AH = new Date();
		ob.f4 = rellena(AH.getSeconds(), 2) + ' s';
		ob.cubo[4].innerHTML = pinta(rellena(AH.getMinutes(), 2) + ' m', ob.AC, ob.f);
		ob.cubo[6].innerHTML = pinta(horas.Tdia[AH.getDay()], ob.AC, ob.f);

	}
	segundos.crea();

	//MILISEGUNDOS DINAMICOS
	var actualizaMS = function () {
		var ahora = new Date();
		segundos.cubo[5].innerHTML = '<span style="font-family: \'Major Mono Display\', monospace;">'+pinta(rellena(ahora.getMilliseconds(), 3) + '<br><span style="font-size:10px">ms</span>', segundos.AC, segundos.f)+'</span>';
	}
	setInterval(actualizaMS, 1);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//CENTRAR EL CONJUNTO//////////////////////////////////////////////////////////
	contenedor.style.top = '50%';
	contenedor.style.left = '50%';
	contenedor.style.marginTop = -(((horas.AC + 4 + horas.SE) * horas.DIM[1]) / 2) + 'px';
	contenedor.style.marginLeft = -(((horas.AC + 4 + horas.SE) * horas.DIM[0]) / 2) + 'px';


}
