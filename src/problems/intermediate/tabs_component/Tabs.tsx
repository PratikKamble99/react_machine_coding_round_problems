import React, { useMemo, useState } from "react";

const TAB_ITEMS = [
    {
        id: "1",
        label: "Tab_1",
        content: "Tab 1 Content",
    },
    {
        id: "2",
        label: "Tab_2",
        content: "Tab 2 Content",
    },
];

const Tabs = () => {
    const [activeTabId, setActiveTabId] = useState(2);

    const activeTabContent = useMemo(() => {
        return TAB_ITEMS.find((ele) => +ele.id == activeTabId);
    }, [activeTabId]);

    return (
        <div>
            <h1>Tabs</h1>
            <div>
                <div className="flex gap-2">
                    {TAB_ITEMS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(+tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div>{activeTabContent?.content}</div>
            </div>
        </div>
    );
};

export default Tabs;
