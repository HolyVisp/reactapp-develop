import client from "../Client";

export default {
    // Получение списка пользователей.
    getUsers: (token) => {
        return client
            .get(`Users/GetUsers`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    },
};