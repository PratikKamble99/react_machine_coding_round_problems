import React, { useState } from "react";

type FormWrapperProps<T> = {
    children: React.ReactNode;
    values: T;
    onSubmit: (e: React.FormEvent) => void;
};

function FormWrapper<T>({ children, values, onSubmit }: FormWrapperProps<T>) {
    const [activeStep, setActiveStep] = useState(0);

    const steps = React.Children.toArray(children) as any[];
    if (steps.length === 0) return <p>No Steps found</p>;

    function canGoToStep() {
        return steps[activeStep].props.validate(values);
    }

    return (
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                {steps.map((step, i) => {
                    const isActive = i === activeStep;
                    const isCompleted = i < activeStep;

                    return (
                        <div
                            key={step.props.label}
                            className="flex-1 text-center"
                        >
                            <div
                                className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                                ${
                                    isCompleted
                                        ? "bg-green-500 text-white"
                                        : isActive
                                          ? "bg-blue-500 text-white"
                                          : "bg-gray-200 text-gray-600"
                                }`}
                            >
                                {i + 1}
                            </div>
                            <p
                                className={`mt-2 text-xs font-medium ${
                                    isActive ? "text-blue-600" : "text-gray-500"
                                }`}
                            >
                                {step.props.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            <form
                onSubmit={(e: any) => {
                    e.preventDefault();
                    if (!canGoToStep()) return;
                    onSubmit(e);
                }}
                className="space-y-6"
            >
                <div className="border rounded-lg p-4 bg-gray-50">
                    {steps[activeStep]}
                </div>

                {/* Actions */}
                <div className="flex justify-between">
                    {activeStep > 0 ? (
                        <button
                            type="button"
                            onClick={() => setActiveStep((prev) => prev - 1)}
                            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            Prev
                        </button>
                    ) : (
                        <div />
                    )}

                    {activeStep < steps.length - 1 ? (
                        <button
                            type="button"
                            onClick={() => {
                                if (!canGoToStep()) return;
                                setActiveStep((prev) => prev + 1);
                            }}
                            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

type StepProps<T> = {
    label: string;
    children: React.ReactNode;
    validate?: (values: T) => boolean | string;
};

function Step<T>({ children }: StepProps<T>) {
    return <div className="space-y-4">{children}</div>;
}

export { FormWrapper, Step };
