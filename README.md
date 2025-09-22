# AI Research Assistant MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server that provides AI-powered research tools for academic paper discovery and summarization.

## 🔧 Tools Available

- **CrossRef Lookup**: Search academic papers and research publications
- **OpenAI Summarization**: Summarize research papers and abstracts using GPT models

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- OpenAI API key (for summarization)

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Usage
```bash
# List available tools
npm run list-tools

# Start MCP server (for Claude Desktop)
node mcpServer.js
```

## 🤖 Claude Desktop Integration

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "research-assistant": {
      "command": "node",
      "args": ["path/to/mcpServer.js"]
    }
  }
}
```

## 🧪 Testing

Test commands in Claude Desktop:
- "Search for papers about machine learning using CrossRef"
- "Summarize this research abstract using OpenAI: [paste abstract]"
- "What research tools do you have available?"
