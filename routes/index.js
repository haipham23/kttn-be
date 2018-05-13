const health = require('../handlers/health');
const { create, setAdmin, login, reset } = require('../handlers/account');
const { newChapter, editChapter, removeChapter } = require('../handlers/chapter');

const routes = [{
  method: 'get',
  path: '/health',
  func: health
}, {
  method: 'post',
  path: '/account/create',
  func: create
}, {
  method: 'post',
  path: '/account/admin/set',
  func: setAdmin
}, {
  method: 'post',
  path: '/account/login',
  func: login
}, {
  method: 'post',
  path: '/account/reset',
  func: reset
}, {
  method: 'post',
  path: '/chapter',
  func: newChapter
}, {
  method: 'put',
  path: '/chapter/:chapterId',
  func: editChapter
}, {
  method: 'delete',
  path: '/chapter/:chapterId',
  func: removeChapter
}];

module.exports = routes;