using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LondonClinicOfNutrition.Models
{
    public class Comment
    {
        [Required]
        public int blogId { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        [EmailAddress]
        public string mdr { get; set; } //Email
        public string email { get; set; } //Spam

        public string message { get; set; }
    }
}