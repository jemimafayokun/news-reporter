const { allEndPoints } = require("../models/api.model")

exports.getApi = (req, res) =>{
allEndPoints().then((endPoints) => {
    res.status(200).send({endPoints: endPoints})
})
}