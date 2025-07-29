# 🚀 OpenAI Chat Frontend

Welcome to the **slickest** OpenAI chat interface you've ever seen! This Next.js-powered frontend brings your OpenAI API to life with a beautiful, responsive, and lightning-fast streaming chat experience. 

## ✨ What Makes This Special?

- 🎯 **Real-time Streaming**: Watch AI responses appear character by character
- 🔒 **Secure API Key Handling**: Your secrets stay secret (password-masked input)
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🚦 **API Health Monitoring**: Real-time backend connection status
- 📱 **Mobile-Friendly**: Looks gorgeous on any device
- ⚡ **Next.js 14**: Built with the latest App Router architecture

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety that actually works
- **Tailwind CSS** - Utility-first styling that's a joy to use
- **React Hooks** - Clean, modern state management

## 🚀 Quick Start

### Prerequisites

Make sure you have these installed:
- **Node.js** (version 18 or higher)
- **npm** or **yarn** 
- An **OpenAI API key** (get one at [platform.openai.com](https://platform.openai.com))

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or if you prefer yarn
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

🎉 **Boom!** You should see the chat interface ready to rock!

## 🔧 How to Use

1. **Start the Backend First**: Make sure your FastAPI backend is running on `http://localhost:8000` (check the `api/` directory README)

2. **Fill in the Form**:
   - **Developer Message**: Set the AI's behavior (e.g., "You are a helpful coding assistant")
   - **User Message**: Your actual question or prompt
   - **Model**: Choose your preferred OpenAI model
   - **API Key**: Enter your OpenAI API key (it's password-masked for security!)

3. **Hit Send**: Watch the magic happen as the AI response streams in real-time!

4. **Clear & Repeat**: Use the clear button to start fresh conversations

## 🎛️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 API Integration

The frontend connects to your FastAPI backend through:
- **Health Check**: `GET /api/health` - Monitors backend status
- **Chat Endpoint**: `POST /api/chat` - Sends messages and receives streaming responses

The Next.js config automatically proxies `/api/*` requests to `http://localhost:8000/api/*`.

## 🎨 UI Features

### 🟢 API Status Indicator
- **Green dot**: Backend is online and ready
- **Yellow dot**: Checking connection status
- **Red dot**: Backend is offline (check if it's running!)

### 🔄 Real-time Streaming
The interface uses the Fetch API with ReadableStream to display AI responses as they're generated, giving you that satisfying real-time chat experience.

### 📱 Responsive Design
The layout automatically adapts:
- **Desktop**: Side-by-side form and response panels
- **Mobile**: Stacked layout for easy mobile interaction

## 🚢 Deployment

### Vercel (Recommended)
This app is optimized for Vercel deployment:

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy** - Vercel will auto-detect Next.js and handle everything!

**Important**: For production deployment, you'll need to update the API proxy configuration in `next.config.js` to point to your deployed backend URL.

### Other Platforms
You can deploy anywhere that supports Node.js:
```bash
npm run build
npm run start
```

## 🛡️ Security Notes

- API keys are never stored or logged
- Password-masked input fields protect sensitive information
- All communication happens over your local network during development

## 🤝 Contributing

Found a bug? Have an idea? We'd love to hear from you! This frontend is designed to be easily extensible and customizable.

## 🎯 What's Next?

Some ideas for future enhancements:
- Chat history persistence
- Multiple conversation threads
- Custom model parameters
- Export chat transcripts
- Dark mode toggle

---

**Happy chatting!** 🤖💬 If you run into any issues, double-check that your backend is running and your API key is valid.