import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import { CircularProgress, Tooltip, IconButton } from "@material-ui/core";
import { ErrorOutlineOutlined, RefreshOutlined } from "@material-ui/icons";
import { If, Then, Else, When } from "react-if";
import AuthorizeDialog from "components/dialogs/authorizeDialog/AuthorizeDialog";
import HeaderBar from "components/headerBar/HeaderBar";
import PlantExpansionPanel from "components/PlantExpansionPanel";
import { Document } from "types";
import parseDiagramData from "functions/diagram";
import { State as TokenStoreState, getToken, setToken } from "store/slices/TokenSlice";

import { connect, ConnectedProps } from "react-redux";

interface State {
	loading: boolean,
	error: boolean,
	document?: Document
}

const connector = connect(function (state: TokenStoreState) {
	const token = getToken(state);
	return {
		authorized: token !== null,
		token: token
	};
}, {
	setToken
});

type Props = ConnectedProps<typeof connector> & RouteComponentProps<Record<string, string | undefined>>;

export default connector(class DocPage extends React.Component<Props, State> {

	state: State = {
		loading: false,
		error: false,
		document: undefined
	}
	componentDidMount() {
		this.updateDocument();
	}
	componentDidUpdate(prevProps: Props) {
		if (this.props.match.params.docId !== prevProps.match.params.docId) {
			this.updateDocument();
		}

	}
	updateDocument() {
		const docId = this.props.match.params.docId;
		if (!docId) {
			this.props.history.push("/");
			return;
		}
		//redirectDocIdStore.store(docId);
		if (this.props.authorized) {
			this.setState({
				loading: true,
				error: false,
				document: undefined
			});
			this.loadDocument();
		}
	}
	loadDocument = async () => {

		try {
			const response = await axios.get(`/docs/${this.props.match.params.docId}`, { headers: { authorization: `bearer ${this.props.token}` } });

			if (response.status === 200) {
				const document = {
					title: response.data.title,
					documentId: response.data.documentId,
					diagrams: response.data.rawData.map(parseDiagramData)
				};
				this.setState({ document, loading: false, error: false });
			} else {
				console.log(response);
				this.setState({ error: true, loading: false, document: undefined });
			}
		} catch (err) {
			if (err.response && err.response.status === 401) {
				this.props.setToken(null);
			}
			console.log(err);
			this.setState({ error: true, loading: false, document: undefined });
		}
	};


	render() {
		return (
			<div>
				<HeaderBar title={this.state.loading ? "Loading Title..." : this.state.error ? "Error" : this.state.document ? this.state.document.title : "Unknown Document"} >
					<Tooltip title="Refresh">
						<IconButton edge="start" color="inherit" onClick={() => this.loadDocument()}>
							<RefreshOutlined className="header-icon" />
						</IconButton>
					</Tooltip>
				</HeaderBar>
				<AuthorizeDialog open={!this.props.authorized} onClose={() => this.props.history.push("/")} />
				<If condition={this.state.loading}>
					<Then>
						<CircularProgress />Loading
					</Then>
					<Else>
						<If condition={this.state.error}>
							<Then>
								<ErrorOutlineOutlined />Error
							</Then>
							<Else>
								<When condition={!!this.state.document}>
									{() =>
										<If condition={this.state.document?.diagrams.filter(diagram => diagram.valid).length === 0}>
											<Then>
												No Diagram
											</Then>
											<Else>
												<div className="page">
													{this.state.document?.diagrams.map((diagram, i) => (
														<PlantExpansionPanel key={i} id={i} {...diagram} />
													))}
												</div>
											</Else>
										</If>
									}
								</When>
							</Else>
						</If>
					</Else>
				</If>
			</div>
		);
	}
});