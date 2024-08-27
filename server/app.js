import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import 'dotenv/config'
import express from "express";
import cors from 'cors';

const model = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048
})

const app = express()
app.use(express.json())
app.use(cors());

app.post('/api/prompts', async (req, res) => {
    const { prompt } = req.body
    try {
        const response = await generateResponse(prompt)
        res.status(200).json({ response: response })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error(error)
    }
})


async function generateResponse(prompt) {
    try {
        const response = await model.invoke(prompt)
        // console.log(response.content)
        return response.content
    } catch (error) {
        console.error(error);
        return error.message
    }
}


app.listen(3000, () => {
    console.log('SERVER RUNNING ON PORT:3000')
})
