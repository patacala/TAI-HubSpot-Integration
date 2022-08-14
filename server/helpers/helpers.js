const moment = require('moment');
const Loans = require('../models/loans');
const config = require('../config/config');


const validLoan = async(customersId) => {
    const period = config.RETURNING_CLIENT.PERIOD;
    const tries = config.RETURNING_CLIENT.TRIES;
    const formatDate = "YYYY/MM/DD";

    let currentDate = moment().format();
    let limitDate = moment(currentDate).subtract(period,"days").format();

    //console.log(currentDate," ",limitDate);

    
    let loanBd = await Loans.find({
        customersId,
        createdAt: {
            $gte: new Date(limitDate),
            $lte: new Date(currentDate)
        }
    },{_id: 1})

    //console.log(loanBd.length,tries);
    
    return loanBd.length < tries ;
}

module.exports = {
    validLoan
}