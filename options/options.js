function saveOptions() {
    browser.storage.local.set({
        alwaysShowPageAction: document.querySelector("#always-show-page-action").checked,
        translationService: document.querySelector("#translation-service").value
    });
}

async function restoreOptions() {
    // Firefox 53 will erroneously complain that "ReferenceError: browser is not defined"
    let options = await browser.storage.local.get(["alwaysShowPageAction", "translationService"]);

    if (typeof options.alwaysShowPageAction !== "undefined") {
        document.querySelector("#always-show-page-action").checked = options.alwaysShowPageAction;
    }

    if (typeof options.translationService !== "undefined") {
        document.querySelector("#translation-service").value = options.translationService;
    }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#always-show-page-action").addEventListener("change", saveOptions);
document.querySelector("#translation-service").addEventListener("change", saveOptions);
