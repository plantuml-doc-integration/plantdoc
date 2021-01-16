
import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const Footer: React.FunctionComponent<Record<string, never>> = () => {
	return (
		<footer>
			<Typography variant="caption" className="text-light">
				&copy; PlantUML Doc Integration 2020 |
				<a href="https://github.com/plantuml-doc-integration/">Source on GitHub</a>
				| <Link to="/privacy">Privacy Policy</Link> |
				<Link to="/terms">Terms and Conditions</Link>
			</Typography>
		</footer>
	);
};
export default Footer;