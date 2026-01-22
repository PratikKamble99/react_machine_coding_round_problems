import { useState } from "react";
import { FormWrapper, Step } from "./FormWrapper";

export interface FromData {
    firstName: string;
    password: string;
    isAgree: boolean;
}

const MultiStepForm = () => {
    const [formData, setFormData] = useState<FromData>({
        firstName: "",
        password: "",
        isAgree: false,
    });

    function handleChange(e: any) {
        const { name, type } = e.target;
        const _value = type == "checkbox" ? e.target.checked : e.target.value;

        setFormData((prev) => ({ ...prev, [name]: _value }));
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-2xl space-y-6">
                <h1 className="text-2xl font-semibold text-center text-gray-800">
                    Multi Step Form
                </h1>

                <FormWrapper
                    onSubmit={(e: any) => {
                        console.log(formData);
                        alert("Form Submitted");
                    }}
                    values={formData}
                >
                    <Step
                        label={"Personal info"}
                        validate={(values: FromData) => {
                            if (!values.firstName) return false;
                            return true;
                        }}
                    >
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter your first name"
                            />
                        </div>
                    </Step>
                    <Step
                        label={"Security info"}
                        validate={(values: FromData) => {
                            if (!values.password) return false;
                            return true;
                        }}
                    >
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter a secure password"
                            />
                        </div>
                    </Step>
                    <Step
                        label={"Review info"}
                        validate={(values: FromData) => {
                            if (!values.isAgree) return false;
                            return true;
                        }}
                    >
                        <label className="flex items-center gap-3 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                name="isAgree"
                                checked={formData.isAgree}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            Agree to terms and conditions
                        </label>
                    </Step>
                </FormWrapper>
            </div>
        </div>
    );
};

export default MultiStepForm;
