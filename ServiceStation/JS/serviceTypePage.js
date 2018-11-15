
function loadAddServiceTypePage() {
    var content = document.getElementById("content");

    var body = '<div id="content1">\n' +
        '    <h3>Service Types</h3>\n' +
        '\n' +
        '    <div class="card">\n' +
        '        <div class="card-header">\n' +
        '            New Service Type\n' +
        '        </div>\n' +
        '        <div class="card-body">\n' +
        '            <div class="inside" id="newServiceField">\n' +
        // '                <input class="form-control" style="margin-bottom: 10px" type="text" placeholder="Default input" id="showthis">\n' +
        // '                <input class="form-control" type="text" placeholder="Default input" id="showthis1">\n' +
        // '                <input class="form-control" type="text" placeholder="Default input" id="showthis11">\n' +
        '            </div>\n' +
        '            <button class="btn btn-primary" style="width: 100px" onclick="addNewInputField()">+ Add New</button>\n' +
        '            <button class="btn btn-primary" style="width: 100px" onclick="submitServiceTypes()">Submit</button>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="card" style="margin-top: 20px">\n' +
        // '        <div class="card-header">\n' +
        // '            Featured\n' +
        // '        </div>\n' +
        '        <div class="card-body">\n' +
        '            <table class="table table-striped">\n' +
        '                <thead>\n' +
        '                <tr>\n' +
        '                    <th>ID</th>\n' +
        '                    <th>Service Type</th>\n' +
        '                </tr>\n' +
        '                </thead>\n' +
        '                <tbody id="tableBody">\n' +
        '\n' +
        '                </tbody>\n' +
        '            </table>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '</div>';

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
            generateServiceTypeTable(data);
        });

    });

}
var count=0;

function addNewInputField() {
    var inside = document.getElementById("newServiceField");

    var textField = document.createElement("INPUT");
    textField.setAttribute("type", "text");
    textField.setAttribute("class", "form-control");
    textField.setAttribute("id", count);
    textField.setAttribute("style", "margin-bottom: 10px");
    inside.appendChild(textField);
    count++;
}

function submitServiceTypes() {
    var serviceTypes = {
        serviceTypes : []
    };
    for (var i = 0; i < count; i++){
        var val = document.getElementById(i).value;
        serviceTypes.serviceTypes.push(val);
    }

    $(function () {
        $.ajax({
            url: 'http://localhost:8090/serviceStation/setServiceTypes',
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(serviceTypes)
        }).done(function (data) {
            debugger;
            console.log(data);
        });
    });
}

function generateServiceTypeTable(data){

    var content = document.getElementById("services");
    var noOfServices = data.length;

    if(noOfServices>0){
        debugger;

        // CREATE TABLE BODY .
        var tBody = document.getElementById("tableBody");


        // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
        for (var i = 0; i < noOfServices; i++) {

            var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .

            var td1 = document.createElement("td");
            td1.innerHTML = data[i].service_id;
            bRow.appendChild(td1);

            var td2 = document.createElement("td");
            td2.innerHTML = data[i].service_type;
            bRow.appendChild(td2);

            tBody.appendChild(bRow)
        }


    }
}
