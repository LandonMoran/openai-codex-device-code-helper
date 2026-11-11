// ==UserScript==
// @name OpenAI Codex Full Device Code Paste
// @namespace landon.accessibility.codex
// @version 6.0.0
// @description Accessible full-code clipboard entry for OpenAI device authorization.
// @match https://auth.openai.com/*
// @run-at document-idle
// @grant none
// ==/UserScript==
(function () {
'use strict';
const FIELD_COUNT = 9;
const PREFIX = 'character_';
const PANEL_ID = 'codex-full-paste-helper';
let panel;
let status;
let pasteButton;
function getFields() {
const fields = [];
for (let i = 1; i <= FIELD_COUNT; i++) {
const field = document.querySelector(
'input[name="' + PREFIX + i + '"]'
);
if (!field) return null;
fields.push(field);
}
return fields;
}
function announce(message) {
if (status) {
status.textContent = message;
}
}
function normalizeCode(value) {
return String(value || '')
.replace(/[\s-]/g, '')
.toUpperCase();
}
function validateCode(value) {
return /^[A-Z0-9]{9}$/.test(value);
}
// Native setter helps React detect programmatic value changes.
const nativeSetter =
Object.getOwnPropertyDescriptor(
HTMLInputElement.prototype,
'value'
)?.set;
function setField(field, character) {
if (nativeSetter) {
nativeSetter.call(field, character);
} else {
field.value = character;
}
field.dispatchEvent(
new InputEvent('input', {
bubbles: true,
composed: true,
inputType: 'insertText',
data: character
})
);
field.dispatchEvent(
new Event('change', {
bubbles: true
})
);
}
function fillCode(rawValue) {
const code = normalizeCode(rawValue);
if (!validateCode(code)) {
announce(
'Invalid clipboard contents. A device code must contain exactly nine letters or numbers.'
);
return false;
}
const fields = getFields();
if (!fields) {
announce(
'The nine authorization fields could not be found. Reload the authorization page and try again.'
);
return false;
}
for (let i = 0; i < FIELD_COUNT; i++) {
setField(fields[i], code[i]);
}
const verified = getFields();
const success = verified &&
verified.every(
(field, index) => field.value === code[index]
);
if (success) {
announce(
'Success. All nine characters have been entered. Review the page and activate Continue yourself.'
);
return true;
}
announce(
'The browser received the code, but the page did not retain all nine characters.'
);
return false;
}
// Explicit button: clipboard reading happens only after the user
// activates this button.
async function readClipboard() {
if (
!navigator.clipboard ||
typeof navigator.clipboard.readText !== 'function'
) {
announce(
'Chrome does not currently provide clipboard reading. Try the ordinary paste option.'
);
return;
}
pasteButton.disabled = true;
announce('Reading the clipboard. Please wait.');
try {
const text = await navigator.clipboard.readText();
if (!text) {
announce('The clipboard is empty.');
return;
}
fillCode(text);
} catch (error) {
announce(
'Chrome denied clipboard access. Check the clipboard permission prompt or use ordinary paste.'
);
} finally {
pasteButton.disabled = false;
}
}
// Create an accessible control panel.
function createPanel() {
if (document.getElementById(PANEL_ID)) {
panel = document.getElementById(PANEL_ID);
status = panel.querySelector('[role="status"]');
pasteButton = panel.querySelector('button');
return;
}
const fields = getFields();
if (!fields) return;
const form = fields[0].closest('form') || document.body;
panel = document.createElement('section');
panel.id = PANEL_ID;
panel.style.cssText = [
'display:block',
'margin:16px 0',
'padding:14px',
'border:2px solid #39865b',
'border-radius:10px',
'background:#202820',
'color:white',
'font-size:16px',
'line-height:1.5'
].join(';');
const heading = document.createElement('h2');
heading.textContent = 'Accessible device code entry';
heading.style.cssText = 'font-size:18px;margin:0 0 10px';
const description = document.createElement('p');
description.textContent =
'Copy the complete nine-character code first. Then activate the button below to enter it into all nine boxes.';
description.style.margin = '0 0 12px';
pasteButton = document.createElement('button');
pasteButton.type = 'button';
pasteButton.textContent = 'Paste full code from clipboard';
pasteButton.setAttribute(
'aria-label',
'Paste full nine-character device code from clipboard'
);
pasteButton.style.cssText = [
'display:block',
'width:100%',
'min-height:52px',
'padding:12px',
'border:2px solid white',
'border-radius:8px',
'background:#176b42',
'color:white',
'font-size:17px',
'font-weight:bold'
].join(';');
pasteButton.addEventListener('click', readClipboard);
status = document.createElement('div');
status.setAttribute('role', 'status');
status.setAttribute('aria-live', 'polite');
status.setAttribute('aria-atomic', 'true');
status.textContent = 'Paste helper ready.';
status.style.marginTop = '12px';
panel.appendChild(heading);
panel.appendChild(description);
panel.appendChild(pasteButton);
panel.appendChild(status);
form.insertBefore(panel, form.firstChild);
}
// Normal paste-event handling.
document.addEventListener('paste', function (event) {
const target = event.target;
if (
!target ||
target.tagName !== 'INPUT' ||
!/^character_[1-9]$/.test(target.name)
) {
return;
}
const clipboard = event.clipboardData;
if (!clipboard) return;
const text =
clipboard.getData('text/plain') ||
clipboard.getData('text');
const code = normalizeCode(text);
if (!validateCode(code)) return;
event.preventDefault();
event.stopImmediatePropagation();
fillCode(code);
}, true);
// Additional support for Android input events.
document.addEventListener('beforeinput', function (event) {
const target = event.target;
if (
!target ||
target.tagName !== 'INPUT' ||
!/^character_[1-9]$/.test(target.name)
) {
return;
}
if (
event.inputType !== 'insertFromPaste' &&
event.inputType !== 'insertText'
) {
return;
}
// For input elements, InputEvent.data is the relevant
// inserted-text property. It may be null or incomplete.
const text = event.data;
if (!text) return;
const code = normalizeCode(text);
if (!validateCode(code)) return;
event.preventDefault();
event.stopImmediatePropagation();
fillCode(code);
}, true);
// The page may render its form after the userscript starts.
const observer = new MutationObserver(function () {
if (!document.getElementById(PANEL_ID)) {
createPanel();
}
});
function initialize() {
createPanel();
if (document.documentElement) {
observer.observe(document.documentElement, {
childList: true,
subtree: true
});
}
}
initialize();
})();