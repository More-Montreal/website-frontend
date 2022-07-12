import * as React from "react";

const JsonDebug = ({data}: any) => {
    return (
        <div className="p-8 m-4 font-mono text-gray-100 bg-gray-700 border-2 border-gray-800 rounded-xl">
            <p className="mb-2 text-lg font-medium text-gray-500">Object Debug</p>
            <pre>
                {JSON.stringify(data, null, 4)}
            </pre>
        </div>
    );
}

export default JsonDebug;