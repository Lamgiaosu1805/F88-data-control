import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from "@ant-design/cssinjs";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={{
          components:{
            Menu:{
              // darkItemSelectedBg:'white',
              // itemActiveBg:'blue',
              // itemSelectedBg:'#ED2F1D',
              itemColor:'black',
              subMenuItemBg:'white',
              itemSelectedColor:'#ED2F1D',
              itemHoverColor:"#ED2F1D"
            }
          }
        }}>
          <StyleProvider
            hashPriority="high"
            transformers={[legacyLogicalPropertiesTransformer]}
          >
            <App />
          </StyleProvider>
          <ToastContainer />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
