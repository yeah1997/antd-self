import React from "react";
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react'

import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './SubMenu'

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerticalProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
        <MenuItem >
            active
        </MenuItem>
        <MenuItem disabled={true}>
            disabled
        </MenuItem>
        <MenuItem>
            xyz
        </MenuItem>
        <SubMenu title="dropdown">
            <MenuItem>
                drop1
            </MenuItem>
        </SubMenu>
      </Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
        .viking-submenu {
            display: none;
        }
        .viking-submenu.menu-opened {
            dispaly: block;
        }
    `

    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile

    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disableElement: HTMLElement

describe('test Menu and Menu-item component', () => {
    
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        // menuElement = wrapper.container.getElementsByClassName('viking-menu')
        activeElement = wrapper.getByText('active')
        disableElement = wrapper.getByText('disabled')

    })

    it('should render correct Menu and Menu-item based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu')
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item', 'is-active')
        expect(disableElement).toHaveClass('menu-item', 'is-disabled')
    })

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        // expect(testProps.onSelect).toHaveBeenCalledWith(2)  // 调用onSelect方法, 被调用的参数是否为2

        fireEvent.click(disableElement)
        expect(disableElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    })

    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const varticleWrapper = render(generateMenu(testVerticalProps))
        const vaticleElement = varticleWrapper.getByTestId('test-menu')

        expect(vaticleElement).toHaveClass('menu-vertical')
        
    })

    it('should show down dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)

        // await waitFor(()=> {
        //     expect(wrapper.queryByText('drop1')).toBeVisible()
        // })

        // fireEvent.click(wrapper.getByText())
    })
}) 