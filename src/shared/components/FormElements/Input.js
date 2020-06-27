import React, { useReducer, useEffect } from 'react';
import { validate } from '../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
};
const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isTouched: false,
        isValid: false
    });
    let { id, onInput } = props;
    let { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    let changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    let touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const element = props.element === 'input' ? (
        <input
            id={props.id}
            type={props.type}
            value={inputState.value}
            onChange={changeHandler}
            onBlur={touchHandler}
            placeholder={props.placeholder} />)
        : (
            <textarea id={props.id}
                rows={props.row || 3}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler} />);

    return (<div
        className={`form-control ${!inputState.isValid && inputState.isTouched
            && 'form-control--invalid'}`}>

        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>);
};

export default Input;