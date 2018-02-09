using System.Collections.Generic;
using Umbraco.Web.WebApi;
using LondonClinicOfNutrition.Models;
using System.Linq;
using System;
using System.Globalization;
using Umbraco.Core.Models;
using System.Web.Http;
using System.Net.Mail;
using System.Configuration;
using Umbraco.Core.Logging;

namespace LondonClinicOfNutrition.Controllers
{
    public class CommentController : UmbracoApiController
    {
        FormsController forms = new FormsController();

        [HttpGet]
        [HttpPost]
        public string SubmitComment(Comment model)
        {
            var result = "success";

            //Check recaptcha validation - set error state if model fails recaptcha validation
            if (!forms.validateModel(model, model.email))
            {
                result = "failure"; 
            }

            if (result == "success")
            {
                try
                {
                    //Create comment node
                    var blog = Umbraco.TypedContent(model.blogId);
                    var node = Services.ContentService.CreateContent("Comment", model.blogId, "comment", 0);

                    node.SetValue("userName", model.name);
                    node.SetValue("userEmail", model.mdr);
                    node.SetValue("message", model.message);
                    Services.ContentService.SaveAndPublishWithStatus(node);
                }
                catch (Exception ex)
                {
                    //Handle submission error, and add issue to Umbraco log files.
                    LogHelper.Error<Exception>("CUSTZZ - " + ex.StackTrace, ex);
                    return "failure";
                }
            }

            return result;
        }
    }
}