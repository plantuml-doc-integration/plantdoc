import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Tooltip } from "@material-ui/core";
import { InsertDriveFileOutlined, SettingsOutlined, AccountCircleOutlined } from "@material-ui/icons";
import AuthorizeDialog from "components/dialogs/AuthorizeDialog";
import OpenDocumentDialog from "components/dialogs/openDocumentDialog/OpenDocumentDialog";

interface Props extends RouteComponentProps<Record<string, string | undefined>> {
	title: string;
}
interface State {
	openAuthorizeDialog: boolean;
	openOpenDocumentDialog: boolean
}

export default withRouter(class HeaderBar extends React.Component<Props, State>{
	constructor(props: Props) {
		super(props);
		this.state = {
			openAuthorizeDialog: false,
			openOpenDocumentDialog: false
		};
	}

	setOpenDocument(openDocument: string | undefined): void {
		this.setState({ openOpenDocumentDialog: false });
		if (openDocument) {
			this.props.history.push(`/docs/${openDocument}`);
		}
	}

	render() {
		return (
			<header id="header">
				<AppBar position="static">
					<Toolbar>
						<Tooltip title="Open Document">
							<IconButton edge="start" color="inherit" onClick={() => this.setState({ openOpenDocumentDialog: true })}>
								<InsertDriveFileOutlined className="header-icon" />
							</IconButton>
						</Tooltip>

						<Typography variant="h5">
							{this.props.title}
						</Typography>

						<div className="toolbar-align-right">
							{this.props.children}
							<Tooltip title="Authorization">
								<IconButton edge="start" color="inherit" onClick={() => this.setState({ openAuthorizeDialog: true })}>
									<AccountCircleOutlined className="header-icon" />
								</IconButton>
							</Tooltip>
							<Tooltip title="Settings">
								<IconButton edge="start" color="inherit">
									<SettingsOutlined className="header-icon" />
								</IconButton>
							</Tooltip>
						</div>

					</Toolbar>
				</AppBar >
				<OpenDocumentDialog open={this.state.openOpenDocumentDialog} onClose={this.setOpenDocument.bind(this)} />

				<AuthorizeDialog open={this.state.openAuthorizeDialog} onClose={() => this.setState({ openAuthorizeDialog: false })} />
			</header>

		);
	}
});

