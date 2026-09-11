

const adminOnly = async (req, res, next) => {
    if(req.user.role !== "admin"){
        return res.status(401).json({
            success: false,
            message: "only admin can access this route"
        });
    }

    next();
}

export default adminOnly