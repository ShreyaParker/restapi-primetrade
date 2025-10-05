
export const authorize = (allowedRoles) =>{
    return (req, res, next) => {
        if(!req.user || !req.user.role){
            return res.status(500).json({
                message:"Authorization error: user data missing"

            })


        }
        const userRoles = req.user.role
        if(!allowedRoles.includes(userRoles)){
            return res.status(403).json({message:"Access Denied"})
        }
        next()
    }


}