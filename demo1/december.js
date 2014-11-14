(function(){
	//初期設定など
	var img_path = "../img/";
	var svgElement = document.getElementById("svg");
	svgElement.setAttribute("width", window.innerWidth-30);
	svgElement.setAttribute("height", window.innerHeight-30);
	svgElement.setAttribute("viewBox", "0 0 420 600");

	var s = Snap(svgElement);
	Snap.load(img_path + "tree.svg", function (f) {
	    g = f.select("g");
	    s.append(g);
	});
}())