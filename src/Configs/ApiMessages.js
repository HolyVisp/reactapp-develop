export const ApiMessages = {
    401: {
        "StoredData/GetSourceTypes": {
            "message": "Не пройдена авторизация. Отказано в доступе получения типов источников."
        },
        "CurrentUser/Validate": {
            "message": "Текущий токен истёк или неисправен. Нужна авторизация."
        },
        "CurrentUser/Login": {
            "message": "Неправильное имя пользователя или пароль."
        }
    },
    500:{
        "CurrentUser/Login":{
            "message": "Ошибка сервера"
        }
    },
    502:{
        "Translations/GetTranslations":{
            "message": "Шлюз API не смог подключиться к сервису Трансляций"
        },
        "StoredData/GetSourceTypes":{
            "message": "Шлюз API не смог подключиться к сервису Чтения хранимых данных"
        }
    }
}