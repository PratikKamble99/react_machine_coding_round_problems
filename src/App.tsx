import "./App.css";
import DigitalClock from "./problems/beginner/DigitalClock";
import GoogleSheet from "./problems/expert/googleSheet/GoogleSheet";
import ApiRetry from "./problems/intemediate/api_retry_and_cancellation/ApiRetry";
import DebounceApiCall from "./problems/intemediate/DebounceApiCall";

function App() {
    return (
        <>
            {/* <GoogleSheet /> */}
            {/* <DigitalClock /> */}
            {/* <DebounceApiCall /> */}
            <ApiRetry />
        </>
    );
}

export default App;
