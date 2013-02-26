chrome.commands.onCommand.addListener(function(command) {
    console.log(command);
    chrome.tabs.getSelected(null, function(tab) {
        ktOnClick(command, tab)
    });
});

var getHostname = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
};

// Create context menus - not needed because the point of the plugin is to make keyboard shortcuts.
//cmsdesk = chrome.contextMenus.create({"title": "Go to CMS Desk", "onclick": ktOnClick, "id": "cmsdesk" });
//cmssiteman = chrome.contextMenus.create({"title": "Go to Site Manager", "onclick": ktOnClick, "id": "cmssitemanager"});

function ktOnClick(pCommand, pTab) {

    // TODO verify that it's a Kentico site.
    
    var domain = getHostname(pTab.url.toString());
    url = "http://" + domain + "/" + pCommand
    
    chrome.tabs.create({url: url });
}