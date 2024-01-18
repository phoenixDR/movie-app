const processApiResponse = async (response) => {
    const jsonData = await response.json();

    if (!response.ok) {
        if (jsonData.error && typeof jsonData.error === 'object') {
            const fieldErrors = Object.entries(jsonData.error)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', ');
            throw new Error(fieldErrors);
        } else {
            throw new Error(jsonData.error || `HTTP error! status: ${response.status}`);
        }
    }

    return jsonData;
};

export default processApiResponse;
