function replacePdom(doc) {
	var self = $(doc);
	self.replaceWith(self.children());
}

function tmpl(dom, find ,replace) {
	var text = $(dom).html();
    text = replaceAll(text, find, replace);
    $(dom).html(text);
};

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

jQuery.ajaxSetup({async:false});
