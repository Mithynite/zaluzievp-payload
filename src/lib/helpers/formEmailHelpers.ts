// Add this helper function outside or inside your server action file
export function replaceLexicalVariables(node: any, data: Record<string, any>): any {
  // Base case: if it's not an object or is null, return it
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!node || typeof node !== 'object') {
    return node
  }

  // If it's an array (like the 'children' array), map over each item
  if (Array.isArray(node)) {
    return node.map((child) => replaceLexicalVariables(child, data))
  }

  // Create a shallow copy of the node to avoid mutating the original template
  const newNode = { ...node }

  // Target text nodes and replace the variables
  if (newNode.type === 'text' && typeof newNode.text === 'string') {
    newNode.text = newNode.text.replace(
      /\{\{\s*([^}]+)\s*\}\}/g,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (match: any, fieldName: string) => {
        const key = fieldName.trim()
        return data[key] !== undefined && data[key] !== null ? String(data[key]) : ''
      },
    )
  }

  // Recursively process children if they exist
  if (newNode.children) {
    newNode.children = replaceLexicalVariables(newNode.children, data)
  }

  // If we are at the very top level, step into the 'root'
  if (newNode.root) {
    newNode.root = replaceLexicalVariables(newNode.root, data)
  }

  return newNode
}
