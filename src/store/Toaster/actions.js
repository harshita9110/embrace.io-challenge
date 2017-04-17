export const SHOW_TOASTER = 'SHOW_TOASTER';
export const HIDE_TOASTER = 'HIDE_TOASTER';


function showToaster( msg ) {
    return {
        type: SHOW_TOASTER,
        message: msg
    };
}

function hideToaster() {
    return {
        type: HIDE_TOASTER,
    };
}

export function show( msg, timeoutSecs ) {
    return ( dispatch, getState ) => {
        dispatch( showToaster( msg ) );

        let defaultTimeout = 5000;
        let timeout = timeoutSecs * 1000 || defaultTimeout;

        setTimeout( () => {
            dispatch( hideToaster() );
        }, timeout );
    };
}
