
let dataHandler = {
    keyInLocalStorage: 'swapi',
    _data: {},
    _initData: {
        "residents": [],
        "next": "",
        "prev": "",
        "curr": "https://swapi.co/api/planets/",

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
        debugger;
    var residentD = [];
                    for (let resident of planet) {
                        $.getJSON(resident, function(response){
                            debugger;
                        dataHandler._data.residents.push(response['results']);})
                        dataHandler._saveData();

                    }
                    debugger;
                    residentD = dataHandler._data.residents;
                    dataHandler._data.residents = []
                    dataHandler._saveData();
                    return residentD
                        },

    ajax: function (param1, param2, callback) {



    $.getJSON(param1, function(response){
            dataHandler._data.curr=param1;

            dataHandler._data.next=response['next'];

            dataHandler._data.prev=response['previous'];

            dataHandler._saveData();

            callback(response[param2])
    });


},
    appendToElement: function (elementToExtend, textToAppend) {
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        elementToExtend.appendChild(fakeDiv.firstChild);

        return elementToExtend.lastChild;},


    createTable: function (planets) {

    for (planet of planets) {

        let containerBody = document.getElementById("main-table-container");

        var templateTable = $('#handlebars-main-table').html();
        var contextTable = { "planet_name" : planet['name'], "diameter": planet['diameter'],
            "climate":planet['climate'], "terrain":planet['terrain'],
            "water":planet['surface_water'], "population":planet['population'], "url": JSON.stringify(planet['residents']) };
        var templateScript = Handlebars.compile(templateTable);
        var htmlTable = templateScript(contextTable);
        dataHandler.appendToElement(containerBody, htmlTable);
        var resident_info = [];
        for (let resident of planet.residents) {
                        $.getJSON(resident, function(response){
                            debugger;
                        dataHandler._data.residents.push(response['results']);
                        dataHandler._saveData();
                        resident_info.push(response['results'])})
                        debugger;
                            }




        debugger;
        //resident button and resident modal generation
        var residentsButtonId  = 'residents_button' + planet.name.toString();
        var residentsButton = document.getElementById(residentsButtonId);
        residentsButton.addEventListener('click', function(resident_info) {
        debugger;


            let modalBody = document.getElementById("main-modal-container");
            var templateModal = $('#handlebars-resident-modal').html();
            var contextModal = { "name" : resident_info.name, "height": resident_info.height,
                "mass":resident_info.mass, "skin":resident_info.skin_color,
                "hair":resident_info.hair_color, "eye":resident_info.eye_color,
             "birth":resident_info.birth_year, "gender":resident_info.gender};
            var templateScript = Handlebars.compile(templateModal);
            var htmlModal = templateScript(contextModal);
            dataHandler.appendToElement(modalBody, htmlModal);
    })


    }},



    renderPAge: function () {



            this.ajax(dataHandler._data.curr, 'results', this.createTable)


},
    modalInit: function (residentsButton, resident_info) {



        let modalBody = document.getElementById("main-modal-container");



            var templateModal = $('#handlebars-resident-modal').html();
            var contextModal = { "name" : response.name, "height": response.height,
                "mass":response.mass, "skin":response.skin_color,
                "hair":response.hair_color, "eye":response.eye_color,
             "birth":response.birth_year, "gender":response.gender};
            var templateScript = Handlebars.compile(templateModal);
            var htmlModal = templateScript(contextModal);
            dataHandler.appendToElement(modalBody, htmlModal);



    },

    residentInfoandButton: function(planet) {
    var resident_info = dataHandler.getResidents(planet['residents']);
    debugger;
    var residentsButtonId  = 'residents_button' + planet.name.toString();
    var residentsButton = document.getElementById(residentsButtonId);

    residentsButton.addEventListener('click', function() {
        debugger;
        dataHandler.modalInit(residentsButton, resident_info)
    })
},

    nav: function() {

    $("#nextPage").click(function () {
        let next=dataHandler._data.next;
        dataHandler._data.curr=next;
        dataHandler._saveData();


        });

        $("#prevPage").click(function () {
            if (dataHandler._data.prev != null) {
                let prev=dataHandler._data.prev;
                dataHandler._data.curr=prev;
                dataHandler._saveData();

            } else {
                window.alert("you are on the first page!");
                return
            }
        })
    }
};

dataHandler.init();
$(document).ready(function () {


    dataHandler.renderPAge();
    dataHandler.nav()
});






























