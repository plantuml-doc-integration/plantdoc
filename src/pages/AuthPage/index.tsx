import { State as TokenStoreState, getToken, setToken } from "store/slices/TokenSlice";
import { State as RedirectDocIdStoreState, getRedirectDocId } from "store/slices/RedirectDocIdSlice";
import { connect } from "react-redux";

import Unit from "./AuthPage";

type ReduxStoreState = TokenStoreState & RedirectDocIdStoreState;

const connectToRedux = connect((state: ReduxStoreState) => ({
	//Mapping state to props
	authorized: getToken(state) !== null,
	redirectDocId: getRedirectDocId(state)
}), {
	//Mapping action creators to prop functions
	setToken,
});

export default connectToRedux(Unit);