var map = new BMap.Map("myMap"); 
var point = new BMap.Point(120.156236, 30.254034);
map.centerAndZoom(point, 15); 
map.enableScrollWheelZoom();
var marker = new BMap.Marker(point);// 创建标注    
map.addOverlay(marker);

//控件
map.addControl(new BMap.NavigationControl());   
map.addControl(new BMap.ScaleControl());    
map.addControl(new BMap.OverviewMapControl());    
map.addControl(new BMap.MapTypeControl()); 
//显示西湖附近所有宾馆
var local = new BMap.LocalSearch(map, {
  renderOptions: {
    map: map,
    autoViewport: true,
    panel:"result"
  }
});
local.searchNearby("宾馆","西湖");
//能够查询杭州师范大学（杭州市海曙路58号）到某个宾馆的公交线路
var transit = new BMap.TransitRoute(map, {
  renderOptions: {
    map: map,
    panel: "result"
  }
});
marker.addEventListener("click",function(){
	transit.search("杭州市海曙路58号","西湖区文二路38号");
});
/*transit.search("杭州市海曙路58号","西湖区文二路38号");*/


//能够查询杭州师范大学（杭州市海曙路58号）到某个宾馆的公交线路
$('.ui-search-route-search').click(function(e){
	let end = $('#end');
	let text = end.val();
	if(!text){
		alert('终点不能为空');
		return;
	}

	let transit = new BMap.TransitRoute(map, {
    renderOptions: {
    map: map,
    panel: "result"
  
    }
    });
	map.clearOverlays();
	transit.search("杭州师范大学仓前新校区", text);
});

$('#myMap').click((e) => {
    $('#end').val(e.target.title);
});

//杭师大与西湖地图切换
$('.ui-select-xihu').click(function(){
	var point = new BMap.Point(120.156236, 30.254034);
	map.centerAndZoom(point, 15); 
	local.searchNearby("宾馆","西湖");

});



var list=[
	[120.011964,30.294703,"ex09-img1","东南一门"],
	[120.015749,30.29653,"ex09-img2","博文苑9号楼"],
	[120.016245,30.295881,"ex09-img3","博文苑6号楼"],
	[120.020403,30.295784,"ex09-img4","恕园2号楼"],
	[120.020045,30.294875,"ex09-img5","阿里巴巴商学院"],
	[120.018823,30.294392,"ex09-img6","恕园3号楼"],
 	[120.017709,30.296692,"ex09-img7","恕园19号楼"],
 	[120.020009,30.294154,"ex09-img8","南门"],
 	[120.014296,30.295144,"ex09-img9","体育场"]
];

var opts = {
	width: 250, // 信息窗口宽度    
  	height: 200, // 信息窗口高度    
}


function buliding(point,num,name){
	point.addEventListener("click",function(e){
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng,p.getPosition().lat);
		var div = document.createElement("div");
		div.style.width = '250px';
		div.style.height = '180px';
		var img = document.createElement('img');
		img.style.width = '250px';
		img.style.height = '150px';
		img.src = 'img/'+num+'.jpg';
		div.append(img);
		div.append(name);
		var infoWindow = new BMap.InfoWindow(div,opts);
		map.openInfoWindow(infoWindow,point);
	});
}


function setMarker(){
	let i;
	for(i=0;i< list.length;i++){
		let bulidPoint =  new BMap.Marker(new BMap.Point(list[i][0],list[i][1]));
		let name = list[i][3];
		let num = list[i][2];
		map.addOverlay(bulidPoint);
		buliding(bulidPoint,num,name);
	}
}

$('.ui-select-hznu').click(function(e){
	map.clearOverlays();
	var point = new BMap.Point(120.01525, 30.29515);
	map.centerAndZoom(point,18); 

	/*var opts = {
  	width: 250, // 信息窗口宽度    
  	height: 100, // 信息窗口高度    
  	title: "Hello" // 信息窗口标题   
	}
	var infoWindow = new BMap.InfoWindow("World", opts); // 创建信息窗口对象    
	map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口*/

	/*$.getJSON("js/ex09.json",function(data){
		alert(data[0].name);
		console.log("11");
	});
*/
	$('#result').empty();
	setMarker();

});


