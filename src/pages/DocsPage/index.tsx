import { State as TokenStoreState, getToken, setToken } from "store/slices/TokenSlice";

import { connect } from "react-redux";

import Unit from "./DocsPage";

type ReduxStoreState = TokenStoreState;

const connectToRedux = connect((state: ReduxStoreState) => ({
	//Mapping state to props
	authorized: getToken(state) !== null,
	token: getToken(state)
}), {
	//Mapping action creators to prop functions
	setToken,
});

export default connectToRedux(Unit);