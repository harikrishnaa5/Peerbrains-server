const roleMiddleware = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "User not authenticated" });
    if (!req.user.isAdmin)
        return res.status(403).json({ message: "Access forbidden: User not allowed to perform the action" });
    next();
};

export default roleMiddleware;
