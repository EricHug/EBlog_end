// const production = (process.env.NODE_ENV ? process.env.NODE_ENV : 'production') === 'production'
const production = true
const config = {
    port: 3000,
    domain: production?'':'',
    JWT_SECRET: '?asdDGF46%521$',
    // mysql配置
    database: {
        DATABASE: 'recruitment',
        USERNAME: production?'recruitment':'root',
        PASSWORD: production?'recruitment2018':'66668888',
        PORT: '3306',
        HOST: '127.0.0.1',
        MULTIPLE_STATEMENTS: true,
        DATE_STRINGS: true // 强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回，而不是一javascript Date对象返回. (默认: false)
    },
    // cookies
    cookies: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // cookie有效时长
        path: '/', // 写cookie所在的路径
        domain: production ? 'www.aiheart.top' : '', // 写cookie所在的域名
        httpOnly: true, // 是否只用于http请求中获取
        overwrite: true, // 是否允许重写
        secure: production ? true : '',
        sameSite: production ? 'Strict' : '',
        signed: ''
    }
}
module.exports = config