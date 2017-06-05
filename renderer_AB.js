// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron')

const enumDock = {
  'S1':0,
  'S2':1,
  'Day':2
}

Number.prototype.toInt = function(){return(parseInt(this))}

// let share_S_Out = require('./data/共享小车-郊区.json').filter((e)=>{return(e.coords.length>1)});
// let share_S_In = require('./data/共享小车-城区.json').filter((e)=>{return(e.coords.length>1)});
// let share_L = require('./data/共享大车.json').filter((e)=>{return(e.coords.length>1)});
// let UGV = require('./data/无人车.json').filter((e)=>{return(e.coords.length>1)});
// let TOB = require('./data/TOB大车.json').filter((e)=>{return(e.coords.length>1)});
// let plot_S = require('./data/小区小车.json').filter((e)=>{return(e.coords.length>1)});
// let plot_L = require('./data/小区大车.json').filter((e)=>{return(e.coords.length>1)});
// let service_S_1 = require('./data/公务小车01.json').filter((e)=>{return(e.coords.length>1)});
// let service_S_2 = require('./data/公务小车02.json').filter((e)=>{return(e.coords.length>1)});
let total = require('./data/total.group.json').filter((e)=>{return(e.coords.length>1)});
let totalEffect = require('./data/总数据.json');
// share_S_Out = share_S_Out.concat(share_S_Out)
// share_S_In = share_S_In.concat(share_S_In)
// share_L = share_L.concat(share_L)
// UGV = UGV.concat(UGV);
// TOB = TOB.concat(TOB);
// plot_S = plot_S.concat(plot_S);
// plot_L = plot_L.concat(plot_L);
// service_S_1 = service_S_1.concat(service_S_1);
// service_S_2 = service_S_2.concat(service_S_2);
// total = total.concat(total);

// const total = service_S_1.concat(service_S_2,share_L,share_S_In,share_S_Out,UGV,plot_L,plot_S,TOB).filter((e)=>{return(e.coords.length>1)});
window.total = total;
window.__slider=1;
//var thres = 0;
window.__dock=0;
window.__changed=false;


function setController ({slider,dock}){
  if(slider > 1){
    __slider = 1;
  }else if(slider < 0){
    __slider = 0;
  }else if(typeof slider === number){
    __slider = slider;
  }else{
    console.error('slider数据异常',slider);
  }
  if(enumDock[dock] === undefined){
    __dock = null;
    console.error('dock数据异常',dock);
  }else{
    __dock = enumDock[dock];
  }
}

function RangeHandle(VAR,min,max){
  if(VAR > max){
    return max
  }else if(VAR < min){
    return min
  }else{
    return VAR
  }
}
ipcRenderer.on('setControl',(evt,arg)=>{
  // console.log(arg);
});
setTimeout(()=>{
  myChart.setOption(option);
  setInterval(()=>{
      if(window.__changed){
          window.__changed = false;
          option.series[1].lineStyle.normal.color=function(arg){
              // console.log('jjjjjj');
              // console.log(window.__changed);
              // console.log(window.__dock);
              if( window.__dock == 0) {
                  // window.__changed = false;
                  let thres = window.__slider * 0.7;
                  // console.log(thres);
                  if (arg.data.__type == 'share_S_Out' || arg.data.__type == 'share_S_In') {
                      return (arg.data.__perc < thres) ? '#01ba48' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'share_L'){
                      return (arg.data.__perc < thres) ? '#e2d704' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'service_S_1'){
                      return (arg.data.__perc < thres) ? '#7c19df' : '#ffffff'
                  }
                  else{
                      return '#ffffff'
                  }
              }
              else
              if( window.__dock == 1){
                  let thres = window.__slider * 0.7;
                  // console.log(thres);
                  if (arg.data.__type == 'share_S_Out' || arg.data.__type == 'share_S_In') {
                      return (arg.data.__perc < 0.7) ? '#01ba48' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'share_L'){
                      return (arg.data.__perc < 0.7) ? '#e2d704' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'service_S_1'){
                      return (arg.data.__perc < 0.7) ? '#7c19df' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'service_S_2'){
                      return (arg.data.__perc < thres) ? '#7c19df' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'UGV'){
                      return (arg.data.__perc < thres) ? '#e04402' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'plot_S'){
                      return (arg.data.__perc < thres) ? '#0daaff' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'plot_L'){
                      return (arg.data.__perc < thres) ? '#3003fa' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'TOB'){
                      return (arg.data.__perc < thres) ? '#ef8541' : '#ffffff'
                  }
                  else{
                      return '#ffffff'
                  }
              }
              else
              if( window.__dock == 2){
                  // let thres = window.__slider * 0.7;
                  // console.log(thres);
                  if (arg.data.__type == 'share_S_Out') {
                      const thres = [0.2,0.3,0.2,0.2,0.3,0.2,0.3,0.3,0.2];
                      return (arg.data.__perc < thres[(window.__slider*9).toInt()]) ? '#01ba48' : '#ffffff'
                  }
                  else
                  if (arg.data.__type == 'share_S_In') {
                      const thres = [0.4,0.5,0.6,0.4,0.6,0.4,0.7,0.6,0.4];
                      return (arg.data.__perc < thres[(window.__slider*9).toInt()]) ? '#01ba48' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'share_L'){
                      const thres = [0.2,0.3,0.5,0.4,0.6,0.4,0.5,0.3,0.1];
                      return (arg.data.__perc < thres[(window.__slider*9).toInt()]) ? '#e2d704' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'service_S_1'){
                      const thres = [0.0,0.3,0.6,0.4,0.5,0.6,0.2,0.0,0.0];
                      return (arg.data.__perc < thres[(window.__slider*9).toInt()]) ? '#7c19df' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'service_S_2'){
                      const thres = [0.0,0.1,0.3,0.2,0.2,0.3,0.1,0.0,0.0];
                      return (arg.data.__perc < thres[(window.__slider*9).toInt()]) ? '#7c19df' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'UGV'){
                      const thres = [0.2,0.4,0.2,0.1,0.1,0.3,0.4,0.2,0.1];
                      return (arg.data.__perc < thres[(window.__slider*9).toInt()]) ? '#e04402' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'plot_S'){
                      const thres = [0.2,0.4,0.2,0.2,0.4,0.3,0.4,0.4,0.1];
                      return (arg.data.__perc < thres[(window.__slider*9).toInt()]) ? '#0daaff' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'plot_L'){
                      const thres = [0.6,0.8,0.0,0.0,0.0,0.2,0.8,0.1,0.0];
                      return (arg.data.__perc < thres[(window.__slider*9).toInt()]) ? '#3003fa' : '#ffffff'
                  }
                  else
                  if(arg.data.__type == 'TOB'){
                      const thres = [0.0,0.2,0.4,0.6,0.3,0.4,0.3,0.0,0.0];
                      return (arg.data.__perc < thres[(window.__slider*9).toInt()]) ? '#ef8541' : '#ffffff'
                  }
                  else{
                      return '#ffffff'
                  }
              }
          }
          myChart.setOption({series:option.series},false,true);
      }
},300)
},1000);

var myChart = echarts.init(document.getElementById('main'));
var option = {
  bmap: {
    center: [117.265447,31.81287],
    zoom: 13,
    roam: false,
    mapStyle: {
      styleJson: [
          {
              "featureType": "land",
              "elementType": "geometry",
              "stylers": {
                  "color": "#212121"
              }
          },
          {
              "featureType": "building",
              "elementType": "geometry",
              "stylers": {
                  "color": "#2b2b2b"
              }
          },
          {
              "featureType": "highway",
              "elementType": "all",
              "stylers": {
                  "color": "#313131",
                  "lightness": -42,
                  "saturation": -91
              }
          },
          {
              "featureType": "arterial",
              "elementType": "all",
              "stylers": {
                  "color": "#313131",
                  "lightness": -77,
                  "saturation": -94
              }
          },
          {
              "featureType": "green",
              "elementType": "geometry",
              "stylers": {
                  "color": "#1b1b1b"
              }
          },
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": {
                  "color": "#181818"
              }
          },
          {
              "featureType": "subway",
              "elementType": "geometry.stroke",
              "stylers": {
                  "color": "#181818",
                  "visibility": "off"
              }
          },
          {
              "featureType": "railway",
              "elementType": "geometry",
              "stylers": {
                  "lightness": -52,
                  "visibility": "off"
              }
          },
          {
              "featureType": "all",
              "elementType": "labels.text.stroke",
              "stylers": {
                  "color": "#313131"
              }
          },
          {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": {
                  "color": "#8b8787"
              }
          },
          {
              "featureType": "manmade",
              "elementType": "geometry",
              "stylers": {
                  "color": "#1b1b1b"
              }
          },
          {
              "featureType": "local",
              "elementType": "geometry",
              "stylers": {
                  "lightness": -75,
                  "saturation": -91
              }
          },
          {
              "featureType": "subway",
              "elementType": "all",
              "stylers": {
                  "lightness": -65,
                  "visibility": "off"
              }
          },
          {
              "featureType": "railway",
              "elementType": "all",
              "stylers": {
                  "lightness": -40,
                  "visibility": "off"
              }
          },
          {
              "featureType": "boundary",
              "elementType": "geometry",
              "stylers": {
                  "color": "#8b8787",
                  "weight": "1",
                  "lightness": -29
              }
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": {
                  "visibility": "off"
              }
          },
          {
              "featureType": "label",
              "elementType": "all",
              "stylers": {
                  "visibility": "off"
              }
          },
          {
              "featureType": "background",
              "elementType": "all",
              "stylers": {
                  "color": "#1b1b1b"
              }
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": {
                  "color": "#000000"
              }
          },
          {
              "featureType": "background",
              "elementType": "all",
              "stylers": {
                  "color": "#000000"
              }
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": {
                  "color": "#000000",
                  "visibility": "off"
              }
          }
      ]
    }
  },
  series:[
    {
      __NO:0,
      __NAME:'总图',
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: total,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 1
        }
      },
    },
    {
      __NO:1,
      __NAME:'Controller',
      animation:true,
      animationDelay:function(i){return i*50},
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: totalEffect,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 0.1
        }
      },
      effect : {
        constantSpeed: 50,
        show: true,
        trailLength: 0.1,
        symbolSize: 1.5,
        delay:function(i){return i*50}
      },
      zlevel: 1,
    },
    // {
    //   __NO:2,
    //   __NAME:'共享小车城区',
    //   animation:true,
    //   animationDelay:function(i){return i*100},
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   polyline: true,
    //   data: share_S_In,
    //   silent: true,
    //   lineStyle: {
    //     normal: {
    //       color: '#ffffff',
    //       opacity: 0.1,
    //       width: 0.1
    //     }
    //   },
    //   effect : {
    //     constantSpeed: 40,
    //     show: true,
    //     trailLength: 0.1,
    //     symbolSize: 1.5,
    //     delay:function(i){return i*100}
    //   },
    //   zlevel: 2,
    // },
    // {
    //   __NO:3,
    //   __NAME:'共享大车',
    //   animation:true,
    //   animationDelay:function(i){return i*100},
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   polyline: true,
    //   data: share_L,
    //   silent: true,
    //   lineStyle: {
    //     normal: {
    //       color: '#ffffff',
    //       opacity: 0.1,
    //       width: 0.1
    //     }
    //   },
    //   effect : {
    //     constantSpeed: 40,
    //     show: true,
    //     trailLength: 0.1,
    //     symbolSize: 1.5,
    //     delay:function(i){return i*100}
    //   },
    //   zlevel: 3,
    // },
    // {
    //   __NO:4,
    //   __NAME:'公务小车阶段一',
    //   animation:true,
    //   animationDelay:function(i){return i*100},
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   polyline: true,
    //   data: service_S_1,
    //   silent: true,
    //   lineStyle: {
    //     normal: {
    //       color: '#ffffff',
    //       opacity: 0.1,
    //       width: 0.1
    //     }
    //   },
    //   effect : {
    //     constantSpeed: 40,
    //     show: true,
    //     trailLength: 0.1,
    //     symbolSize: 1.5,
    //     delay:function(i){return i*100}
    //   },
    //   zlevel: 4,
    // },
    // {
    //   __NO:5,
    //   __NAME:'公务小车阶段二',
    //   animation:true,
    //   animationDelay:function(i){return i*100},
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   polyline: true,
    //   data: service_S_2,
    //   silent: true,
    //   lineStyle: {
    //     normal: {
    //       color: '#ffffff',
    //       opacity: 0.1,
    //       width: 0.1
    //     }
    //   },
    //   effect : {
    //     constantSpeed: 40,
    //     show: true,
    //     trailLength: 0.1,
    //     symbolSize: 1.5,
    //     delay:function(i){return i*100}
    //   },
    //   zlevel: 5,
    // },
    // {
    //   __NO:6,
    //   __NAME:'无人车',
    //   animation:true,
    //   animationDelay:function(i){return i*100},
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   polyline: true,
    //   data: UGV,
    //   silent: true,
    //   lineStyle: {
    //     normal: {
    //       color: '#ffffff',
    //       opacity: 0.1,
    //       width: 0.1
    //     }
    //   },
    //   effect : {
    //     constantSpeed: 40,
    //     show: true,
    //     trailLength: 0.1,
    //     symbolSize: 1.5,
    //     delay:function(i){return i*100}
    //   },
    //   zlevel: 6,
    // },
    // {
    //   __NO:7,
    //   __NAME:'小区小车',
    //   animation:true,
    //   animationDelay:function(i){return i*100},
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   polyline: true,
    //   data: plot_S,
    //   silent: true,
    //   lineStyle: {
    //     normal: {
    //       color: '#ffffff',
    //       opacity: 0.1,
    //       width: 0.1
    //     }
    //   },
    //   effect : {
    //     constantSpeed: 40,
    //     show: true,
    //     trailLength: 0.1,
    //     symbolSize: 1.5,
    //     delay:function(i){return i*100}
    //   },
    //   zlevel: 7,
    // },
    // {
    //   __NO:8,
    //   __NAME:'小区大车',
    //   animation:true,
    //   animationDelay:function(i){return i*100},
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   polyline: true,
    //   data: plot_L,
    //   silent: true,
    //   lineStyle: {
    //     normal: {
    //       color: '#ffffff',
    //       opacity: 0.1,
    //       width: 0.1
    //     }
    //   },
    //   effect : {
    //     constantSpeed: 40,
    //     show: true,
    //     trailLength: 0.1,
    //     symbolSize: 1.5,
    //     delay:function(i){return i*100}
    //   },
    //   zlevel: 8,
    // },
    // {
    //   __NO:9,
    //   __NAME:'TOB',
    //   animation:true,
    //   animationDelay:function(i){return i*100},
    //   type: 'lines',
    //   coordinateSystem: 'bmap',
    //   polyline: true,
    //   data: TOB,
    //   silent: true,
    //   lineStyle: {
    //     normal: {
    //       color: '#ffffff',
    //       opacity: 0.1,
    //       width: 0.1
    //     }
    //   },
    //   effect : {
    //     constantSpeed: 40,
    //     show: true,
    //     trailLength: 0.1,
    //     symbolSize: 1.5,
    //     delay:function(i){return i*100}
    //   },
    //   zlevel: 9,
    // }
  ]
}

myChart.setOption(option)

myChart.setOption(option)

window.onresize=()=>{myChart.resize()}
