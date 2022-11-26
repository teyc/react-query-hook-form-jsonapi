using Microsoft.AspNetCore.Mvc;

namespace SampleWeb.Contact;

public class ContactController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}