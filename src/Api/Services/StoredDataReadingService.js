import client from "../Client";
import axios from "axios";

//const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXJzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6ImM3NGEwOGVhZmRhNjRmYmE5MjNlYmFkM2M5NWU2NGJkIiwiZXhwIjoxNzA5NTY2ODE5LCJpc3MiOiJCYW5rZXJBdXRob3JpemF0aW9uU2VydmljZSIsImF1ZCI6IkJhbmtlclNlcnZpY2VzIn0.U1ZEzchT-QteM2kYuUy-nbWtlb6jf8NHHeENz0CUat4"
export default {
    // Получение временной диаграммы сохраненных фрагментов информации, полученной от заданного источника.
    getTimeLine:async (sourceTypeId, sourceId, rules, token) => {
         await client
            .post(`StoredData/GetObjectsDiagram/${sourceTypeId}/${sourceId}`,rules, {
                headers: {
                    "Authorization":`Bearer ${token}`
                }
            }).then((responce) => {
             return responce;
            })
    },
    // Получение списка типов источников данных.
    getSourceTypes: (token) => {
        return client
            .get('StoredData/GetSourceTypes', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },
    // Получение списка источников сохренных данных заданного типа
    getSources: (sourceTypeId, token) => {
        return client
            .get(`StoredData/GetSources/${sourceTypeId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    },
    // Получение списка параметров источника сохренных данных заданного типа
    getSourceTypeParameters: (sourceTypeId, token) => {
        return client
            .get(`StoredData/GetSourceTypeParameters/${sourceTypeId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    },
    // Получение списка сохраненных фрагментов информации, полученной от заданного источника
    getObjects: (sourceTypeId, sourceId, rules, token) => {
        return client
            .post(`StoredData/GetObjects/${sourceTypeId}/${sourceId}`,rules, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    },
    // Получение списка воспроизведения сохраненных фрагментов информации, полученной от заданного источника
    getPlaylist: (sourceTypeId, sourceId, rules, token) => {
        return client
            .post(`StoredData/GetPlaylists/${sourceTypeId}/${sourceId}`,rules, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    }
};