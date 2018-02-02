using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LondonClinicOfNutrition.Models
{
    public class CallBack
    {
        [Required]
        public string name { get; set; }

        [Required]
        [EmailAddress]
        public string mdr { get; set; } //Email

        public string email { get; set; } //Spam

        [RegularExpression("^[0-9]*$")]
        [DataType(DataType.PhoneNumber)]
        public string telephone { get; set; }

        public string message { get; set; }
    }
}