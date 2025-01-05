import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "lrcAdjuster.adjustOffset",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showErrorMessage("No active text editor found.");
        return;
      }

      const document = editor.document;

      if (!document.fileName.endsWith(".lrc")) {
        vscode.window.showErrorMessage(
          "This command only works for .lrc files."
        );
        return;
      }

      // Prompt user for offset in milliseconds
      const offsetInput = await vscode.window.showInputBox({
        prompt: "Enter offset in milliseconds (positive or negative):",
        placeHolder:
          "e.g., -1000 for 1 second earlier, 1000 for 1 second later",
        validateInput: (value) =>
          isNaN(Number(value)) ? "Please enter a valid number" : null,
      });

      if (!offsetInput) {
        return; // User canceled
      }

      const offset = parseInt(offsetInput, 10);

      if (isNaN(offset)) {
        vscode.window.showErrorMessage("Invalid offset entered.");
        return;
      }

      const text = document.getText();
      const timestampRegex = /\[(\d{2}):(\d{2})\.(\d{2})]/g;

      const updatedText = text.replace(
        timestampRegex,
        (match, mins, secs, ms) => {
          const originalTime =
            parseInt(mins) * 60 * 1000 + // Minutes to milliseconds
            parseInt(secs) * 1000 + // Seconds to milliseconds
            parseInt(ms) * 10; // Hundredths of a second to milliseconds

          // Apply the offset
          const adjustedTime = originalTime + offset;

          // Ensure the adjusted time is not negative
          const clampedTime = Math.max(0, adjustedTime);

          // Convert back to mm:ss.SS
          const minutes = Math.floor(clampedTime / 60000);
          const seconds = Math.floor((clampedTime % 60000) / 1000);
          const milliseconds = Math.floor((clampedTime % 1000) / 10);

          return `[${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}]`;
        }
      );

      const edit = new vscode.WorkspaceEdit();
      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );
      edit.replace(document.uri, fullRange, updatedText);

      await vscode.workspace.applyEdit(edit);
      vscode.window.showInformationMessage(
        `Timestamps adjusted by ${offset} ms!`
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
