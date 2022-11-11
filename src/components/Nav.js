export default function Nav({ articles, setArticle, pageNum, setPageNum }) {
  return (
    <nav>
      {!articles || (pageNum + 1) * 10 > Math.ceil(articles.length / 10) * 10 ? (
        <span>No Articles</span>
      ) : (
        articles.slice(10 * pageNum, 10 * (pageNum + 1)).map(a => (
          <p key={a.id} onClick={() => setArticle(a)}>
            {a.title}
          </p>
        ))
      )}
      <footer className="pageNav">
        <button onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 0}>
          Previous Page
        </button>
        <span>{pageNum + 1}</span>
        <button onClick={() => setPageNum(pageNum + 1)}>Next Page</button>
      </footer>
    </nav>
  )
}
