import React from 'react';
import ModalDialog from "../ModalDialog/"
import './MyIdeas.scss';
import ideaService from "../_services/idea.service.js"

class MyIdeas extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
			displayModal: false,
			modalDeleteId: null,
			currentPage: 1
		};

		this.handlePlusClick = this.handlePlusClick.bind(this);
		this.getIdeaPage = this.getIdeaPage.bind(this);
		this.confirmEdit = this.confirmEdit.bind(this);
		this.startEdit = this.startEdit.bind(this);
		this.cancelEditing = this.cancelEditing.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.deleteRow = this.deleteRow.bind(this);

		this.getIdeaPage();
	}

	getIdeaPage() {
		ideaService.getIdeaPage(this.state.currentPage).then((data) => {
			this.setState({
				ideas: data.map((idea) => {
					return {
						id: idea.id,
						fields: idea,
						temp_fields: Object.assign({}, idea),
						editing: false,
						just_added: false
					};
				})
			});
		});
	}

	handlePlusClick(event) {
		if(this.state.ideas.filter(idea => idea.just_added).length === 0) {
			this.setState(state => {
				state.ideas.unshift({
					id: Math.random(),
					fields: {
						content: "",
						impact: 10,
						ease: 10,
						confidence: 10
					},
					temp_fields: {
						content: "",
						impact: 10,
						ease: 10,
						confidence: 10
					},
					editing: true,
					just_added: true});
				return state;
			});			
		}
	}

	confirmEdit(index) {
		var success = (data) => {
			// this.setState(state => {
			// 	state.ideas[index].id = data.id;
			// 	state.ideas[index].editing = false;
			// 	state.ideas[index].just_added = false;
			// 	state.ideas[index].fields = Object.assign({}, state.ideas[index].temp_fields);
			// 	return state;
			// });
			this.getIdeaPage();
		};

		if(this.state.ideas[index].just_added) {
			ideaService.addIdea(this.state.ideas[index].temp_fields).then(success, (error) => {
				alert(error.response.data.reason);
			});
		} else {
			ideaService.updateIdea(Object.assign({id: this.state.ideas[index].id},this.state.ideas[index].temp_fields)).then(success, (error) => {
				alert(error.response.data.reason);
			});
		}

	}

	startEdit(index) {
		this.setState(state => {
			state.ideas[index].editing = true;
			return state;
		});
	}

	cancelEditing(index) {
		this.setState(state => {
			state.ideas[index].editing = false;
			return state;
		});
	}

	updateField(index, field, value) {
		this.setState(state => {
			state.ideas[index].temp_fields[field] = value;
			return state;
		});
	}

	closeModal() {
		this.setState({
			displayModal: false,
			modalDeleteId: null
		});
	}

	displayModal(id) {
		this.setState({
			displayModal: true,
			modalDeleteId: id
		});
	}

	deleteRow() {
		this.closeModal();
		ideaService.deleteIdea(this.state.modalDeleteId).then(() => {
			// this.setState(state => {
			// 	state.ideas = state.ideas.filter(idea => idea.id !== state.modalDeleteId);
			// 	return state;
			// });
			this.getIdeaPage();
		});
	}

	render() {

		return (
			<div className="MyIdeasComponent">
				{
					this.state.displayModal
					?
					<ModalDialog cancelCallback={this.closeModal} okCallback={this.deleteRow} />
					:
					""
				}
				<div className="MyIdeasHeader">
					<h1>My Ideas</h1>
					<div className="PlusIdeaButton" onClick={this.handlePlusClick}><img src="/images/btn_addanidea@2x.png" alt=""/></div>
				</div>
				<div className="MyIdeasMainBody">
						{
							this.state.ideas.length
							?
							<div className="AddNewIdeaForm">
								<div className="IdeasContainer">
									<table>
										<thead>
											<tr>
												<td></td>
												<td></td>
												<td>Impact</td>
												<td>Ease</td>
												<td>Confidence</td>
												<td>Avg.</td>
												<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
											</tr>
										</thead>
										<tbody>
											{
												this.state.ideas.map((idea, index) => {
													return <tr key={idea.id}>
														<td>
															<div className="dot">
															</div>
														</td>
														<td>
															{idea.editing ? <input type="text" defaultValue={idea.fields.content} className="IdeaNameInput" onChange={(event) => { this.updateField(index, "content", event.target.value) }}/> : <span>{idea.fields.content}</span>}
														</td>
														<td>
															{idea.editing ? <input type="number" min="1" max="10" defaultValue={idea.fields.impact} onChange={(event) => { this.updateField(index, "impact", event.target.value) }}/> : <div>{idea.fields.impact}</div>}
														</td>
														<td>
															{idea.editing ? <input type="number" min="1" max="10" defaultValue={idea.fields.ease} onChange={(event) => { this.updateField(index, "ease", event.target.value) }}/> : <div>{idea.fields.ease}</div>}
														</td>
														<td>
															{idea.editing ? <input type="number" min="1" max="10" defaultValue={idea.fields.confidence} onChange={(event) => { this.updateField(index, "confidence", event.target.value) }}/> : <div>{idea.fields.confidence}</div>}
														</td>
														<td>
															{ ((parseInt(idea[idea.editing?'temp_fields':'fields'].impact) + parseInt(idea[idea.editing?'temp_fields':'fields'].ease) + parseInt(idea[idea.editing?'temp_fields':'fields'].confidence))/3).toFixed(1) }
														</td>
														<td>
															{
																idea.editing
																?
																<> 
																	<img onClick={() => this.confirmEdit(index)} src="/images/Confirm_V.png" alt=""/><img onClick={() => this.cancelEditing(index)} src="/images/Cancel_X.png" alt=""/>
																</>
																:
																<> 
																	<img onClick={() => this.startEdit(index)} src="/images/pen.png" alt=""/><img onClick={() => this.displayModal(idea.id)} src="/images/bin.png" alt=""/>
																</>
															}
														</td>
													</tr>
												})
											}
										</tbody>
									</table>
								</div>
							</div>
							:
							(
								<>
								<img className="LightBulb" src="/images/bulb@2x.png" alt=""/>
								<h2>Got Ideas?</h2>
								</>
							)
						}
				</div>
			</div>
		);
	}
}

export default MyIdeas;
