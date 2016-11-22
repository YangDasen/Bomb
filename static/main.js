
var rows = 9;//9行
var cols = 9;//9列
var bombNumber = 10;//雷数量
var arrBomb;
var arrBlank;//计算雷坐标周边内容后，存入空格
var arrNumber;
var arrNumberCount;//计算雷坐标周边内容后，存入数字
var arrBombOrBlank;
var pub_randomId;
var pub_repeadBomId;
var arrId;
var temp = "";//中间变量，临时存储循环时用来存储数组中的某个元素
var arrAllDivId;
var randomId;
var arrGetArroundId;


arrBomb = new Array();
arrId = new Array();
arrGetArroundId = new Array();



//main
$(document).ready(function(){
   
    //选择难度
    getRandomBomb();
    
    $("#SetBomb").hide();
    $("#gameField").hide();
    $("input[name='setlevel']").click(function(){
        if(this.id=="levelEasy") {
            $("#SetBomb").hide();
            
        }
        else if(this.id=="levelNormal") {$("#SetBomb").hide();}
        else if(this.id=="levelHard") {$("#SetBomb").hide();}
        else if(this.id=="levelSetByUser") {$("#SetBomb").show();}
      
    });
//开始
    $("#BeginButton").click(function(){
        $("#gameField").show();
        $("#menu").hide();
        setDefault();       
        createDiv();
        mouse();         
        getArroundId();
        getClickArround();
        
    })
//返回
    $("#turnback").click(function() {           
        $("#gameField").hide();
        $("#menu").show();
        })
   
});

//main




//获取随机数
function getRandom(){
    var randomId = parseInt(Math.random()*rows+1).toString() + "_" + parseInt(Math.random()*cols+1).toString();
    //坐标不能重复，查询数组中是否存在相同的坐标
    if($.inArray(randomId,arrBomb) >= 0){
        getRandom();}//>=0
    else{
        arrBomb.push(randomId);
        pub_randomId = randomId;
    }
    
}


//根据随机数获取雷的坐标
function getRandomBomb(){
    for (var i=0;i<bombNumber;i++){
        getRandom();
        
    }    
}


//实现获取雷周围坐标
function getArroundId() {
        var num = 1; 
        var leftRow = 1;
        var rightRow = 1; 
        var leftCol = 1;
        var rightCol = 1;
        var numIdarry = new Array();
        pub_repeadBomId = numIdarry;   
 

        for(var n = 0; n < arrBomb.length; n++){

        
        
            var r = parseInt(arrBomb[n].split("_")[0]);
            var c = parseInt(arrBomb[n].split("_")[1]);
        
            leftRow = r - 1; if(leftRow < 1) leftRow= 1;
            rightRow = r + 1;if(rightRow >= rows) rightRow = rows;
            leftCol = c - 1; if(leftCol < 1) leftCol = 1;
            rightCol = c + 1; if(rightCol >= cols) rightCol = cols;
        
            for(var i = leftRow; i <= rightRow; i++){
                for(var j = leftCol; j <= rightCol; j++){
                    var numId = i.toString() + "_" + j.toString();
                    numIdarry.push(numId);

                }
            }
        }
        console.log(numIdarry);
        repeatBombId();            
}

//根据生成的坐标产生div
function createDiv(){
    getRandomBomb();
    var strHtml = "";
        for(var row = 1; row<=rows; row++){
            strHtml+="<div class=\"divRow\">";         
            for(var col = 1; col<=cols; col++){
                var _id = row.toString() + "_" + col.toString();
               
                arrAllDivId.push(_id);//为每个生成的div附上标记           
                if($.inArray(_id,arrBomb) < 0 ){
                     
                    strHtml+="<div id=\""+_id + "\"   class=\"divCol\"></div>";
                    if(col==cols){strHtml+= "</br>"}                  
                }
                else {            
                    strHtml+="<div id=\""+_id + "\"   class=\"divColBomb\"></div>";
                }
            }
            strHtml+="</div>";
            strHtml+="</div>";
        }
    $("#content").html(strHtml);
    
       
    
}


function setDefault(){
    arrBomb = new Array();
    arrNumber = new Array();
    arrNumberCount = new Array();
    arrBlank = new Array();
    arrAllDivId = new Array();
    arrBombOrBlank = new Array();    
}

function mouse(){
    $(".divCol,.divColBomb").mouseover(function(){
        $(this).addClass("divColMouse");
    });
    $(".divCol,.divColBomb").mouseleave(function(){
        $(this).removeClass("divColMouse");
    });
    $(".divCol,.divColBomb").on("click", function(){
        if($.inArray(this.id,arrBomb) >= 0 ){
            $(this).addClass("divColMouseBumb");
            alert("gg");
            $(".divColBomb").addClass("divColMouseBumb");
        }else{
             $(this).addClass("divClear"); 
         }
    });
     
     
}

 function repeatBombId() {
    var arrNew = new Array();
   
        for(var w= 0; w<pub_repeadBomId.length; w++){
            arrNew[w]=pub_repeadBomId[w];
        }

       
        var arrMap = new Array();//新建一个数据用来存放循环后的数据
        var arrcountNum = new Array();
        var countNum = 0;//循环时用来存储数组中的某个元素出现的次数

        for(var p=0; p< arrNew.length; p++){
            if(arrNew[p]!=-1){
                temp = arrNew[p];
                for(var m=0; m< arrNew.length; m++){
                    if(temp == arrNew[m]){
                        countNum++;
                        arrNew[m]=-1;
                    }

                }
                arrMap.push(temp);
                arrcountNum.push(countNum);
                countNum = 0;
            }
        }

        // for (var w=0; w<arrMap.length;w++){          
            
        //     console.log(arrMap[w],arrcountNum[w]);
            
        // }
            $(".divCol").on("click", function(){
            if($.inArray(this.id,pub_repeadBomId) >= 0 )
                for(x=1; x<pub_repeadBomId.length;x++){
                    if(this.id == arrMap[x]){
                         $(this).html(arrcountNum[x]); 
                         $(this).addClass("class=\"divColBombNum\""); 
                         }
                }
                
            });

 }
 
 //点击鼠标开雷
 //获取鼠标点击处周围的8个坐标
 function getClickArround() {
     
         $(".divCol").mousedown(function(e){
             if(e.button === 1){

 
        var i = parseInt(this.id.split("_")[0]);
        var j = parseInt(this.id.split("_")[1]);
        
        
            var id_1 = (i-1).toString()+"_"+(j-1).toString(); 
            var id_2 = (i-1).toString()+"_"+(j).toString();
            var id_3 = (i-1).toString()+"_"+(j+1).toString();
            var id_4 = (i).toString()+"_"+(j-1).toString();
            var id_5 = (i).toString()+"_"+(j+1).toString();
            var id_6 = (i+1).toString()+"_"+(j-1).toString();
            var id_7 = (i+1).toString()+"_"+(j).toString();
            var id_8 = (i+1).toString()+"_"+(j+1).toString();
        
        arrGetArroundId.push(id_1,id_2,id_3,id_4,id_5,id_6,id_7,id_8);
        console.log(arrGetArroundId);


             }
    

    })
 }