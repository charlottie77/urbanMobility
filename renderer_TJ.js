// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
const enumDock = {
  'S1':0,
  'S2':1,
  'Day':2
}
Number.prototype.toInt = function(){return(parseInt(this))}


window.__slider=0;
window.__dock=null;
window.__changed=false;

function setController ({slider,dock}){
  if(slider > 1){
    window.__slider = 1;
  }else if(slider < 0){
    window.__slider = 0;
  }else if(typeof slider === 'number'){
    window.__slider = slider;
  }else{
    console.error('slider数据异常',slider);
  }
  if(enumDock[dock] === undefined){
    window.__dock = null;
    console.error('dock数据异常',dock);
  }else{
    window.__dock = enumDock[dock];
  }
  window.__changed = true;
}

ipcRenderer.on('setControl',(evt,arg)=>{
  // console.log(arg)
  setController(arg)
});


// function TEMPLATE ({coords,W}) {
//   let H = (100-W*15>0)?(100-W*15):0;
//   return {
//     type: 'lines',
//     smooth:true,
//     coordinateSystem: 'bmap',
//     polyline: true,
//     data: [{coords:coords}],
//     silent: true,
//     lineStyle: {
//       normal: {
//         color: 'hsl('+H+', 50%, 50%)',
//         opacity: 1,
//         width: 1.5
//       }
//     },
//     __baseH:H
//   }
// }
// let groupOne = {};
// let dataGroupOne = [];
// busLines.forEach(e=>{
//   if(groupOne[e.W]===undefined){
//     groupOne[e.W]=TEMPLATE(e);
//   }else{
//     groupOne[e.W].data.push({coords:e.coords});
//   }
// })
// for(let e in groupOne ){
//   dataGroupOne.push(groupOne[e])
// }
// console.log(dataGroupOne);

// let fs = require('fs');
// fs.writeFileSync('./data/1.group.json',JSON.stringify(dataGroupOne));

// console.log(busLines[0].coords[0])
// TbusLines = busLines.map(e=>{
//   // let Rand = Math.random()*2
//   let T = TEMPLATE();
//   let H = (100-e.W*10>0)?(100-e.W*10):0;
//   T.data = [{coords:e.coords}];
//   T.lineStyle.normal.color='hsl('+ H + ',50%,50%)'
//   return T
// })
// let delta = 0;
// setInterval(function(){
//   delta += 1;
//   console.log(delta)
//   TbusLines.map(e=>{
//     e.lineStyle.normal.color
//     // let Rand = Math.random()*1
//     // let T = TEMPLATE();
//     // let H = (100-e.W*10+delta>0)?(100-e.W*10+delta):0;
//     // T.data = [{coords:e.coords}];
//     // T.lineStyle.normal.color='hsl('+ H + ',50%,50%)'
//     return T
//   });
//   // option.series = TbusLines;
//   // myChart.setOption(option);
// },750)

// console.log(TbusLines);
function RangeHandle(VAR,min,max){
  if(VAR > max){
    return max
  }else if(VAR < min){
    return min
  }else{
    return VAR
  }
}
setTimeout(()=>{
  myChart.setOption(option);
  setInterval(()=>{
    if(window.__changed && window.__dock == 0){
      window.__changed = false;
      dataGroupOne.forEach(e=>{
        let H = e.__baseH+window.__slider*15;
        if(H > 130){H = 130}
        e.lineStyle.normal.color = 'hsl('+ H + ',50%,50%)';
        // return e;
      })
      dataGroupTwo.forEach(e=>{
        let H = e.__baseH+window.__slider*10;
        if(H > 130){H = 130}
        e.lineStyle.normal.color = 'hsl('+ H + ',50%,50%)';
      })
      option.series = dataGroupOne.concat(dataGroupTwo);
      myChart.setOption(option)
    }else if(window.__changed && window.__dock == 1){
      window.__changed = false;
      dataGroupOne.forEach(e=>{
        let H = e.__baseH+15+window.__slider*15;
        if(H > 130){H = 130}
        e.lineStyle.normal.color = 'hsl('+ H + ',50%,50%)';
        // return e;
      })
      dataGroupTwo.forEach(e=>{
        let H = e.__baseH+10+window.__slider*20;
        if(H > 130){H = 130}
        e.lineStyle.normal.color = 'hsl('+ H + ',50%,50%)';
      })
      option.series = dataGroupOne.concat(dataGroupTwo);
      myChart.setOption(option)
    }else if(window.__changed && window.__dock == 2){
      window.__changed = false;
      // const unit = 1/9;
      // switch(parseInt(window.__slider*9)){
      //   case 0:
      //     dataGroupOne.forEach(e=>{
      //       let H = (e.__baseH + 100 - (window.__slider-0*unit)*600 > 40) ? (e.__baseH +100 - (window.__slider-0*unit)*600) : 40;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     dataGroupTwo.forEach(e=>{
      //       let H = (e.__baseH +100 - (window.__slider-0*unit)*600 > 40) ? (e.__baseH +100 - (window.__slider-0*unit)*600) : 40;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     break;
      //   case 1:
      //     dataGroupOne.forEach(e=>{
      //       let H = (e.__baseH +40 - (window.__slider-1*unit)*400 > 0 ) ? (e.__baseH +40 - (window.__slider-1*unit)*400) : 0;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     dataGroupTwo.forEach(e=>{
      //       let H = (e.__baseH +40 - (window.__slider-1*unit)*400 > 0 ) ? (e.__baseH +40 - (window.__slider-1*unit)*400) : 0;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     break;
      //   case 2:
      //     dataGroupOne.forEach(e=>{
      //       let H = (e.__baseH +0 + (window.__slider-2*unit)*800 < 80 ) ? (e.__baseH +0 + (window.__slider-2*unit)*800) : 80;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     dataGroupTwo.forEach(e=>{
      //       let H = (e.__baseH +0 + (window.__slider-2*unit)*500 < 50 ) ? (e.__baseH +0 + (window.__slider-2*unit)*500) : 50;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     break;
      //   case 3:
      //     dataGroupOne.forEach(e=>{
      //       let H = (e.__baseH +80 + (window.__slider-3*unit)*300 < 110 ) ? (e.__baseH +80 + (window.__slider-3*unit)*300) : 110;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     dataGroupTwo.forEach(e=>{
      //       let H = (e.__baseH +50 + (window.__slider-3*unit)*300 < 80 ) ? (e.__baseH +50 + (window.__slider-3*unit)*300) : 80;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     break;
      //   case 5:
      //     dataGroupOne.forEach(e=>{
      //       let H = (e.__baseH +110 - (window.__slider-5*unit)*300 > 80 ) ? (e.__baseH +110 - (window.__slider-5*unit)*300) : 80;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     dataGroupTwo.forEach(e=>{
      //       let H = (e.__baseH +80 - (window.__slider-5*unit)*100 > 70 ) ? (e.__baseH +80 - (window.__slider-5*unit)*100) : 70;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     break;
      //   case 6:
      //     dataGroupOne.forEach(e=>{
      //       let H = (e.__baseH +80 - (window.__slider-6*unit)*600 > 20 ) ? (e.__baseH +80 - (window.__slider-6*unit)*600) : 20;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     dataGroupTwo.forEach(e=>{
      //       let H = (e.__baseH +70 - (window.__slider-6*unit)*700 > 0 ) ? (e.__baseH +70 - (window.__slider-6*unit)*700) : 0;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     break;
      //   case 7:
      //     dataGroupOne.forEach(e=>{
      //       let H = (e.__baseH +20 + (window.__slider-7*unit)*600 < 80 ) ? (e.__baseH +20 + (window.__slider-7*unit)*600) : 80;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     dataGroupTwo.forEach(e=>{
      //       let H = (e.__baseH +0 + (window.__slider-7*unit)*500 < 50 ) ? (e.__baseH +0 + (window.__slider-7*unit)*500) : 50;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     break;
      //   case 8:
      //     dataGroupOne.forEach(e=>{
      //       let H = (e.__baseH +80 + (window.__slider-8*unit)*400 < 120) ? (e.__baseH +80 + (window.__slider-8*unit)*400) : 120;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     dataGroupTwo.forEach(e=>{
      //       let H = (e.__baseH +50 + (window.__slider-8*unit)*500 < 100) ? (e.__baseH +50 + (window.__slider-8*unit)*500) : 100;
      //       H = RangeHandle(H,0,130);
      //       e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      //     })
      //     break;
      // }
      const stageOne = [50,40,60,80,80,60,40,60,90].map((e)=>{return e/1.2});
      const stageTwo = [50,40,40,60,60,50,30,40,70].map((e)=>{return e/1.2});
      dataGroupOne.forEach(e=>{
        let H = (e.__baseH + stageOne[(window.__slider*9).toInt()] < 120) ? (e.__baseH + stageOne[(window.__slider*9).toInt()]) : 120
        e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      })
      dataGroupTwo.forEach(e=>{
        let H = (e.__baseH + stageTwo[(window.__slider*9).toInt()] < 120) ? (e.__baseH + stageTwo[(window.__slider*9).toInt()]) : 120
        e.lineStyle.normal.color = 'hsl('+ H + ',100%,50%)';
      })

      option.series = dataGroupOne.concat(dataGroupTwo);
      myChart.setOption(option,false,true)
    }
},300)
},1000)




var myChart = echarts.init(document.getElementById('main'));
var option = {
  bmap: {
    center: [117.225447,31.82287],
    zoom: 13,
    roam: true,
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
  series:dataGroupOne.concat(dataGroupTwo)
  // series: [
  //   {
  //     type: 'lines',
  //     coordinateSystem: 'bmap',
  //     polyline: true,
  //     data: busLines,
  //     silent: true,
  //     lineStyle: {
  //       normal: {
  //         // color: '#c23531',
  //         color: 'hsl(75, 50%, 50%)',
  //         opacity: 0.5,
  //         width: 2
  //       }
  //     },
  //     progressiveThreshold: 500,
  //     progressive: 200
  //   }
  // ]
}

myChart.setOption(option)
