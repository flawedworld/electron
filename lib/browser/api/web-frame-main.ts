const { WebFrameMain, fromId } = process._linkedBinding('electron_browser_web_frame_main');

WebFrameMain.prototype.send = function (channel, ...args) {
  if (typeof channel !== 'string') {
    throw new Error('Missing required channel argument');
  }

  return this._send(channel, args);
}

export default {
  fromId
};
