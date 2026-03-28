// 1. Helper to decode Lexical's formatting bitmask
const applyTextFormatting = (text: string, format: number): string => {
  let formattedText = text

  if (format & 1) formattedText = `<strong>${formattedText}</strong>`
  if (format & 2) formattedText = `<em>${formattedText}</em>`
  if (format & 4) formattedText = `<s>${formattedText}</s>` // Strikethrough
  if (format & 8) formattedText = `<u>${formattedText}</u>`
  if (format & 16) formattedText = `<code>${formattedText}</code>`
  if (format & 32) formattedText = `<sub>${formattedText}</sub>`
  if (format & 64) formattedText = `<sup>${formattedText}</sup>`

  return formattedText
}

// 2. The main recursive serializer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeLexicalToHTML(node: any): string {
  if (!node) return ''

  // If the node is an array (like the 'children' array), process each item
  if (Array.isArray(node)) {
    return node.map((child) => serializeLexicalToHTML(child)).join('')
  }

  // If we are passed the whole object, step into the 'root'
  if (node.root) {
    return serializeLexicalToHTML(node.root.children)
  }

  // Handle Text Nodes
  if (node.type === 'text') {
    // Escape HTML characters to prevent rendering raw tags typed by the user
    const text = node.text ? node.text.replace(/</g, '&lt;').replace(/>/g, '&gt;') : ''
    return applyTextFormatting(text, node.format || 0)
  }

  // Handle Parent Nodes (Paragraphs, Headings, Lists, Links, etc.)
  const childrenHTML = node.children ? serializeLexicalToHTML(node.children) : ''

  switch (node.type) {
    case 'paragraph':
      return `<p>${childrenHTML}</p>`
    case 'heading':
      const tag = node.tag || 'h2' // Lexical stores 'h1', 'h2', etc. in node.tag
      return `<${tag}>${childrenHTML}</${tag}>`
    case 'list':
      const listTag = node.listType === 'bullet' ? 'ul' : 'ol'
      return `<${listTag}>${childrenHTML}</${listTag}>`
    case 'listitem':
      return `<li>${childrenHTML}</li>`
    case 'quote':
      return `<blockquote>${childrenHTML}</blockquote>`
    case 'link':
      // Depending on your link configuration, the URL might be nested in 'fields'
      const url = node.fields?.url || node.url || '#'
      return `<a href="${url}">${childrenHTML}</a>`
    case 'linebreak':
      return `<br />`
    default:
      // Fallback for unknown node types: just render their children safely
      return childrenHTML
  }
}
