import { useState } from "react";

function IndexPopup() {
  const [data, setData] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleExtract = () => {
    chrome.runtime.sendMessage({ type: "extract" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error: haa", chrome.runtime.lastError);
      } else if (response) {
        setData(response.extractedText);
        setStatusMessage("Text extracted. Ready to send to ChatGPT.");
      } else {
        console.log("No response received. Is the content script loaded?");
      }
    });
  };

  const sendToGpt = () => {
    chrome.runtime.sendMessage({ type: "sendToGpt", text: data }, (response) => {
      if (response.success) {
        setStatusMessage("Text sent to ChatGPT tab.");
      } else {
        setStatusMessage("Failed to send text to ChatGPT tab.");
      }
    });
  };
  const styles = {
    popup: {
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      backgroundColor: "#f7f7f7",
      border: "1px solid #ddd",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      maxWidth: "400px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      overflow: "auto" // Allow for scrolling if content overflows
    },
    button: {
      padding: "10px 15px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "none",
      color: "white",
      backgroundColor: "#007bff",
      cursor: "pointer",
      fontWeight: "bold"
    },
    textarea: {
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ddd",
      minHeight: "100px",
      resize: "vertical"
    },
    statusMessage: {
      color: "#555",
      fontSize: "0.9rem",
      margin: "10px 0"
    }
  };

  return (
    <div style={styles.popup}>
      <h1 style={{ textAlign: "center" }}>Quiz Cracker</h1>
      <button onClick={handleExtract} style={styles.button}>
        Extract Text
      </button>
      <textarea value={data} readOnly style={styles.textarea}></textarea>
      <button onClick={sendToGpt} style={styles.button}>
        Send to ChatGPT
      </button>
      <div style={styles.statusMessage}>{statusMessage}</div>
    </div>
  );
}

export default IndexPopup;