# LRC Offset Adjuster README

LRC Offset Adjuster is a Visual Studio Code extension designed for modifying and fine-tuning timestamp offsets in `.lrc` files. Whether you need to synchronize lyrics with audio or adjust timing for better accuracy, this extension simplifies the process.

---

## Features

- **Offset Adjustment**:
  - Quickly add or subtract offsets (in milliseconds) to timestamps in `.lrc` files.
  - Supports bulk updates for all timestamps in the file.
- **Real-Time Feedback**:
  - Automatically formats updated timestamps to ensure accuracy.
  - Prevents negative timestamps.
- **Command Palette Integration**:
  - Use `Adjust LRC Offset` to specify an offset and apply changes instantly.

### Example

Original `.lrc` content:

```
[00:27.74]And as long as I've got my suit and tie
```

After applying a `+1000ms` offset:

```
[00:28.74]And as long as I've got my suit and tie
```

---

## Requirements

No additional dependencies are required. Ensure you have Visual Studio Code installed.

---

## Extension Settings

This extension does not add any custom settings. All functionality is accessible via the Command Palette.

---

## Known Issues

- **File Format Compatibility**: The extension currently supports only `.lrc` files with standard timestamp formatting (e.g., `[mm:ss.SS]`).
- **Undo Limitations**: If many changes are applied at once, the undo stack may become overloaded in very large files.

---

## Release Notes

### 1.0.0

- Initial release of LRC Offset Adjuster.
- Added support for adjusting offsets in `.lrc` files via the Command Palette.

---

## Extension Guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

---

## For more information

- [Visual Studio Code's Extension API](https://code.visualstudio.com/api)
- [LRC File Format Reference](<https://en.wikipedia.org/wiki/LRC_(file_format)>)

---

**Enjoy Adjusting Your LRC Files!**
