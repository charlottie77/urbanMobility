// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const enumDock = {
  'S1':0,
  'S2':1,
  'Day':2
}

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



// function TEMPLATE ({coords,W}) {
//   let H = (100-W*15>0)?(100-W*15):0;
//   return {
//     type: 'lines',
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
// fs.writeFileSync('./data/2.group.json',JSON.stringify(dataGroupOne));

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

setTimeout(()=>{
  myChart.setOption(option);
  setInterval(()=>{
    if(window.__changed && window.__dock == 0){
      window.__changed = false;
      dataGroupOne.forEach(e=>{
        let H = e.__baseH+window.__slider*20;
        if(H > 130){H = 130}
        e.lineStyle.normal.color = 'hsl('+ H + ',50%,50%)';
        // return e;
      })
      dataGroupTwo.forEach(e=>{
        let H = e.__baseH+window.__slider*15;
        if(H > 130){H = 130}
        e.lineStyle.normal.color = 'hsl('+ H + ',50%,50%)';
      })
      option.series = dataGroupOne.concat(dataGroupTwo);
      myChart.setOption(option)
    }else if(window.__changed && window.__dock == 1){
      window.__changed = false;
      dataGroupOne.forEach(e=>{
        let H = e.__baseH+20+window.__slider*5;
        if(H > 130){H = 130}
        e.lineStyle.normal.color = 'hsl('+ H + ',50%,50%)';
        // return e;
      })
      dataGroupTwo.forEach(e=>{
        let H = e.__baseH+15+window.__slider*10;
        if(H > 130){H = 130}
        e.lineStyle.normal.color = 'hsl('+ H + ',50%,50%)';
      })
      option.series = dataGroupOne.concat(dataGroupTwo);
      myChart.setOption(option)
    }else if(window.__changed && window.__dock == 2){
      switch(parseInt(window.__slider*10)){
        case 0:
        
      }
    }
},300)
},2000)




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