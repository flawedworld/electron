import { EventEmitter } from "events";

const { createScreen } = process._linkedBinding('electron_common_screen');

let _screen: Electron.Screen;

const ensureScreen = () => {
  _screen = createScreen();
  EventEmitter.call(_screen);
}

// We can't call createScreen until after app.on('ready'), but this module
// exposes an instance created by createScreen. In order to avoid
// side-effecting and calling createScreen upon import of this module, instead
// we export a proxy which lazily calls createScreen on first access.
export default new Proxy({}, {
  get: (target, prop: keyof Electron.Screen) => {
    if (_screen === undefined) ensureScreen();
    const v = _screen[prop];
    if (typeof v === 'function') {
      return v.bind(_screen);
    }
    return v;
  },
  ownKeys: () => {
    if (_screen === undefined) ensureScreen();
    return Reflect.ownKeys(_screen);
  },
  getPrototypeOf: (target) => {
    const targetPrototype = Reflect.getPrototypeOf(target);
    return Object.assign(EventEmitter.prototype, targetPrototype);
  },
  has: (target, prop: string) => {
    if (_screen === undefined) ensureScreen();
    return prop in _screen;
  },
  getOwnPropertyDescriptor: (target, prop: string) => {
    if (_screen === undefined) ensureScreen();
    return Reflect.getOwnPropertyDescriptor(_screen, prop);
  },
});
