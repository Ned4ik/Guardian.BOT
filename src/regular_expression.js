
//Banned Words
regExpLatinBannWords = /\w*(ahu\w*|axy\w*|bandera|blet\w*|blya\w*|churka|CHVK|davalka|dick|droch\w*|drochit|drochka|drochu|ebal\w*|eban\w*|ebar\w*|ebat\w*|ebo\w*|gandon|gnida|hach|hachika|hail|hohlyatina|hohol|Hueblyadina|huemraz|Huevertit|hui\w*|huy\w*|jid\w*|jop\w*|Kadyrov|kakal|konch\w*|kuni\w*|Lukashenko|masturbaciya|masturbi\w*|mate|minet|mudak|muden|mudozvon|nacik|nacyk|nahui\w*|nahuy\w*|negra|niger|nigger\w*|obosal|obossal|ot`ebis|otsos|pedik|pedofil|pedovka|penis|pid\w*|pidar\w*|pidor\w*|pizd\w*|poeb\w*|pripi\w*|problyaduha|prostitutochka|Putin|shabol\w*|shala\w*|shlyu\w*|shuya\w*|shval|siski|sosal\w*|sosat|sosi|sperma|spermo\w*|such\w*|suka\w*|SVO|traha\w*|trah\w*|trax\w*|tvarin\w*|ueb\w*|uebal\w*|uebat|Vagner|viebi|vyb\w*\w|vyeb\w*|vyt\w*|xxx|zaebalsya|zalup\w*|zatraha\w*|Zelenskii|zelya\w*|zig\w*|fuck\w*|assh\w*|bitc\w*|chl\w*|su4\w*|XYN\w*|XEP\w*|CYK\w*|Syk\w*|Sy4\w*|XPE\w*|\w*EBIT\w*|eb\w*|dro4\w*|o4\w*|klit\w*|coc\w*|neg\w*|Inval\w*|gov\w*|g0v\w*|gow\w*|g0w\w*|ass\w*|nazic\w*|XYEC)/i
regExpCirilicBannWords = /(Аху|Бандера|Блэт|Бляд|Блят|Вагнер|Выбля|Выеб|Вытрах|Ганд|Гнида|Давалка|Даун|Дроч|Ебал|Ебан|Ебарь|Ебат|Ебеш|Ебл|Жид|Жоп|Заеб|Залуп|Затрах|Зелеб|Зеленский|Зеля|Кадыров|Кака|Конч|Куни|Лукашенко|Мастурб|Мин|Муд|Нах\W*|Нац|Нег|Них|Обос|Отс|Отъеб|Пед|Пидара|Пид|Пизд|Поеб|Припи|Пробля|Простит|Путин|СВО|Сиськи|Соса|Соси|Спер|Сук|Суч|Сху|Твар|Трах|Трх|Тьеб|Уеб|Хач|Хох|Хуе|Хуй|Хуя|Хуяли|ХХХ|ЧВК|Чур|Шаб|Шала|Швал|Шлх|Шлю|аху|бандера|блэт|бляд|блят|вагнер|выбля|выеб|вытрах|ганд|гнида|давалка|даун|дроч|ебал|ебан|ебарь|ебат|ебеш|ебл|жид|жоп|заеб|Залуп|затрах|зелеб|Зеленский|зеля|кадыров|кака|конч|куни|лукашенко|мастурб|мин|муд|нах\W|нац|нег|них|обос|отс|отъеб|пед|пидара|пид|пизд|поеб|припи|пробля|простит|путин|СВО|сиськи|соса|соси|спер|сук|суч|сху|твар|трах|трх|тьеб|уеб|хач|хох|хуе|хуй|хуя|хуяли|ххх|ЧВК|чур|шаб|шала|швал|шлх|шлю|(АХУ|БАНДЕРА|БЛЭТ|БЛЯД|БЛЯТ|ВАГНЕР|ВЫБЛЯ|ВЫЕБ|ВЫТРАХ|ГАНД|ГНИДА|ДАВАЛКА|ДАУН|ДРОЧ|ЕБАЛ|ЕБАН|ЕБАРЬ|ЕБАТ|ЕБЕШ|ЕБЛ|ЖИД|ЖОП|ЗАЕБ|ЗАЛУП|ЗАТРАХ|ЗЕЛЕБ|ЗЕЛЕНСКИЙ|ЗЕЛЯ|КАДЫРОВ|КАКА|КОНЧ|КУНИ|ЛУКАШЕНКО|МАСТУРБ|МИН|МУД|НАХ\W|НАЦ|НЕГ|НИХ|ОБОС|ОТС|ОТЪЕБ|ПЕД|ПИДАРА|ПИД|ПИЗД|ПОЕБ|ПРИПИ|ПРОБЛЯ|ПРОСТИТ|ПУТИН|СВО|СИСЬКИ|СОСА|СОСИ|СПЕР|СУК|СУЧ|СХУ|ТВАР|ТРАХ|ТРХ|ТЬЕБ|УЕБ|ХАЧ|ХОХ|ХУЕ|ХУЙ|ХУЯ|ХУЯЛИ|ХХХ|ЧВК|ЧУР|ШАБ|ШАЛА|ШВАЛ|ШЛХ|ШЛЮ))+[а-яА-Я]*/


//Message regular expression

// 0.Row
regExpZeroRowBody = /\>\s([1])+\.\s([A-Za-z._'`\-0-9]{3,20})\s\-\s\(([а-яА-Яё]{3,15})\)/,
// 5.Row
regExpFivRowBody = /([>])\s([6])+\.\s([а-яА-я\s,.()0-9]{2,110})/,
// 6.Row
regExpSixthRowBody = /^([>])\s([7])+\.\s(Танк|Целитель|Дамагер|ДД|Хил|Шкодник|Цілитель|Хіл|дд|дамагер|танк|хил|целитель|цілитель|шкодник)+$|^([>])\s([7])+\.\s(Танк|Целитель|Дамагер|ДД|Хил|Шкодник|Цілитель|Хіл|дд|дамагер|танк|хил|целитель|цілитель|шкодник)+\-(Танк|Целитель|Дамагер|ДД|Хил|Шкодник|Цілитель|Хіл|дд|дамагер|танк|хил|целитель|цілитель|шкодник)$|^([>])\s([7])+\.\s(Танк|Целитель|Дамагер|ДД|Хил|Шкодник|Цілитель|Хіл|дд|дамагер|танк|хил|целитель|цілитель|шкодник)+\-(Танк|Целитель|Дамагер|ДД|Хил|Шкодник|Цілитель|Хіл|дд|дамагер|танк|хил|целитель|цілитель|шкодник)\-(Танк|Целитель|Дамагер|ДД|Хил|Шкодник|Цілитель|Хіл|дд|дамагер|танк|хил|целитель|цілитель|шкодник)$/m,


//Regular expression setCharacterRole funcion
regexpOneRole =  /(Танк|Целитель|Дамагер|ДД|Хил|Цілитель|Шкодник|Хіл|дд|дамагер|танк|хил|целитель|цілитель|шкодник)/g,

//Regular for setGeneral Role function

hasGuild = /(Да)+$/m,

module.exports = {
    regExpLatinBannWords,
    regExpCirilicBannWords,

    regExpZeroRowBody,
    regExpFivRowBody,
    regExpSixthRowBody,
   
    regexpOneRole,
    hasGuild
};
