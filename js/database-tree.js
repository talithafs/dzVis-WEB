var wholeTree = undefined ;
var done = false;

$('#search-field').keyup(function () {
	
	if(done) { clearTimeout(done); }
	
	done = setTimeout(function () {
	  	var value = $('#search-field').val();
	  	$('#tree').jstree(true).search(value);
	 }, 250);
	 
	 
});


$.getJSON('../data/menu.json', function(data) {
	
	var wholeTree = data ;
	var currentAttr, currentTable = undefined ;
	
	$('#tree').jstree({
	  "core" : {
	    // 'data' : {
				// "url" : "../data/menu.json",
				// "dataType" : "json" // needed only if you do not supply JSON headers
		 // } 
		 'data' : wholeTree 
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
	
	
	$("#tree").click(function() {
		
		var instance = $('#tree').jstree(true);
		var checked = instance.get_checked(true);
		var dim = checked.length ;
		var description = "" ;
		var view = "<p id = \"view-data\">Ver dados >> </p>";
		
		if(checked.length != 0){
			currentAttr = findAttr(checked, wholeTree);
			currentTable = findTable(currentAttr, wholeTree);
			
			description = "<h1>" + currentTable.text + "</h1>" + "<p>" + currentTable.description + "</p>" +
							"<h2>" + currentAttr.text + "</h2>" + "<p>" + currentAttr.description + "</p>" + view ; 
		}
		
		document.getElementById("details-field").innerHTML= description ;
	});
		
		// for(node in a){
			// alert(a[node].id);
		// }
		
		//alert(nodes[0].children[1].description);
		
		// lastNode = jQuery.map(wholeTree[0].children, function(obj) {
		    // if(obj.id === checked[dim-1].id)
		         // return obj ; // or return obj.name, whatever.
			// });
// 		
			// alert(lastNode[0].id);
		// });
		
		
		
		//lastNode = nodes.filter(function(data){return data.id === checked[dim-1].id; });
		//alert(lastNode.length);
		
        // var output="<ul>";
        // for (var i in data.users) {
            // output+="<li>" + data.users[i].firstName + " " + data.users[i].lastName + "--" + data.users[i].joined.month+"</li>";
        // }
// 
        // output+="</ul>";
        // document.getElementById("placeholder").innerHTML=output;
});

function findAttr(itens, tree) {
	var index = 0 ;
	var nodes, found = [] ;
	var dim = itens.length ;
	var searchId = 0 ;

	if(dim == 0 || itens[dim-1].type == "lvl") { 
		searchId = itens[dim-1].parent ; 
	}
	else {
		searchId = itens[dim-1].id ;
	}

	for(index in tree){
		nodes = jQuery.map(tree[index].children, function(obj) {
			if(obj.id === searchId) { return obj ; }
		});
		
		if(nodes[0] != undefined){
			found = found.concat(nodes);
		}
	}
	
	if(found.length != 1) { return "Erro: Foram encontrados " + found.length + " nós do tipo \'attr\' com o mesmo id." ; };
	
	return found[0] ;
}

function findTable(node, tree){
	var found = [] ;
	var instance = $('#tree').jstree(true) ;
	var nodeId = instance.get_parent(node);
	
	found = jQuery.map(tree, function(obj){
		if(obj.id === nodeId){ return obj ; }
	});

	if(found.length != 1) { return "Erro: Foram encontrados " + found.length + " nós do tipo \'root\' com o mesmo id." ; };
	
	return found[0] ;
}





