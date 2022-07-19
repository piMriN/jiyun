export default {
  token: (state) => state.user.token,
  userinfo: (state) => state.user.userinfo,
  menus: (state) => state.user.userinfo.menus,
  isCollapse: (state) => state.menu.isCollapse,
  tagsView: (state) => state.tagsView.tags
}
