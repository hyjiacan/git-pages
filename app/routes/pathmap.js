const index = require('./index')
const user = require('./user')
const project = require('./project')
module.exports = {
  map(router) {
    // 首页
    router.get('/', index.render)
    // 项目列表页
    router.get('/projects/', index.render)
    // 用户项目列表项
    router.get('/projects/:user', user.index)
    // 项目首页
    router.get('/projects/:user/:project', async (req, res) => {
      await project.index(req, res, req.path.substring(`/projects/${req.params.user}/${req.params.project}`.length))
    })
    // 项目的 readme
    router.get('/projects/:user/:project/readme', project.readme)
  }
}
