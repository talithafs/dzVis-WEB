var vPressed, mPressed = false;
var data, graphArea, tree, details, treePanel = undefined;
var dataX, treeY, dataWidth, pAreaWidth, treeHeight, treePanelHeight, detailsHeight;
var onLeftBorder, onMiddleBorder = false;


$("#data").mousemove(function(e){
	/*e.offsetX < border_width - borda esquerda
	 *e.offsetX > $(this).innerWidth() - borda direita
	 *e.offsetY < border_width - borda superior
	 *e.offsetY > $(this).innerHeight() - borda inferior */
	
	if(e.offsetX > $(this).innerWidth()){
		$(this).addClass("on-vertical-border");
		onLeftBorder = true; 
	}
	else{
		$(this).removeClass("on-vertical-border");
		onLeftBorder = false ;
	}
});

$("#details").mousemove(function(e){
	var borderWidth = parseInt($(this).css('border-width'));
	
	if(e.offsetY < borderWidth){
		$(this).addClass("on-horizontal-border");
		onMiddleBorder = true; 
	}
	else{
		$(this).removeClass("on-horizontal-border");
		onMiddleBorder = false ;
	}
});

$("#data").mousedown(function(e) {
	
	if(onLeftBorder){
		data = $(this) ;
		graphArea = $("#graphingArea");
		vPressed = true;
		dataX = e.pageX;
		dataWidth = data.width();
		pAreaWidth = graphArea.width();
		data.addClass("no-selection");
		graphArea.addClass("no-selection");
	}
});

$("#details").mousedown(function(e) {
	
	if(onMiddleBorder){
		tree = $('#tree') ;
		treePanel = $(".tree-panel");
		details = $("#details");
		mPressed = true;
		treeY = e.pageY;
		treeHeight = tree.height();
		treePanelHeight = treePanel.height();
		detailsHeight = details.height();
		tree.addClass("no-selection");
		details.addClass("no-selection");
	}
});

$(document).mousemove(function(e) {
	if(vPressed) {
		data.width(dataWidth+(e.pageX-dataX));
		graphArea.width(pAreaWidth - (e.pageX-dataX));
	}
	if(mPressed){
		tree.height(treeHeight + (e.pageY-treeY));
		treePanel.height(treePanelHeight + (e.pageY-treeY));
		details.height(detailsHeight - (e.pageY-treeY));
	}
});

$(document).mouseup(function() {
	if(vPressed) {
		graphArea.removeClass("no-selection");
		data.removeClass("no-selection");
		vPressed = false;
	}
	if(mPressed){
		tree.removeClass("no-selection");
		details.removeClass("no-selection");
		mPressed = false ;
	}
});
