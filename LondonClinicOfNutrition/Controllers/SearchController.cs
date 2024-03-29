﻿using System.Collections.Generic;
using Umbraco.Web.WebApi;
using LondonClinicOfNutrition.Models;
using System.Linq;
using System;
using System.Globalization;
using Umbraco.Core.Models;
using Umbraco.Core.Logging;

namespace LondonClinicOfNutrition.Controllers
{
    public class SearchController : UmbracoApiController
    {
        // GET: Search
        public IEnumerable<ContentModel> GetSearch(string searchTerm = "", int take = 0, int skip = 0)
        {
            var search = Umbraco.TypedSearch(searchTerm).Skip(skip).Take(take);
            List<ContentModel> nodes = new List<ContentModel>();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                foreach (var item in search)
                {
                    var content = "";
                    try
                    {
                        if (item.GetProperty("content") != null)
                        {
                            content = item.GetProperty("content").Value.ToString();
                        }
                        if (item.GetProperty("bodyContent") != null && content == "")
                        {
                            content = Umbraco.Truncate(item.GetProperty("bodyContent").Value.ToString(), 300).ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        LogHelper.Error<Exception>("CUSTZZ - " + ex.StackTrace, ex);
                    }

                    DateTime dt = item.CreateDate;
                    var date = String.Format("{0}{1} {2} {3}",
                                      dt.Day,
                                      GetDaySuffix(dt.Day),
                                      dt.ToString("MMMM", CultureInfo.InvariantCulture),
                                      dt.Year);

                    nodes.Add(new ContentModel
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