// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron')

const enumDock = {
  'S1':0,
  'S2':1,
  'Day':2
}

let share_S_Out = require('./data/共享小车-郊区.json').filter((e)=>{return(e.coords.length>1)});
let share_S_In = require('./data/共享小车-城区.json').filter((e)=>{return(e.coords.length>1)});
let share_L = require('./data/共享大车.json').filter((e)=>{return(e.coords.length>1)});
let UGV = require('./data/无人车.json').filter((e)=>{return(e.coords.length>1)});
let TOB = require('./data/TOB大车.json').filter((e)=>{return(e.coords.length>1)});
let plot_S = require('./data/小区小车.json').filter((e)=>{return(e.coords.length>1)});
let plot_L = require('./data/小区大车.json').filter((e)=>{return(e.coords.length>1)});
let service_S_1 = require('./data/公务小车01.json').filter((e)=>{return(e.coords.length>1)});
let service_S_2 = require('./data/公务小车02.json').filter((e)=>{return(e.coords.length>1)});
let total = require('./data/total.group.json').filter((e)=>{return(e.coords.length>1)});
share_S_Out = share_S_Out.concat(share_S_Out)
share_S_In = share_S_In.concat(share_S_In)
share_L = share_L.concat(share_L)
UGV = UGV.concat(UGV);
TOB = TOB.concat(TOB);
plot_S = plot_S.concat(plot_S);
plot_L = plot_L.concat(plot_L);
service_S_1 = service_S_1.concat(service_S_1);
service_S_2 = service_S_2.concat(service_S_2);
// total = total.concat(total);

// const total = service_S_1.concat(service_S_2,share_L,share_S_In,share_S_Out,UGV,plot_L,plot_S,TOB).filter((e)=>{return(e.coords.length>1)});
window.total = total;
window.__slider=0;
window.__dock=null;
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
  console.log(arg);
});
setTimeout(()=>{
  myChart.setOption(option);
  setInterval(()=>{
    if(window.__changed && window.__dock == 0){
      window.__changed = false;
      option.series[1].lineStyle.normal.color=(arg)=>{
        console.log(arg);
        if(arg.dataIndex/option.series[1].data.length < window.__slider){
          return '#01ba48'
        }
        else{
          return '#ffffff'
        }
      }
      option.series[2].lineStyle.normal.color=(arg)=>{
        if(arg.dataIndex/option.series[2].data.length < window.__slider){
          return '#01ba48'
        }
        else{
          return '#ffffff'
        }
      }
      option.series[3].lineStyle.normal.color=(arg)=>{
        if(arg.dataIndex/option.series[3].data.length < window.__slider){
          return '#e2d704'
        }
        else{
          return '#ffffff'
        }
      }
      option.series[4].lineStyle.normal.color=(arg)=>{
        if(arg.dataIndex/option.series[4].data.length < window.__slider){
          return '#7c19df'
        }
        else{
          return '#ffffff'
        }
      }
      // option.series = dataGroupOne.concat(dataGroupTwo);
      myChart.setOption(option)
    }else if(window.__changed && window.__dock == 1){
      window.__changed = false;
      // dataGroupOne.forEach(e=>{
      //   let H = e.__baseH+15+window.__slider*15;
      //   if(H > 130){H = 130}
      //   e.lineStyle.normal.color = 'hsl('+ H + ',50%,50%)';
      //   // return e;
      // })
      // dataGroupTwo.forEach(e=>{
      //   let H = e.__baseH+10+window.__slider*20;
      //   if(H > 130){H = 130}
      //   e.lineStyle.normal.color = 'hsl('+ H + ',50%,50%)';
      // })
      // option.series = dataGroupOne.concat(dataGroupTwo);
      // myChart.setOption(option)
    }else if(window.__changed && window.__dock == 2){
      window.__changed = false;
    //   const unit = 1/9;
    //   switch(parseInt(window.__slider*9)){
    //     case 0:
    //       dataGroupOne.forEach(e=>{
    //         let H = (e.__baseH + 100 - (window.__slider-0*unit)*600 > 40) ? (e.__baseH +100 - (window.__slider-0*unit)*600) : 40;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       dataGroupTwo.forEach(e=>{
    //         let H = (e.__baseH +100 - (window.__slider-0*unit)*600 > 40) ? (e.__baseH +100 - (window.__slider-0*unit)*600) : 40;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       break;
    //     case 1:
    //       dataGroupOne.forEach(e=>{
    //         let H = (e.__baseH +40 - (window.__slider-1*unit)*400 > 0 ) ? (e.__baseH +40 - (window.__slider-1*unit)*400) : 0;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       dataGroupTwo.forEach(e=>{
    //         let H = (e.__baseH +40 - (window.__slider-1*unit)*400 > 0 ) ? (e.__baseH +40 - (window.__slider-1*unit)*400) : 0;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       break;
    //     case 2:
    //       dataGroupOne.forEach(e=>{
    //         let H = (e.__baseH +0 + (window.__slider-2*unit)*800 < 80 ) ? (e.__baseH +0 + (window.__slider-2*unit)*800) : 80;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       dataGroupTwo.forEach(e=>{
    //         let H = (e.__baseH +0 + (window.__slider-2*unit)*500 < 50 ) ? (e.__baseH +0 + (window.__slider-2*unit)*500) : 50;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       break;
    //     case 3:
    //       dataGroupOne.forEach(e=>{
    //         let H = (e.__baseH +80 + (window.__slider-3*unit)*300 < 110 ) ? (e.__baseH +80 + (window.__slider-3*unit)*300) : 110;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       dataGroupTwo.forEach(e=>{
    //         let H = (e.__baseH +50 + (window.__slider-3*unit)*300 < 80 ) ? (e.__baseH +50 + (window.__slider-3*unit)*300) : 80;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       break;
    //     case 5:
    //       dataGroupOne.forEach(e=>{
    //         let H = (e.__baseH +110 - (window.__slider-5*unit)*300 > 80 ) ? (e.__baseH +110 - (window.__slider-5*unit)*300) : 80;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       dataGroupTwo.forEach(e=>{
    //         let H = (e.__baseH +80 - (window.__slider-5*unit)*100 > 70 ) ? (e.__baseH +80 - (window.__slider-5*unit)*100) : 70;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       break;
    //     case 6:
    //       dataGroupOne.forEach(e=>{
    //         let H = (e.__baseH +80 - (window.__slider-6*unit)*600 > 20 ) ? (e.__baseH +80 - (window.__slider-6*unit)*600) : 20;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       dataGroupTwo.forEach(e=>{
    //         let H = (e.__baseH +70 - (window.__slider-6*unit)*700 > 0 ) ? (e.__baseH +70 - (window.__slider-6*unit)*700) : 0;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       break;
    //     case 7:
    //       dataGroupOne.forEach(e=>{
    //         let H = (e.__baseH +20 + (window.__slider-7*unit)*600 < 80 ) ? (e.__baseH +20 + (window.__slider-7*unit)*600) : 80;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       dataGroupTwo.forEach(e=>{
    //         let H = (e.__baseH +0 + (window.__slider-7*unit)*500 < 50 ) ? (e.__baseH +0 + (window.__slider-7*unit)*500) : 50;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       break;
    //     case 8:
    //       dataGroupOne.forEach(e=>{
    //         let H = (e.__baseH +80 + (window.__slider-8*unit)*400 < 120) ? (e.__baseH +80 + (window.__slider-8*unit)*400) : 120;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       dataGroupTwo.forEach(e=>{
    //         let H = (e.__baseH +50 + (window.__slider-8*unit)*500 < 100) ? (e.__baseH +50 + (window.__slider-8*unit)*500) : 100;
    //         H = RangeHandle(H,0,130);
    //         e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
    //       })
    //       break;
    //   }
    //   option.series = dataGroupOne.concat(dataGroupTwo);
    //   myChart.setOption(option)
    }
},300)
},1000)

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
          color: (setting)=>{return '#ffffff'},
          opacity: 0.1,
          width: 1
        }
      },
    },
    {
      __NO:1,
      __NAME:'共享小车郊区',
      animation:true,
      animationDelay:function(i){return i*100},
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: share_S_Out,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 0.1
        }
      },
      effect : {
        constantSpeed: 40,
        show: true,
        trailLength: 0.1,
        symbolSize: 1.5,
        delay:function(i){return i*100}
      },
      zlevel: 1,
    },
    {
      __NO:2,
      __NAME:'共享小车城区',
      animation:true,
      animationDelay:function(i){return i*100},
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: share_S_In,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 0.1
        }
      },
      effect : {
        constantSpeed: 40,
        show: true,
        trailLength: 0.1,
        symbolSize: 1.5,
        delay:function(i){return i*100}
      },
      zlevel: 2,
    },
    {
      __NO:3,
      __NAME:'共享大车',
      animation:true,
      animationDelay:function(i){return i*100},
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: share_L,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 0.1
        }
      },
      effect : {
        constantSpeed: 40,
        show: true,
        trailLength: 0.1,
        symbolSize: 1.5,
        delay:function(i){return i*100}
      },
      zlevel: 3,
    },
    {
      __NO:4,
      __NAME:'公务小车阶段一',
      animation:true,
      animationDelay:function(i){return i*100},
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: service_S_1,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 0.1
        }
      },
      effect : {
        constantSpeed: 40,
        show: true,
        trailLength: 0.1,
        symbolSize: 1.5,
        delay:function(i){return i*100}
      },
      zlevel: 4,
    },
    {
      __NO:5,
      __NAME:'公务小车阶段二',
      animation:true,
      animationDelay:function(i){return i*100},
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: service_S_2,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 0.1
        }
      },
      effect : {
        constantSpeed: 40,
        show: true,
        trailLength: 0.1,
        symbolSize: 1.5,
        delay:function(i){return i*100}
      },
      zlevel: 5,
    },
    {
      __NO:6,
      __NAME:'无人车',
      animation:true,
      animationDelay:function(i){return i*100},
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: UGV,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 0.1
        }
      },
      effect : {
        constantSpeed: 40,
        show: true,
        trailLength: 0.1,
        symbolSize: 1.5,
        delay:function(i){return i*100}
      },
      zlevel: 6,
    },
    {
      __NO:7,
      __NAME:'小区小车',
      animation:true,
      animationDelay:function(i){return i*100},
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: plot_S,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 0.1
        }
      },
      effect : {
        constantSpeed: 40,
        show: true,
        trailLength: 0.1,
        symbolSize: 1.5,
        delay:function(i){return i*100}
      },
      zlevel: 7,
    },
    {
      __NO:8,
      __NAME:'小区大车',
      animation:true,
      animationDelay:function(i){return i*100},
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: plot_L,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 0.1
        }
      },
      effect : {
        constantSpeed: 40,
        show: true,
        trailLength: 0.1,
        symbolSize: 1.5,
        delay:function(i){return i*100}
      },
      zlevel: 8,
    },
    {
      __NO:9,
      __NAME:'TOB',
      animation:true,
      animationDelay:function(i){return i*100},
      type: 'lines',
      coordinateSystem: 'bmap',
      polyline: true,
      data: TOB,
      silent: true,
      lineStyle: {
        normal: {
          color: '#ffffff',
          opacity: 0.1,
          width: 0.1
        }
      },
      effect : {
        constantSpeed: 40,
        show: true,
        trailLength: 0.1,
        symbolSize: 1.5,
        delay:function(i){return i*100}
      },
      zlevel: 9,
    }
  ]
}

myChart.setOption(option)

myChart.setOption(option)

window.onresize=()=>{myChart.resize()}
