chrome.commands.onCommand.addListener(function(command) {
    // TODO verify that it's a Kentico site.
    
    chrome.tabs.getSelected(null, function(tab) {
        openTab(command, tab)
    });
});

var getHostname = function(href) {
    // stack exchange love - http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
    var l = document.createElement("a");
    l.href = href;
    return l.host; // Host returns hostname and port if there is one.
};

function openTab(pCommand, pTab) {
    var domain = getHostname(pTab.url.toString());
    url = "http://" + domain + "/" + pCommand
    
    chrome.tabs.create({url: url });
}