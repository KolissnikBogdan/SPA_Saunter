import {useEffect, useRef} from "react";

function useTraceUpdate(props) {
    const prev = useRef(props);

    useEffect(() => {
        const changedProps = Object.entries(props).reduce((accumulator, [key, value]) => {
            if (prev.current[key] !== value) {
                accumulator[key] = [prev.current[key], value];
            }
            return accumulator;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            return changedProps;
        }
        prev.current = props;
    });
}

export default useTraceUpdate;