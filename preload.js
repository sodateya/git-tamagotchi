// preload.js — レンダラーに安全なAPIを公開

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: (cfg) => ipcRenderer.invoke('save-config', cfg),
  refreshNow: () => ipcRenderer.invoke('refresh-now'),
  openExternal: (url) => ipcRenderer.send('open-external', url),
  openDebug: () => ipcRenderer.invoke('open-debug'),
  on: (channel, cb) => {
    const allowed = ['state-update', 'config-update', 'error', 'need-token'];
    if (allowed.includes(channel)) {
      ipcRenderer.on(channel, (_e, payload) => cb(payload));
    }
  },
});
