// add function createStories() to loadJS() in global_vars.js
// add function addPopup() to show all stories on mouseover (optional)

/*
Elements to style and position:
#flash_content
#flashControls
#cboxes
#cbox_[#]
(#cbox_[#]) .on
#mc_back
#mc_fwd
#more_link
*/

var container_div = "rightbanner"; //has the content elements
var module_class = "photo"; // class name of elements
var target_div = "photo_rotation"; //will recieve content and flashControls

var news_string = "View All News";
var news_page = "/news"; //url of more news page
var no_news = "There are no items at this time."; //message if there are no stoires

var random = 0; // starts at a random photo if set to 1
var delay = 4000; //time between photo swap (milliseconds)

var timer;
var timerRunning = 0;
var current_block;
var blocks = new Array();
var lks = new Array();

function addPopup(){
	var hideNews;

	document.getElementById(target_div).onmouseover = function(){
			clearTimeout(hideNews);
			document.getElementById(container_div).style.display='block';
			document.getElementById(container_div).style.top = (findPosY(document.getElementById(target_div)) - document.getElementById(container_div).scrollHeight) + "px";
			stopTimer();
	}
	document.getElementById(target_div).onmouseout = function(){
		hideNews = setTimeout( function(){ document.getElementById(container_div).style.display='none'; startTimer(); },250 );
	}
	
	document.getElementById(container_div).onmouseover = function(){
		clearTimeout(hideNews);
		document.getElementById(container_div).style.display='block';
		}
	document.getElementById(container_div).onmouseout = function(){
	 	hideNews = setTimeout( function(){ document.getElementById(container_div).style.display='none'; startTimer(); },250 );
	}


function createStories(){
	
	document.getElementById(target_div).innerHTML = "<div id=\"flash_content\"></div><div id=\"flashControls\"></div>";
	
	var flashControls = "";
	var stories = $j('.'+ module_class);
	var j=0;
	for(i=0;i<stories.length;i++){
		blocks[j] = stories[i].innerHTML;
		flashControls += "<a href=\"#\" id=\"cbox_"+j+"\" onclick=\"swapMulti(" +j+ ",\'cbox_" +j+ "\'); stopTimer(); return false;\">" + (j+1) + "</a> ";
		j++;
	}
	
	var back_btn = '<a href="#" onclick="swapMulti(\'back\'); startTimer(); return false;" id="mc_back"><</a>';
	var fwd_btn = '<a href="#" onclick="swapMulti(\'forward\'); startTimer(); return false;" id="mc_fwd">></a>';
	
	if(news_string.length>1 ){ news_lnk = '<a href="'+ news_page +'" id="more_link">'+news_string+'</a>';
	}else{ news_lnk = ''; }
	
	document.getElementById('flashControls').innerHTML = back_btn + '<span id="cboxes">' + flashControls + "</span>" + fwd_btn  + news_lnk ;
	
	lks = document.getElementById('flashControls').getElementsByTagName('a');

	$j('#'+target_div).css('position','relative').append('<div id="flash_content2" />');
	$j('#flash_content2').css({position:'absolute',top:'0',left:'0',opacity:'0'});
	
	if(random){
		rN = Math.round(Math.random() * (blocks.length-1) );
		swapMulti(rN,"cbox_"+rN);
	}else{
		swapMulti(0,'cbox_0');
	}
	
	startTimer();

}

function startTimer(){
	if(!timerRunning && blocks.length > 1){
		timer = setInterval('swapMulti("forward")', delay);
		timerRunning = 1;
	}
}

function stopTimer(){
		window.clearInterval(timer);
		timerRunning = 0;
}

function swapMulti(n,l){

	if( n == 'back' ){
		if(current_block==0){ n=blocks.length-1; l ="cbox_"+(blocks.length-1);
		}else{ n = current_block - 1; l = "cbox_"+n; }

	}else if( n == 'forward'){ if(current_block + 1 == blocks.length){ n=0; l = "cbox_0";
		}else{ n = current_block + 1; l = "cbox_"+n; }
	}
		
	if(blocks[n]){
		
		// load up the fading div and fade it in
		$j('#flash_content2').html(blocks[n]).animate({opacity:'1'},200,'',function(){
				if(isIE){$j('#flash_content2').attr('style','filter:alpha(opacity=100)');} //clear alpha filter in IE
				//replace content in #flash_content
				$j('#flash_content').html( $j('#flash_content2').html() );
				$j('#flash_content2').css('opacity','0');
			});
		
						
		for(i=0;i<lks.length;i++){
			if( lks[i].id == l){ lks[i].className = "on";}else{ lks[i].className = "";}
		}
		
		current_block = n;
	}else{
		document.getElementById('flash_content').innerHTML = no_news;
	}
}

}


function createStories(){
	
	document.getElementById(target_div).innerHTML = "<div id=\"flash_content\"></div><div id=\"flashControls\"></div>";
	
	var flashControls = "";
	var stories = $j('.'+ module_class);
	var j=0;
	for(i=0;i<stories.length;i++){
		blocks[j] = stories[i].innerHTML;
		flashControls += "<a href=\"#\" id=\"cbox_"+j+"\" onclick=\"swapMulti(" +j+ ",\'cbox_" +j+ "\'); stopTimer(); return false;\">" + (j+1) + "</a> ";
		j++;
	}
	
	var back_btn = '<a href="#" onclick="swapMulti(\'back\'); startTimer(); return false;" id="mc_back"><</a>';
	var fwd_btn = '<a href="#" onclick="swapMulti(\'forward\'); startTimer(); return false;" id="mc_fwd">></a>';
	
	if(news_string.length>1 ){ news_lnk = '<a href="'+ news_page +'" id="more_link">'+news_string+'</a>';
	}else{ news_lnk = ''; }
	
	document.getElementById('flashControls').innerHTML = back_btn + '<span id="cboxes">' + flashControls + "</span>" + fwd_btn  + news_lnk ;
	
	lks = document.getElementById('flashControls').getElementsByTagName('a');

	$j('#'+target_div).css('position','relative').append('<div id="flash_content2" />');
	$j('#flash_content2').css({position:'absolute',top:'0',left:'0',opacity:'0'});
	
	if(random){
		rN = Math.round(Math.random() * (blocks.length-1) );
		swapMulti(rN,"cbox_"+rN);
	}else{
		swapMulti(0,'cbox_0');
	}
	
	startTimer();

}

function startTimer(){
	if(!timerRunning && blocks.length > 1){
		timer = setInterval('swapMulti("forward")', delay);
		timerRunning = 1;
	}
}

function stopTimer(){
		window.clearInterval(timer);
		timerRunning = 0;
}

function swapMulti(n,l){

	if( n == 'back' ){
		if(current_block==0){ n=blocks.length-1; l ="cbox_"+(blocks.length-1);
		}else{ n = current_block - 1; l = "cbox_"+n; }

	}else if( n == 'forward'){ if(current_block + 1 == blocks.length){ n=0; l = "cbox_0";
		}else{ n = current_block + 1; l = "cbox_"+n; }
	}
		
	if(blocks[n]){
		
		// load up the fading div and fade it in
		$j('#flash_content2').html(blocks[n]).animate({opacity:'1'},200,'',function(){
				if(isIE){$j('#flash_content2').attr('style','filter:alpha(opacity=100)');} //clear alpha filter in IE
				//replace content in #flash_content
				$j('#flash_content').html( $j('#flash_content2').html() );
				$j('#flash_content2').css('opacity','0');
			});
		
						
		for(i=0;i<lks.length;i++){
			if( lks[i].id == l){ lks[i].className = "on";}else{ lks[i].className = "";}
		}
		
		current_block = n;
	}else{
		document.getElementById('flash_content').innerHTML = no_news;
	}
}