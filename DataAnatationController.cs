using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UniproERP.Controllers
{
    public class DataAnatationController : Controller
    {
        
        // GET: Default
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Salesman()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Salesman(DataAnatationController model)
        {
            return View();
        }
    }
}