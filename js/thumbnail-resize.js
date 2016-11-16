function bp_thumbnail_resize(image_url,post_title)
{
var image_width=240;
var image_height=180;
image_tag='<img width="'+image_width+'" height="'+image_height+'" src="'+image_url.replace('/s72-c/','/w'+image_width+'-h'+image_height+'-c/')+'" alt="'+post_title.replace(/"/g,"")+'" title="'+post_title.replace(/"/g,"")+'"/>';
if(post_title!="") return image_tag; else return ""; 
}