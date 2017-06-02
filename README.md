# Page Translator

Translate any page inline using [Google Translate](https://translate.google.com/manager/website/) or [Microsoft Translator](https://msdn.microsoft.com/en-us/library/mt146808.aspx).

[Install it now.](https://addons.mozilla.org/en-US/firefox/addon/jxl-page-translator/)

## How to use

A translate icon will appear in the address bar when a page is detected to be in a foreign language. This keeps your UI minimal. If you'd prefer to always have the translate icon displayed, check "Always show translate icon in the URL bar " in the add-on's preferences ([Add-ons Manager](about:addons#Extensions), Extensions tab, tap "Preferences" for Page Translator).

Page Translator determines if the page is in a foreign language by comparing the list of languages you have specified in Firefox as your preferred languages ([about:preferences#content](Preferences) > Content > Languages) against the page language as determined by [Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/detectLanguage). Firefox for Android does not yet support language detection, so the translate icon will always be visible.


© 2017 Jeremiah Lee. Page Translator is released under the ISC License.