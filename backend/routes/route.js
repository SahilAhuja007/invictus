const express =require('express');
const { signUp, loginUsingEmail, loginUsingUserName, getAllUserNames } = require('../controllers/Auth');
const { postPaper, getMyPaper, topicPaper, editPaper, deletePaper } = require('../controllers/ResearchPapper');
const { sendMessage, getMessages } = require('../controllers/Chat');

const router=express.Router();

router.post('/signup',signUp);
router.post('/login/email',loginUsingEmail);
router.post('/login/userName',loginUsingUserName);
router.post('/papper/create',postPaper);
router.get('/MyPappers',getMyPaper);
router.get('/topicPappers',topicPaper);
router.put('/papper/edit',editPaper);
router.delete('/papper/delete',deletePaper);
router.post("/send", sendMessage);
router.get("/history/:user1/:user2", getMessages);
router.get('/userNames',getAllUserNames);

module.exports=router;