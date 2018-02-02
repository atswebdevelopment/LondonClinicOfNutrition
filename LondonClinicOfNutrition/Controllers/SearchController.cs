using System.Collections.Generic;
using Umbraco.Web.WebApi;
using LondonClinicOfNutrition.Models;
using System.Linq;
using System;
using System.Globalization;
using Umbraco.Core.Models;

namespace LondonClinicOfNutrition.Controllers
{
    public class SearchController : UmbracoApiController
    {
        // GET: Search
        public IEnumerable<SearchModel> GetSearch(string searchTerm = "", int take = 0, int skip = 0)
        {
            var search = Umbraco.TypedSearch(searchTerm).Skip(skip).Take(take);
            List<SearchModel> nodes = new List<SearchModel>();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                foreach (var item in search)
                {
                    var content = "";
                    if (item.GetProperty("content").HasValue)
                    {
                        content = item.GetProperty("content").Value.ToString();
                    }
                    else if (item.GetProperty("bodyContent").HasValue)
                    {
                        content = Umbraco.Truncate(item.GetProperty("bodyContent").Value.ToString(), 300).ToString();
                    }

                    DateTime dt = item.CreateDate;
                    var date = String.Format("{0}{1} {2} {3}",
                                      dt.Day,
                                      GetDaySuffix(dt.Day),
                                      dt.ToString("MMMM", CultureInfo.InvariantCulture),
                                      dt.Year);

                    nodes.Add(new SearchModel
                    {
                        name = item.Name,
                        url = item.Url,
                        content = content,
                        date = date
                    });
                }
            }

            return nodes;
        }

        private string GetDaySuffix(int day)
        {
            switch (day)
            {
                case 1:
                case 21:
                case 31:
                    return "st";
                case 2:
                case 22:
                    return "nd";
                case 3:
                case 23:
                    return "rd";
                default:
                    return "th";
            }
        }
    }
}