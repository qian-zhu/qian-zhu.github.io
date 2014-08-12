require.config({
	paths:{
		jquery:'jquery-1.11.1.min'
	}
});
require(['jquery','window'],function($,w){
	$("#a").click(function(){
		new w.Window().alert('welcome!');
	});
});
