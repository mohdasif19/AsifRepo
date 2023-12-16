    
var CompanyId = 0;

var logID = 0;

var Mode = "";

var commonArray = [];

var IMEInumberarr = []

var EditReceiptNo = "";


$(document).ready(function () {

    //if ($("#loginpageref").val() == "1" && $("#listingpageref").val() == "1") {

    //    $("#LoginSales").show();

    //    $("#Register").hide();

    //    $("#loadtable").hide();

    //    $("#cancel").hide();

    //    $("#AddSalesman").hide();

    //    $("#Salessummury").hide();

    //    $("#print-content").show();

    //    $("#hdPrint").hide();
    //}

    //if ($("#listingpageref").val() == "1") {

    //    $("#LoginSales").hide();

    //    $("#loadtable").show();

    //    $("#AddSalesman").show();

    //    $("#cancel").show();

    //    $("#Search").show();

    //    $("#hdPrint").show();
    //}


    $("#LoginSales").show();

    $("#Register").hide();

    $("#loadtable").hide();

    $("#cancel").hide();

    $("#AddSalesman").hide();

    $("#Salessummury").hide();

    $("#print-content").show();

    $("#hdPrint").hide();

    $("#SalesmanName").focus();

    SummaryListModel();   

    

});

function RegisterMethod() {

    $("#Register").show();

    $("#status").prop("checked", true);

    $("#LoginSales").hide();
}

function RegisterSales() {

    var SalesName = $("#salesmanName").val();

    var Password = $("#Regpassword").val();

    if (SalesName == "") {
        alert("Name Incomplete")
        return;
    }
    if (Password == "") {
        alert("Password Incomplete")
        return;
    }

    var datasource = new Object();

    datasource.SalesmanName = SalesName;

    datasource.password = Password;

    datasource.isactive = $('#status').is(':checked');

    $.ajax({
        type: "post",
        url: "/Home/savesalesman",
        dataType: "json",
        data: datasource,
        success: function (result) {

            if (result != null && result != "") {

                alert("correct");

                Registerclear();

                return;
            } else {

                alert("not correct");

                Registerclear();
            }
        }

    })

}

function Registerclear() {

    $("#salesmanName").val("");

    $("#Regpassword").val("");

    $("#status").prop("checked", false);

}

function RegisterCancel() {

    $("#LoginSales").show();

    $("#Register").hide();

    $("#Salessummury").hide();
}

function Loginclear() {

    $("#SalesmanName").val("");

    $("#password").val("");

}

function login() {

    var Name = $("#SalesmanName").val();

    var Password = $("#password").val();

    if (Name == "") {
        alert("Enter SalesName")
        return;
    }
    if (Password == "") {
        alert("Enterpassword")
        return;
    }
    var datasource = new Object();

    datasource.SalesmanName = Name;

    datasource.password = Password;

    $.ajax({
        type: "post",
        url: "/Home/Loginsales",
        dataType: "json",
        data: datasource,
        success: function (result) {
            if (result.msg == "pass") {
                LoadSalesManData();
                $("#LoginSales").hide();
                $("#loadtable").show();
                $("#AddSalesman").show();
                $("#cancel").show();
                $("#Search").show();
                $("#hdPrint").show();

                logID = result.LoginID;

                Loginclear();

                //$("#loginpageref").val("0");

                //$("#listingpageref").val("1");


                //return;
            }
            else {
                alert("Not corect");
                Loginclear();
            }
        }
    })
}

function LoadSalesManData() {

    $("#Setsalesmanlist tbody tr").remove();

    var SetData = $("#Setsalesmanlist tbody");

    //$("#LoadingStatus").html("");
    //$("#loginpageref").val("0");

    //$("#listingpageref").val("1");

    
    $.ajax({
        type: "POST",
        url: "/Home/SaveSalesmanlist",
        success: function (Salesmanlist) {
            for (var i = 0; i < Salesmanlist.length; i++) {

                // var ReceiptDate = new Date(Salesmanlist[i].ReceiptDate);
                // dateString = formatDateToString(Salesmanlist[i].ReceiptDate);
                var Data = "<tr>" +
                    '<td><input type="checkbox" class="item-checkbox" id="chk_detailrow"><input type="hidden" id="hdnCompanyId" value=' + Salesmanlist[i].ReceiptNo + '></td>' +
                    "<td>" + Salesmanlist[i].IChekRef + "</td>" +
                    "<td>" + Salesmanlist[i].System + "</td>" +
                    "<td>" + Salesmanlist[i].ReceiptDateString + "</td>" +
                    "<td>" + Salesmanlist[i].Company + "</td>" +
                    "<td>" + Salesmanlist[i].NricNo + "</td>" +
                    "<td>" + Salesmanlist[i].MobilePlan + "</td>" +
                    "<td>" + Salesmanlist[i].MobileContrctType + "</td>" +
                    "<td>" + Salesmanlist[i].ImeiNumber + "</td>" +
                    "<td>" + Salesmanlist[i].PhoneDetails + "</td>" +
                    "<td>" + Salesmanlist[i].BlankSimNumber + "</td>" +
                    "<td>" + Salesmanlist[i].HandSetValue + "</td>" +
                    "<td>" + Salesmanlist[i].HandSetDiscountAmt1 + "</td>" +
                    "<td>" + Salesmanlist[i].HandSetDiscountAmt2 + "</td>" +
                    "<td>" + Salesmanlist[i].Deposit + "</td>" +
                    "<td>" + Salesmanlist[i].Prepayment + "</td>" +
                    "<td>" + Salesmanlist[i].FinalPayment + "</td>" +
                    "<td>" + Salesmanlist[i].BespokeReceipt + "</td>" +
                    "<td>" + "<a href='#' class='btn btn-info' onclick=\"SalesmanEdit('" + Salesmanlist[i].ReceiptNo + "')\"><span class='glyphicon glyphicon-edit'></span></a>" + "</td>" +
                    "<td>" + "<a href='#' class='btn btn-info' onclick=\"SalesmanDelete('" + Salesmanlist[i].ReceiptNo + "')\"><span class='glyphicon glyphicon-trash'></span></a>" + "</td>" +
                    "</tr>";
                SetData.append(Data);
            }
        }
    });
}

function SearchsalesMan() {

    var SearchCus = $("#customername").val()
    //var SearchNum = $("#mobilenumber").val()
    //var Searchsalesname = $("#salespersonname").val()

    $("#Setsalesmanlist tbody tr").remove();

    var SetData = $("#Setsalesmanlist tbody");
    //SetData.html("");
    $.ajax({
        type: "post",
        url: "/Home/GetSearch?SearchCus=" + SearchCus,
        contentType: "html",
        success: function (Salesmanlist) {

            for (var i = 0; i < Salesmanlist.length; i++) {
                var Data = "<tr>" +
                    '<td><input type="checkbox" class="item-checkbox" id="chk_detailrow"><input type="hidden" id="hdnCompanyId" value=' + Salesmanlist[i].ReceiptNo + '></td>' +
                    "<td>" + Salesmanlist[i].IChekRef + "</td>" +
                    "<td>" + Salesmanlist[i].System + "</td>" +
                    "<td>" + Salesmanlist[i].ReceiptDateString + "</td>" +
                    "<td>" + Salesmanlist[i].Company + "</td>" +
                    "<td>" + Salesmanlist[i].NricNo + "</td>" +
                    "<td>" + Salesmanlist[i].MobilePlan + "</td>" +
                    "<td>" + Salesmanlist[i].MobileContrctType + "</td>" +
                    "<td>" + Salesmanlist[i].ImeiNumber + "</td>" +
                    "<td>" + Salesmanlist[i].PhoneDetails + "</td>" +
                    "<td>" + Salesmanlist[i].BlankSimNumber + "</td>" +
                    "<td>" + Salesmanlist[i].HandSetValue + "</td>" +
                    "<td>" + Salesmanlist[i].HandSetDiscountAmt1 + "</td>" +
                    "<td>" + Salesmanlist[i].HandSetDiscountAmt2 + "</td>" +
                    "<td>" + Salesmanlist[i].Deposit + "</td>" +
                    "<td>" + Salesmanlist[i].Prepayment + "</td>" +
                    "<td>" + Salesmanlist[i].FinalPayment + "</td>" +
                    "<td>" + Salesmanlist[i].BespokeReceipt + "</td>" +
                    "<td>" + "<a href='#' class='btn btn-info' onclick=\"SalesmanEdit('" + Salesmanlist[i].ReceiptNo + "')\"><span class='glyphicon glyphicon-edit'></span></a>" + "</td>" +
                    "<td>" + "<a href='#' class='btn btn-info' onclick=\"SalesmanDelete('" + Salesmanlist[i].ReceiptNo + "')\"><span class='glyphicon glyphicon-trash'></span></a>" + "</td>" +
                    "</tr>";
                SetData.append(Data);
                //$customername.on("keyup", function () {
                //    var query = $customername.val();
                //    performSearch(query);
                //});
            }
        }
    });
}

function SalesmanEdit(Code) {

    $.ajax({
        type: "POST",
        url: "/Home/SalesmanEdit",
        dataType: "json",
        data: { "code": Code },
        success: function (result) {
         
           if (result != null && result != "") {

                EditReceiptNo = result.ReceiptNo;

                $("#ICHref").val(result.IChekRef);

                $("#SYStem").val(result.System).trigger('change');

               document.getElementById('Receiptdate').value = result.ReceiptDateString;
               
                $("#COMlist").val(result.Company).trigger('change');

                $("#CUSicfin").val(result.NricNo);

                $("#MOBplan").val(result.MobilePlan).trigger('change');

                $("#MOBnumber").val(result.MobileContrctType).trigger('change');

                $("#PHNimei").val(result.ImeiNumber);

                $("#SMTphone").val(result.PhoneDetails);

                $("#BLNKnumber").val(result.BlankSimNumber);

                $("#HANDsetvalue").val(result.HandSetValue);

                $("#HANdiscount").val(result.HandSetDiscountAmt1);

                $("#HANdiscount2").val(result.HandSetDiscountAmt2);

                $("#DEPOsite").val(result.Deposit);

                $("#PREpayment").val(result.Prepayment);

                $("#FINpayment").val(result.FinalPayment);

                $("#BEspoke").val(result.BespokeReceipt);

                $("#loadtable").hide();

                $("#Salessummury").show();

                $("#AddSalesman").hide();

                $("#cancel").hide();

                Mode = "e";

               CompanyId = result.CompanyId;
                
            }
        }

    })


}

function SalesmanDelete(Code) {

    $.ajax({

        type: "post",
        url: "/Home/Salesmandelete",
        dataType: "json",
        data: { "code": Code },
        success: function (result) {

            if (result != null) {
                alert("delete success");
                LoadSalesManData();
                $("#LoginSales").hide();

            }
        }
    })

}

function LogoutBack() {

    $("#LoginSales").show();

    $("#Register").hide();

    $("#loadtable").hide();

    $("#AddSalesman").hide();

    $("#cancel").hide();

    $("#hdPrint").hide();

}

function Addnewsalesman() {

    $("#Salessummury").show();

    $("#AddSalesman").hide();

    $("#loadtable").hide();

    $("#cancel").hide();

    $("#ICHref").focus();

    ClearSavesales();

    CompanyId = 0;

    EditReceiptNo = "";

    Mode = "n";

    $("#SYStem").val("0").trigger('change');

    $("#COMlist").val("0").trigger('change');

    $("#MOBplan").val("0").trigger('change');

    $("#MOBnumber").val("0").trigger('change');


    var date = new Date();

    var currentDate = date.toISOString().substring(0, 10);

    document.getElementById('Receiptdate').value = currentDate;
}

function AddPageCancel() {

    $("#loadtable").show();

   // $("#Setsalesmanlist").show();

    $("#Salessummury").hide();

    $("#cancel").show();

    $("#AddSalesman").show();

    $("#Register").hide();

    $("#LoginSales").hide();
}

function SaveSales() {
 
    var IChekReff = $("#ICHref").val();

    if (IChekReff == null || IChekReff == "") {

        alert("Enter the Name")

        return; 
    }

    var Systemm = $("#SYStem").val();

    var receiptDate = $("#Receiptdate").val();

    var Companyy = $("#COMlist").val();

    var NricNoo = $("#CUSicfin").val();

    var MobilePlann = $("#MOBplan").val();

    var MobileContrctTypee = $("#MOBnumber").val();

    var ImeiNumberr = $("#PHNimei").val();

    var PhoneDetailss = $("#SMTphone").val();

    var BlankSimNumberr = $("#BLNKnumber").val();

    var HandSetValuee = $("#HANDsetvalue").val();

    var HandSetDiscountAmot1 = $("#HANdiscount").val();

    var HandSetDiscountAmot2 = $("#HANdiscount2").val();  

    var Depositt = $("#DEPOsite").val();

    var Prepaymentt = $("#PREpayment").val();

    var FinalPaymentt = $("#FINpayment").val();

    var BespokeReceiptt = $("#BEspoke").val();  

      var regex = /^RS.{14}$/;
    if (BespokeReceiptt == "" || !regex.test(BespokeReceiptt)) {

        alert('Validation failed. Enter BESPOKE RECEIPT must start with "RS" and have at least 16 characters after that.');

        return;
    }
    var data_source = new Object();

    data_source.IChekRef = IChekReff;

    data_source.System = Systemm;

    data_source.ReceiptDate = receiptDate;

    data_source.Company = Companyy;

    data_source.NricNo = NricNoo;

    data_source.MobilePlan = MobilePlann;

    //data_source.MobileNumber = MobileNumberr;

    data_source.MobileContrctType = MobileContrctTypee;

    data_source.ImeiNumber = ImeiNumberr;

    data_source.PhoneDetails = PhoneDetailss;

    data_source.BlankSimNumber = BlankSimNumberr;

    data_source.HandSetValue = HandSetValuee;

    data_source.HandSetDiscountAmt1 = HandSetDiscountAmot1;

    data_source.HandSetDiscountAmt2 = HandSetDiscountAmot2;

    data_source.Deposit = Depositt;

    data_source.Prepayment = Prepaymentt;

    data_source.FinalPayment = FinalPaymentt;

    data_source.BespokeReceipt = BespokeReceiptt;

    data_source.SalesmanCode = logID;

    data_source.CompanyId = CompanyId;

    data_source.ReceiptNo = EditReceiptNo;

    data_source.Mode = Mode;
   // var imeiNumber = $("#PHNimei").val();
    $.ajax({
        type:"POST",
        url: "/Home/Savesummary",
        data: data_source,
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != null && result != "") {    


                alert("correct");   

                $("#Salessummury").hide();
                $("#LoginSales").hide();
                $("#loadtable").show();
                
                $("#AddSalesman").show();
                LoadSalesManData();                
                ClearSavesales();        
            }
            else {
                alert("not correct");
              
            }
        }
    })

}

function ClearSavesales() {

    $("#ICHref").val("");

    $("#SYStem").val("");

    $("#Receiptdate").val("");

    $("#COMlist").val("");

    $("#CUSicfin").val("");

    $("#MOBplan").val("");

    $("#MOBnumber").val("");

    $("#PHNimei").val("");

    $("#SMTphone").val("");

    $("#BLNKnumber").val("");

    $("#HANDsetvalue").val("");

    $("#HANdiscount").val("");

    $("#HANdiscount2").val("");

    $("#DEPOsite").val("");

    $("#PREpayment").val("");

    $("#FINpayment").val("");

    $("#BEspoke").val("");

   // $("#Finalpayment").val("");
}

function EnterFocus(Source) {

    if (Source == "SalesmanName") {

        $("#password").focus();
    }
    if (Source == "ICHref") {

        $("#SYStem").focus();
    }
    if (Source == "SYStem") {

        $("#Receiptdate").focus();
    }
    if (Source == "Receiptdate") {

        $("#COMlist").focus();
    }
    if (Source == "COMlist") {

        $("#CUSicfin").focus();
    }
    if (Source == "CUSicfin") {

        $("#MOBplan").focus();
    }
    if (Source == "MOBplan") {

        $("#MOBnumber").focus();
    }

    if (Source == "MOBnumber") {

        $("#PHNimei").focus();
    }
    if (Source == "PHNimei") {
        //var imeinumber = $("#PHNimei").val();
        //var Result = $.grep(IMEInumberarr, function (e) { return e[1].trim() == imeinumber.trim() });
        var IMEINumber = $("#PHNimei").val();
        if (IMEINumber != null && IMEINumber != "") {

            IMEInumberList();
        }

        $("#SMTphone").focus();
    }
    if (Source == "SMTphone") {

        $("#BLNKnumber").focus();
    }
    if (Source == "BLNKnumber") {

        $("#HANDsetvalue").focus();
    }
    if (Source == "HANDsetvalue") {

        $("#HANdiscount").focus();
    }
    if (Source == "HANdiscount") {

        $("#HANdiscount2").focus();
    }
    if (Source == "HANdiscount2") {

        $("#DEPOsite").focus();
    }
    if (Source == "DEPOsite") {

        $("#PREpayment").focus();
    }
    if (Source == "PREpayment") {

        $("#FINpayment").focus();
    }
    if (Source == "FINpayment") {

        $("#BEspoke").focus();
    }

    if (Source == "BEspoke") {

        var inputValue = $('#BEspoke').val();

        if (inputValue.startsWith("RS") && inputValue.length == 16) {
            //alert('Validation passed!');
        } else {
            alert('Validation failed. Enter BESPOKE RECEIPT must start with "RS" and have at least 16 characters after that.');
        }
    }
    //if (Source == "Finalpayment") {

    //    $("#BespokeRecipt").focus();
    //}
}

function printsales() {

    var Count = 0;

    var checkbox = $("#chk_detailrow").val();

    if (checkbox == "") {
        alert("empty checkbox")
        return;
    }

    var companyid = 0;  

    var pageURL = $(location).attr("href");
    
    $('#Setsalesmanlist tbody tr').each(function () {

        var Checked = $(this).closest('tr').find('#chk_detailrow').is(':checked');

        

        if (Checked == true) {          
            Count++;
            companyid = $(this).closest('tr').find('#hdnCompanyId').val();
            
        }
        
    });
    
    if (Count == 0) {
        alert("please select one Checkbox to print")
        return;
    }
    if (Count > 1) {
        alert("please select only one Checkbox to print")
        return;
    }

        $.ajax({
            type: "POST",
            url: "/Home/reports",
            dataType: "json",
            data: { "Companyid": companyid},
            success: function (result) {
                if (result != null && result != "") {
                    //window.href = result;
                    window.open("/Temp/output.pdf")
                  
                }
                else {
                    alert("Checkbox is unchecked!");
                }
                
            }
             
    })
}

function SummaryListModel() {
    commonArray = [];
    //IMEInumberarr = [];
    $.ajax({
        type: "POST",
        url: "/Home/SummaryAlldropdownmodel",
        success: function (dropdownmodel) {
            $("#COMlist option").remove();

            $("#MOBnumber option").remove();
           // dropdown.find("option[value='option2']").remove();
            $("#COMlist").append("<option value='0'>Select On Option</option>");
            $("#MOBnumber").append("<option value='0'>Select On Option</option>");

            $.each(dropdownmodel, function (index, value) {

                if (value.ModuleName == "C") {

                    $("#COMlist").append("<option value=\"" + value.Description + "\">" + value.Description + "</option>");
                }
                if (value.ModuleName == "M") {

                    //$("#MOBplan").append("<option value=\"" + value.ServiceProviderCode + "\">" + value.code + "</option>");
                    commonArray.push({ ServiceProviderCode: value.ServiceProviderCode, code:value.code })
                }
                if (value.ModuleName == "P") {

                    $("#MOBnumber").append("<option value=\"" + value.InventoryCode + "\">" + value.Description + "</option>");
                }
                //if (value.ModuleName == "I") {

                //    //$("#MOBnumber").append("<option value=\"" + value.InventoryCode + "\">" + value.IMEINumber + "</option>");
                //    IMEInumberarr.push({ IMEInumber: value.IMEInumber, InventoryCode: value.InventoryCode })
                //}

               
            });
        }

    });

}

function Systemmobileplanchange() {

    $("#MOBplan option").remove();

    $("#MOBplan").append("<option value='0'>Select On Option</option>");

    var systemvalue = $('#SYStem').val();


    $.each(commonArray, function (index, value) {

        if (systemvalue == value.ServiceProviderCode.trim()) {

            $("#MOBplan").append("<option value=\"" + value.ServiceProviderCode + "\">" + value.code + "</option>");
        }

        //else if (systemvalue == value.ServiceProviderCode) {

        //    $("#MOBplan").append("<option value=\"" + value.ServiceProviderCode + "\">" + value.code + "</option>");
        //}

    })    
    
}

function IMEInumberList() {

    var IMEINumber = $("#PHNimei").val();
   
    $.ajax({
        type: "POST",
        url: "/Home/EMIEnumberlist",
        data: { "IMEINumber": IMEINumber },
        success: function (result) {
            if (result != null && result != "") {

                $("#SMTphone").val(result);
                
            }
           
        }

    });

}

