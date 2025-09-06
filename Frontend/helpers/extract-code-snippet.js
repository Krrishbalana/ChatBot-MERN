export const detectCodeSnippet = (message) => {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
  return [];
};

export const isCodeBlock = (message) => {
  if (
    (message.includes("{") && message.includes("}")) ||
    (message.includes("[") && message.includes("]")) ||
    message.includes("#") ||
    message.includes(";")
  ) {
    return true;
  }
  return false;
};

export function extractCodeNames(message) {
  const codeBlockRegex = /```([a-zA-Z0-9_]+)?([\s\S]*?)```/g;

  let matches;
  const codeNames = [];

  while ((matches = codeBlockRegex.exec(message)) !== null) {
    const codeName = matches[1] || ""; // Use an empty string if codeName is not present
    codeNames.push(codeName);
  }

  return codeNames;
}
