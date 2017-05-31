function saveOptions() {
    browser.storage.local.set({
        translationService: document.querySelector("#translation-service").value
    });
}

async function restoreOptions() {
    // Firefox 53 will erroneously complain that "ReferenceError: browser is not defined"
    let option = await browser.storage.local.get("translationService");

    if (option.translationService) {
        document.querySelector("#translation-service").value = option.translationService;
    }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#translation-service").addEventListener("change", saveOptions);
