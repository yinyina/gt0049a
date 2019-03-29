$(function() {

//---------------页面加载完成后计时器相关begin---------------
//获取url中参数
function getUrlParam(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return unescape(r[2]); return null; 
} 

var platformiframeurl;
platformiframeurl = getUrlParam('callParentIframeUrl');

//平台已传参,添加iframe嵌套父级页面,用于跨主域访问
if(platformiframeurl){
	//向body创建div
	var yy_div=document.createElement("div");
	document.body.appendChild(yy_div);
	yy_div.id="yy_iframe";
	//添加iframe
	document.getElementById("yy_iframe").innerHTML='<iframe name="iframeRight" id="iframeRight" style="display:none;" src="'+ platformiframeurl +'"></iframe>'
}
//---------------页面加载完成后计时器相关end---------------

				var dataHuman = eval(bao_menus);
				var html = '';
				for(var key in dataHuman){
					html += '<li>';
				    html+='<a href="'+dataHuman[key].link+'?callParentIframeUrl='+platformiframeurl+'"><span>'+dataHuman[key].name+'</span></a>';
				    var content="";
				    var people = dataHuman[key]['menus'];
				    if (typeof dataHuman[key]['menus'] != "undefined"){
					    html += '<ol class="tow_home tow_home_'+(key+1)+'">';
					    for(var keyPl in people){
					            html += '<li><a href="'+people[keyPl].url+'"><b>'+people[keyPl].name+'</b></a></li>'
					    }
					    html += '</ol>';
					}
				    html += '</li>';
				}
				$("#menucontent").html(html);
				
		$('.left_iframe_title li').click(function() {
			var index = $(this).index();
			$('.tow_home').stop().slideUp();
			$(this).find('.tow_home').stop().slideDown();
			var data = eval(bao_menus);
					for(var i = 0; i < $('.tow_home li a b').length; i++) {
						$('.left_iframe_title>li').eq(index).find('.tow_home li a b').eq(i).text(data[index].menus["sev_" + (i + 1)]);
					}
					if($('.left_iframe_title li').eq(index).find('tow_home').length == 0) {
						$('.left_iframe_title>li').find('.one_floor').attr('href', 'javascript:;');
					}

			if(true){
				jsqplay(true);
			}
		})
	
		$('.mulu_list li').click(function() {
			$('.mulu_list li a').removeClass('active');
			$(this).find('a').addClass('active');
		})
		
		$('#video_content li').click(function() {
			var index = $(this).index()+1;
			playvideo(index);
		})
		
	playvideo(1)	
	function playvideo(zid){
		var StrPath = location.href;
		var bool = StrPath.indexOf("http");
		if (bool>=0){
			var myVid=arrVid[zid-1];
			var mstr='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="700" height="394" id="cc_'+myVid+'"><param name="movie" value="http://p.bokecc.com/flash/single/039C1380CF417F50_'+myVid+'_true_9223C66477962A2F_1/player.swf" /><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param value="transparent" name="wmode" /><embed src="http://p.bokecc.com/flash/single/039C1380CF417F50_'+myVid+'_true_9223C66477962A2F_1/player.swf" width="700" height="394" name="cc_'+myVid+'" allowFullScreen="true" wmode="transparent" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"/></object>'
	
		}
		else {
			var mp4path = "video/" + zid;
			var imgpath = "images/beforevideo";
			var mstr = "<table width='700' height='418' cellpadding='0' cellspacing='1' bgcolor='#fff'>";
			mstr = mstr + "<tr>";
			mstr = mstr + "<td bgcolor=#ffffff valign=top><EMBED width=700 height=418 id=objF type=application/x-shockwave-flash src=player.swf flashvars='file="+mp4path+".mp4&amp;type=http&amp;image="+imgpath+".jpg&amp;repeat=list&amp;bufferlength=1&amp;volume=100&amp;autostart=0&amp;controlbar=bottom&amp;displayclick=play&amp;logo.position=top-left' allowfullscreen='true' allowscriptaccess='always' bgcolor='#000000' wmode='transparent'></EMBED></td>";
			mstr = mstr + "  </tr>";
			mstr = mstr + "</table>";
		
		}
		
		document.getElementById("a1").innerHTML = mstr;
		
	}
	

$(document).attr("title", bao_title);//修改title值
$('.center .title').html(bao_title);
$('.footer').text(bao_footer);
	})



//---------------计时器相关begin---------------
function getSWF( swfID ) {
if (window.document[ swfID ]) {
	return window.document[ swfID ];
} else if (navigator.appName.indexOf("Microsoft") == -1) {
	if (document.embeds && document.embeds[ swfID ]) {
	return document.embeds[ swfID ];
	}
} else {
	return document.getElementById( swfID );
	}
}

var videovid;
var objectid;

//播放器界面元素初始化时
function on_cc_player_init( vid, objectID ){
	videovid=vid;
	objectid=objectID;
	var ccplayer = getSWF( objectID );
	var config = {};
	ccplayer.setConfig(config);
}

//开始播放
function on_spark_player_start(){
	jsqplay(true);
}

//暂停播放
function on_spark_player_pause(){
	jsqplay(false);
}

//恢复播放
function on_spark_player_resume(){
	jsqplay(true);
}

//结束播放
function on_spark_player_stop(){
	jsqplay(false);
}

//设置页面加载完成后是否开始计时
var videoifplay=true;

//计时器回调函数
function jsqplay(videoifplay){
	changeVideoFlag(videoifplay)
}

//与平台交互的函数
function changeVideoFlag(videoifplay) {
	var ifr = document.getElementById('iframeRight');
	if(ifr){
		//iframe嵌套添加成功
		var targetOrigin = '*';
		if(typeof(videoifplay)=="undefined"){
			//未设置videoifplay跳过不处理
		}else{
			//设置videoifplay执行
			var func = {name:"callParentFun",value:videoifplay};
			var str
			if(typeof(JSON)=="undefined"){
				//当浏览器不支持JSON时,如IE7,则使用此方法将JSON对象转化为字符串
				str = "'name':"+"'"+func.name+"','value':"+func.value
				str = "{" + str +"}";
			}else{
				//当浏览器支持JSON时,则使用此方法将JSON对象转化为字符串
				str = JSON.stringify(func);
			}
			ifr.contentWindow.postMessage(str, targetOrigin);
		}
	}
}
//---------------计时器相关end---------------
























