# OpenAI Codex Device Code Helper

An accessible AdGuard userscript that adds a **Paste full code from clipboard** button to the OpenAI Codex device-authorization page.

It reads a complete nine-character device code after you activate its button, fills all nine fields, and leaves the final **Continue** action for you to review and activate.

## Install in AdGuard for Android

Use this stable direct userscript URL—not the GitHub repository page:

```text
https://raw.githubusercontent.com/LandonMoran/openai-codex-device-code-helper/main/openai-codex-full-device-code-paste.user.js
```

In AdGuard, open the userscripts/extensions area, choose **Add userscript from URL** (the exact label may vary by version), paste the URL, and confirm.

## How updates work in AdGuard

The script uses AdGuard-supported userscript metadata:

- `@version 6.0.0` identifies the installed script version.
- `@downloadURL` points to the complete script on the stable `main` URL.
- `@updateURL` points to the metadata-only file at:
  `https://raw.githubusercontent.com/LandonMoran/openai-codex-device-code-helper/main/openai-codex-full-device-code-paste.meta.js`

AdGuard checks the update URL, compares the metadata `@version` with the installed version, and downloads the full script from `@downloadURL` when it finds a newer version. The update is then applied by AdGuard; users do not need to remove and reinstall the script.

AdGuard's official compatibility documentation confirms support for `@version`, `@downloadURL`, and `@updateURL`, and shows the same separate `.meta.js` pattern. AdGuard's documentation does not promise a universal fixed check interval. The timing is controlled by AdGuard's update settings and Android background scheduling. Users can also use AdGuard's manual update action.

### Publishing a future version

1. Edit the `.user.js` file while preserving its functionality.
2. Increase the `@version` value in the userscript metadata, for example from `6.0.0` to `6.0.1` or `7.0.0`.
3. Put the exact same version in `openai-codex-full-device-code-paste.meta.js`.
4. Keep both `@downloadURL` and `@updateURL` pointing to the stable `main` URLs.
5. Commit the updated files to `main`.
6. Optionally create a GitHub release/tag for the project, but do not change the stable installation URL.

The metadata version must be higher than the installed version for AdGuard to treat it as an update.

### Check the installed version

Open AdGuard's userscripts/extensions list, select **OpenAI Codex Full Device Code Paste**, and view its details. The displayed version should be `6.0.0`. You can also compare it with the `@version` line in the installed script or the current file downloaded from the stable URL.

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

## Versioning

The current userscript version is `6.0.0`.

The GitHub project release `v1.0.0` is separate historical project-release labeling; it is not the userscript's update version. Future userscript updates should keep the `@version` in the script and metadata file synchronized, whether or not a GitHub release is created.

## Disclaimer

This is an independent community userscript and is not affiliated with or endorsed by OpenAI. Review userscripts before installing them and only grant clipboard access when you trust the source.

## License

No license has been declared yet. All rights are reserved unless a license is added to this repository.
