export interface IRenderFunction<P> {
  (props?: P, defaultRender?: (props?: P) => JSX.Element | null): JSX.Element | null;
}
export enum IButtonType {
  normal = 0,
  primary = 1,
  hero = 2,
  compound = 3,
  command = 4,
  icon = 5,
  default = 6,
}

export interface IButtonProps {
  elementRef?: React.Ref<HTMLElement>;
  componentRef?: React.RefObject<IButtonProps>;
  href?: string;
  primary?: boolean;
  uniqueId?: string | number;
  disabled?: boolean;
  primaryDisabled?: boolean;
  checked?: boolean;
  toggle?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaDescription?: string;
  ariaHidden?: boolean;
  text?: string;
  onRenderText?: IRenderFunction<IButtonProps>;
  onRenderDescription?: IRenderFunction<IButtonProps>;
  onRenderAriaDescription?: IRenderFunction<IButtonProps>;
  onRenderChildren?: IRenderFunction<IButtonProps>;
  buttonType?: IButtonType;
  toggled?: boolean;
  data?: any;
}
