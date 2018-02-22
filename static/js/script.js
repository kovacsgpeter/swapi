function getResidents(planet) {
    var residentD = [];
                    for (let resident of planet) {

                        residentD.push(resident);

                    }
                    return residentD
                        }

function ajax(page) {


    $.ajax({
        dataType: "json",
        url: 'https://swapi.co/api/planets/',

        success: (function(response) {
            createTable(response['results']);
            var nextPage = response['next'];


        })})}
            //var len = response.length();
            /*
            for (item of response['results']) {
                    var tr = document.createElement('tr');
                        for (let i=0; i<resident_info.length; i++) {
                            //$("#resident-row").cloneNode();
                        $.getJSON(resident_info[i], function(response){
                        document.getElementById("resident-name").innerHTML=response['name'];
                        document.getElementById("resident-height").innerHTML=response['height'];
                        document.getElementById("resident-mass").innerHTML=response['mass'];
                        document.getElementById("resident-hair").innerHTML=response['hair_color'];
                        document.getElementById("resident-skin").innerHTML=response['skin_color'];
                        document.getElementById("resident-eye").innerHTML=response['eye_color'];
                        document.getElementById("resident-birth").innerHTML=response['birth_year'];
                        document.getElementById("resident-gender").innerHTML=response['gender'];
                        });}
                        var initButton = document.getElementById("residents_button");
                        initButton.onclick=function () {
                            var modalBlock = document.getElementById("modal-init");
                            modalBlock.removeAttribute("hidden")*/

$(document).ready(function () {
    ajax();


    });

function appendToElement(elementToExtend, textToAppend) {
    let fakeDiv = document.createElement('div');
    fakeDiv.innerHTML = textToAppend.trim();

    elementToExtend.appendChild(fakeDiv.firstChild);
    return elementToExtend.lastChild;}

function createTable(planets) {




    for (planet of planets) {
        let containerBody = document.getElementById("main-table-container");

        //var templatemodal = $('#handlebars-resident-modal').html();
        var templateTable = $('#handlebars-template-table').html();

        var contextTable = { "planet_name" : planet['name'], "diameter": planet['diameter'],
            "climate":planet['climate'], "terrain":planet['terrain'],
            "water":planet['water'], "population":planet['population'] };

        var templateScript = Handlebars.compile(templateTable);

        var htmlTable = templateScript(contextTable);

        appendToElement(containerBody, htmlTable);
        var resident_info = getResidents(planet['residents']);
        debugger;

    }}



















