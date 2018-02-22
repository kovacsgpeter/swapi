
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
            "water":planet['surface_water'], "population":planet['population'], "url": JSON.stringify(planet['residents']) };
        var templateScript = Handlebars.compile(templateTable);
        var htmlTable = templateScript(contextTable);
        dataHandler.appendToElement(containerBody, htmlTable);
        var resident_info = dataHandler.getResidents(planet['residents']);
        var residentsButtonId  = 'residents_button' + planet.name.toString();
        var residentsButton = document.getElementById(residentsButtonId);
        residentsButton.addEventListener('click', function() {
            debugger;
            dataHandler.modalInit(residentsButton)
        })



    }},



    nextPage: function (data) {
    return data;
},

    main: function () {

    this.ajax('https://swapi.co/api/planets/','results', this.createTable)
    //})
},
    modalInit: function (residentsButton) {
        debugger;


        var resident_info = JSON.parse(residentsButton.getAttribute("data-residents"));
        debugger;

            let modalBody = document.getElementById("main-modal-container");
            debugger;
            for (let resident of resident_info) {
                $.getJSON(resident, function(response){
                    debugger;
                var templateModal = $('#handlebars-resident-modal').html();
                var contextModal = { "name" : response.name, "height": response.height,
                    "mass":response.mass, "skin":response.skin_color,
                    "hair":response.hair_color, "eye":response.eye_color,
                 "birth":response.birth_year, "gender":response.gender};
                var templateScript = Handlebars.compile(templateModal);
                var htmlModal = templateScript(contextModal);
                dataHandler.appendToElement(modalBody, htmlModal);

                })}

}
};


if (!dataHandler._data.length) {
    dataHandler.init();}

$("#nextPage").click(function () {
        dataHandler.ajax(dataHandler._data.next, 'results', dataHandler.createTable)
    });
$("#prevPage").click(function () {
        if (dataHandler._data.prev != null) {
            dataHandler.ajax(dataHandler._data.prev, 'results', dataHandler.createTable)
        } else {
            window.alert("you are on the first page!");
            return
        }
    });


if (!dataHandler._data.curr) {

    dataHandler.main();}
    else {

    dataHandler.ajax(dataHandler._data.curr, 'results', dataHandler.createTable)
    ;}



//$('#nextPage')




















