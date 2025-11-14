import * as React from "react"

const MetadataConverterWidget = () => {
  const [inputText, setInputText] = React.useState("")
  const [convertedText, setConvertedText] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  const handleConvert = () => {
    const converted = inputText.replace(/\r?\n/g, '\\n')
    setConvertedText(converted)
    setCopied(false)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(convertedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return React.createElement(
    "div",
    { 
      style: { 
        backgroundColor: "#f9fafb", 
        padding: "1.5rem", 
        borderRadius: "0.5rem", 
        border: "1px solid #e5e7eb",
        marginBottom: "1.5rem",
        marginTop: "1rem"
      }
    },
    React.createElement(
      "div",
      { style: { marginBottom: "1rem" } },
      React.createElement(
        "h3",
        { style: { fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" } },
        "🔄 Convertisseur de Métadonnées"
      ),
      React.createElement(
        "p",
        { style: { color: "#6b7280", fontSize: "0.875rem" } },
        "Collez votre texte avec des retours à la ligne, puis convertissez pour les métadonnées"
      )
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "0.75rem" } },
      React.createElement(
        "div",
        null,
        React.createElement(
          "label",
          { style: { display: "block", marginBottom: "0.375rem", fontWeight: "500", fontSize: "0.875rem" } },
          "Texte original"
        ),
        React.createElement("textarea", {
          value: inputText,
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value),
          placeholder: "Le kit comprend :\nArticle 1\nArticle 2",
          rows: 4,
          style: {
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            fontFamily: "inherit",
            fontSize: "0.875rem",
            resize: "vertical"
          }
        })
      ),
      React.createElement(
        "button",
        {
          onClick: handleConvert,
          disabled: !inputText,
          style: {
            padding: "0.5rem 1rem",
            backgroundColor: inputText ? "#6366f1" : "#e5e7eb",
            color: inputText ? "white" : "#9ca3af",
            border: "none",
            borderRadius: "0.375rem",
            fontWeight: "500",
            cursor: inputText ? "pointer" : "not-allowed",
            fontSize: "0.875rem"
          }
        },
        "Convertir"
      ),
      convertedText && React.createElement(
        "div",
        null,
        React.createElement(
          "label",
          { style: { display: "block", marginBottom: "0.375rem", fontWeight: "500", fontSize: "0.875rem" } },
          "Texte converti (à copier dans Value)"
        ),
        React.createElement("textarea", {
          value: convertedText,
          readOnly: true,
          rows: 4,
          style: {
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            backgroundColor: "#f3f4f6",
            fontFamily: "monospace",
            fontSize: "0.75rem",
            resize: "vertical"
          }
        }),
        React.createElement(
          "button",
          {
            onClick: handleCopy,
            style: {
              width: "100%",
              padding: "0.5rem 1rem",
              backgroundColor: copied ? "#10b981" : "#059669",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              fontWeight: "500",
              cursor: "pointer",
              marginTop: "0.5rem",
              fontSize: "0.875rem"
            }
          },
          copied ? "✓ Copié !" : "📋 Copier"
        )
      )
    )
  )
}

export default MetadataConverterWidget

export const config = {
  zone: "product.details.after",
}
