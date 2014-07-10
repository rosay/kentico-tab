chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.getSelected(null, function(tab) {
        openTab(command, tab)
    });
});

function getHostname(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.host; // returns "example.com:1234"
}

function openTab(command, tab) {
    var domain = getHostname(tab.url.toString());

    url = "http://" + domain + "/" + command
    chrome.tabs.create({url: url, index: tab.index+1 });
}