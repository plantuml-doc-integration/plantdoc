import React, { ReactNode } from "react";
import HeaderBar from "components/HeaderBar/index";

export default class HomePage extends React.Component {

	render(): ReactNode {
		return (
			<div>
				<HeaderBar title="Home" />
				Home page working in progress
			</div>
		);
	}
}