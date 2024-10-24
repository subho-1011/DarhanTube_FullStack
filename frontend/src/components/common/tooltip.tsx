import React from "react";

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <div
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="relative inline-block"
        >
            {children}
            {visible && (
                <div className="m-4 absolute flex flex-col z-30 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
