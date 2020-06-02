const index = require('./index')
const user = require('./user')
const project = require('./project')
const staticRender = require('./static')

module.exports = {
  map(router) {
    // 首页
    router.get('/', index.render)
    // 静态资源
    router.get('/static/', staticRender.render)
    // 项目列表页
    router.get('/projects/', index.render)
    // 用户项目列表项
    router.get('/projects/:user', user.index)
    // 项目首页
    router.get('/projects/:user/:project', async (req, res) => {
      const p = req.path.substring(`/projects/${req.params.user}/${req.params.project}`.length)
      await project.index(req, res, decodeURIComponent(p))
    })
    // 项目的 readme
    router.get('/projects/:user/:project/readme', project.readme)
    // 项目原始文件
    router.get('/raw/:user/:project', async (req, res) => {
      const p = req.path.substring(`/raw/${req.params.user}/${req.params.project}`.length)
      await project.raw(req, res, decodeURIComponent(p))
    })
  }
}