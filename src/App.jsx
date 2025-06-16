import { useEffect, useState } from "react";
import { FaTwitter, FaTumblr } from "react-icons/fa6";


const App = () => {
  const [bgColor, setBgColor] = useState("#69b77d");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  function getRandomColor() {
    const r = Math.floor(Math.random() * 255); // 200–255
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      console.error("Error fetching quote:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleClick = () => {
    setBgColor(getRandomColor());
    fetchQuote();
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "400px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px"
        }}
        id="quote-box"
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="quote-text">
              <span id="text" style={{ color: bgColor }}>{quote?.quote}</span>
            </div>
            <div className="quote-author">
              <p id="author" style={{ textAlign: "right", margin: "0", color: bgColor }}>
                — {quote?.author}
              </p>
            </div>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <div style={{ alignSelf: "center" }}>
            <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer" id="tweet-quote">
              <FaTwitter color={bgColor} />
            </a>
            <a href="https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=%20Albert%20Einstein&content=A%20person%20who%20never%20made%20a%20mistake%20never%20tried%20anything%20new.&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button" target="_blank" rel="noopener noreferrer" id="tumblr-quote" style={{ marginLeft: "10px" }}>
              <FaTumblr color={bgColor} />
            </a>
          </div>
          <div>
            <button onClick={handleClick} style={{ color: "#fff", backgroundColor: bgColor, padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer", marginRight: "10px" }} id="new-quote">
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
