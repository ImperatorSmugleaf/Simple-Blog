export default function Article({ article, removeArticle }) {
  return (
    <article className="articleDisplay">
      {!article ? (
        <p>No article selected</p>
      ) : (
        <section>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${article.date.toDate()}`}</p>
          <p className="body">{article.body}</p>
        </section>
      )}
      {!article ? '' : <button onClick={() => removeArticle({ article })}>Delete</button>}
    </article>
  )
}
