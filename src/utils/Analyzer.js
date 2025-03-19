const analyzeText = (text) => {
    if (!text || text.trim().length === 0) {
        return { text: "", length: 0 };
    }
    return {
        text: text.trim(),
        length: text.length,
    };
};
export { analyzeText };
