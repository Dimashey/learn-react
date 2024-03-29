import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop
                show={props.show}
                clicked={props.modalClosed}
            />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Aux>
    );
};

/**
 * React.memo() we can use instead shouldComponentUpdate
 */
export default React.memo(
  Modal,
(prevProps, nextProps) => {
    return nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
});