server = "http://localhost:5000"
mode = "release" // "release"

function toggleCard(card) {
    let list = card.querySelector('.card-content');
    if (!list.style.height || list.style.height == "0px") {
        list.style.height = list.scrollHeight + 'px';
    } else {
        list.style.height = "0";
    }
}


let params = [
    {
        json: "title",
        html: "Название",
        type: "string"
    },
    {
        json: "cafedre",
        html: "Кафедра",
        type: "string"
    },
    {
        json: "semester",
        html: "Семестр",
        type: "int"
    },
    {
        json: "scoreUnits",
        html: "З.Е.",
        type: "int"
    },
    {
        json: "controlForm",
        html: "Форма контроля",
        type: "int"
    },
    {
        json: "theory",
        html: "Часов теории",
        type: "int"
    },
    {
        json: "practice",
        html: "Часов практики",
        type: "int"
    },
];


function remove(el) {
    el.parentElement.parentElement.remove();
}

function add_discipline() {
    let button = document.querySelector('.add-discipline');

    let filter_param = (param, type) => {
        if (param == "controlForm") {
            return `
                <select data-json="${param}" data-type="${type}">
                    <option value="0">${controlFormToString(0)}</option>
                    <option value="1">${controlFormToString(1)}</option>
                    <option value="2">${controlFormToString(2)}</option>
                </select>
            `
        }

        return `<input type="text" data-json="${param}" data-type="${type}">`;
    }

    let html = `
        <div class="discipline-remove">
            <div class="button" onclick="remove(this)">-</div>
        </div>
        ${params.map(param =>
            `<div class="input-block">
                <div class="input-name">${param.html}</div>
                ${filter_param(param.json, param.type)}
            </div>`
        ).join('')}
    `.trim();

    let discipline = document.createElement('div');
    discipline.className = 'discipline';
    discipline.innerHTML = html;
    
    document.body.insertBefore(discipline, button.nextSibling);
}

let addBtn = document.querySelector('.add-discipline');
if (addBtn) {
    addBtn.addEventListener('click', event => add_discipline());
}


function controlFormToString(form) {
    if (form == 0) {
        return "Экзамен";
    }

    if (form == 1) {
        return "Дифференциальный зачет";
    }

    if (form == 2) {
        return "Зачет"
    }

    throw "Неверный id"
}

const fake_list = {
    studyProgramms: [
        {
            id: "1",
            title: "Пример 1",
            faculty: "ФКТИ",
            subjects: [
                {
                    title: "Математический анализ",
                    cafedre: "АМ",
                    semester: 1,
                    scoreUnits: 3,
                    capacity: {
                        theory: 48,
                        practice: 52
                    },
                    controlForm: 0
                },
                {
                    title: "Криптография",
                    cafedre: "ИБ",
                    semester: 7,
                    scoreUnits: 7,
                    capacity: {
                        theory: 68,
                        practice: 32
                    },
                    controlForm: 2
                }
            ]
        },
        {
            id: "2",
            title: "Пример 2",
            faculty: "ИБ",
            subjects: [
                {
                    title: "Базы данных",
                    cafedre: "ОЭВМ",
                    semester: 3,
                    scoreUnits: 4,
                    capacity: {
                        theory: 28,
                        practice: 12
                    },
                    controlForm: 1
                },
            ]
        }
    ]
}

async function get_list() {
    if (mode == "debug") {
        return fake_list;
    } 
    if (mode == "release") {
        let response = await fetch(server + "/studyProgramms");

        if (!response.ok) {
            alert("Не работает http: " + response.status);
        }
        
        return await response.json();
    }
}

async function process_list() {
    let data = await get_list();

    let get_value = (param, subject) => {
        if (param == "theory") {
            return subject.capacity.theory;
        }
        if (param == "practice") {
            return subject.capacity.practice;
        }
        if (param == "controlForm") {
            return controlFormToString(subject[param]);
        }

        return subject[param]
    }

    let html = (name, facult, subjects) => {
        return `
            <div class="card"> 
                <div class="name">
                    <h3>${name}</h3>
                    <h3>${facult}</h3>
                </div>
                <div class="card-content no-display">
                    <h3>Предметы:</h3>
                    <div class="list">
                        ${subjects.map(subject =>
                            `
                            <div class="item-name">${subject.title}</div>
                            <div class="item-params">
                                    ${params.map(param => 
                                        `
                                            <div class="param">
                                                <div class="param-name">${param.html}</div>
                                                <div class="param-value">${get_value(param.json, subject)}</div>
                                            </div>
                                        `
                                    ).join('')}
                            </div>
                            `
                        ).join('')}
                    </div>
                </div>
            </div>
        `.trim()
    }

    let all_html = "";

    data.studyProgramms.forEach(el => {
        all_html += html(el.title, el.faculty, el.subjects);
    });

    let discipline = document.createElement('div');
    discipline.innerHTML = all_html;

    let button = document.querySelector('#add-btn');
    
    document.body.insertBefore(discipline, button.nextSibling);

    let cards = document.querySelectorAll('.card');

    cards.forEach(el => el.addEventListener('click', event => toggleCard(el)));
}

async function add_card(json) {
    if (mode == "debug") {
        console.log(json);
        return true;
    } 
    if (mode == "release") {
        let response = await fetch(server + "/StudyProgramms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(json)
        });

        if (!response.ok) {
            alert("Не работает http: " + response.status);
            return false;
        }

        return true;
    }
}

async function process_add_card() {

    let title = document.querySelector('input[data-json="global.name"]').value;
    let faculty = document.querySelector('input[data-json="global.faculty"]').value;

    let json = {
        title: title,
        faculty: faculty,
        subjects: []
    };

    let disciplines = document.querySelectorAll('.discipline');

    let get_json_name = (param) => {
        if (param == "theory") {
            return "capacity";
        }
        if (param == "practice") {
            return "capacity";
        }
        return "";
    };
    
    disciplines.forEach(div => {
        let subject = {capacity: {}};

        params.forEach(param => {
            console.log(param.json);
            let input = div.querySelector(`input[data-json="${param.json}"]`);
            if (!input) {
                input = div.querySelector(`select[data-json="${param.json}"]`);
            }

            let value = input.value;

            if (value == "") {
                alert("Заполните все поля!");
                throw "";
            }

            let type = input.dataset.type;

            let obj = subject;
            let name = get_json_name(param.json);

            if (name != "") {
                obj = subject[name];
            }

            if (type == "int") {
                value = parseInt(value);
                if (value != value) {
                    alert("Не удалось преобразовать строку в число");
                    throw "";
                }
            }

            obj[param.json] = value;
        });

        json.subjects.push(subject);
    });

    let result = await add_card(json);
    
    if (result) {
        alert("Добавлена!");
        document.location.href = "localhost";
    } else {
        alert("Произошла ошибка!");
    }
}


if (document.querySelector('#add-btn')) {
    process_list();
}

let create_btn = document.querySelector('#create');
if (create_btn) {
    create_btn.addEventListener('click', event => process_add_card());
}
