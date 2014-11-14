(function(){
	//初期設定など
	var img_path = "../img/";
	var svgElement = document.getElementById("svg");
	svgElement.setAttribute("width", window.innerWidth-30);
	svgElement.setAttribute("height", window.innerHeight-30);
	svgElement.setAttribute("viewBox", "0 0 420 600");

	var milkcocoa = new MilkCocoa("https://io-ti2dak0ql.mlkcca.com:443");
	var ds = milkcocoa.dataStore("december1");
	var s = Snap(svgElement);
	var colors = ["#0f1faf", "#580060", "#E60012", "#EBCA1B"];
	var items = {};

	Snap.load(img_path + "tree.svg", function (f) {
	    g = f.select("g");
	    s.append(g);
	    init();
	});

	function init() {
		createItem("id1", colors[0], "circle", 50, 200);
		createItem("id2", colors[1], "circle", 50, 280);
		createItem("id3", colors[2], "circle", 50, 360);
		createItem("id4", colors[3], "circle", 50, 440));

		createItem("id5", colors[0], "circle", 370, 200);
		createItem("id6", colors[1], "circle", 370, 280);
		createItem("id7", colors[2], "circle", 370, 360);
		createItem("id8", colors[3], "circle", 370, 440);

		ds.on("set", function(e) {
			items[e.id].attr({cx : e.value.x, cy : e.value.y});
		});
		ds.query({}).done(function(datas) {
			datas.forEach(function(data) {
				items[data.id].attr({cx : data.x, cy : data.y});
			});
		});
	}

	function createItem(id, color, shape, x, y) {
		var circle = s.circle(0, 0, 30);
		circle.attr({
		    fill: color,
		    stroke: "#333",
		    strokeWidth: 4
		});

		var dx = 0;
		var dy = 0;
		var ddx = 0;
		var ddy = 0;
		var dxDone = 0;
		var dyDone = 0;

		function onDragMove (dx, dy, posx, posy) {
		    dx = dx + dxDone;
		    dy = dy + dyDone;
			circle.attr({cx : dx, cy : dy});
		    ddx = dx;
		    ddy = dy;
		};
		function onDragEnd(e) {
		    dxDone = ddx;
		    dyDone = ddy;
		    ds.set(self.id, {
		    	x : Number( circle.attr("cx") ),
		    	y : Number( circle.attr("cy") )
		    });
		};
		circle.drag(onDragMove, null, onDragEnd);
		circle.attr({
			cx : x,
			cy : y
		});
		items[id] = circle;
	}

}())

