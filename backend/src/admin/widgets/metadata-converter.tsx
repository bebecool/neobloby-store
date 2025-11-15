import { defineWidgetConfig } from "@medusajs/admin-sdk"
import * as React from "react"

const MetadataConverterWidget = () => {
  const [inputText, setInputText] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  // Conversion automatique
  const convertedText = React.useMemo(() => {
    return inputText.replace(/\r?\n/g, '\\n')
  }, [inputText])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    setCopied(false)
  }

  const handleCopyClick = async () => {
    if (!convertedText) return
    
    await navigator.clipboard.writeText(convertedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return React.createElement(
    "div",
    { 
      style: { 
        backgroundColor: "#1a1a1a", 
        padding: "1.5rem", 
        borderRadius: "0.5rem", 
        border: "1px solid #2a2a2a",
        marginBottom: "1.5rem",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.3)"
      }
    },
    React.createElement(
      "div",
      { style: { marginBottom: "1rem" } },
      React.createElement(
        "h3",
        { 
          style: { 
            fontSize: "0.875rem", 
            fontWeight: "600", 
            marginBottom: "0.25rem",
            color: "#f4f4f5",
            letterSpacing: "-0.01em"
          } 
        },
        "Convertisseur de Métadonnées"
      ),
      React.createElement(
        "p",
        { 
          style: { 
            color: "#a1a1aa", 
            fontSize: "0.8125rem",
            lineHeight: "1.4"
          } 
        },
        "Collez votre texte multi-lignes, la conversion est automatique. Cliquez pour copier."
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
          { 
            style: { 
              display: "block", 
              marginBottom: "0.5rem", 
              fontWeight: "500", 
              fontSize: "0.8125rem",
              color: "#d4d4d8"
            } 
          },
          "Texte original"
        ),
        React.createElement("textarea", {
          value: inputText,
          onChange: handleInputChange,
          placeholder: "Collez votre texte avec des retours à la ligne...\n\nExemple :\nLe kit comprend :\n• Article 1\n• Article 2\n• Article 3",
          rows: 5,
          style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #3a3a3a",
            borderRadius: "0.375rem",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: "0.8125rem",
            color: "#f4f4f5",
            resize: "vertical",
            lineHeight: "1.5",
            outline: "none",
            transition: "border-color 0.15s",
            backgroundColor: "#262626"
          }
        })
      ),
      inputText && React.createElement(
        "div",
        null,
        React.createElement(
          "label",
          { 
            style: { 
              display: "block", 
              marginBottom: "0.5rem", 
              fontWeight: "500", 
              fontSize: "0.8125rem",
              color: "#d4d4d8"
            } 
          },
          "Texte converti (prêt pour Value)"
        ),
        React.createElement("textarea", {
          value: convertedText,
          readOnly: true,
          rows: 3,
          style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #3a3a3a",
            borderRadius: "0.375rem",
            backgroundColor: "#262626",
            fontFamily: "ui-monospace, monospace",
            fontSize: "0.75rem",
            color: "#f4f4f5",
            resize: "vertical",
            lineHeight: "1.5"
          }
        }),
        React.createElement(
          "button",
          {
            onClick: handleCopyClick,
            style: {
              width: "100%",
              padding: "0.625rem 1rem",
              backgroundColor: copied ? "#16a34a" : "#3b3b3b",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              fontWeight: "500",
              cursor: "pointer",
              marginTop: "0.75rem",
              fontSize: "0.8125rem",
              transition: "background-color 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }
          },
          copied ? "✓ Copié dans le presse-papier !" : "📋 Copier le texte converti"
        )
      )
    )
  )
}

export default MetadataConverterWidget

export const config = defineWidgetConfig({
  zone: "product.details.after",
})
