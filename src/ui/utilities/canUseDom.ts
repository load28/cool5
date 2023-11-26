export function canUseDOM(_window: Window | undefined): boolean {
  return typeof _window !== 'undefined' && !!(_window.document && _window.document.createElement);
}
