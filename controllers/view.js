async function get(req, res, next) {
    try {
        res.end("HELLO WORLD!");
    } catch (err) {
        next(err);
    }    
}

module.exports.get = get;