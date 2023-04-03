import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {decrement, increment} from "./reduxToolkit/slices/couterSlice";
import {Container} from "react-bootstrap";

const AppTwo = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    return (
        <div className="App">
            <Container className={'mt-5'}>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span className={`mx-4`}>Count = {count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </Container>
        </div>
    );
};

export default AppTwo;