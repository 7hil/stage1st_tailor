chrome.runtime.sendMessage({ loc: "thread" });

// 获取当前 thread id
console.log(location.href);
var pattern = /thread-([0-9]+)-([0-9]+)-/;
var pattern2 = /tid=([0-9]+)/;
var pattern3 = /page=([0-9]+)/;
var tid = null;
var page = 1;
if (pattern.exec(location.href)) {
  tid = pattern.exec(location.href)[1];
  page = pattern.exec(location.href)[2];
} else if (pattern2.exec(location.href)) {
  tid = pattern2.exec(location.href)[1];
  if (pattern3.exec(location.href)) {
    page = pattern3.exec(location.href)[1];
  }
}

var postlist = $("#postlist div .plhin");
postlist.each(function(p) {
  console.log($( this ));
  console.log($( this ).attr("id"));
  var post_id = $( this ).attr("id");
  console.log(post_id);
  console.log(document.getElementById(post_id));
  new Waypoint({
    element: document.getElementById(post_id),
    handler: function() {
      console.log('Basic waypoint triggered: ' + post_id)
      chrome.runtime.sendMessage({
        "action": "update_hist",
        "tid": tid,
        "post_id": post_id
      });    
      var tmp = {};
      tmp[tid] = {
        "post": post_id,
        "page": page
      };
      chrome.storage.local.set(tmp, function() {
        if (chrome.runtime.lastError) {
          console.log('set error' + chrome.runtime.lastError);
          console.log(chrome.runtime.lastError);
        } else {
          console.log('setting history: ' + tid + ' ' + post_id);
        }
        chrome.storage.local.get([tid], function(items) {
          console.log(chrome.runtime.lastError)
          console.log('getting history: ' + tid);
          console.log(items);
        });
      }); 
    }
  });
})


 