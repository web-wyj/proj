let data = {
	isTempSwOpen: false,
	isLightSwOpen: false,
	isMusicSwOpen: false,
	isDoorSwOpen: false,
};

var app = new Vue({
	el: "#smart-home-app",
	data: {
		tempSwOuter:{
			'sw-open-outer' : data.isTempSwOpen,
			'sw-close-outer': !data.isTempSwOpen
		},
		tempSwInner:{
			'sw-open-inner' : data.isTempSwOpen,
			'sw-close-inner': !data.isTempSwOpen
		},
		lightSwOuter:{
			'sw-open-outer' : data.isLightSwOpen,
			'sw-close-outer': !data.isLightSwOpen
		},
		lightSwInner:{
			'sw-open-inner' : data.isLightSwOpen,
			'sw-close-inner': !data.isLightSwOpen
		},
		musicSwOuter:{
			'sw-open-outer' : data.isMusicSwOpen,
			'sw-close-outer': !data.isMusicSwOpen
		},
		musicSwInner:{
			'sw-open-inner' : data.isMusicSwOpen,
			'sw-close-inner': !data.isMusicSwOpen
		},
		doorSwOuter:{
			'sw-open-outer' : data.isDoorSwOpen,
			'sw-close-outer': !data.isDoorSwOpen
		},
		doorSwInner:{
			'sw-open-inner' : data.isDoorSwOpen,
			'sw-close-inner': !data.isDoorSwOpen
		},
		changeSwitch: function(ctype){
			switch(ctype.toLowerCase()){
				case "temp":
					data.isTempSwOpen = !data.isTempSwOpen;
					this.tempSwOuter = {
						'sw-open-outer' : data.isTempSwOpen,
						'sw-close-outer': !data.isTempSwOpen
					};
					this.tempSwInner = {
						'sw-open-inner' : data.isTempSwOpen,
						'sw-close-inner': !data.isTempSwOpen
					};
					this.livingRoomTemp = Number(data.isTempSwOpen)*10+15;
					this.bedroomTemp = Number(data.isTempSwOpen)*10+15;
					this.studyRoomTemp = Number(data.isTempSwOpen)*10+15;
					this.ctrlAjax("t_4_"+this.livingRoomTemp);
					console.log("空调" + (data.isTempSwOpen?"开启":"关闭"));
					break;
				case "light":
					data.isLightSwOpen = !data.isLightSwOpen;
					this.lightSwOuter = {
						'sw-open-outer' : data.isLightSwOpen,
						'sw-close-outer': !data.isLightSwOpen
					};
					this.lightSwInner = {
						'sw-open-inner' : data.isLightSwOpen,
						'sw-close-inner': !data.isLightSwOpen
					};
					this.livingRoomLight = Number(data.isLightSwOpen);
					this.bedroomLight = Number(data.isLightSwOpen);
					this.studyRoomLight = Number(data.isLightSwOpen);
					this.ctrlAjax("l_4_"+this.livingRoomLight);
					console.log("灯光" + (data.isLightSwOpen?"开启":"关闭"));
					break;
				case "music":
					data.isMusicSwOpen = !data.isMusicSwOpen;
					this.musicSwOuter = {
						'sw-open-outer' : data.isMusicSwOpen,
						'sw-close-outer': !data.isMusicSwOpen
					};
					this.musicSwInner = {
						'sw-open-inner' : data.isMusicSwOpen,
						'sw-close-inner': !data.isMusicSwOpen
					};
					console.log("音乐" + (data.isMusicSwOpen?"开启":"关闭"));
					break;
				case "door":
					data.isDoorSwOpen = Number(!data.isDoorSwOpen);
					this.doorSwOuter = {
						'sw-open-outer' : data.isDoorSwOpen,
						'sw-close-outer': !data.isDoorSwOpen
					};
					this.doorSwInner = {
						'sw-open-inner' : data.isDoorSwOpen,
						'sw-close-inner': !data.isDoorSwOpen
					};
					this.someOneInDoor = '0';
					// console.log(this.someOneInDoor);
					this.ctrlAjax("d_"+data.isDoorSwOpen);
					console.log("门" + (data.isDoorSwOpen?"开启":"关闭"));
					break;
			}
		},
		isMoreControl: false,
		isTempControl: false,
		isLightControl: false,
		isMusicControl: false,
		isDoorControl: false,
		getMoreControl: function(){
			this.isMoreControl = true;
		},
		cancelMoreControl: function(){
			this.isMoreControl = false;
		},
		cancelAllControl: function(){
			this.isTempControl = false;
			this.isLightControl = false;
			this.isMusicControl = false;
			this.isDoorControl = false;
		},
		getTempControl: function(){
			this.getMoreControl();
			this.cancelAllControl();
			this.isTempControl = true;
		},
		getLightControl: function(){
			this.getMoreControl();
			this.cancelAllControl();
			this.isLightControl = true;
		},
		getMusicControl: function(){
			this.getMoreControl();
			this.cancelAllControl();
			this.isMusicControl = true;
		},
		getDoorControl: function(){
			this.getMoreControl();
			this.cancelAllControl();
			this.isDoorControl = true;
		},
		setTempColor: function(rangeValue,room){
			if(room=="livingRoom"){
				if(this.livingRoomTemp != this._livingRoomTemp){
					this.ctrlAjax("t_1_"+this.livingRoomTemp);
					this._livingRoomTemp=this.livingRoomTemp;
				}
			}else if(room=="bedroom"){
				// console.log("l_2_"+this.bedroomLight);
				if(this.bedroomTemp != this._bedroomTemp){
					this.ctrlAjax("t_2_"+this.bedroomTemp);
					this._bedroomTemp=this.bedroomTemp;
				}
			}else if(room=="studyRoom"){
				// console.log("l_3_"+this.studyRoomLight);
				if(this.studyRoomTemp != this._studyRoomTemp){
					this.ctrlAjax("t_3_"+this.studyRoomTemp);
					this._studyRoomTemp=this.studyRoomTemp;
				}
			}
			if(this.livingRoomTemp==15 && this.bedroomTemp==15 && this.studyRoomTemp==15){
				data.isTempSwOpen = false;
				this.tempSwOuter = {
					'sw-open-outer' : data.isTempSwOpen,
					'sw-close-outer': !data.isTempSwOpen
				};
				this.tempSwInner = {
					'sw-open-inner' : data.isTempSwOpen,
					'sw-close-inner': !data.isTempSwOpen
				};
			}else{
				data.isTempSwOpen = true;
				this.tempSwOuter = {
					'sw-open-outer' : data.isTempSwOpen,
					'sw-close-outer': !data.isTempSwOpen
				};
				this.tempSwInner = {
					'sw-open-inner' : data.isTempSwOpen,
					'sw-close-inner': !data.isTempSwOpen
				};
			}
			return{
				background: "linear-gradient(to right, #059CFA, #059CFA " + (rangeValue-15)*100/(30-15) + "%, white " + (rangeValue-15)*100/(30-15) + "%)"
			}
		},
		setLightColor: function(rangeValue,room){
			if(room=="livingRoom"){
				// console.log(this.livingRoomLight);
				// console.log("灯光" + (data.isLightSwOpen?"开启":"关闭"));
				
				if(this.livingRoomLight != this._livingRoomLight){
					this.ctrlAjax("l_1_"+this.livingRoomLight);
					this._livingRoomLight=this.livingRoomLight;
					// console.log("l_1_"+this.livingRoomLight);
					// console.log(rangeValue);
				}
			}else if(room=="bedroom"){
				// console.log("l_2_"+this.bedroomLight);
				if(this.bedroomLight != this._bedroomLight){
					this.ctrlAjax("l_2_"+this.bedroomLight);
					this._bedroomLight=this.bedroomLight;
				}
			}else if(room=="studyRoom"){
				// console.log("l_3_"+this.studyRoomLight);
				if(this.studyRoomLight != this._studyRoomLight){
					this.ctrlAjax("l_3_"+this.studyRoomLight);
					this._studyRoomLight=this.studyRoomLight
				}
			}
			if(this.livingRoomLight==0 && this.bedroomLight==0 && this.studyRoomLight==0){
				data.isLightSwOpen = false;
				this.lightSwOuter = {
					'sw-open-outer' : data.isLightSwOpen,
					'sw-close-outer': !data.isLightSwOpen
				};
				this.lightSwInner = {
					'sw-open-inner' : data.isLightSwOpen,
					'sw-close-inner': !data.isLightSwOpen
				};
			}else{
				data.isLightSwOpen = true;
				this.lightSwOuter = {
					'sw-open-outer' : data.isLightSwOpen,
					'sw-close-outer': !data.isLightSwOpen
				};
				this.lightSwInner = {
					'sw-open-inner' : data.isLightSwOpen,
					'sw-close-inner': !data.isLightSwOpen
				};
			}
			return{
				background: "linear-gradient(to right, #059CFA, #059CFA " + (rangeValue-0)*100/(1-0) + "%, white " + (rangeValue-0)*100/(1-0) + "%)"
			}
			// return{
			// 	background: "linear-gradient(to right, #059CFA, #059CFA " + rangeValue + "%, white " + rangeValue + "%)"
			// }
		},
		livingRoomTemp: "15",
		bedroomTemp: "15",
		studyRoomTemp: "15",
		_livingRoomTemp: "15",
		_bedroomTemp: "15",
		_studyRoomTemp: "15",
		livingRoomLight: "0",
		bedroomLight: "0",
		studyRoomLight: "0",
		_livingRoomLight: "0",
		_bedroomLight: "0",
		_studyRoomLight: "0",
		musicName:"",
		musicPlay: function(musicName){
			console.log("m_");
			console.log(musicName);
			console.log("m_"+musicName);
			this.ctrlAjax("m_"+musicName);
		},
		musicPause: function(){
			this.ctrlAjax("m_0");
		},
		someOneInDoor: "0",
		weatherCode: 0,
		weatherArray: [
			{cn: "晴", en: "sunny"},
			{cn: "多云", en: "cloudy"},
			{cn: "雨", en: "rainy"},
			{cn: "彩虹", en: "rainbow"},
			{cn: "夜晚", en: "starry"},
			{cn: "暴风雨", en: "stormy"},
			{cn: "雪", en: "snowy"},
		],
		weatherCssArray:[
			{w1: "w1-sunny", w2: "w2-sunny"},
			{w1: "w1-cloudy", w2: "w2-cloudy"},
			{w1: "w1-rainy", w2: "w2-rainy"},
			{w1: "w1-rainbow", w2: "w2-rainbow"},
			{w1: "w1-starry", w2: "w2-starry"},
			{w1: "w1-stormy", w2: "w2-stormy"},
			{w1: "w1-snowy", w2: "w2-snowy"},
		],
		ctrlAjax: function(data){
			var url="http://192.168.155.1:8080/smarthouse/res.do?text=";
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(4 == xhr.readyState && 200 == xhr.status){
					// (succeed && succeed()) || console.log();
					// var obj = JSON.parse(xhr.responseText);
					// console.log(xhr.responseText);
				}else if(404 == xhr.status){
					console.log("404: Page not found");
				}
			};
			xhr.open("GET",url+data,true);
			xhr.send();		
		}
	}
});

