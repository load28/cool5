import { IBaseButtonProps } from '../button/index.ts';
import { extendComponent } from './extendComponent.ts';

export function initializeComponentRef<TProps extends IBaseButtonProps, TState>(obj: React.Component<TProps, TState>): void {
  extendComponent(obj, {
    componentDidMount: _onMount,
    componentDidUpdate: _onUpdate,
    componentWillUnmount: _onUnmount,
  });
}

function _onMount(this: any): void {
  _setComponentRef(this.props.componentRef, this);
}

function _onUpdate(this: any, prevProps: IBaseButtonProps): void {
  if (prevProps.componentRef !== this.props.componentRef) {
    _setComponentRef((prevProps as any).componentRef, null);
    _setComponentRef(this.props.componentRef, this);
  }
}

function _onUnmount(this: any): void {
  _setComponentRef(this.props.componentRef, null);
}

function _setComponentRef<TInterface>(componentRef: React.RefObject<TInterface>, value: TInterface | null): void {
  if (componentRef) {
    if (typeof componentRef === 'object') {
      (componentRef as { current: TInterface | null }).current = value;
    } else if (typeof componentRef === 'function') {
      (componentRef as Function)(value);
    }
  }
}
