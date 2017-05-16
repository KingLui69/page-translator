// "people got mad when i put it all in one file" —Julia Evans

/*
===============================
WebExtension specific functions
===============================
*/

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
Function source: https://github.com/mdn/webextensions-examples/blob/c5d69d15d6dcd9217a20725e7b69a084baedae03/apply-css/background.js
*/
const APPLICABLE_PROTOCOLS = ['http:', 'https:'];
function protocolIsApplicable(url) {
    let anchor = document.createElement('a');
    anchor.href = url;
    return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
Show the Page Translator page action in the browser address bar, if applicable.
*/
function initializePageAction(tab) {
    if (protocolIsApplicable(tab.url)) {
        browser.pageAction.show(tab.id);
    }
}



/*
=============================
Page Translator functionality
=============================
*/

function injectTranslatorCode() {
    let googleTranslateBarCode = `
        let docBody = document.body;
        let translateTo = 'en';
        let translateFrom = '';

        if (docBody !== null) {
            let googleTranslateCallback = document.createElement('script');
            googleTranslateCallback.innerHTML = "function googleTranslateElementInit(){ new google.translate.TranslateElement({ pageLanguage: '', defaultLanguage: 'en' }); }";
            docBody.insertBefore(googleTranslateCallback, docBody.firstChild);

            let googleTranslateScript = document.createElement('script');
            googleTranslateScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit&tl=" + translateTo + "&sl=&hl=";
            docBody.insertBefore(googleTranslateScript, docBody.firstChild);
        }

        // Firefox will (erroneously?) complain if non-structured-clonable data isn't returned.
        // https://github.com/mdn/webextensions-examples/issues/193
        true;
    `;

    browser.tabs.executeScript({
        code: googleTranslateBarCode
    });
}



/*
==========
INITIALIZE
==========
*/

/*
When initialized, add the page action for all tabs.
*/
browser.tabs.query({}).then((tabs) => {
    for (tab of tabs) {
        initializePageAction(tab);
    }
});

/*
When a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    initializePageAction(tab);
});

/*
Bind clicks on the page action icon to the WebExtension
*/
browser.pageAction.onClicked.addListener(injectTranslatorCode);
