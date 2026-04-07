import ChatbotConversation from '../models/ChatbotConversation.js';
import ChatbotMessage from '../models/ChatbotMessage.js';
import UserProfile from '../models/UserProfile.js';
import Career from '../models/Career.js';
import FAQ from '../models/FAQ.js';
import crypto from 'crypto';

class ChatbotService {
  /**
   * Send a message and get AI response
   */
  static async sendMessage(userId, message, conversationId = null) {
    // Get or create conversation
    let conversation;
    if (conversationId) {
      conversation = await ChatbotConversation.findOne({ _id: conversationId, user: userId });
    }
    if (!conversation) {
      conversation = await ChatbotConversation.create({
        user: userId,
        session_id: crypto.randomUUID(),
        title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
      });
    }

    // Save user message
    await ChatbotMessage.create({
      conversation: conversation._id,
      sender_type: 'user',
      message_text: message,
    });

    // Build context for AI
    const context = await this._buildContext(userId, conversation);
    const previousMessages = await ChatbotMessage.find({ conversation: conversation._id })
      .sort({ createdAt: -1 })
      .limit(10);

    // Call Gemini API
    const aiResponse = await this._callGemini(message, context, previousMessages.reverse());

    // Save bot response
    const botMessage = await ChatbotMessage.create({
      conversation: conversation._id,
      sender_type: 'bot',
      message_text: aiResponse,
      intent: this._detectIntent(message),
      response_metadata: {
        model_used: 'gemini-2.0-flash',
        data_sources: ['user_profile', 'career_db', 'faq_db'],
      },
    });

    // Update conversation
    conversation.message_count = await ChatbotMessage.countDocuments({ conversation: conversation._id });
    await conversation.save();

    return {
      conversation_id: conversation._id,
      message: botMessage,
    };
  }

  /**
   * Build context from user data
   */
  static async _buildContext(userId, conversation) {
    const [profile, faqs] = await Promise.all([
      UserProfile.findOne({ user: userId }),
      FAQ.find({ is_active: true }).limit(20),
    ]);

    let context = '';

    if (profile) {
      context += `\nUser Profile: Education: ${profile.education_level || 'unknown'}, `;
      context += `Status: ${profile.occupation_status || 'unknown'}, `;
      context += `Skills: ${(profile.known_skills || []).join(', ') || 'none specified'}, `;
      context += `Work preference: ${profile.work_preference || 'not set'}, `;
      context += `Career preference: ${profile.career_preference || 'not set'}`;
    }

    if (conversation.context?.target_career) {
      const career = await Career.findById(conversation.context.target_career);
      if (career) {
        context += `\nUser is asking about career: ${career.title} - ${career.short_description}`;
      }
    }

    // Add FAQ knowledge
    if (faqs.length > 0) {
      context += '\n\nPlatform FAQ Knowledge:\n';
      for (const faq of faqs.slice(0, 10)) {
        context += `Q: ${faq.question}\nA: ${faq.answer}\n`;
      }
    }

    // Add some career data for context
    const popularCareers = await Career.find({ published: true })
      .select('title category short_description')
      .limit(15);
    if (popularCareers.length > 0) {
      context += '\n\nAvailable careers on platform:\n';
      context += popularCareers.map(c => `- ${c.title} (${c.category}): ${c.short_description}`).join('\n');
    }

    return context;
  }

  /**
   * Call Gemini API
   */
  static async _callGemini(userMessage, context, previousMessages) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return "I'm currently unavailable. The AI service is not configured. Please contact the administrator.";
    }

    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      const systemPrompt = `You are "Career Soulmate AI", a friendly and knowledgeable career guidance assistant.
Your role is to help users discover their ideal career path, understand different professions, identify skill gaps, and create learning roadmaps.

Guidelines:
- Be encouraging, insightful, and professional
- Provide actionable, specific advice
- Use bullet points for clarity
- If asked about salary, provide realistic Indian market ranges
- Reference the user's profile data when available
- Suggest using platform features (assessments, skill gap analysis, career explorer)
- Keep responses concise (under 300 words unless detailed explanation needed)
- Always be supportive and positive about career changes

${context ? 'Context about this user and platform:\n' + context : ''}`;

      // Build conversation history
      const chatHistory = previousMessages
        .filter(m => m.message_text)
        .map(m => `${m.sender_type === 'user' ? 'User' : 'Assistant'}: ${m.message_text}`)
        .join('\n');

      const fullPrompt = chatHistory
        ? `Previous conversation:\n${chatHistory}\n\nUser: ${userMessage}`
        : userMessage;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: fullPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      });

      return response.text || "I'm having trouble generating a response right now. Please try again.";
    } catch (error) {
      console.error('Gemini API error:', error.message);
      return "I'm experiencing a temporary issue. Please try again in a moment, or explore our career tools directly!";
    }
  }

  /**
   * Simple intent detection
   */
  static _detectIntent(message) {
    const lower = message.toLowerCase();
    if (lower.includes('career') || lower.includes('job') || lower.includes('profession')) return 'career_query';
    if (lower.includes('skill') || lower.includes('learn')) return 'skill_query';
    if (lower.includes('roadmap') || lower.includes('path') || lower.includes('how to become')) return 'roadmap_query';
    if (lower.includes('salary') || lower.includes('pay') || lower.includes('earn')) return 'salary_query';
    if (lower.includes('assessment') || lower.includes('test')) return 'assessment_query';
    if (lower.includes('help') || lower.includes('how to use')) return 'faq';
    return 'general';
  }

  /**
   * Get user's conversations
   */
  static async getConversations(userId) {
    return ChatbotConversation.find({ user: userId })
      .sort({ updatedAt: -1 })
      .limit(20);
  }

  /**
   * Get conversation messages
   */
  static async getMessages(userId, conversationId) {
    const conversation = await ChatbotConversation.findOne({ _id: conversationId, user: userId });
    if (!conversation) return { conversation: null, messages: [] };

    const messages = await ChatbotMessage.find({ conversation: conversationId })
      .sort({ createdAt: 1 });

    return { conversation, messages };
  }
}

export default ChatbotService;
