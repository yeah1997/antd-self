import React, { useState,createContext } from "react";
import classNames from "classnames";

// action when selected
type SelectCallback = (selectIndex: number)=> void;
type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?:  React.CSSProperties;
    onSelect?: SelectCallback;
    children: any
}

// Menu context type
interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
}

// Menu context
export const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = (props)=> {
    
    const { defaultIndex,
            className,
            mode,
            style,
            onSelect,
            children } = props

    const [currentActive, setActive] = useState(defaultIndex)

    const classes = classNames('viking-menu', className, {
        'menu-veritical': mode === 'vertical'
    })

    const handleClick = (index: number) => {
        setActive(index)
        if(onSelect) {
            onSelect(index)
        }
    }

    // context data
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick
    }

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
            {children}
            </MenuContext.Provider>
        </ul>
    )
}

// default props
Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal',

}

export default Menu
