import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom'
import { CartProvider } from '../context/Store'
import Navbar from '../components/Navbar'
import ProductDetail from '../components/ProductDetail'

describe("Navbar", () => {
    beforeAll(() => {
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: () => ({
                id: 1
            }),
        }))
    })
    it("snapshot", () => {
        const {asFragment} = render(
            <BrowserRouter>
                <CartProvider>
                    <Navbar />
                </CartProvider>
            </BrowserRouter>
        )

        expect(asFragment()).toMatchSnapshot()
    })
    it('the user incrementing the amount of items in the shopping cart', async () => {

        render(
            <BrowserRouter>
                <CartProvider>
                    <Navbar />
                    <ProductDetail/>
                </CartProvider>
            </BrowserRouter>
        )

        const user = userEvent.setup()

        await user.click(screen.getByRole('button', {name: /Add to Cart/i}))
        await user.click(screen.getByRole('button', {name: /Add to Cart/i}))
        await user.click(screen.getByRole('button', {name: /Add to Cart/i}))

        const counter = screen.queryByTestId('quantity')

        expect(counter.textContent).toEqual("3")
    })
})