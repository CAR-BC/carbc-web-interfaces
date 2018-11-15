
$( document ).ready(function() {
    console.log( "ready!" );

    $.ajax({
        url: 'http://localhost:8090/serviceStation/getServiceRecords',
        type: 'POST',
        crossDomain: true,
        contentType: 'application/json; charset=UTF-8',
        // data: JSON.stringify({vehicleId:"22222A", date:"2pm"}),
        dataType: 'json'
    }).done(function (data) {
        debugger;
        console.log(data);
        generateDynamicTable(data);
    });

    //
});


function generateDynamicTable(myContacts){

    var noOfContacts = myContacts.length;

    if(noOfContacts>0){
        debugger;

        // CREATE TABLE BODY .
        var tBody = document.getElementById("tableBody");
        tBody.innerHTML = "";

        // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
        for (var i = 0; i < noOfContacts; i++) {

            var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .

            var td1 = document.createElement("td");
            td1.innerHTML = myContacts[i].recordId;
            bRow.appendChild(td1);

            var td2 = document.createElement("td");
            td2.innerHTML = myContacts[i].vehicleId;
            bRow.appendChild(td2);

            var td3 = document.createElement("td");
            td3.innerHTML = myContacts[i].servicedDate;
            bRow.appendChild(td3);

            var td4 = document.createElement("td");
            var noOfServices = myContacts[i].services.length;
            td4.innerHTML = "";
            for (var k = 0; k < noOfServices; k++){
                td4.innerHTML += myContacts[i].services[k].serviceType;
                td4.innerHTML += "<br />";
            }
            bRow.appendChild(td4);
            tBody.appendChild(bRow)
        }


    }
}
