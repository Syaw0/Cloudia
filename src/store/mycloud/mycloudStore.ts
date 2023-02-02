import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type floatTypes = "edit" | "none" | "removeConfirm" | "info" | string;
interface FileData {
  name: string;
  size: number;
  date: string;
  type: "file" | "dir" | string;
}
interface PageBasicStates {
  isSideOpen: boolean;
  isFileSelected: boolean;
  selectedFileData: FileData;
  sideData: FileData;
  isNavOpen: boolean;
  floatType: floatTypes;
}

const pageBasicStates: PageBasicStates = {
  isSideOpen: false,
  isFileSelected: false,
  isNavOpen: false,
  floatType: "none",
  selectedFileData: {
    name: "",
    size: 0,
    date: "",
    type: "file",
  },
  sideData: {
    name: "",
    size: 0,
    date: "",
    type: "file",
  },
};

const states = {
  storageUsage: {
    max: 0,
    min: 0,
  },
  user: {
    name: "",
    profileUrl: "",
    id: "",
  },
  ...pageBasicStates,
};

const mycloudSlice = createSlice({
  name: "mycloud",
  initialState: states,
  reducers: {
    toggleSideInfo(preState, action: PayloadAction<boolean | null>) {
      const status =
        action.payload == null ? !preState.isSideOpen : action.payload;
      return {
        ...preState,
        isSideOpen: status,
      };
    },
    setSideInfo(preState, action: PayloadAction<CardPropsType>) {
      return {
        ...preState,
        sideData: {
          ...action.payload,
          size: 0,
        },
      };
    },

    toggleFileSelected(preState, action: PayloadAction<boolean | null>) {
      const status =
        action.payload == null ? !preState.isSideOpen : action.payload;
      return {
        ...preState,
        isFileSelected: status,
      };
    },
    setSelectedFileData(preState, action: PayloadAction<FileData>) {
      return {
        ...preState,
        selectedFileData: action.payload,
      };
    },

    toggleNavOpen(preState, action: PayloadAction<boolean | null>) {
      const status =
        action.payload == null ? !preState.isSideOpen : action.payload;
      return {
        ...preState,
        isNavOpen: status,
      };
    },

    setFloatType(preState, action: PayloadAction<floatTypes>) {
      return {
        ...preState,
        floatType: action.payload,
      };
    },
  },
});

const makeStore = (params: Partial<typeof states>) => {
  return configureStore({
    preloadedState: { ...states, ...params },
    reducer: mycloudSlice.reducer,
  });
};

export const toggleSideInfoAction = mycloudSlice.actions.toggleSideInfo;
export const setSideInfoAction = mycloudSlice.actions.setSideInfo;
export const toggleSelectFile = mycloudSlice.actions.toggleFileSelected;
export const setSelectedFileData = mycloudSlice.actions.setSelectedFileData;
export const toggleNavOpen = mycloudSlice.actions.toggleNavOpen;
export const setFloatType = mycloudSlice.actions.setFloatType;

export type RootState = typeof states;
export default makeStore;
