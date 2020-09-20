var canvas_review = document.getElementById("review");
var canvas_view=document.getElementById('view');
var width_main=document.getElementById("width_img");
var height_main=document.getElementById("height_img");
var width_auto=document.getElementById("width_img_auto");
var height_auto=document.getElementById("height_img_auto");
var review = canvas_review.getContext("2d");
var view=canvas_view.getContext("2d");
var img_review=document.getElementById("myImg")
var textcode=document.getElementById('code')
var load=document.getElementById("loading");
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
function rgbToHex1(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function processImage(file) {
  sizeofPic=256
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    $('#myImg').attr('src', e.target.result);
    img.onload = function() {
        height_main.innerHTML=img.height
        width_main.innerHTML=img.width
        if (img.width>sizeofPic){
          if (img.width>=img.height){
            img.height=img.height/(img.width/sizeofPic)
            img.width=sizeofPic

          }
          else{
            img.width=img.width/(img.height/sizeofPic)
            img.height=sizeofPic
          }
        }
        canvas_review.width=img.width
        canvas_review.height=img.height
        canvas_view.width=img.width
        canvas_view.height=img.height
        review.drawImage(img, 0,0,img.width,img.height)
        height_auto.innerHTML=img.height
        width_auto.innerHTML=img.width


    }
    img.src = e.target.result;
  }
  reader.readAsDataURL(file.files[0]);
}




function getcode() {
 
  console.log(canvas_review.width);
  if (img_review.src==location.href){
    alert("Vui lòng thêm ảnh!")
  }
  else{
    document.getElementById('addpic').style.visibility = 'hidden';
    
    document.getElementById('trade').style.visibility = 'hidden'; 
    modal.style.display = "block";
    array=[]
    denta=60
    text_val=""
    str=""
    lib=""
    count=0;
    i=0;
    j=0;
    done=1;
				
    setInterval(function(){
    	if (done==1){
    		count=count+1;
    			load.value=count*100/(canvas_review.height*canvas_review.width); 
    if (j==canvas_review.height){i=i+1;j=0;};
    if(j<canvas_review.height){j=j+1;};
    if (i==canvas_review.width){done=0;};
        	imgData=review.getImageData(i,j,1,1).data 
        	r=imgData[0]
        	g=imgData[1]
        	b=imgData[2]
        	k=0
        	far1=100
			for (m=0;m<check.length;m++) {
    			far2=Math.abs(r-check[m].r)+Math.abs(g-check[m].g)+Math.abs(b-check[m].b)
    			if (far2<far1) { 
      				far1=far2
      				k=m
    			}
			}
			stt=check[k].stt
			id = check[k].id
			data=check[k].data
			str=str+stt
			view.fillStyle = "#"+rgbToHex1(check[stt].r,check[stt].g,check[stt].b);
			view.fillRect(i,j,1,1);
        	if (array.length!=0){
          		let sum=0
          		for (l=0;l<array.length;l++){
            		if (stt==array[l]){
              			sum++;
            		}
          		}
          		if (sum==0){
            		array[array.length]=stt
          		}
        	}
        	else{
          		array[array.length]=stt
        	}
        	if ((i==canvas_review.width-1)&&(j==canvas_review.height-1))
        	{
          		str=str
        	}
        	else{
          		str=str+","
        	}
		}	
	   if (done==0){
	   	done=3;
	   	modal.style.display = "none";
    text_val="{"+str+"}"

    for (m=0;m<array.length;m++) {
      lib=lib+"{stt="+array[m]+",id="+check[array[m]].id+",data="+check[array[m]].data+"},"
    }
    var d = new Date();
    day=d.getDate()+2
    month=d.getMonth()
    if ((month==2)||(month==4)||(month==6)||(month==9)||(month==11)){
      if (day==29){
        day=1;
        month=month+1;
      }
      else if (day==30){
        day=2;
        month=month+1
      }
    }
    lib="{"+lib+"0}"
    a="local Block = class.Block.new()\nclick=true\nlocal day="+day+"\nlocal month="+month+"\nfunction ok(param)\nx=param.x+1\ny=param.y+1\nz=param.z+1\nif (click)and((os.date ('%d')*1<day*1)or(os.date ('%m')*1<=month*1)) then\nclick=false\nlib="+lib+"\nmap="+text_val+"\ns_socot="+canvas_review.height+"\nsohang,socot=0,0\n"
b="for i=1,#map do\nlocal vitri_lib\nfor j=1,#lib-1 do\n if map[i]==lib[j].stt then\nvitri_lib=j\nbreak\nend\nend\nBlock:setBlockAll(x-socot,y,z+sohang,lib[vitri_lib].id,lib[vitri_lib].data)\n"
c="if i%s_socot==0 then\nsocot=socot+1\nsohang=0\nelse\nsohang=sohang+1\nend\nend\nend\nend\nScriptSupportEvent:registerEvent([=[Player.ClickBlock]=],ok)"

ddd=a+b+c
eee="function getStr(str) local b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=' str= string.gsub(str, '[^'..b..'=]', '') return (str:gsub('.', function(x) if (x == '=') then return '' end error=b local r,f,io='',(b:find(x)-1) for i=6,1,-1 do print,r=nil,r..(f%2^i-f%2^(i-1)>0 and '1' or '0') end return r; end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x) if (#x ~= 8) then return '' end local c=0 for i=1,8 do c=c+(x:sub(i,i)=='1' and 2^(8-i) or 0) end return string.char(c) end)) end\n"
fff="loadstring(getStr(key))()"    
ggg="key='"+window.btoa(ddd)+"'"
textcode.innerHTML=eee+ggg+"\n"+fff;
    document.getElementById('copy').style.visibility = 'visible';
  
 }


},1);



 }
}

 function clickBtn() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function clickSpan() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
*/
/*
local Block = class.Block.new()
click=true
function ok(param)
x=param.x+1
y=param.y+1
z=param.z+1
if click then
click=false
lib={{stt=2,id=670,data=5},{stt=44,id=671,data=4},{stt=59,id=672,data=5},{stt=29,id=670,data=3},{stt=4,id=675,data=0},{stt=1,id=667,data=0},{stt=3,id=671,data=7},0}
map={2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,44,44,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,44,44,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,44,59,59,59,59,44,2,2,2,2,29,29,2,2,2,2,2,2,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,29,29,29,59,59,59,59,59,44,2,29,29,4,4,29,29,2,2,2,44,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,4,4,4,29,59,59,1,1,59,29,29,4,4,4,4,4,4,29,29,44,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,29,29,29,29,29,4,4,4,4,4,4,4,4,4,4,29,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,59,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,59,59,59,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,59,59,59,59,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,29,59,59,59,59,59,59,59,59,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,29,59,59,59,59,59,59,59,59,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,29,29,29,29,29,59,59,59,59,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,29,4,4,4,4,4,29,59,59,59,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,3,3,3,3,3,3,3,3,3,3,3,3,29,29,4,4,4,4,4,4,4,29,59,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,29,29,3,3,3,3,3,3,3,3,3,3,3,29,29,4,4,4,4,4,4,4,4,4,4,29,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,3,3,3,3,3,3,3,3,29,29,4,4,4,4,4,4,4,4,4,4,4,4,29,59,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,3,3,3,3,3,3,3,29,29,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,3,3,3,3,3,3,29,29,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,59,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,3,3,29,3,3,29,29,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,59,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,3,3,29,2,29,29,29,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,59,59,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,4,3,3,4,29,2,2,29,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,44,44,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,4,29,2,2,2,29,4,4,4,4,4,4,4,4,4,4,4,4,29,29,29,29,4,4,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,4,29,2,2,2,29,4,4,4,4,4,4,4,4,4,29,29,29,4,4,4,4,29,4,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,4,4,29,2,2,2,29,4,4,4,4,4,4,4,29,2,2,29,4,4,4,4,29,4,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,4,4,29,2,2,2,2,29,29,29,29,29,29,29,2,2,2,29,4,4,4,29,4,4,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,4,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,3,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,29,3,3,3,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,3,29,3,3,3,4,4,4,29,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,3,29,3,3,3,4,4,29,2,2,2,2,2,2,2,2,2,2,29,4,4,4,4,4,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,3,29,3,3,3,3,29,2,2,2,2,2,2,2,2,2,2,2,29,29,29,29,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,3,29,29,3,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,3,3,3,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,29,29,29,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2}
s_socot=58
sohang,socot=1,1
print(#map)
for i=1,#map+1 do
  local vitri_lib
  for j=1,#lib+1 do
    if map[i]==lib[j].stt then
      vitri_lib=j
      break
    end
  end
  val=Block:setBlockAll(x+socot,y,z+sohang,lib[vitri_lib].id,lib[vitri_lib].data)
  if i%s_socot==0 then
    sohang=sohang+1
    socot=1
  else
    socot=socot+1
  end
end

end
end
ScriptSupportEvent:registerEvent([=[Player.ClickBlock]=],ok)
*/