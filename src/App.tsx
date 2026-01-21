import "./App.css";
import DigitalClock from "./problems/beginner/DigitalClock";
import GoogleSheet from "./problems/expert/googleSheet/GoogleSheet";
import ApiRetry from "./problems/intermediate/api_retry_and_cancellation/ApiRetry";
import DebounceApiCall from "./problems/intermediate/DebounceApiCall";
import Tabs from "./problems/intermediate/tabs_component/Tabs";

function App() {
    return (
        <>
            {/* <GoogleSheet /> */}
            {/* <DigitalClock /> */}
            {/* <DebounceApiCall /> */}
            {/* <ApiRetry /> */}
            <Tabs />
        </>
    );
}

export default App;
