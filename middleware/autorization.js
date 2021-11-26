exports.isAuthenticate = function(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        if(bearerToken !== "my_highly_confidentail_token"){ // dummy authorizer
            res.sendStatus(403);
            return
        }
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}