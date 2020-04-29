import React, {
    useState,
    useEffect,
} from "react"
import axios from 'axios';

import Post from "../templates/posts";
import { Title, Content } from "../components/utils";


export default function PostPage({ location }) {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    const [
        article,
        changeArticle,
    ] = useState([]);
    useEffect(() => {
        axios
            .get(`https://api.article.minganci.org/${id}`)
            .then(response => {
                changeArticle(response.data[0]);
            })
            .catch(error => {
                console.log('fetching error');
            })
    }, [id]);

    const [ _, time, content, twitterId, twitterName, shortUrl, url ] = article;

    return (<Post
        pageContext={{
            frontmatter: {
                title: Title({content}),
                time,
                twitterName,
                shortUrl,
                url,
            },
            html: Content({content}),
            id,
        }}
    />);
}
