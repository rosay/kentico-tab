window.addEventListener('keydown', function(event) {
    // Bind to both command (for Mac) and control (for Win/Linux)
    var modifier = event.ctrlKey || event.metaKey;

    if (modifier && event.keyCode == 188) {
        var url = location.href;
        chrome.extension.sendMessage({url: url, cmsSite: "cmsdesk"});
    } else if(modifier && event.keyCode == 190) {
        var url = location.href;
        chrome.extension.sendMessage({url: url, cmsSite: "cmssitemanager"});
    }
}, false);