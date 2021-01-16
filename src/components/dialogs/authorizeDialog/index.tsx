import { State as TokenStoreState, getToken, setToken } from "store/slices/TokenSlice";
import { setRedirectDocId } from "store/slices/RedirectDocIdSlice";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Unit from "./AuthorizeDialog";

type ReduxStoreState = TokenStoreState;

const connectToRedux = connect((state: ReduxStoreState) => ({
	//Mapping state to props
	authorized: getToken(state) !== null
}), {
	//Mapping action creators to prop functions
	setToken,
	setRedirectDocId
});

export default withRouter(connectToRedux(Unit));