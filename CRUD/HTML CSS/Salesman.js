
var CompanyId = 0;

var logID = 0;

var Mode = "";

var commonArray = [];

var IMEInumberarr = []

var EditReceiptNo = "";

var in_ventory_code = "";

var descrption = "";

var autoloaddropdown = "";


$(document).ready(function () {

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

    Premiumauto();

    autopopulategridshow();

    Nextautopopulate2();

    areFirstAndLastAlphabets();

    $("#HANdiscount").prop("disabled", true);

    $("#HANdiscount2").prop("disabled", true);


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

    $.ajax({
        type: "POST",
        url: "/Home/SaveSalesmanlist",
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
                    "<td>" + Salesmanlist[i].MobileNumber + "</td>" +
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


    $("#Setsalesmanlist tbody tr").remove();

    var SetData = $("#Setsalesmanlist tbody");

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
                    "<td>" + Salesmanlist[i].SpecialNoChoosen + "</td>" +
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

                $("#MOBnumber").val(result.MobileNumber);

                $("#nrpDropdown").val(result.MobileContrctType).trigger('change');

                $("#PHNimei").val(result.ImeiNumber);

                $("#SMTphone").val(result.PhoneDetails);

                $("#BLNKnumber").val(result.BlankSimNumber);

                $("#HANDsetvalue").val(result.HandSetValue);

                $("#HANdiscount").val(result.HandSetDiscountAmt1);

                $("#HANdiscount2").val(result.HandSetDiscountAmt2);

                $("#DEPOsite").val(result.Deposit);

                $("#PREpayment").val(result.Prepayment);

                $("#SpecialNo").val(result.SpecialNoChoosen);
                
                $("#Premium").val($.trim(result.Remarks)).trigger('change');

                $("#FINpayment").val(result.FinalPayment);

                $("#BEspoke").val(result.BespokeReceipt);

                in_ventory_code = result.InventoryCode;

                $("#Autopopulate").val(result.DiscountCode1);

                $("#Autopopulate3").val(result.DiscountCode2);

                $("#Early").val(result.EarlyRecon);

                $("#Voucher").val(result.VoucherSerialNo);

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

    $("#Autopopulate").val("0").trigger('change');

    $("#Autopopulate3").val("0").trigger('change');

    $("#Premium").val("0").trigger('change');

    var date = new Date();

    var currentDate = date.toISOString().substring(0, 10);

    document.getElementById('Receiptdate').value = currentDate;
}

function AddPageCancel() {

    $("#loadtable").show();

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


    if (NricNoo == null || NricNoo == "") {

        alert("Enter the NricNum")

        $("#CUSicfin").val("");

        return;
    }
    else {
        if (NricNoo.length == 9) {
            var str = areFirstAndLastAlphabets(NricNoo);
            if (!str) {
                alert("NRIC No must first & last letter alphabets!...");
                $("#CUSicfin").val("");
                return;
            }
        }
        else {
            alert("length must be nine");
            $("#CUSicfin").focus();
            return;
        }
    }

    var MobilePlann = $("#MOBplan").val();

    var Mobilenumber = $("#MOBnumber").val();

    if (Mobilenumber.length < 8) {
        alert("Mobilenumber minimum eight character");
        $("#MOBnumber").focus();
        return;
    }

    if (Mobilenumber == null || Mobilenumber == "") {

        alert("Enter the Mobilenumber")

        $("#MOBnumber").focus();

        return;
    }

    var NRPlist = $("#nrpDropdown").val();

    var ImeiNumberr = $("#PHNimei").val();

    if (ImeiNumberr.length < 15) {
        alert("ImeiNumberr minimum 15 character");
        $("#PHNimei").focus();
        return;
    }

    if (ImeiNumberr == null || ImeiNumberr == "") {

        alert("Enter the ImeiNumberr")

        $("#PHNimei").focus();
        return;
    }

    var PhoneDetailss = $("#SMTphone").val();

    var BlankSimNumberr = $("#BLNKnumber").val();

    var HandSetValuee = $("#HANDsetvalue").val();

    var HandSetDiscountAmot1 = $("#HANdiscount").val();

    var HandSetDiscountAmot2 = $("#HANdiscount2").val();

    var Depositt = $("#DEPOsite").val();

    var Prepaymentt = $("#PREpayment").val();

    var Special = $("#SpecialNo").val();

    var FinalPaymentt = $("#FINpayment").val();

    var BespokeReceiptt = $("#BEspoke").val();

    if (Systemm != "EDAS") {

        if (BespokeReceiptt.length === 16 && BespokeReceiptt.substring(0, 5) == ("RS02B")) {

        }
        else {
            alert('Invalid input. Please enter a 16-character text starting with "RS02B".');
            $("#BEspoke").focus();
            return;
        }
    }

    var barcode = $("#Autopopulate").val();

    var Autoprimum = $('#Premium').val();  

    var Dropdown2 = $("#Autopopulate3").val();

    var Recon = $("#Early").val();

    var serial = $("#Voucher").val();

    if (Autoprimum == 'PRISM + TV 55"') {

        if (serial == null || serial == "") {

            alert("Please fill in the voucher Serial No field")

            $("#Voucher").show();

            return;

        }
    }

    var data_source = new Object();

    data_source.IChekRef = IChekReff;

    data_source.System = Systemm;

    data_source.ReceiptDate = receiptDate;

    data_source.Company = Companyy;

    data_source.NricNo = NricNoo;

    data_source.MobilePlan = MobilePlann;

    data_source.MobileNumber = Mobilenumber;

    data_source.MobileContrctType = NRPlist;

    data_source.ImeiNumber = ImeiNumberr;

    data_source.PhoneDetails = PhoneDetailss;

    data_source.BlankSimNumber = BlankSimNumberr;

    data_source.HandSetValue = HandSetValuee;

    data_source.HandSetDiscountAmt1 = HandSetDiscountAmot1;

    data_source.HandSetDiscountAmt2 = HandSetDiscountAmot2;

    data_source.Deposit = Depositt;

    data_source.Prepayment = Prepaymentt;

    data_source.SpecialNoChoosen = Special;

    data_source.Remarks = Autoprimum;

    data_source.FinalPayment = FinalPaymentt;

    data_source.BespokeReceipt = BespokeReceiptt;

    data_source.SalesmanCode = logID;

    data_source.CompanyId = CompanyId;

    data_source.ReceiptNo = EditReceiptNo;

    data_source.InventoryCode = in_ventory_code;

    data_source.DiscountCode1 = barcode;

    data_source.DiscountCode2 = Dropdown2;

    data_source.EarlyRecon = Recon;

    data_source.VoucherSerialNo = serial;

    data_source.Mode = Mode;

    $.ajax({
        type: "POST",
        url: "/Home/Savesummary",
        data: data_source,
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != null && result != "") {


                alert("Saved Succesfully");

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

    $("#SpecialNo").val("");

    $("#Autopopulate").val("");

    $("#Autopopulate3").val("");

    $("#Early").val("");

    $("#Voucher").val("");

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
        $('#MOBnumber').on('keydown', function () {
            if ($(this).val().toLowerCase() === 'SIMONLY') {
                $("#PHNimei").attr("disabled", "disabled");
                $("#SMTphone").attr("disabled", "disabled");
                $("#MOBnumber").focus();
            }
        });
    }

    if (Source == "MOBnumber") {
        $("#PHNimei").focus();
    }
    if (Source == "PHNimei") {

        var IMEINumber = $("#PHNimei").val();
        if (IMEINumber != null && IMEINumber != "") {

            IMEInumberList(Source);
        }

        $("#SMTphone").focus();
    }
    if (Source == "SMTphone") {

        $("#BLNKnumber").focus();
    }
    if (Source == "BLNKnumber") {

        IMEInumberList1(Source);

        $("#HANDsetvalue").focus();
    }
    if (Source == "HANDsetvalue" || Source == "HANdiscount" || Source == "HANdiscount2" || Source == "Early" || Source == "DEPOsite" || Source == "PREpayment" || Source == "SpecialNo") {

        var handset = $("#HANDsetvalue").val();

        var discount1 = $("#HANdiscount").val() != "" ? $("#HANdiscount").val() : 0;

        var discount2 = $("#HANdiscount2").val() != "" ? $("#HANdiscount2").val() : 0;

        var RRear = $("#Early").val() != "" ? $("#Early").val() : 0;

        var deposit = $("#DEPOsite").val() != "" ? $("#DEPOsite").val() : 0;

        var prepayment = $("#PREpayment").val() != "" ? $("#PREpayment").val() : 0;

        var specialno = $("#SpecialNo").val() != "" ? $("#SpecialNo").val() : 0;

        var Finalpayment = (parseFloat(handset) - (parseFloat(discount1) + parseFloat(discount2))) + (parseFloat(RRear) + parseFloat(deposit) + (parseFloat(prepayment) + parseFloat(specialno)))

        if (handset != null && handset != "") {

            $("#FINpayment").val(Finalpayment)

        }
        if (Source == "HANDsetvalue") {
            $("#Autopopulate").focus();
        }

        if (Source == "Autopopulate") {

            $("#HANdiscount").focus();

        }
        if (Source == "Autopopulate") {

            $("#HANdiscount2").focus();
        }


        if (Source == "Early") {

            $("#DEPOsite").focus();
        }
        if (Source == "DEPOsite") {

            $("#PREpayment").focus();
        }
        if (Source == "PREpayment") {

            $("#SpecialNo").focus();
        }
        if (Source == "SpecialNo") {

            $("#FINpayment").focus();
        }

    }
    if (Source == "SpecialNo") {

        $("#Premium").focus();
    }

    if (Source == "Voucher") {

        $("#BEspoke").focus();
    }


    if (Source == "FINpayment") {

        $("#BEspoke").focus();
    }
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
        data: { "Companyid": companyid },
        success: function (result) {
            if (result != null && result != "") {

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

    $.ajax({
        type: "POST",
        url: "/Home/SummaryAlldropdownmodel",
        success: function (dropdownmodel) {

            $("#COMlist option").remove();

            $("#COMlist").append("<option value='0'>Select an Option</option>");


            $.each(dropdownmodel, function (index, value) {

                if (value.ModuleName == "C") {

                    $("#COMlist").append("<option value=\"" + value.Description + "\">" + value.Description + "</option>");
                }
                if (value.ModuleName == "M") {

                    commonArray.push({ ServiceProviderCode: value.ServiceProviderCode, code: value.code })

                }

            });
        }

    });

}

function Systemmobileplanchange() {

    $("#MOBplan option").remove();

    $("#MOBplan").append("<option value='0'>Select an Option</option>");

    var systemvalue = $('#SYStem').val();


    $.each(commonArray, function (index, value) {

        if (systemvalue == value.ServiceProviderCode.trim()) {

            $("#MOBplan").append("<option value=\"" + value.code + "\">" + value.code + "</option>");
        }

        //else if (systemvalue == value.ServiceProviderCode) {

        //    $("#MOBplan").append("<option value=\"" + value.ServiceProviderCode + "\">" + value.code + "</option>");
        //}

    })

}

function IMEInumberList(Source) {
    var IMEINumber = "";
    if (Source == "PHNimei") {

        IMEINumber = $("#PHNimei").val();
    }
    else {
        IMEINumber = $("#BLNKnumber").val();
        // $("#BLNKnumber").val("");
    }

    $.ajax({
        type: "POST",
        url: "/Home/EMIEnumberlist",
        data: { "IMEINumber": IMEINumber },
        success: function (result) {
            if (result != null && result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].Description != null && result[i].Description != "") {
                        $("#SMTphone").val(result[i].Description);
                    }
                    //if (result[i].PhoneDetails != null && result[i].PhoneDetails != "") {
                    //    $("#SMTphone").val(result[i].PhoneDetails);
                    //}
                    if (result[i].InventoryCode != null && result[i].InventoryCode != "") {
                        in_ventory_code = result[i].InventoryCode;
                    }
                }
                // $("#SMTphone").val(result);

            } else {
                alert("PhoneIMEI Not Correct");
                $("#PHNimei").val("");
                $("#BLNKnumber").val("");
            }

        }

    });

}

function IMEInumberList1(Source) {
    var IMEINumber = "";
    if (Source == "PHNimei") {

        IMEINumber = $("#PHNimei").val();
    }
    else {
        IMEINumber = $("#BLNKnumber").val();
        // $("#BLNKnumber").val("");
    }

    $.ajax({
        type: "POST",
        url: "/Home/EMIEnumberlist",
        data: { "IMEINumber": IMEINumber },
        success: function (result) {
            if (result != null && result.length > 0) {
                for (var i = 0; i < result.length; i++) {

                    descrption = result[i].Description;
                }

            } else {
                alert("PhoneIMEI Not Correct");
                $("#PHNimei").val("");
                $("#BLNKnumber").val("");
            }

        }

    });

}

function Populategridshow() {

    var autopopulate = $("#Autopopulate").val();

    var handset = $("#HANDsetvalue").val();

    var discount1 = 0;

    var discount2 = 0;

    var calculatedResult = 0;



    $.ajax({
        type: "POST",
        url: "/Home/get_sellingprice",
        data: { inventorycode: autopopulate },
        //data: {"inventorycode":autopopulate},

        success: function (result) {

            if (result != null) {

                //alert(typeof calculatedResult)

                //alert(typeof result.SellingPrice)
                if (result.SellingPrice != null && result.SellingPrice != 0) {

                    $("#HANdiscount").val(result.SellingPrice);

                    discount1 = result.SellingPrice;

                    discount2 = parseFloat($("#HANdiscount2").val()) || 0;

                    calculatedResult = handset;

                    $("#FINpayment").val(calculatedResult - (discount1 + discount2))
                }

                else {
                    discount1 = parseFloat($("#HANdiscount").val()) || 0;

                    discount2 = parseFloat($("#HANdiscount2").val()) || 0;

                    calculatedResult = handset;

                    $("#FINpayment").val(calculatedResult - (discount1 + discount2))


                }


            }


        }

    });

}

function autopopulategridshow() {

    $.ajax({
        type: "POST",
        url: "/Home/Autopopulatedropdown",

        success: function (dropdownmodel) {

            $("#Autopopulate").append("<option value='0'>Select an Option</option>");

            $.each(dropdownmodel, function (index, value) {

                if (value.ModuleName == "A") {

                    $("#Autopopulate").append("<option value=\"" + value.InventoryCode + "\">" + value.InventoryCode + "</option>");
                }

            });
        }

    });

}

function Nextautopopulate2() {

    $.ajax({
        type: "POST",
        url: "/Home/Next_autopopulate",

        success: function (dropdownmodel) {

            $("#Autopopulate3").append("<option value='0'>Select an Option</option>");

            $.each(dropdownmodel, function (index, value) {

                if (value.ModuleName == "N") {

                    $("#Autopopulate3").append("<option value=\"" + value.InventoryCode + "\">" + value.InventoryCode + "</option>");
                }

            });
        }

    });

}

function Nextdropdownautopopulate() {

    var autopopulate = $("#Autopopulate3").val();

    var handset = $("#HANDsetvalue").val();

    var discount1 = 0;

    var discount2 = 0;

    var calculatedResult = 0;

    if (discount1 != null && discount1 != "") {

        $("#FINpayment").val(calculatedResult)

    }
    $.ajax({
        type: "POST",
        url: "/Home/Gettwo_autopopulate",
        data: { inventorycode: autopopulate },
        //data: {"inventorycode":autopopulate},

        success: function (result) {

            if (result != null) {

                if (result.SellingPrice != null && result.SellingPrice != 0) {

                    $("#HANdiscount2").val(result.SellingPrice);

                    discount2 = result.SellingPrice;

                    discount1 = parseFloat($("#HANdiscount").val()) || 0;

                    calculatedResult = handset;

                    $("#FINpayment").val(calculatedResult - (discount2 + discount1))
                }

                else {
                    discount1 = parseFloat($("#HANdiscount").val()) || 0;

                    discount2 = parseFloat($("#HANdiscount2").val()) || 0;

                    calculatedResult = handset;

                    $("#FINpayment").val(calculatedResult - (discount1 + discount2))


                }

            }


        }

    });

}

function validateInput(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
    }
}

function PremiumFun() {

    $('#Voucher').focus();
}

function areFirstAndLastAlphabets(str) {

    var firstChar = str[0];
    var lastChar = str[str.length - 1];
    var length = str.length;
    var firtsasci = firstChar.charCodeAt(0);
    var secasci = lastChar.charCodeAt(0);

    if ((firtsasci >= 65 && firtsasci <= 90) || (firtsasci >= 97 && firtsasci <= 122)) {
        if ((secasci >= 65 && secasci <= 90) || (secasci >= 97 && secasci <= 122)) {
            return true;
        }
        else {
            return false;
        }
    }

    else {
        return false;
    }
}

function validateNumeric(event) {
    var keyCode = event.which ? event.which : event.keyCode;
    var inputText = event.target.value + String.fromCharCode(event.which || event.keyCode);
    var length = inputText.length;
    if ((length == 1) || (length == 9)) {
        if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
            return true;
        } else {
            alert("NRIC No must first & last letter alphabets!...");
            $("#CUSicfin").focus();
            return false;
        }
    } else {
        if (keyCode < 48 || keyCode > 57) {
            alert("Numeric only allow!...");
            $("#CUSicfin").focus();
            return false;
        } else {
            return true;
        }
    }
}

function Premiumauto() {
    commonArray = [];

    $.ajax({
        type: "POST",
        url: "/Home/Premiumautocomplete",
        success: function (dropdownmodel) {

            $("#Premium").append("<option value='0'>Select an Option</option>");

            $.each(dropdownmodel, function (index, option) {

                var dropdownOption = $("<option>").val(option.Description).text(option.Description);

                $("#Premium").append(dropdownOption);
            });
        }

    });

}

$('#Premium').change(function () {


    var selectedOption = $(this).val();

    if (selectedOption == 'PRISM + TV 55"') {

        alert("Please fill in the voucher Serial No field.");

        $('#Voucher').show();
        return;
    }
    else {
        $('#Voucher').show();

    }
});

$('#SYStem').change(function () {

    var selectedOption = $(this).val();

    if (selectedOption == 'EDAS') {

        $('#BEspoke').hide();

        $('#BEspoke').removeAttr('hidden');

        $('#BEspoke').attr('id', 'newButtonId');

        $('#LBLbespoke').hide();

    } else {
        $('#BEspoke').show();
        $('#SYStem').show();
        $('#LBLbespoke').show();

    }

});

