var numOfServices;

function loadAddServiceRecordPage(){
    var content = document.getElementById("content");

    var body1 = '<div>\n' +
        '    <div class="form-group">\n' +
        '        <label for="vehicleId">Vehicle ID</label>\n' +
        '        <input type="text" class="form-control" id="vehicleId" placeholder="Enter Vehicle ID">\n' +
        // '        <small id="emailHelp" class="form-text text-muted">We\'ll never share your email with anyone else.</small>\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '        <label>Services</label>\n' +
        '    </div>\n' +
        '    <div id="services">\n' +
        '\n' +
        '    </div>\n' +
        '    <button onclick="submitServiceRecord()" class="btn btn-primary">Submit</button>\n' +
        '</div>';

    var body = '    <div class="card" style="margin-top: 20px">\n' +
        '        <div class="card-header">\n' +
        '            <h5>Add new Service Record</h5>\n' +
        '        </div>\n' +
        '        <div class="card-body">\n' +
        '            <div class="form-group">\n' +
        '                <label for="vehicleId" style="font-size: large">Vehicle ID</label>\n' +
        '                <input type="text" class="form-control" id="vehicleId" placeholder="Enter Vehicle ID">\n' +
        '                <!--<small id="emailHelp" class="form-text text-muted">We\\ll never share your email with anyone else.</small>-->\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '                <label  style="font-size: large">Services</label>\n' +
        '            </div>\n' +
        '            <div id="services">\n' +
        '\n' +
        '            </div>\n' +
        '            <button onclick="submitServiceRecord()" class="btn btn-primary">Submit</button>\n' +
        '        </div>\n' +
        '    </div>';


    //check box
    $(function () {

        $.ajax({
            url: 'http://localhost:8090/serviceStation/getServiceTypes',
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'
        }).done(function (data) {
            debugger;
            content.innerHTML = body;

            console.log(data);
            createCheckBoxes(data);
        });

    });

// <div class="form-check">
//         <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
//         <label class="form-check-label" for="defaultCheck2">
//         Disabled checkbox
//     </label>
//     <input class="form-control" type="text" placeholder="Default input" id="showthis">
//         </div>

    var availableTutorials;
    $(function() {

        // $.ajax({
        //     url: 'http://localhost:8090/serviceStation/getServiceTypes',
        //     type: 'POST',
        //     crossDomain: true,
        //     contentType: 'application/json; charset=UTF-8',
        //     dataType: 'json'
        // }).done(function (data) {
        //     debugger;
        //     console.log(data);
        // });


        availableTutorials  =  [
            "ActionScript",
            "Bootstrap",
            "C",
            "C++",
        ];
        $( "#automplete-1" ).autocomplete({
            source: availableTutorials
        });
    });
}

function createCheckBoxes(data){
    var content = document.getElementById("services");
    var noOfServices = data.length;
    numOfServices = noOfServices;

    for (var i = 0; i < noOfServices; i++){
        var div1 = document.createElement("div");
        div1.setAttribute("class", "form-check");

        var checkBox = document.createElement("INPUT");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("class", "form-check-input");
        checkBox.setAttribute("value", data[i].service_id);
        checkBox.setAttribute("id", "#"+data[i].service_id);
        checkBox.setAttribute("name", data[i].service_id);
        div1.appendChild(checkBox);

        var label = document.createElement("LABEL");
        var t = document.createTextNode(data[i].service_type);
        label.setAttribute("class", "form-check-label");
        label.setAttribute("for", data[i].service_id);
        label.appendChild(t);
        div1.appendChild(label);

        var textField = document.createElement("INPUT");
        textField.setAttribute("type", "text");
        textField.setAttribute("class", "form-control");
        textField.setAttribute("id", data[i].service_id);
        div1.appendChild(textField);
        textField.style.display = "none";

        content.appendChild(div1);
        
    }

    debugger;
    $('input[class="form-check-input"]').on('click', function () {
        debugger;
        var k = this.name;
        if ($(this).prop('checked')) {
            document.getElementById(k).style.display = "block";
        } else {
            document.getElementById(k).style.display = "none";
        }
    });


}

function submitServiceRecord(){
    debugger;
    var vehicleId = document.getElementById("vehicleId").value;

    var serviceRecord = {
        vehicleId : vehicleId,
        services :[]
    };

    var count = 0;
    for (var i = 0; i < (numOfServices); i++){
        debugger;
        var a = "#"+(i+1);
        var id = document.getElementById(a);
        if (id.checked){
            var serviceType = document.getElementById(i+1).value;
            var serviceTypeArray = serviceType.split(',');
            serviceRecord.services.push({
                service: (i+1),
                sparePartSerialNumber:[]
            });
            for (var j = 0; j < serviceTypeArray.length; j++){
                console.log(serviceRecord.services[count].sparePartSerialNumber);
                serviceRecord.services[count].sparePartSerialNumber.push(serviceTypeArray[j]);
            }
            count++;

        }
    }

    $(function () {
        $.ajax({
            url: 'http://localhost:8090/serviceStation/storeServiceData',
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(serviceRecord)
        }).done(function (data) {
            debugger;
            console.log(data);
        });
    });
}


function searchVehicleInServiceStation(){
    debugger;
    var vehicleId = document.getElementById("searchVehicleInServiceStationId").value;

    var serviceRecord = {
        vehicleId : vehicleId
    };

    $.ajax({
        url: 'http://localhost:8090/serviceStation/getServiceRecordsPerVehicle',
        type: 'POST',
        crossDomain: true,
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(serviceRecord),
        dataType: 'json'
    }).done(function (data) {
        debugger;
        console.log(data);
        generateDynamicTable(data);
    });
}





