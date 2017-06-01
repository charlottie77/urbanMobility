Big Data & Urban mobility Demo Doc 
==================================

# 需求概述

> 本项目共有3个Dock控制块，每个Dock控制块分别对应不同的Slider输入参数；二者结合，用来控制输入图表的参数组合；图表接受这些参数组合，产生相应的变化，变化规则在后文详述；这些图表基于合肥某地区地图。

# 服务概述
> Demo内容共包括七种车的投放，其分别是：

+ 共享小车
+ 共享大车
+ 公务小车
+ ToB大车
+ 无人车
+ 小区小车
+ 小区大车

> 其中，前三种划分为第一阶段的服务，使用一个Dock控制，后四种划分为第二阶段的服务，使用另一个Dock控制。


# Dock & Slider
## Dock
> 共有3个Dock块：

+ 第一阶段服务 Dock S1
+ 第二阶段服务 Dock S2
+ 一天时间 Dock Day

## Slider
> 与每个Dock分别对应的Slider参数分别表示：

+ 第一阶段服务推行时间
+ 第二阶段服务推行时间
+ 一天的24小时

## JSON格式约定
```
{
  "dock":"S1",//枚举型，允许值'S1','S2','Day'
  "slider":0.86//浮点型，允许值0~1
}
```

# 图表概述

## 雷达图 + 柱状图

> 柱状图表示受Dock & Slider参数输入，而改变的参数，包括：

1. User Amount
2. Service Coverage Area
3. Service Types
4. Vehiche Total Amount
5. Time

> 柱状图与雷达图的对应关系, 以及雷达图的轴分别是什么参数<font color=#f08080>未知，@张绳宸</font>

### 第一阶段
> 随着第一阶段Slider数值增加：
> [其中 +代表数值增加，-代表下降， ==代表赋值]

1. User Amount +
2. Service Coverage Area +
3. Service Types == 3
4. Vehiche Total Amount -
5. Time + 

### 第二阶段
> 随着第二阶段Slider数值增加，其数值在<font color=#20b2aa>第一阶段的基础上</font>：
1. User Amount +
2. Service Coverage Area +
3. Service Types == 10
4. Vehiche Total Amount -
5. Time + 


### 一天变化
> 不变

## 3D柱状图
> [参考](http://gallery.echartsjs.com/editor.html?c=xSJUxZ-c6x)
> 3D柱状图，代表该地图区域的Request数量变化。 最高历史数据柱子，嵌套矮于等于最高历史数据的当前Request数据柱子。xy平面坐标系即代表地图区域，z轴代表Request数目。

### 第一阶段
> 整体布局呈，中心整体较高，四周较低趋势。
> 随着第一阶段Slider数值增加，整体历史数据缓慢变高，当前Request数量随机波动。

### 第二阶段
> 整体布局趋势不变。
> 随着第二阶段Slider数值增加，整体在<font color=#20b2aa>第一阶段的基础上</font>历史数据缓慢变高，当前Request数量随机波动，其中，周边区域变高程度较中心区域更明显。
> <font color=#000cd>附件图1</font>给出个别特殊景点坐标，其Request增加数量更加明显，即历史最高数据与当前数据变高程度更加明显。
> 
> 综上，变高程度：景点激活 > 周边 > 中心

### 一天变化
> 随着一天24小时变化
> 历史最高数据不变，当前Request数据根据早晚高峰数据变高，其余时间较为平缓的趋势而变化，具体时间段，参考<font color=#000cd>附件图2</font>中“堵车0-1”的趋势。

## 服务类型图
> 俗称走来走去图
> 其中有7种颜色的光点走动，分别代表7种车。

### 第一阶段
> 起初灰白点代表普通车辆，在地图上走动。（其使用的线路再议）
> 随着第一阶段Slider参数的提升，共享小车、共享大车、公务小车三种车从无到有、数量增多；相应的，灰白色普通车数量下降。

### 第二阶段
> 随着第二阶段Slider参数的提升，其余四种车从无到有，数量增多；相应的，灰白色的普通车数量下降程度更加明显。 第一阶段的三种车依旧存在。

### 一天变化 
> 根据<font color=#000cd>附件图2</font>中前9行数据，分别对9组路线数据进行24小时的权重变化。其中，权重使用走动的车辆点的数目来表示。

## 交通堵塞图
> 表示路段的交通拥堵情况

### 第一阶段
> 所有路段初始采用，采集路段时提供的权重数据来表示拥堵情况
> 随着第一阶段Slider参数的提升，整体拥堵情况逐步下降。文件一中的四条特殊路段，拥堵情况下降较慢，仍旧拥堵。

### 第二阶段
> 随着第二阶段Slider参数的提升，整体拥堵情况进一步下降。文件一种的四条特殊路段，拥堵情况下降显著变快。

### 一天变化
> 随着一天24h变化，拥堵情况参照<font color=#000cd>附件图2</font>中的拥堵变化趋势，具体变化的时间段见图二表格。

## 散点图
> 三种颜色的点在这里使用icon表示，分别代表

+ 普通车
+ 共享小车
+ 共享大车

> 三种车辆在划定的路线为中心随机行走。icon见<font color=#000cd>附件3</font>

### 第一阶段
> 随着第一阶段Slider参数的提升：

+ 普通车数量 -
+ 共享小车数量 +
+ 共享大车数量 +

### 第二阶段
> 随着第一阶段Slider参数的提升：

+ 普通车数量 -
+ 共享小车数量 +
+ 共享大车数量 ++ 明显增加

### 一天变化
> 三种车数量不变，但随机走动 

# CV识别部分
[github](https://github.com/charlottie77/smartUrban-cv.git)

## 参数配置
> [ 默认参数 ]

### slider识别  
>    - hsv空间红色范围参数
>    - upper_red [10, 255,255]
>    - lower_red [0, 100, 100]

> - 对于整个slider的高度，使用for循环，每3行做一次判断，判断当前的3行的red程度（使用red_num标识），
>    再判断当前三行上面三行的red程度（使用black_num标识），只有当前三行很红，且上方不红，才是滑块的边界，记录为当前slider的位置。 
> - red_num [100]
> - black_num [30]
> - slider识别区域 宽度略小于标定的长条区域 [width: 100, height: 500]

### doc识别 
> - Thresholding（黑色白色区分阈值）：[127]  
> - Thresholding方法：Simple Thresholding  
> - Thresholding type：THRESH_BINARY   
> - doc识别区域：doc位置标定中的四个点，px1-px4
> - doc识别信息：class_str
> - doc字典：dict_doc

### 位置标定
> - 所有的标定位置都在摄像头上标识出来
> - slider位置：是一个宽度固定的长条区域 [width: 200, height: 500]

### dock字符串转换规则
> <font color=#000cd>附件4</font>


# 所需素材
1. 3D柱状图配色
2. icon颜色以及对应