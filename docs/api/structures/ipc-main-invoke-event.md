# IpcMainInvokeEvent Object extends `Event`

* `frameId` Integer - The ID of the renderer frame that sent this message
* `processId` Integer - The internal ID of the process which owns the frame
* `sender` WebContents - Returns the `webContents` that sent the message
* `senderFrame` WebFrameMain _Readonly_ - The frame that sent this message
