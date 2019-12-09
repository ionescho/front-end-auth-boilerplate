import React from 'react';
import './ModalDialog.scss';

class ModalDialog extends React.Component {

	constructor(props) {
		super(props);


	}

	render() {
		return (
		  	<div className="ModalDialogBackground">
		  		<div className="ModalDialog">
		  			<h2>Are you sure?</h2>
		  			<p>This idea will be permanently deleted.</p>
		  			<div className="ModalFooterLinks">
		  				<a onClick={this.props.cancelCallback} >CANCEL</a>
		  				<a onClick={this.props.okCallback} className="OkButton">OK</a>
		  			</div>
		  		</div>
		    </div>
		);
	}
}

export default ModalDialog;
