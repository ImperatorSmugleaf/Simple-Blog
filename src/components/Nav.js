export default function Nav({ articles, setArticle, pageNum, setPageNum }) {
    console.log(articles.slice(10 * pageNum, 10 * (pageNum + 1)));
    return (
        <nav>
            {!articles || (pageNum + 1) * 10 > Math.ceil(articles.length / 10) * 10
                ? "No articles\n"
                : articles.slice(10 * pageNum, 10 * (pageNum + 1)).map((a) => (
                      <p key={a.id} onClick={() => setArticle(a)}>
                          {a.title}
                      </p>
                  ))}
            <button onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 0}>
                Previous Page
            </button>
            <p>{pageNum + 1}</p>
            <button onClick={() => setPageNum(pageNum + 1)}>Next Page</button>
        </nav>
    );
}
