import React from 'react';
import { createMergedRef } from '../utilities/createMergedRef.ts';
import { getId } from '../utilities/getId.ts';
import { initializeComponentRef } from '../utilities/initializeComponentRef.ts';
import { IButtonProps } from './button-types.ts';

export interface IBaseButtonProps extends IButtonProps {
  baseClassName?: string;
  variantClassName?: string;
}

export interface IBaseButtonClassNames {
  root?: string;
  flexContainer?: string;
  textContainer?: string;
  label?: string;
  description?: string;
  screenReaderText?: string;
}

export const ButtonGlobalClassNames = {
  shButton: 'sh-Button',
  shButtonLabel: 'sh-Button-label',
  shButtonDescription: 'sh-Button-description',
  shButtonScreenReaderText: 'sh-Button-screenReaderText',
  shButtonFlexContainer: 'sh-Button-flexContainer',
  shButtonTextContainer: 'sh-Button-textContainer',
};

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
  props: {
    ariaDescription: any;
    ariaLabel: any;
    ariaHidden: any;
    className: any;
    disabled: any;
    primaryDisabled: any;
    href: any;
    checked: any;
    variantClassName: any;
    toggle: any;
    text: any;
  };

  constructor(props: IBaseButtonProps) {
    super(props);
    initializeComponentRef(this);

    this._labelId = getId();
    this._descriptionId = getId();
    this._ariaDescriptionId = getId();
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

    const renderAsAnchor: boolean = !!href;
    const tag = renderAsAnchor ? 'a' : 'button';

    return <button type="button">{text}</button>;
  }
}

export default BaseButton;
