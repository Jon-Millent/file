scrollUtil : {
	stopScroll : function(){
	    var a = document.body.style;
	    a.position = "fixed";
	    a.left = 0;
	    a.right = 0;
	    a.bottom = 0;
	    a.top = 0;

	},
	runScroll : function(){
	    document.body.style.position='';
	    document.body.style.left='';
	    document.body.style.right='';
	    document.body.style.bottom='';
	    document.body.style.top='';
	}
}
