//next = é o argumento de retorno para a função middleware
function userAuth(req,res,next){
    if(req.session.usuario != undefined){
        next();
    }else{
        res.redirect("/login");
    }
}
module.exports = userAuth;