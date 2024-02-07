using Microsoft.Reporting.WebForms;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UniproERP.Models;



namespace UniproERP.Controllers
{
    public class HomeController : Controller
    {
        UniproERP_TestEntities db = new UniproERP_TestEntities();


        public ActionResult Salesman()
        {
            return View();
        }
        public JsonResult savesalesman(tblLogin_Salesman model)
        {
            tblLogin_Salesman log = new tblLogin_Salesman();

            if (log.LoginID == 0)
            {
                log.SalesmanName = model.SalesmanName;
                log.Password = model.Password;
                log.isactive = model.isactive;
                db.tblLogin_Salesman.Add(log);
                db.SaveChanges();
            }
            return Json(log, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Loginsales(logsalesman model)
        {
            logsalesman log = new logsalesman();

            var DataItem = db.tblLogin_Salesman.Where(x => x.SalesmanName == model.SalesmanName && x.Password == model.Password).FirstOrDefault();

            if (DataItem != null)
            {
                log.SalesmanName = DataItem.SalesmanName;

                log.Password = DataItem.Password;

                log.LoginID = DataItem.LoginID;

                log.msg = "pass";
            }
            else
            {

                log.LoginID = 0;
                log.msg = "fail";
            }
            return Json(log, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Savesummary(Savesalessummary model)
        {
            tblSalesSummary tbl = new tblSalesSummary();

            string datestring = "01/01/1900";

            DateTime ReceiptDate = DateTime.Parse(datestring);

            string receiptNumber = "";

            DateTime currentDate = DateTime.Now;

            if (model.ImeiNumber != "" &&  model.ImeiNumber != null)
            {
                model.ImeiNumber = model.ImeiNumber.Trim();

            }
            if (model.MobilePlan != "" && model.MobilePlan != null)
            {
                model.MobilePlan = model.MobilePlan.Trim();

            }
            if (model.Remarks != "" && model.Remarks != null)
            {
                model.Remarks = model.Remarks.Trim();

            }

            var Data_Item = (from Model in db.tblSalesSummaries
                             select Model.ReceiptNo).ToList().Max();
            
            if (Data_Item == null)
            {
                receiptNumber = "0001";
            }
            else
            {
                int Invoice = Convert.ToInt32(Data_Item);

                Invoice = Invoice + 1;

                if (Invoice > 9)
                {
                    receiptNumber = "00" + Invoice;
                }
                else
                {
                    receiptNumber = "000" + Invoice;
                }
              
            }

            if (model.Mode == "n")
            {
                tbl.ReceiptNo = receiptNumber != null ? receiptNumber : "";
                tbl.ReceiptDate = model.ReceiptDate != null ? model.ReceiptDate : ReceiptDate;
                tbl.IChekRef = model.IChekRef != null ? model.IChekRef : "";
                tbl.SalesmanCode = model.SalesmanCode != null ? model.SalesmanCode : "";
                tbl.System = model.System != null ? model.System : "";
                tbl.Company = model.Company != null ? model.Company : "";
                tbl.NricNo = model.NricNo != null ? model.NricNo : "";
                tbl.MobilePlan = model.MobilePlan != null ? model.MobilePlan : "";
                tbl.MobileNumber = model.MobileNumber != null ? model.MobileNumber : "";
                tbl.MobileContrctType = model.MobileContrctType != null ? model.MobileContrctType : "";
                tbl.ImeiNumber = model.ImeiNumber != null ? model.ImeiNumber : "";
                tbl.PhoneDetails = model.PhoneDetails != null ? model.PhoneDetails : "";
                tbl.InventoryCode = model.InventoryCode != null ? model.InventoryCode : "";
                tbl.BlankSimNumber = model.BlankSimNumber != null ? model.BlankSimNumber : "";
                tbl.HandSetValue = model.HandSetValue != null ? model.HandSetValue : 0;
                tbl.HandSetDiscountAmt1 = model.HandSetDiscountAmt1 != null ? model.HandSetDiscountAmt1 : 0;
                tbl.DiscountCode1 = model.DiscountCode1 != null ? model.DiscountCode1 : "";
                tbl.HandSetDiscountAmt2 = model.HandSetDiscountAmt2 != null ? model.HandSetDiscountAmt2 : 0;
                tbl.DiscountCode2 = model.DiscountCode2 != null ? model.DiscountCode2 : "";
                tbl.Deposit = model.Deposit != null ? model.Deposit : 0;
                tbl.Prepayment = model.Prepayment != null ? model.Prepayment : 0;
                tbl.SpecialNoChoosen = model.SpecialNoChoosen != null ? model.SpecialNoChoosen : 0;
                tbl.FinalPayment = model.FinalPayment != null ? model.FinalPayment : 0;
                tbl.BespokeReceipt = model.BespokeReceipt != null ? model.BespokeReceipt : "";
                tbl.Remarks = model.Remarks != null ? model.Remarks : "";
                tbl.EarlyRecon = model.EarlyRecon != null ? model.EarlyRecon : 0;
                tbl.VoucherSerialNo = model.VoucherSerialNo != null ? model.VoucherSerialNo : "";
                tbl.CreateDate = currentDate;
                tbl.ModifyDate = currentDate;
                db.tblSalesSummaries.Add(tbl);
                //db.Entry(tbl).State = System.Data.Entity.EntityState.Added;
                db.SaveChanges();
            }
            else
            {

                var DataItem = (from Model in db.tblSalesSummaries.Where(x => x.ReceiptNo == model.ReceiptNo)
                                select Model).FirstOrDefault();

                //DataItem.ReceiptNo = receiptNumber != null ? receiptNumber : "";
                DataItem.ReceiptDate = model.ReceiptDate != null ? model.ReceiptDate : ReceiptDate;
                DataItem.IChekRef = model.IChekRef != null ? model.IChekRef : "";
                DataItem.System = model.System != null ? model.System : "";
                DataItem.Company = model.Company != null ? model.Company : "";
                DataItem.NricNo = model.NricNo != null ? model.NricNo : "";
                DataItem.MobilePlan = model.MobilePlan != null ? model.MobilePlan : "";
                DataItem.MobileNumber = model.MobileNumber != null ? model.MobileNumber : "";
                DataItem.MobileContrctType = model.MobileContrctType != null ? model.MobileContrctType : "";
                DataItem.ImeiNumber = model.ImeiNumber != null ? model.ImeiNumber : "";
                DataItem.PhoneDetails = model.PhoneDetails != null ? model.PhoneDetails : "";
                DataItem.InventoryCode = model.InventoryCode != null ? model.InventoryCode : "";
                DataItem.BlankSimNumber = model.BlankSimNumber != null ? model.BlankSimNumber : "";
                DataItem.HandSetValue = model.HandSetValue != null ? model.HandSetValue : 0;
                DataItem.HandSetDiscountAmt1 = model.HandSetDiscountAmt1 != null ? model.HandSetDiscountAmt1 : 0;
                DataItem.DiscountCode1 = model.DiscountCode1 != null ? model.DiscountCode1 : "";
                DataItem.HandSetDiscountAmt2 = model.HandSetDiscountAmt2 != null ? model.HandSetDiscountAmt2 : 0;
                DataItem.DiscountCode2 = model.DiscountCode2 != null ? model.DiscountCode2 : "";
                DataItem.Deposit = model.Deposit != null ? model.Deposit : 0;
                DataItem.Prepayment = model.Prepayment != null ? model.Prepayment : 0;
                DataItem.SpecialNoChoosen = model.SpecialNoChoosen != null ? model.SpecialNoChoosen : 0;
                DataItem.FinalPayment = model.FinalPayment != null ? model.FinalPayment : 0;
                DataItem.BespokeReceipt = model.BespokeReceipt != null ? model.BespokeReceipt : "";
                DataItem.Remarks = model.Remarks != null ? model.Remarks : "";
                DataItem.EarlyRecon = model.EarlyRecon != null ? model.EarlyRecon : 0;
                DataItem.VoucherSerialNo = model.VoucherSerialNo != null ? model.VoucherSerialNo : "";
                DataItem.ModifyDate = currentDate;
                db.SaveChanges();

            }

            return Json(tbl, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveSalesmanlist(listsummary model)
        {
            List<listsummary> logDetail = new List<listsummary>();

            string datestring = "01/01/1900";

            List<tblSalesSummary> DataItem = db.tblSalesSummaries.ToList();
            if (DataItem != null && DataItem.Count > 0)
            {
                DataItem.ForEach(item =>
                {

                    logDetail.Add(new listsummary
                    {
                        ReceiptNo = item.ReceiptNo != null ? item.ReceiptNo : "",
                        ReceiptDateString = item.ReceiptDate.HasValue ? item.ReceiptDate.Value.ToString("dd/MM/yyyy") : datestring,
                        IChekRef = item.IChekRef != null ? item.IChekRef : "",
                        SalesmanCode = item.SalesmanCode != null ? item.SalesmanCode : "",
                        System = item.System != null ? item.System : "",
                        Company = item.Company != null ? item.Company : "",
                        NricNo = item.NricNo != null ? item.NricNo : "",
                        MobilePlan = item.MobilePlan != null ? item.MobilePlan : "",
                        MobileNumber = item.MobileNumber != null ? item.MobileNumber : "",
                        MobileContrctType = item.MobileContrctType != null ? item.MobileContrctType : "",
                        ImeiNumber = item.ImeiNumber != null ? item.ImeiNumber : "",
                        PhoneDetails = item.PhoneDetails != null ? item.PhoneDetails : "",
                        InventoryCode = item.InventoryCode != null ? item.InventoryCode : "",
                        BlankSimNumber = item.BlankSimNumber != null ? item.BlankSimNumber : "",
                        HandSetValue = item.HandSetValue != null ? item.HandSetValue : 0,
                        HandSetDiscountAmt1 = item.HandSetDiscountAmt1 != null ? item.HandSetDiscountAmt1 : 0,
                        DiscountCode1 = item.DiscountCode1 != null ? item.DiscountCode1 : "",
                        HandSetDiscountAmt2 = item.HandSetDiscountAmt2 != null ? item.HandSetDiscountAmt2 : 0,
                        DiscountCode2 = item.DiscountCode2 != null ? item.DiscountCode2 : "",
                        Deposit = item.Deposit != null ? item.Deposit : 0,
                        Prepayment = item.Prepayment != null ? item.Prepayment : 0,
                        SpecialNoChoosen=item.SpecialNoChoosen != null ? item.Prepayment : 0,
                        FinalPayment = item.FinalPayment != null ? item.FinalPayment : 0,
                        BespokeReceipt = item.BespokeReceipt != null ? item.BespokeReceipt : "",
                        Remarks = item.Remarks != null ? item.Remarks : "",

                    });


                });
            }
            return Json(logDetail, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SalesmanEdit(string code)
        {

            listsummary log = new listsummary();

            string datestring = "1900-01-01";

            tblSalesSummary DataItem = (from model in db.tblSalesSummaries.Where(x => x.ReceiptNo == code)
                                        select model).FirstOrDefault();


            if (DataItem != null)
            {
                log.ReceiptNo = DataItem.ReceiptNo != null ? DataItem.ReceiptNo : "";
                log.ReceiptDateString = DataItem.ReceiptDate.HasValue ? DataItem.ReceiptDate.Value.ToString("yyyy-MM-dd") : datestring;
                //log.ReceiptDate = DataItem.ReceiptDate;
                log.IChekRef = DataItem.IChekRef != null ? DataItem.IChekRef : "";
                log.SalesmanCode = DataItem.SalesmanCode != null ? DataItem.SalesmanCode : "";
                log.System = DataItem.System != null ? DataItem.System : "";
                log.Company = DataItem.Company != null ? DataItem.Company : "";
                log.NricNo = DataItem.NricNo != null ? DataItem.NricNo : "";
                log.MobilePlan = DataItem.MobilePlan != null ? DataItem.MobilePlan : "";
                log.MobileNumber = DataItem.MobileNumber != null ? DataItem.MobileNumber : "";
                log.MobileContrctType = DataItem.MobileContrctType != null ? DataItem.MobileContrctType : "";
                log.ImeiNumber = DataItem.ImeiNumber != null ? DataItem.ImeiNumber : "";
                log.PhoneDetails = DataItem.PhoneDetails != null ? DataItem.PhoneDetails : "";
                log.InventoryCode = DataItem.InventoryCode != null ? DataItem.InventoryCode : "";
                log.BlankSimNumber = DataItem.BlankSimNumber != null ? DataItem.BlankSimNumber : "";
                log.HandSetValue = DataItem.HandSetValue != null ? DataItem.HandSetValue : 0;
                log.HandSetDiscountAmt1 = DataItem.HandSetDiscountAmt1 != null ? DataItem.HandSetDiscountAmt1 : 0;
                log.DiscountCode1 = DataItem.DiscountCode1 != null ? DataItem.DiscountCode1 : "";
                log.HandSetDiscountAmt2 = DataItem.HandSetDiscountAmt2 != null ? DataItem.HandSetDiscountAmt2 : 0;
                log.DiscountCode2 = DataItem.DiscountCode2 != null ? DataItem.DiscountCode2 : "";
                log.Deposit = DataItem.Deposit != null ? DataItem.Deposit : 0;
                log.Prepayment = DataItem.Prepayment != null ? DataItem.Prepayment : 0;
                log.SpecialNoChoosen = DataItem.SpecialNoChoosen != null ? DataItem.SpecialNoChoosen : 0;
                log.FinalPayment = DataItem.FinalPayment != null ? DataItem.FinalPayment : 0;
                log.BespokeReceipt = DataItem.BespokeReceipt != null ? DataItem.BespokeReceipt : "";
                log.Remarks = DataItem.Remarks != null ? DataItem.Remarks : "";
                log.EarlyRecon = DataItem.EarlyRecon != null ? DataItem.EarlyRecon : 0;
                log.VoucherSerialNo = DataItem.VoucherSerialNo != null ? DataItem.VoucherSerialNo : "";
            }

            return Json(log, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Salesmandelete(string Code)
        {
            var DataItem = (from model in db.tblSalesSummaries.Where(x => x.ReceiptNo == Code)
                            select model).FirstOrDefault();
            if (DataItem != null)
            {
                db.tblSalesSummaries.Remove(DataItem);
                db.SaveChanges();
            }
            return Json(DataItem, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSearch(string SearchCus)
        {
            List<tblSalesSummary> DataItem = db.tblSalesSummaries.Where(x => x.IChekRef.Contains(SearchCus)).ToList();

            List<listsummary> logDetail = new List<listsummary>();

            string datestring = "01/01/1900";

            //List<tblSalesSummary> DataItem = db.tblSalesSummaries.ToList();
            if (DataItem != null && DataItem.Count > 0)
            {
                DataItem.ForEach(item =>
                {

                    logDetail.Add(new listsummary
                    {
                        ReceiptNo = item.ReceiptNo != null ? item.ReceiptNo : "",
                        ReceiptDateString = item.ReceiptDate.HasValue ? item.ReceiptDate.Value.ToString("dd/MM/yyyy") : datestring,
                        IChekRef = item.IChekRef != null ? item.IChekRef : "",
                        SalesmanCode = item.SalesmanCode != null ? item.SalesmanCode : "",
                        System = item.System != null ? item.System : "",
                        Company = item.Company != null ? item.Company : "",
                        NricNo = item.NricNo != null ? item.NricNo : "",
                        MobilePlan = item.MobilePlan != null ? item.MobilePlan : "",
                        MobileNumber = item.MobileNumber != null ? item.MobileNumber : "",
                        MobileContrctType = item.MobileContrctType != null ? item.MobileContrctType : "",
                        ImeiNumber = item.ImeiNumber != null ? item.ImeiNumber : "",
                        PhoneDetails = item.PhoneDetails != null ? item.PhoneDetails : "",
                        InventoryCode = item.InventoryCode != null ? item.InventoryCode : "",
                        BlankSimNumber = item.BlankSimNumber != null ? item.BlankSimNumber : "",
                        HandSetValue = item.HandSetValue != null ? item.HandSetValue : 0,
                        HandSetDiscountAmt1 = item.HandSetDiscountAmt1 != null ? item.HandSetDiscountAmt1 : 0,
                        DiscountCode1 = item.DiscountCode1 != null ? item.DiscountCode1 : "",
                        HandSetDiscountAmt2 = item.HandSetDiscountAmt2 != null ? item.HandSetDiscountAmt2 : 0,
                        DiscountCode2 = item.DiscountCode2 != null ? item.DiscountCode2 : "",
                        Deposit = item.Deposit != null ? item.Deposit : 0,
                        Prepayment = item.Prepayment != null ? item.Prepayment : 0,
                        FinalPayment = item.FinalPayment != null ? item.FinalPayment : 0,
                        BespokeReceipt = item.BespokeReceipt != null ? item.BespokeReceipt : "",
                        Remarks = item.Remarks != null ? item.Remarks : "",

                    });


                });
            }

            return Json(logDetail, JsonRequestBehavior.AllowGet);
        }
        public JsonResult reports(string Companyid)
        {

            int CompanyId = Companyid != "" ? Convert.ToInt32(Companyid) : 0;

            var saleslist = (from model in db.tblSalesSummaries.Where(x => x.ReceiptNo == "")
                             select model).ToList();

            //var DataItem = (from model in db.tblSales_Summary.Where(x => x.CompanyId == Id)
            //                select model).FirstOrDefault();

            var filepathurl = Server.MapPath("~/output.pdf");

            var url = filepathurl;

            pdfmethod(saleslist);

            return Json(url, JsonRequestBehavior.AllowGet);

        }
        public void pdfmethod(IEnumerable saleslist)
        {

            LocalReport Localreport = new LocalReport();

            Localreport.ReportPath = Server.MapPath("~/Reports/Report.rdlc");
            byte[] bytes = null;
            List<byte[]> ByteCollections = new List<byte[]>();

            string mimeType, encoding, extension;
            string[] streams;
            Warning[] warnings;
            ReportDataSource reportDataSource = new ReportDataSource("SalessummaryDataSet", saleslist);
            Localreport.DataSources.Add(reportDataSource);
            Localreport.Refresh();
            Localreport.ReportPath = Server.MapPath("~/Reports/Report.rdlc"); //This is your rdlc name. 
            bytes = Localreport.Render("PDF", null, out mimeType, out encoding, out extension, out streams, out warnings);
            ByteCollections.Add(bytes);
            var dirPath = Server.MapPath("~/Temp");

            string[] filePaths = Directory.GetFiles(dirPath);

            if (filePaths != null && filePaths.Count() > 0)
            {
                foreach (string filPath in filePaths)
                {
                    System.IO.File.Delete(filPath);
                }
            }
            System.IO.FileStream fs = new System.IO.FileStream(Server.MapPath("~/Temp/") + "output.pdf", System.IO.FileMode.Create);
            fs.Write(bytes, 0, bytes.Length);
            fs.Close();
            return;
        }
        public JsonResult SummaryAlldropdownmodel()
        {

            List<SummaryListModel> ModelList = new List<SummaryListModel>();

            string SqlQuery = "select 'C' as ModuleName,Description from vwCompany ";

            List<SummaryListModel> Companymodellist = db.Database.SqlQuery<SummaryListModel>(SqlQuery).ToList();

            string SqlQueryy = "select 'M' as ModuleName ,ServiceProviderCode,code from vwMobilePlan ";

            List<SummaryListModel> Mobileplanlist = db.Database.SqlQuery<SummaryListModel>(SqlQueryy).ToList();

            string Sqlquery = "select 'P' as ModuleName,Description,InventoryCode from vwPhoneDetails ";

            List<SummaryListModel> Phonemodellist = db.Database.SqlQuery<SummaryListModel>(Sqlquery).ToList();

            if (Companymodellist != null && Companymodellist.Count > 0)
            {
                ModelList.AddRange(Companymodellist);
            }
            if (Mobileplanlist != null && Mobileplanlist.Count > 0)
            {
                ModelList.AddRange(Mobileplanlist);
            }
            if (Phonemodellist != null && Phonemodellist.Count > 0)
            {
                ModelList.AddRange(Phonemodellist);
            }
            return Json(ModelList);
        }

        public JsonResult EMIEnumberlist(string IMEINumber)
        {

            string Inventory_Code = "";

            //string PHONEDETAILS = "";

            List<SummaryListModel> inventorylist = new List<SummaryListModel>();

            string Sql_query = "select 'I' as ModuleName,IMEINumber,InventoryCode from tblimei where IMEINumber='" + IMEINumber + "'and Status='PU' and qty=1 ";

            List<SummaryListModel> IMEIdetailes = db.Database.SqlQuery<SummaryListModel>(Sql_query).ToList();

            if (IMEIdetailes != null && IMEIdetailes.Count > 0)
            {
                Inventory_Code = IMEIdetailes[0].InventoryCode;

                inventorylist.AddRange(IMEIdetailes);
            }

            string Sqlquery = "select Description from vwPhoneDetails where InventoryCode='" + Inventory_Code + "' ";

            List<SummaryListModel> Phonemodellist = db.Database.SqlQuery<SummaryListModel>(Sqlquery).ToList();

            if (Phonemodellist != null && Phonemodellist.Count > 0)
            {
                //PHONEDETAILS = Phonemodellist[0].Description;


                inventorylist.AddRange(Phonemodellist);
            }

            return Json(inventorylist);
        }       
        public JsonResult Premiumautocomplete()
        {
            List<SummaryListModel> Premiumauto = new List<SummaryListModel>();
            // string SqlQueryey = "select 'C'as ModuleName, ROW_NUMBER() OVER (ORDER BY InventoryCode) AS row_number,*  from vwPremiumInventory  ";
            string SqlQueryey = "select 'C' as ModuleName,LTRIM(RTRIM(Description))Description from vwPremiumInventory";
            List<SummaryListModel> autoprimuim = db.Database.SqlQuery<SummaryListModel>(SqlQueryey).ToList();            

            if (autoprimuim != null && autoprimuim.Count > 0)
            {
                Premiumauto.AddRange(autoprimuim);
            }
            return Json(Premiumauto);
        }

        public JsonResult get_sellingprice(string inventorycode)
        {

            string sqlquery = "select SellingPrice from vwDiscountInventory where InventoryCode='" + inventorycode + "' ";

            populatedropdown sellingproce = db.Database.SqlQuery<populatedropdown>(sqlquery).FirstOrDefault();

            return Json(sellingproce);
        }

        public JsonResult Autopopulatedropdown()
        {

            string sql_po = "select 'A' as ModuleName,InventoryCode from vwDiscountInventory ";

            List<SummaryListModel> popu = db.Database.SqlQuery<SummaryListModel>(sql_po).ToList();

           
            return Json(popu);
        }
        public JsonResult Gettwo_autopopulate(string inventorycode)
        {

            string sql__query = "select SellingPrice from vwDiscountInventory where InventoryCode='" + inventorycode + "' ";

            populatedropdown sellingproce = db.Database.SqlQuery<populatedropdown>(sql__query).FirstOrDefault();

            return Json(sellingproce);
        }

        public JsonResult Next_autopopulate()
        {

            string sql_pop = "select 'N' as ModuleName,InventoryCode from vwDiscountInventory ";

            List<SummaryListModel> autopopup = db.Database.SqlQuery<SummaryListModel>(sql_pop).ToList();


            return Json(autopopup);
        }
    }
}

