import React, {
    useState,
    useEffect,
} from "react"
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import Layout from "../components/layout/layout";
import SEO from "../components/SEO/seo"

import { BlogLink, BlogTitle } from "../styled-components/index"
import { Title } from "../components/utils";

import "../styles/index.scss"

const PAGE_LIMIT = 30;

export default function IndexPage() {
    const [page, changePage] = useState(1);
    const [pageCount, changePageCount] = useState(Math.ceil(836693 / PAGE_LIMIT));
    const [articles, changeArticles] = useState([]);

    /*useEffect(() => {
        axios
            .get("https://article.minganci.org/pagecount")
            .then(response => {
                changePageCount(response.data);
            })
            .catch(error => {
                console.log('fetching error');
            })
    }, []);*/

    useEffect(() => {
        const config = {
            params: {
                page,
            },
        };
        axios
            .get("https://api.article.minganci.org/", config)
            .then(response => {
                changeArticles(response.data);
            })
            .catch(error => {
                console.log('fetching error');
            })
    }, [page]);

    return (
      <Layout>
        <SEO title="Home" />
        {
           articles.map(([ id, time, content, twitterId, twitterName, shortUrl, url]) => (
            <div key={id}>
              <BlogLink to={`/post?id=${id}`}>
                  <BlogTitle>
                      <Title content={content} />
                  </BlogTitle>
              </BlogLink>
              <time>{new Date(time).toDateString()}</time>
              <p>
                  <Title content={content} />
              </p>
            </div>
          ))
        }
        <div id="paginate">
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                onPageChange={({ selected }) => changePage(selected + 1)}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
      </Layout>
    );
}
