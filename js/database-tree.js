$('#tree').jstree({
  "core" : {
    'data' : {
			"url" : "data/root.json",
			"dataType" : "json" // needed only if you do not supply JSON headers
	 } 
  },
  "types" : {
    "attr" : {
      "icon" : "../img/attr.png",
      "valid_children" : ["lvl"]
    },
    "lvl" : {
      "icon" : "../img/level.png",
      "valid_children" : []
    }
  },
  "plugins" : [
    "types", "wholerow","checkbox", "search"
  ]
});

var done = false;

$('#search-field').keyup(function () {
	
	if(done) { clearTimeout(done); }
	
	done = setTimeout(function () {
	  	var value = $('#search-field').val();
	  	$('#tree').jstree(true).search(value);
	 }, 250);
	 
	 
});

var open = false ;

$("#pull-search").click(function(){
	var sHeight = $("#search-box").outerHeight();
	var tPadding = parseInt($("tree").css("padding-top"));
	
	open = !open ;
	
	if(open){
		sHeight = -sHeight ;
		$("#pull-down").attr('src','../img/arrow-up-small.png');
	}
	else {
		$("#pull-down").attr('src','../img/arrow-down-small.png');
	}
	
	$("#search-box").slideToggle({duration: 'slow', step: function(){
      
      $(".tree-panel").css({'padding-top': tPadding - sHeight}) ;
      
	}});
});




