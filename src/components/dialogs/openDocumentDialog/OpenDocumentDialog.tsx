import React, { ReactNode } from "react";
import DialogBase from "../DialogBase";
import { Button, DialogActions } from "@material-ui/core";
import InputDialogContent from "../InputDialogContent";

interface Props {
	onClose: (document: string | undefined) => void;
	open: boolean;
}

interface State {
	input: string;
	error: string;
}

export default class OpenDocumentDialog extends React.Component<Props, State>{
	constructor(props: Props) {
		super(props);
		this.state = {
			input: "",
			error: ""
		};
	}

	reset(): void {
		this.setState({ input: "", error: "" });
	}

	onChangeInput(input: string): void {
		this.setState({ input, error: "" });
	}

	onClickClose(proceed: boolean): void {
		if (!proceed) {
			this.props.onClose(undefined);
		} else {
			if (this.validateInput(this.state.input)) {
				this.props.onClose(this.processInput(this.state.input));
			}
		}
	}

	validateInput(input: string): boolean {
		if (!input) {
			this.setState({ error: "This is required" });
			return false;
		}
		return true;
	}

	processInput(input: string): string {
		const prefix = "https://docs.google.com/document/d/";
		if (input.startsWith(prefix)) {
			input = input.substring(prefix.length);
			const slash = input.indexOf("/");
			if (slash > 0) {
				input = input.substring(0, slash);
			}
		}
		return input;
	}
	render(): ReactNode {
		return (
			<DialogBase fullWidth open={this.props.open} title="Open from Google Docs" onReset={() => this.reset()}>
				<InputDialogContent label="Document Link/Id" value={this.state.input} onChange={(v) => this.onChangeInput(v)} error={this.state.error}>
					Please enter the document link or id
				</InputDialogContent>
				<DialogActions>
					<Button color="primary" onClick={() => this.onClickClose(false)}>Cancel</Button>
					<Button variant="contained" color="primary" onClick={() => this.onClickClose(true)}>Open</Button>
				</DialogActions>
			</DialogBase>
		);
	}
}