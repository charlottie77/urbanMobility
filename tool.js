let share_S_Out = require('./data/共享小车-郊区.json').filter((e)=>{return(e.coords.length>1)});
let share_S_In = require('./data/共享小车-城区.json').filter((e)=>{return(e.coords.length>1)});
let share_L = require('./data/共享大车.json').filter((e)=>{return(e.coords.length>1)});
let UGV = require('./data/无人车.json').filter((e)=>{return(e.coords.length>1)});
let TOB = require('./data/TOB大车.json').filter((e)=>{return(e.coords.length>1)});
let plot_S = require('./data/小区小车.json').filter((e)=>{return(e.coords.length>1)});
let plot_L = require('./data/小区大车.json').filter((e)=>{return(e.coords.length>1)});
let service_S_1 = require('./data/公务小车01.json').filter((e)=>{return(e.coords.length>1)});
let service_S_2 = require('./data/公务小车02.json').filter((e)=>{return(e.coords.length>1)});

share_S_Out = share_S_Out.map((e,i)=>{
  e.__type = 'share_S_Out',
  e.__perc = i/share_S_Out.length
  return e;
})
share_S_In = share_S_In.map((e,i)=>{
  e.__type = 'share_S_In',
  e.__perc = i/share_S_In.length
  return e;
})
share_L = share_L.map((e,i)=>{
  e.__type = 'share_L',
  e.__perc = i/share_L.length
  return e;
})
UGV = UGV.map((e,i)=>{
  e.__type = 'UGV',
  e.__perc = i/UGV.length
  return e;
})
TOB = TOB.map((e,i)=>{
  e.__type = 'TOB',
  e.__perc = i/TOB.length
  return e;
})
plot_S = plot_S.map((e,i)=>{
  e.__type = 'plot_S',
  e.__perc = i/plot_S.length
  return e;
})
plot_L = plot_L.map((e,i)=>{
  e.__type = 'plot_L',
  e.__perc = i/plot_L.length
  return e;
})
service_S_1 = service_S_1.map((e,i)=>{
  e.__type = 'service_S_1',
  e.__perc = i/service_S_1.length
  return e;
})
service_S_2 = service_S_2.map((e,i)=>{
  e.__type = 'service_S_2',
  e.__perc = i/service_S_2.length
  return e;
})

const fs = require('fs');

let total = share_S_Out.concat(share_S_In,share_L,service_S_1,service_S_2,TOB,UGV,plot_S,plot_L)
fs.writeFileSync('./data/总数据.json',JSON.stringify(total));
// fs.writeFileSync('./data/share_S_Out.json',JSON.stringify(share_S_Out))
// fs.writeFileSync('./data/share_S_In.json',JSON.stringify(share_S_In))
// fs.writeFileSync('./data/share_L.json',JSON.stringify(share_L))
// fs.writeFileSync('./data/service_S_1.json',JSON.stringify(service_S_1))
// fs.writeFileSync('./data/service_S_2.json',JSON.stringify(service_S_2))
// fs.writeFileSync('./data/TOB.json',JSON.stringify(TOB))
// fs.writeFileSync('./data/UGV.json',JSON.stringify(UGV))
// fs.writeFileSync('./data/plot_L.json',JSON.stringify(plot_L))
// fs.writeFileSync('./data/plot_S.json',JSON.stringify(plot_S))
console.log('done')