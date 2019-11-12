$(document).ready(function() {
    var str='';
    $.get("http://localhost:3000/arr", function(data) {
        console.log(data);
        for(var i=0;i<data.chapterList.length;i++){
            str+='<tr>';
            str+='<td>'+i+'</td>';
            str+='<td>'+data.chapterList[i]['title']+'</td>';
            str+='<td>'+data.chapterList[i]['views']+'</td>';
            str+='<td>'+data.users[0].username+'</td>';
            str+='</tr>';
            
        }
        $('#result').html(str);
    })
})