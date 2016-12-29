var bindEventDrag = function(s) {
	bindEvent(s, 'mousedown', function(event){
		s.dataset.drag = 'true'
		s.dataset.diffX=event.clientX-s.offsetLeft;
		s.dataset.diffY=event.clientY-s.offsetTop;
		changeZIndex(s)
	})

	var body = e('body')
	bindEvent(body, 'mousemove', function(event) {
		let drag = s.dataset.drag
		let diffX = s.dataset.diffX
		let diffY = s.dataset.diffY
		if (drag == 'true') {
			var clientX = event.clientX
			var clientY = event.clientY
			s.style.left = clientX - diffX + 'px'
			s.style.top = clientY - diffY + 'px'
		}
	})
	bindEvent(body, 'mouseup', function() {
		removeDragAll()
	})

}

var changeZIndex = function(s) {
	var container = e('#sticker-container')
	var z = container.dataset.num
	if (s.style.zIndex != z){
		var list = es('.sticker')
		for(var i = 0; i < list.length; i++) {
			var item = list[i]
			let z = parseInt(item.style.zIndex) - 1
			item.style.zIndex = z
		}
		s.style.zIndex = z
	}
}

var bindEventDragAll = function() {
	var s = es('.sticker')
	for(let i = 0; i < s.length; i++) {
		bindEventDrag(s[i])
	}	
}

var removeDragAll = function() {
	var s = es('.sticker')
	for(let i = 0; i < s.length; i++) {
		s[i].dataset.drag = 'false'
	}
}

var removeEditableAll = function() {
	var list = es('div')
	for(let i = 0; i < list.length; i++) {
		let item = list[i]
		item.removeAttribute('contenteditable')
	}
}

var notEditable = function(target, selectorList) {
	for(var i = 0; i < selectorList.length; i++) {
		let s = selectorList[i]
		if(target.closest(s) != null) {
			return false
		}
	}
	return true
}

var bindEventEditable = function(selector) {
	bindAll(selector, 'mousedown', function(event){
		removeEditableAll()
		var target = event.target.closest(selector)
		target.setAttribute('contenteditable', 'true')
	})
}

var bindEventEditableAll = function() {
	var selectorList = ['.sticker-message', '.sticker-title', '.finish-time']

	for (var i = 0; i < selectorList.length; i++) {
		let s = selectorList[i]
		bindEventEditable(s)
	}

	var body = e('body')
	bindEvent(body, 'mousedown', function(event){
		var target = event.target
		if (notEditable(target, selectorList)) {
			log('null')
			removeEditableAll()
		}
	})
}


var __main = function() {
	bindEventDragAll()
	bindEventEditableAll()
}

var isDragging = false
var diffX=0
var diffY=0
__main()
