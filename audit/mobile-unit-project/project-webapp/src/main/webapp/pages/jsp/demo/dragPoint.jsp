<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.bonc.com.cn/common/tag/cxt" prefix="cxt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <cxt:commonLinks />
    <script src="<%=request.getContextPath()%>/pages/js/zrender.min.js" ></script>
    <script src="<%=request.getContextPath()%>/pages/js/echarts4.min.js"></script>
    <script src="<%=request.getContextPath()%>/pages/js/jquery-ui.js"></script>
    <title>页面样式规范</title>
    <style>
        .point-list,#main{
            padding-top:20px;
            margin-right:10px;
            background:#fff;
        }
        .point-list li{
            width:100px;
            height:30px;
            line-height:30px;
            color:#fff;
            text-align:center;
            border-radius:4px;
            cursor:pointer;
            margin:4px auto;
        }
        .point-list li.bq{
            background:#ee854b;
        }
        .point-list li.km{
            background:#26baa4;
        }
    </style>
</head>
<body style="background:#efefef;">
<div class="page-content">
    <div class="col-xs-12 clearfix">
        <ul class="point-list pull-left">
            <li id="10000" class="bq" draggable="true" ondragstart="dragLabel(event)">标签1</li>
            <li id="10001" class="bq" draggable="true" ondragstart="dragLabel(event)">标签2</li>
            <li id="10002" class="bq" draggable="true" ondragstart="dragLabel(event)">标签3</li>
            <li id="10003" class="bq" draggable="true" ondragstart="dragLabel(event)">标签4</li>
            <br>
            <li id="12000" class="km" draggable="true" ondragstart="drag(event)">科目1</li>
            <li id="12001" class="km" draggable="true" ondragstart="drag(event)">科目2</li>
            <li id="12002" class="km" draggable="true" ondragstart="drag(event)">科目3</li>
            <li id="12003" class="km" draggable="true" ondragstart="drag(event)">科目4</li>
        </ul>
        <div id="main" class="pull-left" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    </div>
</div>
<script>
    var drop,allowDrop,drag ,dragLabel;
    $(function(){
        initCss();
        var dataKM = [
            {subjectId: "1001010101", subjectName: "科目1"},
            {subjectId: "1133010180", subjectName: "科目2"},
            {subjectId: "1151010101", subjectName: "科目3"},
            {subjectId: "1151020101", subjectName: "科目4"},
            {subjectId: "1151020301", subjectName: "科目5"},
            {subjectId: "1201900101", subjectName: "科目6"},
            {subjectId: "1201900201", subjectName: "科目7"},
            {subjectId: "1201900301", subjectName: "科目8"},
            {subjectId: "1211010101", subjectName: "科目9"},
            {subjectId: "1231030101", subjectName: "科目10"}
        ];
        var dataBQ = [
            {labelId: "100", labelName: "标签1", remark: null},
            {labelId: "101", labelName: "标签2", remark: null},
            {labelId: "110", labelName: "标签3", remark: null},
            {labelId: "137", labelName: "标签4", remark: null},
            {labelId: "143", labelName: "标签5", remark: null},
            {labelId: "151", labelName: "标签6", remark: null},
            {labelId: "152", labelName: "标签7", remark: null},
            {labelId: "153", labelName: "标签8", remark: null},
            {labelId: "156", labelName: "标签9", remark: null},
            {labelId: "158", labelName: "标签10", remark: null}
        ];
        var dataYW = [
            {analysisId: "100110010", analysisName: "根节点"}
        ];
        //-----拖拽部分
        allowDrop = function (ev){
            ev.preventDefault();
        };
        drop =function(ev){
            var obj=JSON.parse(ev.dataTransfer.getData("Text"));
            if(obj.type=="km"){
                createKmNode(ev.offsetX,ev.offsetY,obj.text,obj.id,true);
            }else{
                createBqNode(ev.offsetX,ev.offsetY,obj.text,obj.id,true);
            }
        };
        drag = function (ev){
            var obj ={};
            obj.text =$(ev.target).text();
            obj.id = $(ev.target).id;
            obj.type = "km"
            var jsonStr =  JSON.stringify(obj);
            ev.dataTransfer.setData("Text",jsonStr);
        };
        dragLabel = function (ev){
            var obj ={};
            obj.text =$(ev.target).text();
            obj.id = $(ev.target).id;
            obj.type = "bq"
            var jsonStr =  JSON.stringify(obj);
            ev.dataTransfer.setData("Text",jsonStr);
        };

        var zr = zrender.init(document.getElementById("main"),{devicePixelRatio:4});
        zr.topoNodes = [];
        zr.topoLines = [];
        var drawLine ;
        var isDrawing =false;

        var kmR=30,kmOpR=76,bqR=30,bqOpR=76;

        init(dataYW);


        function initCss(){
            var winH = $(window).height();
            var winW = $(window).width();
            $('.point-list').css({
                width:160,
                height:winH-30
            });
            $('#main').css({
                width:winW-210,
                height:winH-30
            })
        }

        function hidePop(clickNode,showThis){
            for(var i=0,n=zr.topoNodes.length;i<n;i++){
                if(clickNode&&clickNode === zr.topoNodes[i]  ){
                    var opNodes =zr.topoNodes[i].opNodeArr;
                    for(var j=0,k=opNodes.length;j<k;j++){
                        opNodes[j].ignore=!showThis;
                        if(isDrawing){
                            opNodes[j].ignore = true;
                        }
                    }
                }else{
                    zr.topoNodes[i].isShowOp = false;
                    var opNodes =zr.topoNodes[i].opNodeArr;
                    for(var j=0,k=opNodes.length;j<k;j++){
                        opNodes[j].ignore=true;
                    }
                }
            }
            zr.refreshImmediately();
        }
        //创建业务探索根节点
        function createRootNode(cx,cy,text,showOp){
            var shape = {
                cx: cx,
                cy: cy,
                r: 30
            }
            var style = {
                fill: '#4bacc6',
                stroke: '#cbeef4',
                text:text ,
                textFill:'#FFF',
                lineWidth:5
            }
            var opShapeR = 76;
            var opStyle = {
                fill: '#4bacc6',
                stroke: '#fff',
                textFill:'#fff',
                lineWidth:3
            };
            var opNodes =[{text:'数据',fn:showSJ},{text:'清屏',fn:clearAll},{text:'科目',fn:addKM},{text:'标签',fn:addBQ}];
            var attr = {id:"root",type:"root"};
            var node = addTopoNode(shape,style,attr,opShapeR,opStyle,opNodes,true) ;
            if(showOp){
                node.showOp();
            }
            return node;
        }
        //创建科目节点
        function createKmNode(cx,cy,text,id,initFlag){
            var shape = {
                cx: cx,
                cy: cy,
                r: kmR
            };
            var style = {
                fill: '#26baa4',
                stroke: '#a0f2e5',
                lineWidth:5,
                textFill:'#fff',
                text:text
            };
            var opStyle = {
                fill: '#26baa4',
                stroke: '#fff',
                textFill:'#fff',
                lineWidth:3
            };
            var opNodes =[ {text:'数据',fn:showSJ},{text:'连线',fn:drawRelation},{text:'删除',fn:delTopoNode},{text:'标签',fn:addBQ}];
            var attr = {id:id,type:"km"};
            var node = addTopoNode(shape,style,attr,kmOpR,opStyle,opNodes,initFlag) ;
            return node;
        }
        //创建标签节点
        function createBqNode(cx,cy,text,id,initFlag){
            var shape = {
                cx: cx,
                cy: cy,
                r: bqR
            };
            var style = {
                fill: '#ee854b',
                stroke: '#ffceb2',
                lineWidth:5,
                textFill:'#fff',
                text:text
            };
            var opStyle = {fill: '#ee854b',
                stroke: '#fff',
                textFill:'#fff',
                lineWidth:3
            };
            var opNodes =[ {text:'数据',fn:showSJ},{text:'连线',fn:drawRelation},{text:'删除',fn:delTopoNode},{text:'科目',fn:addKM}];
            var attr = {id:id,type:"bq"};
            var node = addTopoNode(shape,style,attr,bqOpR,opStyle,opNodes,initFlag) ;
            return node;
        }

        //初始化canvas
        function init(data){
            var cx =  zr.getWidth()/2;
            var cy = zr.getHeight()/2;
            createRootNode(cx,cy,'根节点',false);
        }
        //删除一个节点，并且删除与之相连的线
        function delTopoNode(node){
            var opNodeArr = node.opNodeArr;
            for(var i=0,n=node.opNodeArr.length;i<n;i++){
                var opNode= opNodeArr[i];
                zr.remove(opNode);
            }
            for(var i=0,n=zr.topoLines.length;i<n;i++){
                var line= zr.topoLines[i];
                if(line.fromNode===node ||line.toNode=== node  ){
                    zr.topoLines.splice(i,1);
                    zr.remove(line);
                    i--;
                    n--;
                }
            }
            for(var i=0,n=zr.topoNodes.length;i<n;i++){
                if(zr.topoNodes[i].attr.id==node.attr.id){
                    zr.topoNodes.splice(i,1);
                    zr.remove(node);
                    break;
                }
            }
        }
        //显示该节点的科目
        function addKM(node){
            var m = node.transformCoordToGlobal(node.shape.cx,node.shape.cy);
            var lineLength = 150;
            var ri = Math.round(Math.random()*20+30)
            var r =30;
            var opShapeR = 66;
            for(var i=0,n=dataKM.length;i<n;i++){
                var tnode = dataKM[i];
                var id = tnode.subjectId;
                var tx = lineLength*Math.cos(2*Math.PI/360*(i*360/n+ri))+m[0];
                var ty = lineLength*Math.sin(2*Math.PI/360*(i*360/n+ri))+m[1];
                var tp = createKmNode(tx,ty,tnode.subjectName,id,false);
                addTopoLine(node,tp,false);
            }
        }
        //显示该节点的标签
        function addBQ(node){
            var m = node.transformCoordToGlobal(node.shape.cx,node.shape.cy);
            var lineLength = 250;
            var ri =Math.round(Math.random()*20+50);
            for(var i=0,n=dataBQ.length;i<n;i++){
                var tnode = dataBQ[i];
                var id = tnode.labelId;
                var tx = lineLength*Math.cos(2*Math.PI/360*(i*360/n+ri))+m[0];
                var ty = lineLength*Math.sin(2*Math.PI/360*(i*360/n+ri))+m[1];
                var tp = createBqNode(tx,ty,tnode.labelName,id,false);
                addTopoLine(node,tp,false);
            }
        }
        //显示数据
        function showSJ(node){
            alert("弹出一个数据列表")
        }
        //清屏
        function clearAll(){
            for(var i=0,n=zr.topoLines.length;i<n;i++){
                var line= zr.topoLines[i];
                zr.remove(line);
            }
            zr.topoLines = [];
            var rootNode;
            for(var i=0,n=zr.topoNodes.length;i<n;i++){
                if(zr.topoNodes[i].attr.id=="root"){
                    rootNode= zr.topoNodes[i];
                }else{
                    zr.remove(zr.topoNodes[i]);
                }
            }
            zr.topoNodes = [];
            zr.topoNodes.push(rootNode);
        }
        //开始画线
        function drawRelation(node){
            var m = node.transformCoordToGlobal(node.shape.cx,node.shape.cy);
            drawLine = new  zrender.Line({
                shape:{
                    x1:m[0],
                    y1:m[1],
                    x2:this.event.zrX,
                    y2:this.event.zrY
                },
                style:{
                    stroke:"#666",
                    lineWidth:2
                },
                zlevel :1
            });
            drawLine.fromNode= node;
            zr.add(drawLine);
            hidePop(null,false);
            zr.on("mousemove",drawing);
            zr.on("contextmenu",cancelDraw);
            //zr.on("mouseout",cancelDraw);
            isDrawing = true;
        }
        //画线过程中
        function drawing(e){
            var x = e.event.zrX;
            var y = e.event.zrY;
            drawLine.attr({shape:{x2:x,y2:y}})
            if(e.target&&e.target.attr&&
               e.target.attr.type&&
               !(e.target===drawLine.fromNode)&&
               drawLine.fromNode.attr.type!=e.target.attr.type
            ){
                if(!(drawLine.toNode===e.target)){
                    drawLine.toNode = e.target;
                    //updateLineText(drawLine);
                    e.target.on("click",drawEnd);
                }
            }else{
                if(drawLine.toNode){
                    drawLine.toNode.off("click",drawEnd);
                    drawLine.toNode = null;
                }
                drawLine.attr({style:{stroke:"#666",text:""}})
            }
        }
        //取消画线，右键取消或画线完成调用
        function cancelDraw(e){
            zr.off("mousemove",drawing);
            zr.off("mouseup",cancelDraw);
            zr.off("mouseout",cancelDraw);
            zr.remove(drawLine);
            isDrawing = false;
        }
        //画线完成
        function drawEnd(e){
            drawLine.toNode.off("click",drawEnd);
            addTopoLine(drawLine.fromNode,drawLine.toNode);
            cancelDraw(e);
        }
        //添加一个节点
        function addTopoNode(shape,style,attr,opShapeR,opStyle,opNodes,initFlag){
            var zrW = zr.getWidth();
            var zrH = zr.getHeight();
            var tx =shape.cx ,ty=shape.cy,tR=shape.r;
            tx = tx<tR?tR:tx;
            ty = ty<tR?tR:ty;
            tx = tx>zrW-tR?zrW-tR:tx;
            ty = ty>zrH-tR?zrH-tR:ty;
            shape.cx = tx;
            shape.cy = ty;
            if(!initFlag){
                for(var i=0,n=zr.topoNodes.length;i<n;i++){
                    var oneNode = zr.topoNodes[i];
                    if(oneNode.attr.id==attr.id && oneNode.attr.type==attr.type){
                        return oneNode;
                    }
                }
            }
            var topoNode = new zrender.Circle({
                shape: shape,
                style: style  ,
                zlevel:2,
                draggable : true,
                attr :attr
            });
            topoNode.opNodeArr=[];
            topoNode.isShowOp = false;
            for(var i=0,n=opNodes.length;i<n;i++){
                var opNode = new zrender.Sector({
                    shape:{
                        cx : shape.cx,
                        cy :  shape.cy,
                        r  : opShapeR,
                        r0  : shape.r+style.lineWidth-1,
                        startAngle: (i*(360/n))/360*2*Math.PI,
                        endAngle: ((i+1)*(360/n))/360*2*Math.PI
                    },
                    style:opStyle,
                    zlevel:3,
                    fn : opNodes[i].fn
                });
                opNode.attr({style:{text:opNodes[i].text}})
                opNode.on("click",function(event){
                    var me = event.target;
                    if(me.fn && typeof me.fn == 'function'){
                        me.fn.call(event,topoNode);
                    }
                });
                topoNode.opNodeArr.push(opNode);
                zr.add(opNode);
                opNode.hide();
            }
            topoNode.on('drag',function(event){
                var me = event.target;
                hidePop(me,false);
                var m = me.transformCoordToGlobal(me.shape.cx,me.shape.cy);
                for(var i=0,  n =me.opNodeArr.length;i<n;i++){
                    me.opNodeArr[i].attr({shape:{cx:m[0],cy:m[1]}})
                }
            })
            topoNode.on('mousemove',function(e){
                //console.log(e)
            })
            topoNode.on('dragend',function(event){
                var me = event.target;
                if(me.isShowOp){
                    for(var i=0,  n =me.opNodeArr.length;i<n;i++){
                        me.opNodeArr[i].show();
                    }
                }
            });
            topoNode.showOp = function(){
                this.isShowOp = !this.isShowOp;
                hidePop(this,this.isShowOp);
            }
            topoNode.on("click",function(event){
                event.target.showOp();
            })
            zr.add(topoNode);
            zr.topoNodes.push(topoNode);
            topoNode.toJsonObject = function(){
                var obj = {};
                var m = topoNode.transformCoordToGlobal(topoNode.shape.cx,topoNode.shape.cy);
                obj.cx =m[0];
                obj.cy=m[1];
                obj.id=topoNode.attr.id;
                obj.type=topoNode.attr.type;
                obj.text =topoNode.style.text;
                return obj;
            }
            return topoNode;
        }
        //根据2个节点添加一条线，2个节点之间只能有1条线
        function addTopoLine(fromNode,toNode,initFlag){
            if(!initFlag){
                for(var i=0,n=zr.topoLines.length;i<n;i++){
                    var line = zr.topoLines[i];
                    if(line.fromNode===fromNode&& line.toNode===toNode){
                        return line;
                    }
                    if(line.fromNode===toNode&& line.toNode===fromNode){
                        return line;
                    }
                }
            }
            var from = fromNode.transformCoordToGlobal(fromNode.shape.cx,fromNode.shape.cy);
            var to = toNode.transformCoordToGlobal(toNode.shape.cx,toNode.shape.cy);
            var line = new zrender.Line({
                shape: {
                    x1: from[0],
                    y1: from[1],
                    x2: to[0],
                    y2:to[1]
                },
                zlevel:1
            });
            fromNode.on("drag",function(event){
                var me = event.target;
                var m = me.transformCoordToGlobal(me.shape.cx,me.shape.cy);
                line.attr({shape:{x1:m[0],y1:m[1]}});
            })
            toNode.on("drag",function(event){
                var me = event.target;
                var m = me.transformCoordToGlobal(me.shape.cx,me.shape.cy);
                line.attr({shape:{x2:m[0],y2:m[1]}});
            })
            line.fromNode = fromNode;
            line.toNode = toNode;
            line.isChange = false;
            zr.add(line);
            zr.topoLines.push(line);
            if((fromNode.attr.type=="km"&&toNode.attr.type=="bq")||(toNode.attr.type=="km"&&fromNode.attr.type=="bq")){
                line.on('dblclick',function(event){
                    hidePop(null,false);
                    var me = event.target;
                    me.stateFlag = !me.stateFlag;
                    me.isChange = true;
                    showLineState(me);
                });
            }
            line.toJsonObject = function(){
                var obj = {};
                obj.fromId = line.fromNode.attr.id;
                obj.toId = line.toNode.attr.id;
                obj.fromType = line.fromNode.attr.type;
                obj.toType = line.toNode.attr.type;
                obj.state =line.stateFlag;
                obj.isChange = line.isChange;
                return obj;
            }
            return line;
        }
        //显示线的状态
        function showLineState(line){
            var lineStyle = {
                lineWidth:2
            } ;
            line.attr({style:lineStyle});
        }
    })
</script>
</body>
</html>