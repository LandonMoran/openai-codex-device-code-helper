# OpenAI Codex Device Code Helper

An accessible AdGuard userscript that adds a **Paste full code from clipboard** button to the OpenAI Codex device-authorization page.

It is designed for the nine-character device code form at `https://auth.openai.com/`. The script reads a complete code from the clipboard after you activate its button, fills all nine fields, and leaves the final **Continue** action for you to review and activate.

## Version 1.0.0

This repository's first published release is **v1.0.0**.

> The userscript source is intentionally kept unchanged from the original script. Its embedded userscript metadata currently reports `@version 5.0.0`; `v1.0.0` is the GitHub project release version.

## Install in AdGuard

1. Install or open the **AdGuard Browser Extension**.
2. Open AdGuard's settings.
3. Go to **Userscripts**.
4. Choose **Add userscript** or the option to add a userscript from a URL. The exact label can vary by AdGuard version.
5. Paste this URL:

   ```text
   https://raw.githubusercontent.com/LandonMoran/openai-codex-device-code-helper/main/openai-codex-full-device-code-paste.user.js
   ```

6. Confirm the installation or subscription, then open or reload the OpenAI device-authorization page.

The URL points to the file on the `main` branch, so it stays the same when the script is updated. AdGuard can use that URL to retrieve the latest version.

## Use

1. Copy the complete nine-character device code.
2. Open the OpenAI Codex device-authorization page.
3. Activate **Paste full code from clipboard**.
4. Review the nine populated fields.
5. Activate **Continue** yourself.

The script accepts letters and numbers, ignores spaces and hyphens, and uppercases the code before filling the fields.

## Clipboard permission quirk

The first time you use the helper button, your browser may ask for permission to read the clipboard. The first click can appear to fail while that permission is being granted. Grant clipboard permission, then activate the button again; subsequent clicks should work normally.

If clipboard access remains unavailable, use the page's ordinary paste behavior instead. The script also handles a normal paste into one of the device-code fields when the pasted text is a complete valid nine-character code.

## Scope and permissions

- Runs only on `https://auth.openai.com/*`.
- Uses `@grant none`; it does not request privileged userscript APIs.
- Reads the clipboard only after you activate the helper button.
- Does not automatically submit the form or activate **Continue**.

## Fixed release URL

For a pinned copy of this release, use the GitHub release tag URL instead of the always-latest `main` URL:

```text
https://raw.githubusercontent.com/LandonMoran/openai-codex-device-code-helper/v1.0.0/openai-codex-full-device-code-paste.user.js
```

## Disclaimer

This is an independent community userscript and is not affiliated with or endorsed by OpenAI. Review userscripts before installing them and only grant clipboard access when you trust the source.

## License

No license has been declared yet. All rights are reserved unless a license is added to this repository.
