import {app, BrowserWindow} from 'electron/main'

function createWindow () {
  const win = new BrowserWindow({
    title: "",
    width: 200,
    height: 230,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    backgroundThrottling: false,
    frame: false, 
    transparent: true,
    background: "#00000000",
    webPreferences: {
        contextIsolation: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})