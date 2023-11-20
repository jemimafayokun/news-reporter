const { allTopics } = require("../models/topics.model")

exports.getHealthcheck =(req,res)=>{
res.status(200).send({})
}

exports.getTopics = (req, res, next) => {
    allTopics().then((allTopics) => {
        res.status(200).send(allTopics)
    }).catch(next)
}