import client from "../Client";

export default {
    // Авторизация.
    login: (baseString, dataDecodeMethodId, dataDecodeKey) => {
        return client
            .post(`CurrentUser/Login`, {
                encodedData: baseString,
                decodeMethodId: dataDecodeMethodId,
                decodeKey: dataDecodeKey,
                transcodeMethodId: 0
            });
    },
    // Валидация токена.
    validate: (token) => {
        return client
            .get(`CurrentUser/Validate`, {
                params: {
                    checkApiKey: true
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    },
};