/*
 * Javascript implementation of Conway's Game of Life, intended to fill
 * the entire background of a page.
 * Licensed under MIT license, find the code at github.com/rptynan/tynan.me
 * Richard Tynan
 */


var
// Necessary Variables
canvas, c, grid=[], ngrid=[], gh=0, gw=0, t, intcnt=0,
//Aestethic Variables
cs=15,          // cell size
pd=3,           // padding between cells
trans=0.4,      // trasparency of cells on page
interval=25,    // interval time in ms between each refresh
maxintcnt=4;	// every nth screen refresh calls nxtgen()
seedratio=.3,   // ratio alive:empty when randomly generating start
randominit=0;   // randomly initiate grid (otherwise just a glider)


// On loading page, startup these things
window.onload = function(){
	canvas = document.getElementById("GOLCanvas");
	c = canvas.getContext("2d");
	c.fillStyle = "#35C0CD";
	c.globalAlpha = trans;
	gh=~~(window.innerHeight/10);
	gw=~~(window.innerWidth/10);
	for(var x=0; x<gw; ++x){
		grid[x]=[];
		ngrid[x]=[];
		for(var y=0; y<gh; ++y){
			grid[x][y]=0;
			ngrid[x][y]=0;
		}
	}
	if(randominit) randinit(); //Turned off for now
	for(var i=0; i<3; ++i) nxtgen();
	resizer();
	grid[1][1]=1;	grid[2][2]=1; grid[2][3]=1; grid[1][3]=1; grid[0][3]=1;	
	window.addEventListener('resize', function() { resizer(); update(); }, false);
	window.onfocus=setInterval('update()',interval);
}


// Add event listeners to catch touch/mouse movements
window.addEventListener('mousemove', function(ev){mouselive(ev);}, false)
window.addEventListener('touchmove', function(ev){touchlive(ev);}, false)


// Updates screen to show grid
function update(){
	++intcnt;
	if(intcnt==maxintcnt){
		intcnt=0;
		nxtgen();
	}
	c.clearRect(0,0,window.innerWidth,window.innerHeight);
	for(var i=0; i<gw; ++i){
		for(var o=0; o<gh; ++o){
			if(grid[i][o]==1)
				c.fillRect(i*(cs+pd)+pd,o*(cs+pd)+pd,cs,cs);
		}
	}
}


// Changes grid to next generation
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


// Helper function to make a cell alive in grid array given screen co-ordinates
function fillcell(x, y){
	var mx = ~~( (x-pd) / (cs+pd) );
	var my = ~~( (y-pd) / (cs+pd) );
	if(mx>=0 && my>=0 && mx<gw && my<gh){
        grid[mx][my]=1;
    }
    return;
    console.log(mx, gw, my, gh);
}


// Function to catch mouse moving events
function mouselive(ev){
    fillcell(ev.pageX, ev.pageY);
    return;
}


// Function to catch touch moving events
function touchlive(ev){
    var I = ev.touches.length;
    for(var i=0; i<I; ++i){
        fillcell(ev.touches[i].pageX, ev.touches[i].pageY);
    }
    return;
}


// Randomly generate new grid to start
function randinit(){
	for(var x=0; x<gw; ++x){
		for(var y=0; y<gh; ++y){
			grid[x][y] = ~~(Math.random()+seedratio);
		}
	}
}


// Resize everything
function resizer(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
    oldgw = gw;
    oldgh = gh;
	gw = ~~(canvas.width/10);
	gh = ~~(canvas.height/10);
	for(var x=oldgw; x<gw; ++x){
		grid[x]=[];
		ngrid[x]=[];
		for(var y=oldgh; y<gh; ++y){
			grid[x][y]=0;
			ngrid[x][y]=0;
		} 	
	}
	c.fillStyle = "#35C0CD";
	c.globalAlpha = trans;
}

