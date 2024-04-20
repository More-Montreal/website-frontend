import * as React from "react";

const SupportTick = ({ color, full }: { color: string; full: boolean }) => {
    const renderIcon = () => {
        if (full) {
            return (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5859 6.41418L1.75748 3.58575L0.343262 4.99996L4.5859 9.24261L11.657 2.17154L10.2428 0.757324L4.5859 6.41418Z" />
                </svg>
            );
        }
        return (
            <svg width="16" height="2" viewBox="0 0 16 2" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1Z" />
            </svg>
        );
    };

    return (
        <div className={`rounded-full flex items-center justify-center h-6 w-6 bg-${color}-500`}>{renderIcon()}</div>
    );
};

export default SupportTick;
