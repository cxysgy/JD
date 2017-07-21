//页面加载完成之后触发的事件
window.onload = function(){
	// alert(111);验证是否调用
	//调用通栏里面的效果
	headerScoll();
	// 调用倒计时效果
	cutDownTime();
	// 轮播图
	banner();
	
}

function headerScoll(){
	//1.获取导航栏对象
	var navDom = document.querySelector(".jd_nav");
	//获取导航栏距离顶点的高度
	// var top = navDom.offsetTop;//距离顶部的高度
	// var height = navDom.offsetHeight;//该节点自身的height的值
	// console.log(top);
	// console.log(height);
	var maxDistance = navDom.offsetTop;
	//3.获取顶部通栏
	var headerDom = document.querySelector(".jd_header");
	//4.顶部通栏透明  通过js写的样式会放在行内，所以最好写在css文件中
	// headerDom.style.backgroundColor='rgba(201,21,35,0)';
	//5.注册一个滚动事件  onscroll
	window.onscroll = function(){
		var scrollDistance = window.document.body.scrollTop;
		// console.log(scrollDistance);
		//如果滚动距离/最大距离 > 1 超出了轮播图 ->背景实心
		//否则 ->背景透明
		var precent =scrollDistance/maxDistance;
		if(precent>1){
			precent=1;
		}
		//将通栏背景设置为 precent
		headerDom.style.backgroundColor = 'rgba(201,21,35,'+precent+')';
		
	}
}
//2.倒计时
function cutDownTime(){

	//剩余总事件(秒)
	var totalSec ="3600";
	//获取存放显示时间的li 
	var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
	// console.log(liArr);
	// 开始倒计时
	var timeId = setInterval(function(){
		//判断如果倒计时语句小于等于0  结束倒计时
		if(totalSec<=0){
			clearInterval(timeId);
			return;
		}
		//秒数减一
		totalSec--;
		//将当前总秒数换算成 时 ：分： 秒
		//计算当前秒是多少小时   tatalSec/3600
		var hour = Math.floor(totalSec/3600);
		//分别取小时的十位和个位 Math.floor(hour/10);  hour%10;
		var mintue =Math.floor(totalSec%3600/60);
		var sec =Math.floor(totalSec%60);
		//将换算的数字放在页面对应的li中
		liArr[0].innerHTML= Math.floor(hour/10);
		liArr[1].innerHTML= hour%10;

		liArr[3].innerHTML= Math.floor(mintue/10);
		liArr[4].innerHTML= mintue%10;

		liArr[6].innerHTML= Math.floor(sec/10);
		liArr[7].innerHTML= sec%10;

	},1000);
}
//3.轮播图
/*
	transition: 过渡
	transform:  旋转（rotate） 缩放(scale) 倾斜(skew) 移动(translate)
 */
function banner(){
	/*
	必须记录的一些值：
	1.定义index记录索引值
	2.轮播图每个图片的宽度
		记录整个轮播图的ul
		索引ul li[index-1] 
	 */
	//1.记录屏幕宽度 
	var width = document.body.offsetWidth;
	//2.获取所有轮播图的ul节点
	var moveUl = document.querySelector(".banner_images");
	
	//3.定义一个index记录当前的索引值
	var index = 1;
	//4.表示索引的li标签
	var indexLiArr = document.querySelectorAll(".banner_index li");
	//5.自动轮播 1秒切换一张图
 	setInterval(function(){
 		//下一张
 		index++;
 		moveUl.style.transition = "all 0.3s";

 	/*	if(index>=9){
 			index = 1;
 			//瞬间回到第一张
 			moveUl.style.transition = "";
 		};*/
 		//修改ul的位置  css3的属性  translateX：在x轴上移动  不会影响其他元素
 		moveUl.style.transform = 'translateX('+index*width*-1+'px)'
	},1000);
	//每次过渡结束（轮播一张图结束）
	//判断是否到了最后一张
	//如果是 则立刻跳到第一张
	moveUl.addEventListener("webkitTransitionEnd",function(){
		if(index>=9){
			index = 1;
			//关闭过渡
			moveUl.style.transition = "";
			//修改一下ul的位置
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}
		//根据当前图片的下标修改对应的索引的背景颜色（白色）
		//清空所有实心小圆点
		for (var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className= '';
		};
		//当前位置的li变成实心
		indexLiArr[index-1].className='current';
	});
}