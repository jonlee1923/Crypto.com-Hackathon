import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    //extra logic added with useRef and useeffect and abortController to make sure we dont
    //continue with a request that is on its way out, if we switch away from a component that triggers
    //the request

    //a reference is used to ensure the data doesnt change when the function runs again
    const activeHttpRequests = useRef([]);

    //wrapped with usecallback so that the function never gets recreated when the component
    //using it is rerendered
    const sendRequest = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setIsLoading(true);
            console.log("chekcing reques");

            //abort controller can be used to cancel a request
            const httpAbortCtrl = new AbortController();

            //store abort controller
            activeHttpRequests.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal, //assign abort controller to a request
                });

                const responseData = await response.json();
                console.log("checking");
                console.log(responseData);
                //This is done to keep every controller except for the controller used in this request
                //To make sure we dont try to cancel a request thats already completed
                activeHttpRequests.current = activeHttpRequests.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrl
                );

                if (!response.ok) {
                    //response.ok is true if 2-300 status code and will not go inside this block

                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                return responseData;
            } catch (err) {
                console.log(err.message);
                setError(err.message);
                setIsLoading(false);

                throw err;
            }
        },
        []
    ); //no dependencies defined

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        //this returned function is only executed as a cleanup function before the next time useeffect
        //runs again or when the component using useeffect unmounts ( the component calling the custom hook)
        return () => {
            //on every abort controller call abort and the linked request will be aborted
            activeHttpRequests.current.forEach((abortCtrl) =>
                abortCtrl.abort()
            );
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};
