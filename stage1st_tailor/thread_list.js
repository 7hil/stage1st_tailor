chrome.runtime.sendMessage({ loc: "forum" });

// console.log($("#threadlisttableid > tbody"));

var pattern = /thread_([0-9]+)/;
var tid_list = new Array();
var tid_hidden_list = new Array();
var tid_dim_list = new Array();

var tid_map = {};

// update layout
$("[title='隐藏置顶帖']").remove();
$("[title='查看更新']").each(function() {
  $(this).parent().append('<span id="clearstickthread" style=""><span class="pipe">|</span><a href="javascript:;" class="xi2" title="toogle to display">显示隐藏</a></span>').find('[title="toogle to display"]').click(function() {
    localStorage.hideThreadList='[]';
    location.reload();
  });
});
//load list from storage
if(!localStorage.getItem('hideThreadList')){
  localStorage.hideThreadList='[]';
}
if(!localStorage.getItem('fadeThreadList')){
  localStorage.fadeThreadList='[]';
}



$("#threadlisttableid > tbody").each(function(){
  if (pattern.exec($( this ).attr("id")) != null) {
    var tid = pattern.exec($( this ).attr("id"))[1];
    tid_list.push(tid);
    tid_hidden_list.push('hidden' + tid);
    tid_dim_list.push('dim' + tid);
    tid_map[tid] = $( this );

    $( this ).find("> tr > th")
    //using Discuz hide button
      .append('<a id="hidden_' + tid + '" class="showhide y" title="隐藏">Hide</a>').find('#hidden_' + tid).click(function() {
        var a = [];
        a = JSON.parse(localStorage.getItem('hideThreadList'));
        a.push(tid);
        localStorage.setItem('hideThreadList', JSON.stringify(a));
        tid_map[tid].css("display", "none");
      });

    $( this ).find("> tr > th")
      .append('<span id="dim_' + tid + '"><input type="checkbox" >Fade</span>').find('#dim_' + tid).click(function() {
        var b = [], index;
        b = JSON.parse(localStorage.getItem('fadeThreadList'));
        index = b.indexOf(tid);
        if(index === -1) {
          b.push(tid);
          tid_map[tid].find("> tr > th > a.s.xst").css("color", "#f6f7eb");
        } else {
          b.splice(index,1);
          tid_map[tid].find("> tr > th > a.s.xst").css("color", "");
        }
        localStorage.setItem('fadeThreadList', JSON.stringify(b));

      });

  }
})

var hideThreadList = JSON.parse(localStorage.getItem('hideThreadList')),
fadeThreadList = JSON.parse(localStorage.getItem('fadeThreadList'));

for(thread in hideThreadList) {
  var tid = hideThreadList[thread];
  if(tid_map[tid]) {
    tid_map[tid].css("display", "none");
  }
}
for(thread in fadeThreadList) {
  var tid = fadeThreadList[thread];
  if(tid_map[tid]) {
    tid_map[tid].find("> tr > th > a.s.xst").css("color", "#f6f7eb");
  }
}


// console.log(tid_list);
// console.log(tid_map);

chrome.storage.local.get(tid_list, function(items) {
  // console.log('getting history: ');
  // console.log(items);
  // console.log(chrome.runtime.lastError);
  for(i in items) {
    // console.log(i);
    // console.log(tid_map[i]);
    tid_map[i].find("> tr > th")
      .append('<span"><a style="color:red;" href="https://bbs.saraba1st.com/2b/forum.php?mod=viewthread&page=' 
        + items[i].page + '&tid='
        + i + '#' + items[i].post +
        '"> █ history</a></span>');
    // tid_map[i].css("background", "#022c80b3");
  }
});


//watch
// $(document).on('DOMNodeInserted', function(e) {
//   if ( $(e.target=='tbody')) {

//   }
// });
