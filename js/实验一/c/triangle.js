"use strict";

var gl;// webgl环境 
var points;//点信息 

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );// 获取元素 
	gl = WebGLUtils.setupWebGL( canvas );//配置运行环境
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	//一个正方形可以看成两个三角形
	//最后一个是三个顶点三个颜色
	// Three Vertices定义顶点，一维数组（x,y）
	//从中心点，向左为负，最左边为-1，最右边为1；向下为负，最下边为 -1，最上边为1。
	var vertices = [
		 -1, -1.0, 
		 -1.0,  0.0, //一行是一个点（x,y）
		 0.0, -1.0,
		 
		 0.0, -1.0,
		 1.0,  1.0,
		 1.0, -1.0,
		 0.0, -1.0,
		 1.0,  1.0,
		 0.0,  1.0
		 
		 /*-0.5, -0.5,
		 0.0, 0.5,
		 0.5, -0.5*/
	];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );//绘制区域
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );//初始化背景颜色

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );//在gl环境里用顶点和面片着色器，编译
	gl.useProgram( program );//使用当前程序绘制

	// Load the data into the GPU
	var bufferId = gl.createBuffer();//创建内存区域
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );//声明当期需要用这个bufferId内存区域，绑定内存区域
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );//写数据（声明当期缓存区域，浮点数组，）

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );//"vPosition"位置数据
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );//2：每个点两个值。送6个值进去，所以最终得到3个点。
	gl.enableVertexAttribArray( vPosition );

	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );扇形
	gl.drawArrays( gl.TRIANGLES, 0, 9 );//0:起始点的id,3个点。2个三角形，3改为6，其余也要改
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}