import React from 'react';
import Modal from 'react-modal';

const ConfirmRemoveModal = (props) => (
	<Modal 
		isOpen = {props.showModal}
		onRequestClose={props.handleCloseModal}
		contentLabel="Confirm Removal Expense"
		closeTimeoutMS={200}
		className="modal"
	>
		<h3 className="modal__title">Confirm Expense Removal</h3>
		<p className="modal__body">
			Are you sure you want to remove the below expense?
		</p>
		
		<p className="modal__body modal__body--bold">
			Removing: <br /> {props.name && <span>{ props.name }</span>}
		</p>

		<button className="button button--warning modal__button" onClick={props.onRemove}>
			Remove expense
		</button>
		<p></p>
		<button className="button button--secondary modal__button" onClick={props.handleCloseModal}>
			Keep expense
		</button>
	</Modal>
)

if(process.env.NODE_ENV !== 'test') {
	Modal.setAppElement('#root');
}

export default ConfirmRemoveModal;