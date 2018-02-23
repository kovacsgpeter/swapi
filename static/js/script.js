
let dataHandler = {
    keyInLocalStorage: 'swapi',
    _data: {},
    _initData: {

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
    var residentD = [];
                    for (let resident of planet) {

                        residentD.push(resident);

                    }
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
    }},



    renderPAge: function () {



            this.ajax(dataHandler._data.curr, 'results', this.createTable)


},
    modalInit: function (residentsButton) {



        var resident_info = JSON.parse(residentsButton.getAttribute("data-residents"));


        let modalBody = document.getElementById("main-modal-container");

        for (let resident of resident_info) {
            $.getJSON(resident, function(response){

            var templateModal = $('#handlebars-resident-modal').html();
            var contextModal = { "name" : response.name, "height": response.height,
                "mass":response.mass, "skin":response.skin_color,
                "hair":response.hair_color, "eye":response.eye_color,
             "birth":response.birth_year, "gender":response.gender};
            var templateScript = Handlebars.compile(templateModal);
            var htmlModal = templateScript(contextModal);
            dataHandler.appendToElement(modalBody, htmlModal);

                })}

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






/*
function residentInfoandButton() {
    var resident_info = dataHandler.getResidents(planet['residents']);
    var residentsButtonId  = 'residents_button' + planet.name.toString();
    var residentsButton = document.getElementById(residentsButtonId);

    residentsButton.addEventListener('click', function() {
        dataHandler.modalInit(residentsButton)
    })
}
*/





















