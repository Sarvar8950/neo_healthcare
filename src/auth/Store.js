import { createStore } from "redux";
import {loginstatus} from "./Reducer"

const initState = false
const store = createStore(loginstatus, initState)

export default store

