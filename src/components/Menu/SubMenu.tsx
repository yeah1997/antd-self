import React, { ReactNode, useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string,
    children?: ReactNode
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className}) => {

    // Menu context 
    const context = useContext(MenuContext)
    
    const openSubMenus = context.defaultOpenSubMenus as Array<string>

    // is open?
    const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false

    // 控制下拉菜单
    const [ menuOpen, setOpen ] = useState(false)

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })

    // Click event for SubMeu
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }

    // timer for handle mouse
    let timer: any

    // Menu mouse 离开
    const handleMouse = (e:React.MouseEvent, toggle: boolean)=> {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }

    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}

    const hoverEvnets = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMosueLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
    } : {}

    // redner children
    const renderChildren = () => {
        const subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        })

        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>

            if(childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            }else {
                console.error('warning')
            }
        })

        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvnets}>
            <div className='submenu-title' {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu