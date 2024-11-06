import {fireEvent, render, screen} from "@testing-library/react";
import EditorItemsList from "./EditorItemsList";
import {Provider} from 'react-redux'
import store from "../../../../store/store";

describe('EditorItemsList', () => {
    it('add item to the list', () => {
        render(<Provider store={store}><EditorItemsList/></Provider>);
        screen.debug();
        fireEvent.click(screen.getByRole('button'))
        expect(screen.getByRole('list').children).toHaveLength(1);
    })
});