//自己定义一个动态路由规则
module.exports = {
    // "/auth/login": "/login",
    // "/auth/logout": "/logout",
    "/api/global": "/global", //&start=:start&end=:end
    "/api/charts/visits": "/visits",
    "/api/charts/capacity\\?period=:period": "/capacity?period=:period",
    "/api/teams": "/teams",
    "/api/activities": "/activities",
    "/api/weathers": "/weathers",
    "/api/appmes": "/appmes",
    "/api/articles\\?page=:page&limit=:limit": "/articles?page=:page&limit=:limit",
    // "/api/article\\?id=:id": "/article?id=:id",
    "/api/articles\\/:id": "/article?/:id",
    "/api/article\\/:id": "/articledel",
    "/api/users": "/users",
    // "/api/users/adduser": "/adduser",
    // "/api/users/:id": "/deluser" 
    // "/api/history\\?page=:page&limit=:limit" : "/history?page=:page&limit=:limit",
}