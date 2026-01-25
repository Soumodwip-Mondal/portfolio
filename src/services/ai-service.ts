import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Portfolio context to help AI answer questions
const portfolioContext = `
You are an AI assistant for Soumodwip Mondal's portfolio website. You help visitors learn about Soumodwip's skills, projects, and experience.

ABOUT SOUMODWIP:
- Full-stack developer with expertise in React, TypeScript, Node.js, Python
- Strong background in data analysis and visualization
- Experienced with modern web technologies and AI/ML concepts

KEY SKILLS:
- Frontend: React, TypeScript, JavaScript, HTML/CSS, Tailwind CSS
- Backend: Node.js, Express, MongoDB, PostgreSQL, MySQL
- Data Analysis: Python, SQL, Tableau, Web Scraping
- Other: Git, UI/UX Design, Responsive Design, SEO, Performance Optimization

NOTABLE PROJECTS:
1. My Portfolio - A comprehensive portfolio showcasing creative solutions with features like AI Assistant, 3D Animation, Voice Control Navigation, Collaborative Drawing, and Blogs
2. Data Analytics projects using Python and visualization tools
3. Web applications with interactive dashboards
4. Database management systems

CONTACT:
- Email: msoumodwip485@gmail.com
- GitHub: Soumodwip-Mondal
- Available for professional inquiries and collaborations

INSTRUCTIONS:
- Be friendly, helpful, and professional
- Provide specific, accurate information about Soumodwip's work
- If you don't know something specific, be honest and suggest contacting directly
- Keep responses concise but informative (2-3 sentences usually)
- Encourage visitors to explore the portfolio sections
- Don't make up project details - stick to what's mentioned above
`;

/**
 * Send a message to Gemini AI and get a response
 */
export async function getAIResponse(userMessage: string, conversationHistory: Array<{ role: string, parts: string }> = []): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Build conversation history
        const history = conversationHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.parts }],
        }));

        // Start chat with context
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: portfolioContext }],
                },
                {
                    role: 'model',
                    parts: [{ text: "I understand. I'm here to help visitors learn about Soumodwip Mondal's portfolio, skills, and projects. I'll provide accurate, helpful information based on the context you've provided." }],
                },
                ...history,
            ],
            generationConfig: {
                maxOutputTokens: 200,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error getting AI response:', error);

        // Fallback to keyword-based response if API fails
        return getFallbackResponse(userMessage);
    }
}

/**
 * Fallback response system if API fails
 */
function getFallbackResponse(input: string): string {
    const lowercaseInput = input.toLowerCase();

    if (/hello|hi|hey|greetings/i.test(lowercaseInput)) {
        return "Hello! I'm Soumodwip's AI assistant. I can help you learn about projects, skills, or how to get in touch. What would you like to know?";
    }

    if (/project|portfolio|work/i.test(lowercaseInput)) {
        return "Soumodwip has worked on several impressive projects including web applications, data analysis tools, and interactive dashboards. The portfolio showcases work in React, TypeScript, and data visualization. Would you like to know more about a specific project?";
    }

    if (/skill|technology|tech/i.test(lowercaseInput)) {
        return "Soumodwip's key skills include React, TypeScript, Python, data analysis, Node.js, and UI/UX design. There's strong proficiency in both frontend and backend development. Which skill would you like to know more about?";
    }

    if (/contact|email|reach/i.test(lowercaseInput)) {
        return "You can contact Soumodwip via email at msoumodwip485@gmail.com or through the contact form on this website. Feel free to reach out for professional inquiries!";
    }

    return "I'm here to help! You can ask me about Soumodwip's projects, skills, experience, or how to get in touch. What would you like to know?";
}
