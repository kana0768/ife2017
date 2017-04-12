var $ = function(id) {
    return document.getElementById(id);
};
var kana = {
    //队列数组
	data : [],
    //从左边插入
    leftIn : function(){
        var text = $("text").value;
        kana.data.unshift(text); 
        this.paint(1);
    },
    //从右边插入
    rightIn : function(){
        var text = $("text").value;
        kana.data.push(text); 
        this.paint(0);
    },
    //从左边删除
    leftOut : function(){
        kana.data.shift();
        $("result").removeChild(result.childNodes[0]);
    },
    //从右边删除
    rightOut : function(){
        kana.data.pop();
        $("result").removeChild(result.childNodes[kana.data.length]);
    },
    //插入div元素
    paint : function(val){
        var div = document.createElement("div");
        if(val){
            div.style.height = (kana.data[0] * 5) + 'px';
            $("result").insertBefore(div,$("result").childNodes[0]); 
        }else{
            div.style.height = (kana.data[kana.data.length - 1] * 5) + 'px';
            $("result").appendChild(div);
        }
    },
    //判断输入是否合法，队列是否溢出
    validate : function(val){
        const REG_EXP = /^([1-9]\d|100)$/;
        var flag = REG_EXP.test(val);
        if(!flag){
        alert("输入错误，请输入10-100的整数");
        }
        if(kana.data.length >= 60){
            alert("队列已满");
            console.log(kana.data.length);
            flag = false;
        }
        return flag;
    },
    //快速排序
    quickSort : function(array,left,right){
        var that = this;
        let i = left;
        let j = right;
        let x =array[left];
        while(i < j){
            while(i < j && array[j] >= x){
                j--;
            }
            if(i < j){
                array[i] = array[j];
                $("result").childNodes[i].style.height = (array[i] * 5) + 'px';
                console.log(array[i]);
                i++;
            }
            while(i < j && array[i] < x){
                i++;
            }
            if(i < j){
                array[j] = array[i];
                $("result").childNodes[j].style.height = (array[j] * 5) + 'px';
                console.log(array[j]);
                j--;
            }				
        }
        array[i] = x;
        $("result").childNodes[i].style.height = (array[i] * 5) + 'px';

        setTimeout(function(){
            if(left < right){
            that.quickSort(array,left,i-1);
            that.quickSort(array,i+1,right);
            return array;
        }
        },500);
    },
    //插入函数，val为true从左边插入，false从右边插入
    insert : function(val){
        var text = $("text").value;
        if(kana.validate(text)){
            if(val){
                kana.leftIn();
            }else{
                kana.rightIn();
            }
            $("text").value = null;
        }
    },
    //删除函数，val为true从左边删除，false从右边删除
    takeOut : function(val){
        if(kana.data.length > 0){
            if(val){
                kana.leftOut();
            }else{
                kana.rightOut();
            }
        }else{
            alert("队列为空");
        }
    },
    //绑定事件
    events : function(){
        $("left-in").onclick = function(){
            kana.insert(true);
        };
        $("right-in").onclick = function(){
            kana.insert(false);
        };
        $("left-out").onclick = function(){
            kana.takeOut(true);
        };
        $("right-out").onclick = function(){
            kana.takeOut(false);
        };
        $("quick-sort").onclick = function(){
            kana.quickSort(kana.data,0,kana.data.length - 1);
        };        
    },
    //初始化
    init : function(){
        kana.events();
    }
}
kana.init();