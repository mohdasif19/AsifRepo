
var array = [];
var RowCount = 0;
var rcount = 0;
var drop1 = 0;

var SelectRCount = 0;

$(document).ready(function () {

    LoadSalesManData();
});

//function incrementSerialNo() {
//    var start = 1;

//            start = start + 1;
//        }
        //function decrementSerialNo() {
        //    start = start - 1;
        //}
//        function addRow() {
//            incrementSerialNo();
//        var mytable = document.getElementById("mytable");
//        var rows = mytable.rows.length;
//        var r = mytable.insertRow(rows);
//        var c1 = r.insertCell(0);
//        var c2 = r.insertCell(1);
//        var c3 = r.insertCell(2);
//        var c4 = r.insertCell(3);
//        var c5 = r.insertCell(4);
//        var c6 = r.insertCell(5);
//        var c7 = r.insertCell(6);
//        var c8 = r.insertCell(7);

//        var checkbox = document.createElement("input");
//        var serialNo = document.createElement("input");
//        var product = document.createElement("input");
//        var qty = document.createElement("input");
//        var rate = document.createElement("input");
//        var tax = document.createElement("input");
//        var taxamount = document.createElement("input");
//        var grosstotal = document.createElement("input");

//        checkbox.type = "checkbox";
//        serialNo.type = "text";
//        //serialNo.value = start;
//        product.type = "text";
//        qty.type = "text";
//        rate.type = "text";
//        tax.type = "text";
//        taxamount.type = "text";
//        grosstotal.type = "text";

//        c1.appendChild(checkbox);
//        c2.appendChild(serialNo);
//        c3.appendChild(product);
//        c4.appendChild(qty);
//        c5.appendChild(rate);
//        c6.appendChild(tax);
//        c7.appendChild(taxamount);
//        c8.appendChild(grosstotal);
//    }
//        function deleteRow() {

//            var mytable = document.getElementById("mytable");
//        var rows = mytable.rows.length;
//            for (var i = rows - 1; i > 0; i--) {
//                if (mytable.rows[i].cells[0].children[0].checked) {
//            mytable.deleteRow(i);
//        decrementSerialNo();
//    }
//}
//}
//        function saveData() {
//            var tableData = [];
//        var tableRows = document.getElementById("TransactionTable").rows;

//            for (var i = 1; i < tableRows.length; i++) {
//                var row = tableRows[i];
//                var rowData = {
//            SerialNo: row.cells[1].children[0].value,
//        Product: row.cells[2].children[0].value,
//        Qty: row.cells[3].children[0].value,
//        Rate: row.cells[4].children[0].value,
//        Tax: row.cells[5].children[0].value,
//        TaxAmount: row.cells[6].children[0].value,
//        GrossTotal: row.cells[7].children[0].value
//    };

//    tableData.push(rowData);
//}

//// Send data to the server using AJAX
//            $.ajax({
//            url: '/Product/SaveOrder', // Replace with your controller action URL
//        type: 'POST',
//        contentType: 'application/json',
//                data: JSON.stringify({orderDetails: tableData }),
//                success: function (response) {
//            alert('Data saved successfully!');
//        },
//                error: function (error) {
//            console.error('Error saving data: ', error);
//        }
//    });
//}


function LoadSalesManData() {

    array = [];

    $("#mytable tbody tr").remove();
    var SetData = $("#mytable tbody");
    $.ajax({
        type: "POST",
        url: "/Home/Productmasterlist",
        success: function (data) {

            if (data != null && data.length > 0) {


                $.each(data, function (index, value) {

                    array.push({ Code: value.Code, Product: value.Product, Rate: value.Rate })
                });

            }
        }
    });

};


function addRow() {

    RowCount++;
    rcount++;
    drop1++;
    SelectRCount++;
    Newdiv = "<div id='div" + RowCount + "' class='form-group row fm-custom'><div class='col-sm-10'><select style='width:100% !important' class='form-control input-height select2 value drop1" + drop1 + "' id='ddldaytype" + rcount + "' onChange=\" Productmasterlist(this,"+rcount+");return false;\" ></select></div></div>";
    $("#mytable tbody").append("<tr><input type='hidden' id='hdslno' value='" + RowCount + "'><td></td><td>" + RowCount + "</td><td>" + Newdiv + "</td><td><input type='text'id='Qty'></td><td><input type='text'id='Rate'></td><td><input type='text'id='Tax'></td><td><input type='text'id='Taxamount'></td><td><input type='text'id='GrossTotal'></td></tr>");

    $('#mytable tbody tr').each(function () {

        var Code1 = $(this).closest('tr').find('input#hdslno').val();

        var selectid1 = "." + "drop1" + SelectRCount;

        var selectidtxt1 = $(this).closest('tr').find(selectid1);

        if (selectidtxt1.length == 1) {

            var id1 = $(this).closest('tr').find(selectid1).attr('id');

            $('#' + id1).empty();

            var selectid12 = $(this).find('#' + id1);

        }

        if (Code1 != undefined) {

            $('#' + id1).append("<option value='0'>Select On Option</option>");

            $.each(array, function (key, value) {
                $("#" + id1).append("<option value=\"" + value.Code + "\">" + value.Product + "</option>");
            });
          
            //$('#' + id1).val(Daytype).trigger('change');
        }
    });

}

function Productmasterlist(element, value) {


    var Code1 = $(element).closest('tr').find('#ddldaytype' + value).val();
    
    var Source = $.grep(array, function (e) { return e['Code'] == Code1 });

    if (Source.length > 0) {

        $(element).closest('tr').find('#Rate').val(Source[0].Rate);

    }

}

function saveData() {

    var Datasource = new Object();
    var tcount = 1;
    var tableData = [];
    var tableRows = document.getElementById("mytable").rows;

    //for (var i = 1; i < tableRows.length; i++) {
    //    var row = tableRows[i];
    //    var rowData = {
    //        Slno: row.cells[1].children[0],
    //        Code: row.cells[2].children[0],
    //        Qty: row.cells[3].children[0],
    //        Rate: row.cells[4].children[0],
    //        Tax: row.cells[5].children[0],
    //        TaxAmount: row.cells[6].children[0],
    //        GrossTotal: row.cells[7].children[0]
    //    };

    //    tableData.push(rowData);
    //}


    $('#mytable tbody tr').each(function () {

        var Code = $(this).closest('tr').find('#ddldaytype' + tcount).val();
        var Slno = parseInt($(this).closest('tr').find('input#hdslno').val());
        var Qty = $(this).closest('tr').find('#Qty').val();
        var Rate = $(this).closest('tr').find('#Rate').val();

        var Tax = $(this).closest('tr').find('#Tax').val();
        var TaxAmount = $(this).closest('tr').find('#Taxamount').val();
        var GrossTotal = $(this).closest('tr').find('#GrossTotal').val();


        tableData.push(
            {
                Code: Code,
                Slno: Slno,
                Qty: Qty,
                Rate: Rate,
                Tax: Tax,
                TaxAmount: TaxAmount,
                GrossTotal: GrossTotal         
            });

        tcount++;
    });
    if (tableData.length == 0) {
        alert("No Data Found")
    }

    Datasource = JSON.stringify(Datasource);

    // Send data to the server using AJAX
    $.ajax({
        url: '/Home/SaveOrder', // Replace with your controller action URL
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ "orderDetails": tableData }),
        success: function (response) {
            alert('Data saved successfully!');
        },
        error: function (error) {
            console.error('Error saving data: ', error);
        }
    });
}


   


