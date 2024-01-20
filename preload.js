const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('invoke', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  openFile: () => ipcRenderer.invoke('openFile'),
  saveFile: (text) => ipcRenderer.invoke('saveFile', text)
})