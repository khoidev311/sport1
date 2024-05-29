import { useDispatch as reduxUseDispatch } from "react-redux";

import type { AppDispatch } from "@app/store";

const useDispatch: () => AppDispatch = reduxUseDispatch;

export default useDispatch;
