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
    public class FormsController : UmbracoApiController
    {
        [HttpGet]
        [HttpPost]
        public string CallBack(CallBack model)
        {
            var result = "success";

            //Check recaptcha validation - set error state if model fails recaptcha validation
            if (!validateModel(model, model.email))
            {
                result = "failure"; 
            }

            var emailString = "Request Details" + Environment.NewLine + Environment.NewLine;
            emailString += "First name: " + model.name + Environment.NewLine;
            emailString += "Email: " + model.mdr + Environment.NewLine;
            emailString += "Telephone: " + model.telephone + Environment.NewLine;
            emailString += "Message: " + model.message + Environment.NewLine;

            if (result == "success")
            {
                try
                {
                    //Attempt email send with subject name
                    //sendEmail(emailString, "New call back enquiry");
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

        #region Form email validation

        /*
         * Validate model on form submission
         * 
         * @param model - submitted model
         * @param email - hidden email field to catch robots
         */
        public bool validateModel(object model, string email)
        {
            //Check model state validation - return to current page if model is invalid
            if (!ModelState.IsValid)
            {
                return false;
            }

            //Check model content validation - set error state if model fails content validation
            if (model == null || !String.IsNullOrEmpty(email))
            {
                return false;
            }
            return true;
        }

        #endregion

        #region Form email sender

        /*
         * Email handler
         * 
         * @param emailString - content for email body (to be moved to html template soon)
         * @param subject - subject of email title
         */
        private void sendEmail(string emailString, string subject)
        {
            //Get email address information from Config
            var toEmail = ConfigurationManager.AppSettings["toEmail"].ToString();
            var fromEmail = ConfigurationManager.AppSettings["fromEmail"].ToString();
            var fromName = ConfigurationManager.AppSettings["fromName"].ToString();

            SmtpClient smtp = new SmtpClient();
            MailMessage mail = new MailMessage();

            //Setup email properties and content
            mail.From = new MailAddress(fromEmail, fromName);
            mail.To.Add(new MailAddress(toEmail));
            //mail.Bcc.Add(new MailAddress("email@email.com"));
            //mail.Bcc.Add(new MailAddress("email@email.com"));
            mail.Subject = subject;
            mail.Body = emailString;

            //Send email
            using (smtp)
            {
                smtp.Send(mail);
            }
        }

        #endregion
    }
}