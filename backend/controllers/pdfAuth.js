// require("dotenv").config();
// const { OpenAI } = require("openai");
// const pdf = require("pdf-parse");
// const fs = require("fs");

// // ✅ Initialize OpenAI Client Properly
// const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// async function analyzePDFForOffensiveContent(filePath) {
//     try {
//         // ✅ Read and Extract Text from PDF
//         const dataBuffer = fs.readFileSync(filePath);
//         const pdfData = await pdf(dataBuffer);
//         const pdfText = pdfData.text.trim();

//         if (!pdfText) {
//             return { safe: true, message: "PDF is empty or contains no readable text." };
//         }

//         // ✅ Send Text to OpenAI for Analysis
//         const response = await openaiClient.chat.completions.create({
//             model: "gpt-4",
//             messages: [
//                 {
//                     role: "system",
//                     content: "Analyze the following text for offensive, harmful, or inappropriate content. ONLY reply with 'Safe' or 'Harmful'."
//                 },
//                 { role: "user", content: pdfText }
//             ],
//             temperature: 0, // ✅ Ensures a more deterministic response
//         });

//         // ✅ Log the OpenAI Response for Debugging
//         console.log("OpenAI Response:", response.choices[0].message.content);

//         // ✅ Extract OpenAI’s Response and Ensure Proper Check
//         const analysis = response.choices[0].message.content.trim().toLowerCase();

//         if (analysis === "harmful") {
//             return { safe: false, message: "PDF contains harmful or offensive content." };
//         } else if (analysis === "safe") {
//             return { safe: true, message: "PDF is safe and contains no offensive content." };
//         } else {
//             // Fallback case if OpenAI returns something unexpected
//             return { safe: true, message: "OpenAI response unclear, but no explicit harm detected." };
//         }
//     } catch (error) {
//         console.error("Error in PDF Analysis:", error);
//         return { safe: false, message: "Error analyzing PDF: " + error.message };
//     }
// }

// // ✅ Ensure Proper Export
// module.exports = { analyzePDFForOffensiveContent };
