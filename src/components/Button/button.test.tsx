import React from "react";
import { render, fireEvent } from '@testing-library/react'
import Button, {ButtonProps, ButtonSize} from "./button";

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: 'primary',
    size: ButtonSize.Large
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)

        expect(element.disabled).toBeFalsy()
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it('should render the correct component baseed on different props', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')

        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg')
    })

    it('should render a link when btnType equeals link and href is provided', () => {
        const wrapper = render(<Button btnType={'link'} href="baidu.com">Link</Button>)
        const element = wrapper.getByText('Link')

        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn-link')
    })

    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Disabled</Button>)
        const element = wrapper.getByText('Disabled') as HTMLButtonElement

        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()

        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })

})