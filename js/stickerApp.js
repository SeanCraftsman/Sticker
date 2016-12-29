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
	var list = es('.sticker')
	for(var i = 0; i < list.length; i++) {
		var item = list[i]
		let z = parseInt(item.style.zIndex) - 1
		item.style.zIndex = z
	}
	var container = e('#sticker-container')
	var z = container.dataset.num
	s.style.zIndex = z
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

var removeEditableAll = function(selector) {
	var list = es(selector)
	for(let i = 0; i < list.length; i++) {
		let item = list[i]
		item.removeAttribute('contenteditable')
	}
}

var bindEventEditable = function() {
	bindAll('.sticker-message', 'click', function(event){
		removeEditableAll('.sticker-message')
		var target = event.target
		target.setAttribute('contenteditable', 'true')
	})

	var body = e('body')
	bindEvent(body, 'mousedown', function(event){
		var target = event.target
		if (!target.classList.contains('sticker-message')) {
			removeEditableAll('.sticker-message')
		}
	})
}


var __main = function() {
	bindEventDragAll()
	bindEventEditable()
}

var isDragging = false
var diffX=0
var diffY=0
__main()
