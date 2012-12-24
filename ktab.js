// commands should be available in Chrome 25..
//chrome.commands.onCommand.addListener(function(command) {
//    console.log('Command:', command);
//});

function getHostName(url) {
    return url
        .replace(/"/g,'')
        .replace(/http.?:\/\//g,"")
        .split("/")[0];
}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.tabs.getCurrent(function (tab) { ktOnClick(null, request) });
});

cmsdesk = chrome.contextMenus.create({"title": "Go to CMS Desk", "onclick": ktOnClick, "id": "cmsdesk" });
cmssiteman = chrome.contextMenus.create({"title": "Go to Site Manager", "onclick": ktOnClick, "id": "cmssitemanager"});

function ktOnClick(info, tab) {
    var domain = getHostName(JSON.stringify(tab.url));

    Url = "http://" + domain
        .replace("cmsdesk","")
        .replace("cmssitemanager","")
        + "/";

     if (info == null)  {
         Url = Url + tab.cmsSite;
     } else {
         Url = Url + info.menuItemId;
     }

    chrome.tabs.create({url: Url });
}


