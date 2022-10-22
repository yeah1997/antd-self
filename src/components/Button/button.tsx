import React from 'react'
import classNames from 'classnames'

// Button Size
export enum ButtonSize {
    Large = 'lg',
    Small = 'sm',
}

// Button Type
export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

// Type of Button Component
interface BaseButtonProps {
    classname?: string,
    disabled?: boolean,
    size?: ButtonSize,
    btnType?: ButtonType,
    children: React.ReactNode,
    href?: string,
}
// Original Button Type + BaseButtonProps
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
// Original Anchor Type + BaseButtonProps
type AnchorProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
// All of props to be "?"
export type ButtonProps = Partial<NativeButtonProps & AnchorProps>

const Button: React.FC<ButtonProps> = (props) => {

    const { btnType,
            disabled,
            size, 
            children,
            href,
            className,
            ...restProps
        } = props

    // style class
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled,
    })

    // Button type is <a> or <button>
    if(btnType === ButtonType.Link) {
        return (
        <a 
          className={classes}
          href={href}
          {...restProps}
          >
           {children} 
        </a>
        )
    }else {
        return (
            <button 
              className={classes}
              disabled={disabled}
              {...restProps}
            >
                {children}
            </button>
        )
    }

}

// default props
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button