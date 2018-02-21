function getResidents(planet) {
    var residentD = [];
                    for (let resident of planet) {
                        `
                        name
                        height (in meters)
                        mass (in kg)
                        skin color
                        hair color
                        eye color
                        birth year
                        gender
                        `


                        residentD.push(resident);



                    }
                    return residentD
                        }

$(document).ready(function () {


  //your code here

$.ajax({
    dataType: "json",
    url: 'https://swapi.co/api/planets/?page=1',

    success: function(response) {
        var tableBody = $("#tablebody");
        var tbl = $("table");

        //var len = response.length();
        for (item of response['results']) {
                var tr = document.createElement('tr');
                    var resident_button = `
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" id="residents_button">
                + New Board
            </button>
                    `


                    var td_name = document.createElement('td');
                    var td_diameter = document.createElement('td');
                    var td_climate = document.createElement('td');
                    var td_terrain = document.createElement('td');
                    var td_water = document.createElement('td');
                    var td_population = document.createElement('td');
                    var td_residents = document.createElement('td');




                    td_name.innerHTML = item['name'];
                    td_diameter.innerHTML = item['diameter'];
                    td_climate.innerHTML = item['climate'];
                    td_terrain.innerHTML = item['terrain'];
                    td_water.innerHTML = item['surface_water'];
                    td_population.innerHTML = item['population'];
                    td_residents.innerHTML = resident_button;

                    tr.appendChild(td_name);
                    tr.appendChild(td_diameter);
                    tr.appendChild(td_climate);
                    tr.appendChild(td_terrain);
                    tr.appendChild(td_water);
                    tr.appendChild(td_population);
                    tr.appendChild(td_residents);


                    $(tr).appendTo(tableBody);
                    var resident_info = getResidents(item['residents']);



                    $.getJSON(resident_info[1], function(response){
                    document.getElementById("resident-info").innerHTML=response['name'];
});

            }
        $(tableBody).appendTo(tbl);


    }
});







});




