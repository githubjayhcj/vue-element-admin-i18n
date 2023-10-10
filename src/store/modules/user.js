import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
// import role from 'mock/role'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {

      // login({ name: username.trim(), password: password }).then(response => {
      //   console.log("login res:"+JSON.stringify(response))
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)
      //   setToken(data.token)
      //   resolve()

      // }).catch(error => {
      //   reject(error)
      // })

      // 设置 token
      commit('SET_TOKEN', "token123awawda")
      setToken("token123awawda")
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {

      // getInfo(state.token).then(response => {
      //   console.log("getUserInfo:"+JSON.stringify(response))
      //   const { data } = response

      //   // data 等于空
      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   // 返回错误结果
      //   if (response.code !== 1) {
      //     reject('Verification failed, please Login again.'+response.message)
      //   }

      //   //const { roles, name, avatar, introduction } = data
      //   const { user , roles , permissions } = data

      //   // roles must be a non-empty array
      //   if (!roles || roles.length <= 0) {
      //     reject('getInfo: roles must be a non-null array!')
      //   }

      //   let initRoles = []
      //   roles.forEach(element => {
      //     console.log("element:"+JSON.stringify(element))
      //     initRoles.push(element.name)
      //   });

      //   let name = user.name
      //   let avatar = "https://img2.woyaogexing.com/2022/05/12/a413e2a8f7e94a4c9a314ed015a25c0e!400x400.jpeg"
      //   let introduction = "introduction..."

      //   commit('SET_ROLES', initRoles)
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   commit('SET_INTRODUCTION', introduction)

      //   resolve({roles:initRoles})
      // }).catch(error => {
      //   reject(error)
      // })

      const initRoles = ['admin','manager']
      commit('SET_ROLES', initRoles)
      commit('SET_NAME', "管理员")
      commit('SET_AVATAR', "https://img2.woyaogexing.com/2022/05/12/a413e2a8f7e94a4c9a314ed015a25c0e!400x400.jpeg")
      commit('SET_INTRODUCTION', "管理员 introduction...")
      resolve({ roles: initRoles })

    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
