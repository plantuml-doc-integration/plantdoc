import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route, withRouter, useLocation, RouteComponentProps } from "react-router-dom";

import DocsPage from "pages/DocsPage";
import HomePage from "pages/HomePage";
import PrivacyPage from "pages/PrivacyPage";
import TermsPage from "pages/TermsPage";
import AuthPage from "pages/AuthPage";
import Footer from "components/footer/Footer";

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

class App extends React.Component<RouteComponentProps<Record<string, string | undefined>>> {

	render() {

		return (
			<div className="main-content">
				<Switch>
					<Route path="/docs/:docId" component={DocsPage} />
					<Route path="/auth" component={AuthPage} />
					<Route exact path="/privacy"  >
						<ScrollToTop />
						<PrivacyPage />
					</Route>
					<Route exact path="/terms"  >
						<ScrollToTop />
						<TermsPage />
					</Route>
					<Route exact path="/"  >
						<HomePage />
					</Route>
					<Route path="*">
						Not Found page working in progress
					</Route>

				</Switch>
				<Footer />
			</div>
		);
	}
}
export default withRouter(App);