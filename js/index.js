var dataHuman = eval(bao_vodeo);
var html = '';
for(var key in dataHuman){
	html += '<li>';
	html+='<a href="javascript:;"';
	if(key == 0){
		html+=' class="active"';
	}
	html+='>'+dataHuman[key].name+'</a>';
	html += '</li>';
}
$("#video_content").html(html);
$('.introduce').text(bao_intro);