import "./App.css";
import DigitalClock from "./problems/beginner/DigitalClock";
import GoogleSheet from "./problems/expert/googleSheet/GoogleSheet";
import ApiRetry from "./problems/intermediate/api_retry_and_cancellation/ApiRetry";
import DebounceApiCall from "./problems/intermediate/debounce_api_call/DebounceApiCall";
import Tabs from "./problems/intermediate/tabs_component/Tabs";
import ToastProvider from "./problems/intermediate/toast_notification/ToastContext";
import Toast from "./problems/intermediate/toast_notification/Toast";
import MultiStepForm from "./problems/intermediate/multi_step_form/MultiStepForm";

function App() {
    return (
        <>
            {/* <GoogleSheet /> */}
            {/* <DigitalClock /> */}
            {/* <DebounceApiCall /> */}
            {/* <ApiRetry /> */}
            {/* <Tabs /> */}
            {/* <ToastProvider>
                <Toast />
            </ToastProvider> */}
            <MultiStepForm />
        </>
    );
}

export default App;
