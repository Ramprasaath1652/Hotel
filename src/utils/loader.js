let setGlobalLoading = null;

export const registerLoader = (setLoading) => {
    setGlobalLoading = setLoading;
};

export const showLoader = () => {
    if (setGlobalLoading) setGlobalLoading(true);
};

export const hideLoader = () => {
    if (setGlobalLoading) setGlobalLoading(false);
};
