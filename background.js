chrome.commands.onCommand.addListener(function(command) {
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

function openTab(command, tab) {
    var domain = getHostname(tab.url.toString());

    url = "http://" + domain + "/" + command
    chrome.tabs.create({url: url, index: tab.index+1 });
}