const { app, BrowserWindow, ipcMain } = require("electron/main");
const fs = require("fs");
const path = require("node:path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: "./assets/icons/icon.png" ,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.whenReady().then(() => {
  const { dialog } = require("electron");
  ipcMain.handle("openFile", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
      try {
        const data = fs.readFileSync(filePaths[0], 'utf8');
        return {content: data, path: filePaths[0]}
      } catch (err) {
        console.error(err);
      }
    }
  });
  ipcMain.handle("saveFile",async (e, arg)  => {
    const { canceled, filePath } = await dialog.showSaveDialog({})
    if (!canceled) {
      try {
        fs.writeFileSync(filePath.toString(), arg);
        return filePath.toString()
      } catch (err) {
        console.error(err);
      }
    }
  });
});