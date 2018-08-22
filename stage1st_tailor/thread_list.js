chrome.runtime.sendMessage({ loc: "forum" });

console.log($("#threadlisttableid > tbody"));

var pattern = /thread_([0-9]+)/;
var tid_list = new Array();
var tid_hidden_list = new Array();
var tid_dim_list = new Array();

var tid_map = {};
$("#threadlisttableid > tbody").each(function(p){
  console.log($( this ).attr("id"));
  console.log(pattern.exec($( this ).attr("id")));
  if (pattern.exec($( this ).attr("id")) != null) {
    var tid = pattern.exec($( this ).attr("id"))[1];
    tid_list.push(tid);
    tid_hidden_list.push('hidden' + tid);
    tid_dim_list.push('dim' + tid);
    tid_map[tid] = $( this );

    $( this ).find("> tr > th")
      .append('<span><input type="checkbox" id="hidden_' + tid + '">hide</span>');
    $('#hidden_' + tid).change(function() { 
      if (this.checked) {
        var tmp = {};
        tmp['hidden' + tid] = 1;
        chrome.storage.local.set(tmp, function() {
          if (chrome.runtime.lastError) {
            console.log('set error' + chrome.runtime.lastError);
            console.log(chrome.runtime.lastError);
          } else {
            console.log('hide: ' + tid);
          }
        });
        tid_map[tid].css("display", "none");
      }
    });

    $( this ).find("> tr > th")
      .append('<span><input type="checkbox" id="dim_' + tid + '">dim</span>');
    $('#dim_' + tid).change(function() { 
      if (this.checked) {
        var tmp = {};
        tmp['dim' + tid] = 1;
        chrome.storage.local.set(tmp, function() {
          if (chrome.runtime.lastError) {
            console.log('set error' + chrome.runtime.lastError);
            console.log(chrome.runtime.lastError);
          } else {
            console.log('dim: ' + tid);
          }
        });
        tid_map[tid].find("> tr > th > a.s.xst").css("color", "#f6f7eb");
      }
    });
  }
})

console.log(tid_list);
console.log(tid_map);

chrome.storage.local.get(tid_list, function(items) {
  console.log('getting history: ');
  console.log(items);
  console.log(chrome.runtime.lastError);
  for(i in items) {
    console.log(i);
    console.log(tid_map[i]);
    console.log(tid_map[i].find("> tr > th")
      .append('<span"><a style="color:red;" href="https://bbs.saraba1st.com/2b/forum.php?mod=viewthread&page=' 
        + items[i].page + '&tid='
        + i + '#' + items[i].post +
        '"> █ history</a></span>'));
    // tid_map[i].css("background", "#022c80b3");
  }
});

chrome.storage.local.get(tid_hidden_list, function(items) {
  console.log('getting hidden');
  console.log(items);
  console.log(chrome.runtime.lastError);
  for(i in items) {
    console.log(i.substring(6));
    var tid = i.substring(6);
    console.log(tid_map[tid]);
    tid_map[tid].css("display", "none");
  }
});


chrome.storage.local.get(tid_dim_list, function(items) {
  console.log('getting dim');
  console.log(items);
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  }
  for(i in items) {
    var tid = i.substring(3);
    console.log('dim' + tid);
    tid_map[tid].find("> tr > th > a.s.xst").css("color", "#f6f7eb");  // todo: check box 状态设置
  }
});


