import React from "react";
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'

import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}

const testVerticalProps: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
        <MenuItem index={0}>
            active
        </MenuItem>
        <MenuItem index={1} disabled={true}>
            disabled
        </MenuItem>
        <MenuItem index={2}>
            xyz
        </MenuItem>
      </Menu>
    )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disableElement: HTMLElement

describe('test Menu and Menu-item component', () => {
    
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        menuElement = wrapper.getByTestId('test-menu')
        // menuElement = wrapper.container.getElementsByClassName('viking-menu')
        activeElement = wrapper.getByText('active')
        disableElement = wrapper.getByText('disabled')

    })

    it('should render correct Menu and Menu-item based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu')
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveClass('menu-item', 'is-active')
        expect(disableElement).toHaveClass('menu-item', 'is-disabled')
    })

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith(2)  // 调用onSelect方法, 被调用的参数是否为2

        fireEvent.click(disableElement)
        expect(disableElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    })

    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const varticleWrapper = render(generateMenu(testVerticalProps))
        const vaticleElement = varticleWrapper.getByTestId('test-menu')

        expect(vaticleElement).toHaveClass('menu-vertical viking-menu')
        
    })
})