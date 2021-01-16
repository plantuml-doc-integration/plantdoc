import React from "react";
import "./Html.css";
import HeaderBar from "components/headerBar/HeaderBar";
import { Card, CardContent } from "@material-ui/core";

interface Props {
	title: string;
}
const HtmlPage: React.FunctionComponent<Props> = ({ children, title }) => {
	return (<div>
		<HeaderBar title={title} />
		<div className="page static-page">
			<Card >
				<CardContent>
					<div>
						{children}
					</div>
				</CardContent>
			</Card>
		</div>

	</div>);
};
export default HtmlPage;