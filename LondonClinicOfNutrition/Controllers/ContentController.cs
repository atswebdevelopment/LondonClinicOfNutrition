using System.Collections.Generic;
using Umbraco.Web.WebApi;
using LondonClinicOfNutrition.Models;
using System.Linq;
using System;
using System.Globalization;
using Umbraco.Core.Models;
using Umbraco.Core.Logging;

namespace LondonClinicOfNutrition.Controllers
{
    public class ContentController : UmbracoApiController
    {
        // GET: Content
        public IEnumerable<ContentModel> GetContent(int id = 0, int take = 0, int skip = 0, string searchTerm = "", string filter = "")
        {
            IEnumerable<IPublishedContent> nodeChildren = null;

            var node = Umbraco.TypedContent(id);
            if (!String.IsNullOrEmpty(searchTerm))
            {
                nodeChildren = Umbraco.TypedSearch(searchTerm, true, "ExternalSearcher").Where(m => m.Parent.Id == id);
            }
            else
            {
                nodeChildren = node.Children;
            }

            if (!String.IsNullOrEmpty(filter))
            {
                nodeChildren = nodeChildren.Where(m => m.GetProperty("categories").DataValue.ToString().Contains(filter));
            }

            nodeChildren = nodeChildren.Skip(skip).Take(take);

            List<ContentModel> nodes = new List<ContentModel>();

            foreach (var item in nodeChildren)
            {
                var icon = "";
                try { 
                    var nodeIcon = node.DocumentTypeAlias == "blogs" ||
                        node.DocumentTypeAlias == "recipes" ||
                        node.DocumentTypeAlias == "team" ? node.GetProperty("icon") : item.GetProperty("icon");

                    if (nodeIcon != null)
                    {
                        var nodeImageValue = nodeIcon.Value.ToString();
                        var mediaNode = Umbraco.TypedMedia(nodeImageValue);
                        if (mediaNode != null)
                        {
                            icon = mediaNode.Url;
                        }
                    }
                }
                catch (Exception ex)
                {
                    LogHelper.Error<Exception>("CUSTZZ - " + ex.StackTrace, ex);
                }

                var image = "";
                try
                {
                    var nodeImage = item.GetProperty("background");
                    if (nodeImage == null)
                    {
                        nodeImage = item.GetProperty("image");
                    }
                    if (nodeImage != null)
                    {
                        var nodeImageValue = nodeImage.Value.ToString();
                        var mediaNode = Umbraco.TypedMedia(nodeImageValue);
                        if (mediaNode != null)
                        {
                            image = mediaNode.Url;
                        }
                    }
                }
                catch (Exception ex)
                {
                    LogHelper.Error<Exception>("CUSTZZ - " + ex.StackTrace, ex);
                }

                var content = "";
                var title = "";
                try
                {
                    if (node.DocumentTypeAlias == "team")
                    {
                        content = item.GetProperty("jobTitle").Value.ToString();
                    }
                    if (node.DocumentTypeAlias == "about")
                    {
                        content = item.GetProperty("content").Value.ToString();
                        title = item.GetProperty("bodyName").Value.ToString();
                    }
                }
                catch (Exception ex)
                {
                    LogHelper.Error<Exception>("CUSTZZ - " + ex.StackTrace, ex);
                }
                
                DateTime dt = item.CreateDate;
                var date = String.Format("{0}{1} {2}",
                                  dt.Day,
                                  GetDaySuffix(dt.Day),
                                  dt.ToString("MMMM", CultureInfo.InvariantCulture));

                nodes.Add(new ContentModel
                {
                    name = item.Name,
                    title = title,
                    icon = icon,
                    image = image,
                    url = item.Url,
                    content = content,
                    date = date
                });
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