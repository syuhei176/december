(function(){
	var img_path = "../img/";
	var svgElement = document.getElementById("svg");
	svgElement.setAttribute("width", window.innerWidth-30);
	svgElement.setAttribute("height", window.innerHeight-30);
	svgElement.setAttribute("viewBox", "0 0 420 600");
	var s = Snap(svgElement);
	Snap.load(img_path + "tree.svg", function (f) {
	    g = f.select("g");
	    s.append(g);
	    init();
	});

	var colors = ["#0f1faf", "#580060", "#E60012", "#EBCA1B"];

	function init() {
		createItem(colors[0], "circle").setPos(50, 200);
		createItem(colors[1], "circle").setPos(50, 280);
		createItem(colors[2], "circle").setPos(50, 360);
		createItem(colors[3], "circle").setPos(50, 440);

		createItem(colors[0], "circle").setPos(370, 200);
		createItem(colors[1], "circle").setPos(370, 280);
		createItem(colors[2], "circle").setPos(370, 360);
		createItem(colors[3], "circle").setPos(370, 440);

	}

	function createItem(color, shape) {
		var item = new Item(color);
		return item;
	}
	function Item(color, shape) {
		this.circle = s.circle(0, 0, 30);
		this.circle.attr({
		    fill: color || "#E60012",
		    stroke: "#333",
		    strokeWidth: 4
		});
		this.circle.drag();
	}

	Item.prototype.setPos = function(x, y) {
		this.x = x;
		this.y = y;
		this.circle.transform('translate('+this.x+', '+this.y+')');
	}


}())