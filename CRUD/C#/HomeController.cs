using Product_Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Product_Demo.Controllers
{
    public class HomeController : Controller
    {
        tbl_ProductmasterEntities2 db = new tbl_ProductmasterEntities2();
        public ActionResult Productmaster()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public JsonResult Productmasterlist()
        {
            string SqlQuery = "select Code,Product,Rate from Productmaster ";

            List<Productmaster> Productlist = db.Database.SqlQuery<Productmaster>(SqlQuery).ToList();

            return Json(Productlist);
        }
        public JsonResult SaveOrder(List<tbl_Transaction> orderDetails)
        {

            List<tbl_Transaction> logDetail = new List<tbl_Transaction>();

            //List<tbl_Transaction> DataItem = db.tbl_Transaction.ToList();

            if (orderDetails != null && orderDetails.Count > 0)
            {

                orderDetails.ForEach(item =>
                {

                    logDetail.Add(new tbl_Transaction
                    {
                      Slno= item.Slno,
                      Code=item.Code,
                        Qty = item.Qty,
                        Rate = item.Rate,
                        Tax = item.Tax,
                        TaxAmount = item.TaxAmount,
                        GrossTotal = item.GrossTotal
                    });
                   
                });

                if (logDetail != null&& logDetail.Count > 0)
                {
                    db.tbl_Transaction.AddRange(logDetail);
                    db.SaveChanges();
                }
               
            }
            return Json(logDetail, JsonRequestBehavior.AllowGet);
        }

       
    }
}
