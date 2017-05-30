function saveOptions() {
    browser.storage.local.set({
        translationService: document.querySelector("#translation-service").value
    });
}

function restoreOptions() {

    function setCurrentChoice(option) {
        if (option.translationService) {
            document.querySelector("#translation-service").value = option.translationService;
        }
    }

    // Firefox 53 will erroneously complain that "ReferenceError: browser is not defined"
    var getting = browser.storage.local.get("translationService");
    getting.then(setCurrentChoice, console.error);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#translation-service").addEventListener("change", saveOptions);
