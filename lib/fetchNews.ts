import { gql } from 'graphql-request';
import sortNewsByImage from './sortNewsByImage';
import axios from 'axios';

const fetchNews = async (
    category?:Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    //GraphGl Query
    const query = gql`
#   query MyQuery(
#     $access_key:String!
#     $categories: String!
#     $keywords: String

#   ) {
#     myQuery(
#         access_key: $access_key
#         categories: $categories
#         countries: "en, zm, us"
#         sort: "published_at"
#         keywords: $keywords
#         ) {
#       data {
#         author
#         category
#         country
#         description
#         image
#         language
#         published_at
#         source
#         title
#         url
#       }
#       pagination {
#         count
#         limit
#         offset
#         total
#       }
#     }
#   }
query MyQuery {
  myQuery(
    access_key: "43cd7970807de6f2f9429e2da97f8a7e"
  ) {
    data {
      author
      category
      country
      description
      image
      language
      published_at
      source
      title
      url
    }
    pagination {
      count
      limit
      offset
      total
    }
  }
}
`;

    //fetch function with Nextjs caching
    const res = await fetch('https://jinja.stepzen.net/api/toned-aardvark/__graphql',{
        method: 'POST',
        cache: isDynamic?'no-cache':'default',
        next: isDynamic? { revalidate: 0 } : { revalidate:20 },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
        },
        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords
            }
        })
    }
   );
// const res = await axios.post('https://jinja.stepzen.net/api/toned-aardvark/__graphql', 
//           {"body":JSON.stringify({
//             query,
//             variables: {
//                 access_key: process.env.MEDIASTACK_API_KEY,
//                 categories: category,
//                 keywords: keywords
//             }
//            })
//         }, 
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                  Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
//              }
//         }
//     );
   
   console.log(
    "LOADING NEW DATA FROM API from category >>>>",
    category,
    keywords
   );
   //const newsResponse = await res.json();
    // sort articles by images first against without images
    //const news = sortNewsByImage(newsResponse.data.myQuery);
    console.log(res)

    //return news;
   // return newsResponse;
   return res

}

export default fetchNews;