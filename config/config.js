const config ={
    env:process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET || "mysecretkey",

}

module.exports = config