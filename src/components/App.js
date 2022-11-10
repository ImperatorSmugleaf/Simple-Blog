/**
 * This is the main app for the blog.
 * Adapted from Dr. Toal's notes.
 */

import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { SignIn, SignOut, useAuthentication } from "../services/authService";
import {
    fetchArticles,
    createArticle,
    deleteArticle,
} from "../services/articleService";
import "./App.css";

export default function App() {
    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState(null);
    const [writing, setWriting] = useState(null);
    const user = useAuthentication();

    // This is a trivial app, so just fetch all the articles once, when
    // the app is loaded. A real app would do pagination. Note that
    // "fetchArticles" is what gets the articles from the service and
    // then "setArticles" writes them into the React state.
    useEffect(() => {
        if (user) {
            fetchArticles().then(setArticles);
        }
    }, [user]);

    // Update the "database" *then* update the internal React state. These
    // two steps are definitely necessary.
    function addArticle({ title, body }) {
        createArticle({ title, body }).then((article) => {
            setArticle(article);
            setArticles([article, ...articles]);
            setWriting(false);
        });
    }

    function removeArticle({ article }) {
        deleteArticle({ article }).then(() => {
            setArticle(null);
            setArticles([
                ...articles.slice(0, articles.indexOf(article)),
                ...articles.slice(articles.indexOf(article) + 1),
            ]);
        });
    }

    return (
        <div className="App">
            <header>
                Blog
                {user && (
                    <button
                        onClick={() => {
                            setWriting(true);
                        }}
                    >
                        New Article
                    </button>
                )}
                {!user ? <SignIn /> : <SignOut />}
            </header>

            {!user ? "" : <Nav articles={articles} setArticle={setArticle} />}

            {!user ? (
                ""
            ) : writing ? (
                <ArticleEntry addArticle={addArticle} setWriting={setWriting} />
            ) : (
                <Article article={article} removeArticle={removeArticle} />
            )}
        </div>
    );
}
