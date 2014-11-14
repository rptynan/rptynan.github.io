var canvas, c, grid=[], ngrid=[], gh, gw, t, intcnt=0, //Necessary Variables
	cs=15, pd=3, trans=0.4, seedratio=.3, interval=25, maxintcnt=4;	//Aestethic Variables, cs=cellsize, pd=padding, interval=time in ms between screen refreshes, mxintcnt=every nth screen refresh calls nxtgen();

window.onload = function(){
	canvas = document.getElementById("GOLCanvas");
	c = canvas.getContext("2d");
	c.fillStyle = "#35C0CD";
	c.globalAlpha = trans;
	gh=~~(screen.height/10);
	gw=~~(screen.width/10);
	for(var x=0; x<gw; ++x){
		grid[x]=[];
		ngrid[x]=[];
		for(var y=0; y<gh; ++y){
			grid[x][y]=0;
			ngrid[x][y]=0;
		} 	
	}
	//randinit();
	for(var i=0; i<3; ++i) nxtgen();
	resizer();
	grid[1][1]=1;	grid[2][2]=1; grid[2][3]=1; grid[1][3]=1; grid[0][3]=1;	
	window.addEventListener('resize', function() { resizer(); update(); }, false);
	window.onfocus=setInterval('update()',interval);
}
window.addEventListener('mousemove', function(ev){mouselive(ev);}, false)
//window.onmousemove = mouselive;

function update(){
	++intcnt;
	if(intcnt==maxintcnt){
		intcnt=0;
		nxtgen();
	}
	c.clearRect(0,0,screen.width,screen.height);
	for(var i=0; i<gw; ++i){
		for(var o=0; o<gh; ++o){
			if(grid[i][o]==1)
				c.fillRect(i*(cs+pd)+pd,o*(cs+pd)+pd,cs,cs);
		}
	}
}

function nxtgen(){
	for(var x=0; x<gw; ++x){
		for(var y=0; y<gh; ++y){
			t=  grid[(gw+x-1)%gw][(gh+y-1)%gh] + grid[x][(gh+y-1)%gh] + grid[(x+1)%gw][(gh+y-1)%gh] +
				grid[(gw+x-1)%gw][y] 		   				 		  + grid[(x+1)%gw][y] 			+
				grid[(gw+x-1)%gw][(y+1)%gh]    + grid[x][(y+1)%gh]    + grid[(x+1)%gw][(y+1)%gh];
			if(t==3 || t+grid[x][y]==3) ngrid[x][y]=1;
			else ngrid[x][y]=0;
		}
	}
	for(var x=0; x<gw; ++x){
		for(var y=0; y<gh; ++y){
			grid[x][y]=ngrid[x][y];
		}
	}
}

function mouselive(ev){
	var mx = ~~( (ev.pageX-pd) / ( (cs+pd)*(document.documentElement.clientWidth/screen.width) ) );
	var my = ~~( (ev.pageY-pd) / ( (cs+pd)*(document.documentElement.clientHeight/screen.height) ) );
	if(mx<0 || my<0){
		return;
	}
	//console.log(document.documentElement.clientWidth);
	//alert(mx,my);
	//console.log(ev.pageX);
	grid[mx][my]=1;
}

function randinit(){
	for(var x=0; x<gw; ++x){
		for(var y=0; y<gh; ++y){
			grid[x][y] = ~~(Math.random()+seedratio);
		}
	}
}

function resizer(){
	canvas.width = window.outerWidth;
	canvas.height = window.outerHeight;
	gw = ~~(canvas.width/10);
	gh = ~~(canvas.height/10);
	c.fillStyle = "#35C0CD";
	c.globalAlpha = trans;
}

