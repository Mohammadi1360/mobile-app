import {useEffect, useReducer, useState} from "react";
import {dataFetchReducer} from "./dataFetchReducer";
import axios from "axios";

export const useDataApi = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });
    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            dispatch({type: 'FETCH_INIT'});
            try {
                const result = await axios(url);
                console.log("useDataApi = >>");
                console.log(result.data);
                if (!didCancel) {
                    dispatch({type: 'FETCH_SUCCESS', payload: result.data});
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({type: 'FETCH_FAILURE'});
                }
            }
        };
        fetchData();
        return () => {
            didCancel = true;
        };
    }, [url]);
    return [state, setUrl];
};
