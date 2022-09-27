"use strict";

var gl;
var points;
var l1;
var l2;
var l3;
window.onload = function init() {
    var canvas = document.getElementById("trisquare-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
	
	var vertexData =[];
	vertexData.push(0.0, 0.0);
	vertexData.push(1.0, 0.0);
	vertexData.push(3/4,0.68687);
	vertexData.push(1/4,0.68687);
	
    var N = 360;
    vertexData.push(0.0, 0.0);//4
    var r = 0.73095*2/3;
    
    for (var i = 0; i <= N; i++) {//4+361
    	var theta = i * 2 * Math.PI / N+20* 2 * Math.PI / N;
    	var x = r * Math.sin(theta);
    	var y = r * Math.cos(theta);
    	vertexData.push(x, y);
    }
    
	l1=vertexData.length;
	
	var N1 = 100;
	vertexData.push(0.0+3/16, 0.0+1/8);
	var r1 =0.03;
	
	for (var i = 0; i <= N1; i++) {
		var theta = i * 2 * Math.PI / N1;
		var x1 = r1 * Math.sin(theta)+3/16;
		var y1 = r1 * Math.cos(theta)+1/8;
		vertexData.push(x1, y1);
	}
	l2=vertexData.length;
	
	
	//折线
	vertexData.push(0.3,0.55);
	vertexData.push(0.4,0.6);
	vertexData.push(0.37,0.5);
	
	vertexData.push(0.5,0.55);
	vertexData.push(0.6,0.6);
	vertexData.push(0.57,0.5);
	
	vertexData.push(0.46,0.4);
	vertexData.push(0.56,0.45);
	vertexData.push(0.53,0.35);
	
	vertexData.push(0.66,0.4);
	vertexData.push(0.76,0.45);
	vertexData.push(0.73,0.35);
	
	
	vertexData.push(0.56,0.2);
	vertexData.push(0.66,0.25);
	vertexData.push(0.63,0.15);
	
	vertexData.push(0.76,0.2);
	vertexData.push(0.86,0.25);
	vertexData.push(0.82,0.15);
	
	//脸
    var tcolor = [
        0.99216, 0.96078, 0.90196
    ];

    var tricolor = [];
    for( var i=0; i<N+2; i++ ) {
        tricolor.push(tcolor[0], tcolor[1], tcolor[2]);
    }
	
	//身体
    var scolor = [
        0.80392, 0.52157, 0.24706
    ];
	
    var sqcolor = [];
    for (var i = 0; i < 4; i++ ) {
        sqcolor.push(scolor[0], scolor[1], scolor[2]);
    }

    var sqcolor = sqcolor.concat(tricolor);
	
	//眼睛
	var scolor2 = [
	    0.0, 0.0, 0.0
	];
	
	var sqcolor2 = [];
	for (var i = 0; i < N1; i++ ) {
	    sqcolor2.push(scolor2[0], scolor2[1], scolor2[2]);
	}
	
	var sqcolor = sqcolor.concat(sqcolor2);
	
	//折线
	var scolor3 = [
	    0.0, 1.0, 1.0//蓝色
	];
	
	var sqcolor3 = [];
	for (var i = 0; i < 3; i++ ) {
	    sqcolor2.push(scolor3[0], scolor3[1], scolor3[2]);
	}
	
	var vcolors = sqcolor.concat(sqcolor3);
	
	
	

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment1-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    // Associate external shader variables with data buffer
    var vPosition1 = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(vPosition1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition1);
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vcolors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    /*
    var program2 = initShaders(gl, "xxx", "xx" );
    gl.useProgram(program2);

    var vBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.buffeData(gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW);
    */
    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
    gl.drawArrays(gl.TRIANGLE_FAN, 4,68+4); //360+3
	gl.drawArrays(gl.TRIANGLE_FAN, l1/2,102);//第二个参数其实点，第三个参数是用到多少个点
	gl.drawArrays(gl.LINE_STRIP, l2/2,3); 
	
	gl.drawArrays(gl.LINE_STRIP, l2/2+3,3); 
	gl.drawArrays(gl.LINE_STRIP, l2/2+6,3); 
	gl.drawArrays(gl.LINE_STRIP, l2/2+9,3); 
	
	gl.drawArrays(gl.LINE_STRIP, l2/2+12,3);
	gl.drawArrays(gl.LINE_STRIP, l2/2+15,3); 
}

