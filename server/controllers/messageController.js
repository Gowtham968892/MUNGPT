import axios from "axios";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import imageKit from "../configs/imageKit.js";
import openai from "../configs/openai.js";

// ================= TEXT MESSAGE =================

export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.credits < 1) {
      return res.json({ success: false, message: "You don't have enough credits" });
    }

    const { chatId, prompt } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Prompt is required" });
    }

    const chat = await Chat.findOne({ userId, _id: chatId });

    if (!chat) {
      return res.json({ success: false, message: "Chat not found" });
    }

    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // ✅ Correct OpenAI API Call
    const completion = await openai.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [{ role: "user", content: prompt }],
    });

    const replyContent = completion.choices?.[0]?.message?.content;

    if (!replyContent) {
      return res.json({ success: false, message: "AI response empty" });
    }

    const reply = {
      role: "assistant",
      content: replyContent,
      timestamp: Date.now(),
      isImage: false,
    };

    chat.messages.push(reply);
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    res.json({ success: true, reply });

  } catch (error) {
    console.error("Text Message Error:", error?.response?.data || error);
    const message =
      error?.response?.data?.error?.message ||
      error?.response?.data ||
      error?.message ||
      "Internal server error";
    res.status(500).json({ success: false, message });
  }
};

// ================= IMAGE MESSAGE =================

export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.credits < 2) {
      return res.json({ success: false, message: "No credits" });
    }

    const { prompt, chatId, isPublished } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Prompt is required" });
    }

    const chat = await Chat.findOne({ userId, _id: chatId });

    if (!chat) {
      return res.json({ success: false, message: "Chat not found" });
    }

    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const encodedPrompt = encodeURIComponent(prompt);

    const generatedImageUrl =
      `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/mungpt/${Date.now()}.png?tr=w-800,h-800`;

    const aiImageResponse = await axios.get(generatedImageUrl, {
      responseType: "arraybuffer",
    });

    const base64Image = `data:image/png;base64,${Buffer.from(
      aiImageResponse.data,
      "binary"
    ).toString("base64")}`;

    const uploadResponse = await imageKit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: "mungpt",
    });

    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished: isPublished || false,
    };

    chat.messages.push(reply);
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

    res.json({ success: true, reply });

  } catch (error) {
    console.error("Image Message Error:", error?.response?.data || error);
    const message =
      error?.response?.data?.error?.message ||
      error?.response?.data ||
      error?.message ||
      "Internal server error";
    res.status(500).json({ success: false, message });
  }
};
