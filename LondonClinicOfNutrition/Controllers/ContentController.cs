using System.Collections.Generic;
using Umbraco.Web.WebApi;
using LondonClinicOfNutrition.Models;
using System.Linq;

namespace LondonClinicOfNutrition.Controllers
{
    public class ContentController : UmbracoApiController
    {
        // GET: Content
        public IEnumerable<ContentModel> GetContent(int id = 0, int take = 0, int skip = 0)
        {
            var node = Umbraco.TypedContent(id).Children.Skip(skip).Take(take);
            List<ContentModel> nodes = new List<ContentModel>();

            foreach (var item in node)
            {
                var image = "";
                var content = "";

                nodes.Add(new ContentModel
                {
                    name = item.Name,
                    image = image,
                    url = item.Url,
                    content = content
                });
            }

            return nodes;
        }
    }
}