const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } = require('electron');
const path = require('path');

let win;
let tray;

function createWindow() {
  win = new BrowserWindow({
    width: 780,
    height: 680,
    minWidth: 620,
    minHeight: 500,
    title: 'Decay Tracker',
    backgroundColor: '#0d0d0f',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    show: false,
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  win.once('ready-to-show', () => {
    win.show();
  });

  win.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      win.hide();
    }
  });
}

function createTray() {
  const icon = nativeImage.createFromDataURL(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAI4SURBVFiF7ZY9aBRBGIa/2b27ZHMYSKIiKGoQCwsRGxULwUIsLCxELMTKxsLKxsLKQgsr0UIQrSxEtBARtBER/IkgGhQVNKKiQX7udnd25hvHQrK3l9uzuYuFDyzs7jfvzDPvzLcDu9jFLv5n2GkAUEoNaq13rbVSSu0IkBCRHgDmHFJKeXNORPqMMWfOOSmlvDknIr1E5P1+f7TWWmuto7V2fd8/3+/3t2ut/Z7nebIgCIIgCIIgCIIgCIIgCIIg+EcAqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKkAFqAAVoAJUgApQASpABagAFaACVIAKUAEqQAWoABWgAlSAClABKsAvAF5JkLiCNKIAAAAASUVORK5CYII='
  );
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open Decay Tracker', click: () => win.show() },
    { type: 'separator' },
    { label: 'Quit', click: () => { app.isQuitting = true; app.quit(); } }
  ]);
  tray.setToolTip('Decay Tracker');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show();
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
  else win.show();
});
