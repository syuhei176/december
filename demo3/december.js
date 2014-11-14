(function(){

	var milkcocoa = new MilkCocoa("https://io-ti2dak0ql.mlkcca.com:443");
	var ds = milkcocoa.dataStore("december");

	var img_path = "../img/";
	var svgElement = document.getElementById("svg");
	var tm = window.innerWidth / 420;
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
	var items = {};
	var idCount = 0;

	function init() {
		createItem(colors[0], "circle").setPos(50, 200);
		createItem(colors[1], "circle").setPos(50, 280);
		createItem(colors[2], "circle").setPos(50, 360);
		createItem(colors[3], "circle").setPos(50, 440);

		createItem(colors[0], "circle").setPos(370, 200);
		createItem(colors[1], "circle").setPos(370, 280);
		createItem(colors[2], "circle").setPos(370, 360);
		createItem(colors[3], "circle").setPos(370, 440);
		ds.on("set", function(e) {
			items[e.id].setPos(e.value.x, e.value.y);
		});
	}

	function createItem(color, shape) {
		var item = new Item(color);
		items[item.getID()] = item;
		return item;
	}
	function Item(color, shape) {
		var self = this;
		this.id = "id"+idCount;
		idCount++;
		this.circle = s.circle(0, 0, 30);
		this.circle.attr({
		    fill: color || "#E60012",
		    stroke: "#333",
		    strokeWidth: 4
		});
		this.pos = {x:0, y:0};

		var dx = 0;
		var dy = 0;
		var ddx = 0;
		var ddy = 0;
		this.dxDone = 0;
		this.dyDone = 0;

		function onDragMove (dx, dy, posx, posy) {
		    dx = dx + self.dxDone;
		    dy = dy + self.dyDone;
			self.circle.attr({cx : dx, cy : dy});
		    ddx = dx;
		    ddy = dy;
		};

		function onDragStart(x,y,e) {

		};

		function onDragEnd(e) {
		    self.dxDone = ddx;
		    self.dyDone = ddy;
		    ds.set(self.id, {
		    	x : Number( self.circle.attr("cx") ),
		    	y : Number( self.circle.attr("cy") )
		    });
		};
		this.circle.drag(onDragMove, onDragStart, onDragEnd);
	}

	Item.prototype.getID = function() {
		return this.id;
	}

	Item.prototype.setPos = function(x, y) {
		this.pos.x = x;
		this.pos.y = y;
		this.dxDone = x;
		this.dyDone = y;
		this.circle.attr({cx : this.pos.x, cy : this.pos.y});
	}


}())