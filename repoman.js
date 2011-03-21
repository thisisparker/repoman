function addSpans(text) {
	return '<span class="repoman">'+text.replace(/\s/g,'</span> <span class="repoman">')+'</span>';
}
 
function populateTree($sel) {
	$sel.contents().each(function() {
		//if we have a text node, add some spans
		if (this.nodeType==Node.TEXT_NODE) {
			//don't replace empty text nodes / new lines
			if (this.nodeValue.length > 1 && this.nodeValue != "\n")
				$(this).replaceWith(addSpans(this.nodeValue));
		} else {
			populateTree($(this));
		}
	});
}

function createRedactionStyle() {
	var head = document.getElementsByTagName('head')[0],
	    style = document.createElement('style'),
	    rules = document.createTextNode('.redacted { background: #000; color: #000}');
	style.type = 'text/css';
	style.appendChild(rules);
	head.appendChild(style);
}

function rpmbookmarkletInit() {
	populateTree($("body"));

	createRedactionStyle();
	
	//bind to the click on each element
	$(".repoman").click(function() {
		$(this).toggleClass('redacted');
	});
}

