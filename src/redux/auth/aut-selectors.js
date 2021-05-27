const getIsAuth = state => state.auth.isLogin 

const getUsername = state => state.auth.user.name


export default {getIsAuth, getUsername}