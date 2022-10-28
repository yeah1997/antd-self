import React, { useState,createContext, ReactNode } from "react";
import classNames from "classnames";

// action when selected
type SelectCallback = (selectIndex: number)=> void;
type MenuMode = 'horizontal' | 'vertical'

// Menu props
export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?:  React.CSSProperties;
    onSelect?: SelectCallback;
    children?: ReactNode
}

// Menu context type
interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
}

// Menu context
export const MenuContext = createContext<IMenuContext>({index: 0})

// Menu component
const Menu: React.FC<MenuProps> = (props)=> {
    
    const { defaultIndex,
            className,
            mode,
            style,
            onSelect,
            children } = props

    // active index(state)
    const [currentActive, setActive] = useState(defaultIndex)

    // class
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical'
    })

    // Menu click action
    const handleClick = (index: number) => {
        // set active index
        setActive(index)
        // there is onSelect?
        if(onSelect) {
            // send action to menu item component
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
