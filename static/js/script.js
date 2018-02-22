
let dataHandler = {
    keyInLocalStorage: 'swapi',
    _data: {},
    _initData: {

        "next": "",
        "prev": "",
        "curr": "",

    },
    _loadData: function() {
        this._data = JSON.parse(localStorage.getItem('swapi'));
    },
    _saveData: function() {
        localStorage.setItem('swapi', JSON.stringify(this._data))
    },
    init: function() {

        if (localStorage.length === 0) {

            localStorage.setItem('swapi', JSON.stringify(this._initData))
        }
        this._loadData();

    },

    getResidents: function (planet) {
    var residentD = [];
                    for (let resident of planet) {

                        residentD.push(resident);

                    }
                    return residentD
                        },

    ajax: function (param1, param2, callback) {



    $.ajax({

        dataType: "json",
        url: param1,

        success: (function(response) {


            dataHandler._data.curr=param1;

            dataHandler._data.next=response['next'];

            dataHandler._data.prev=response['previous'];

            dataHandler._saveData();



            callback(response[param2])

        })
    })
},



    appendToElement: function (elementToExtend, textToAppend) {
    let fakeDiv = document.createElement('div');
    fakeDiv.innerHTML = textToAppend.trim();

    elementToExtend.appendChild(fakeDiv.firstChild);
    return elementToExtend.lastChild;},

    createTable: function (planets) {

    for (planet of planets) {
        let containerBody = document.getElementById("main-table-container");
        //var templatemodal = $('#handlebars-resident-modal').html();
        var templateTable = $('#handlebars-template-table').html();
        var contextTable = { "planet_name" : planet['name'], "diameter": planet['diameter'],
            "climate":planet['climate'], "terrain":planet['terrain'],
            "water":planet['surface_water'], "population":planet['population'] };
        var templateScript = Handlebars.compile(templateTable);
        var htmlTable = templateScript(contextTable);
        dataHandler.appendToElement(containerBody, htmlTable);
        var resident_info = dataHandler.getResidents(planet['residents']);
    }},



    nextPage: function (data) {
    return data;
},

    main: function () {

    if (!dataHandler._data.curr) {

    this.ajax('https://swapi.co/api/planets/','results', this.createTable)
    } else {

        dataHandler.ajax(dataHandler._data.curr, 'results', dataHandler.createTable)

    }

    //})
}};


if (!dataHandler._data.length) {
    dataHandler.init();}

$(document).ready(function () {


    dataHandler.main();

    $("#nextPage").click(function () {


        dataHandler.ajax(dataHandler._data.next, 'results', dataHandler.createTable)
    });

    });

//$('#nextPage')




















