const userModel = require('../models/schemas/User')
const messageModel = require('../models/schemas/Message')
const { _sendMail } = require('../utils/nodemailer')

exports.sendToLeonController = async (req, res) => {
    let { name, workplace, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ 'message': "Imma need at least a name, an email and your message, please."});

    name = name.toLowerCase().trim();
    workplace = workplace.toLowerCase().trim();
    email = email.toLowerCase().trim();
    message = message.toLowerCase().trim();
    
    // create user(should check for duplicate name in the db) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    try {
        try{
            const Message = await messageModel.create({ message })

            let newUser;
            newUser = await userModel.findOne({ email });
            console.log(newUser);
            if (!newUser) {
                newUser = await userModel.create({
                  name,
                  workplace,
                  email,
                  message: [Message._id],
                });
            } else {
                newUser.message = [...newUser.message, Message._id];
                await newUser.save()
            }
            
            
            _sendMail(email, name, workplace, message)
            res.status(201).json({ 'success': `New user ${name} created!` });
        } catch(e){
            let msg = e.code==11000? 'user already exists' : e.message  
            console.log(e)
            res.status(409).json(msg) //Conflict code
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}