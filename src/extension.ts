import * as vscode from "vscode";
import {
  LanguageClient,
  type LanguageClientOptions,
  type ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(_context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("revo");
  const revoPath = config.get<string>("lsp.path", "revo");

  const serverOptions: ServerOptions = {
    command: revoPath,
    args: ["--lsp"],
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      {
        scheme: "file",
        language: "revo",
      },
    ],
  };

  client = new LanguageClient(
    "revo-lsp",
    "Revo Language Server",
    serverOptions,
    clientOptions,
  );

  client.start();
}

export function deactivate() {
  return client?.stop();
}
