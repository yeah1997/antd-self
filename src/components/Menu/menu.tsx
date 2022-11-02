import React, { useState,createContext, ReactNode } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

// action when selected
type SelectCallback = (selectIndex: string)=> void;
type MenuMode = 'horizontal' | 'vertical'

// Menu props
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?:  React.CSSProperties;
    onSelect?: SelectCallback;
    children?: ReactNode,
    defaultOpenSubMenus?: string[];
}

// Menu context type
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode
    defaultOpenSubMenus?: string[];
}

// Menu context
export const MenuContext = createContext<IMenuContext>({index: '0'})

// Menu component
const Menu: React.FC<MenuProps> = (props)=> {
    
    const { defaultIndex,
            className,
            mode,
            style,
            onSelect,
            defaultOpenSubMenus,
            children } = props

    // active index(state)
    const [currentActive, setActive] = useState(defaultIndex)

    // class
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'horizontal'
    })

    // Menu click action
    const handleClick = (index: string) => {
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
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }

    // return 包装的children
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            // MenuItem of functional component element
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type

            if(displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 返回children, 并且添加属性 index
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            }else {
                console.error('Error')
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
            {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

// default props
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu
