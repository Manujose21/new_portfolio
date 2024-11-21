export const shorthenText = (text: string, limit: number) => {
    if (text.length > limit) {
        return text.substring(0, limit) + '...'
    }
    return text
}

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric'
    });
}