import React from 'react';
import { createMergedRef } from '../utilities/createMergedRef';
import { initializeComponentRef } from '../utilities/initializeComponentRef';
import { IButtonProps } from './button-types';

export interface IBaseButtonProps extends IButtonProps {
  baseClassName?: string;
  variantClassName?: string;
}

class BaseButton extends React.Component<IBaseButtonProps> {
  private static defaultProps: Partial<IBaseButtonProps> = {
    baseClassName: 'sh-button',
  };

  private _buttonElement = React.createRef<HTMLElement>();
  private _mergedRef = createMergedRef<HTMLElement>();
  private _labelId: string | undefined = undefined;
  private _descriptionId: string | undefined = undefined;
  private _ariaDescriptionId: string | undefined = undefined;
  private _processingTouch: boolean | undefined = undefined;
  private _lastTouchTimeoutId: number | undefined = undefined;

  constructor(props: IBaseButtonProps) {
    super(props);
    initializeComponentRef(this);

    // this._labelId = getId();
    // this._descriptionId = getId();
    // this._ariaDescriptionId = getId();
  }

  render() {
    const {
      ariaDescription,
      ariaLabel,
      ariaHidden,
      className,
      disabled,
      primaryDisabled,
      // eslint-disable-next-line deprecation/deprecation
      href,
      checked,
      variantClassName,
      toggle,
      text,
    } = { ...BaseButton.defaultProps, ...this.props };

    return <button type="button">{text}</button>;
  }
}

export default BaseButton;