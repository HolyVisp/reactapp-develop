import client from "../Client";

export default {
    // Получение трансляций.
    getTranslations: (token) => {
        return client
            .get(`Translations/GetTranslations`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    },
    getTranslation: (token, serialNumber) => {
        return client
            .get(`Translations/GetTranslations/${serialNumber}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    },
};