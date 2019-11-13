// 1、精简jquery代码，找到程序入口方法，删去function

// ( function( global, factory ) {

// } )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// } );


// 1、创建一个立马执行的匿名函数，通过调用函数的方式产生一个闭包空间
// 2、typeof window !== "undefined" ? window : this 判断window是否存在，window在bom中肯定存在，jquery有可能在其他环境运行，如node环境 
// 3、模块化标准：nodeJS(COMMONJS标准)、requirejs(AMD标准)、Seajs(CMD标准)
// 4、两个闭包有分别的作用，方法更好的模块化调用，业务逻辑分离开
(function(global, factory){
  // 闭包1 判断环境
  if (typeof module === "object" && typeof module.exports === "object") { // node环境也可以模拟window对象
    module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
  } else {
    factory(global)
  }
}(window, function(window, noGlobal){
  // 闭包2  核心内容 创建$函数对象

  // 定义一些对象、数组的常用方法，方便调用，精辟
  var arr = [];

  var document = window.document;

  var getProto = Object.getPrototypeOf;

  var slice = arr.slice;

  var concat = arr.concat;

  var push = arr.push;

  var indexOf = arr.indexOf;

  var class2type = {};

  var toString = class2type.toString;

  var hasOwn = class2type.hasOwnProperty;

  var fnToString = hasOwn.toString;

  var ObjectFunctionString = fnToString.call( Object );

  var support = {};

  var
    version = "3.4.1",
    // 定义核心方法
    JQuery = function ( selector, context ) {
      // 无new化调用
      return new JQuery.fn.init( selector, context );
      // var a = new jQuery.fn.init() // 返回的是对象的内存地址
      // var b = jQuery.fn.init() // return结果，注重执行的结果
    };
  JQuery.fn = JQuery.prototype = {
    // The current version of jQuery being used
    version: version,
    constructor: JQuery,
    // The default length of a jQuery object is 0
    length: 0
  };
  var rootjQuery,
    init = JQuery.fn.init = function( selector, context, root ){
      var node = typeof selector !== 'object' && document.querySelectorAll(selector)
      // console.log('init JQuery', node)
      JQuery.fn.length = node.length
      return node
    };
    // 共享原型，都用这jQuery的prototyte
    init.prototype = JQuery.fn;
    rootjQuery = JQuery(document)

    if (!noGlobal) {
      window.JQuery = window.$ = JQuery
    }

  return JQuery
}))
