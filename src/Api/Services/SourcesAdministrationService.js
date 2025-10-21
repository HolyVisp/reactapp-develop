import client from "../Client";

export default {
    // Удаление изображений
    deleteImage: (token,id) => {
        return client
            .delete(`GraphicImages/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    },
    // Удаление документов
    deleteDocument: (token,id) => {
        return client
            .delete(`Documents/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    },
};