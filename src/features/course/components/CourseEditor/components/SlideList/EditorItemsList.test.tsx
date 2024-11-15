import {fireEvent, render, screen} from "@testing-library/react";
import SlideList from "./SlideList";
import {Provider} from 'react-redux'

//
// describe('SlideList', () => {
//     it('add item to the list', () => {
//         render(<Provider><SlideList/></Provider>);
//         screen.debug();
//         fireEvent.click(screen.getByRole('button'))
//         expect(screen.getByRole('list').children).toHaveLength(1);
//     })
// });