const health = require('../handlers/health');
const { create, setAdmin, login, reset } = require('../handlers/account');
const { newChapter, editChapter, removeChapter, getAllChapters, getOneChapter } = require('../handlers/chapter');

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
  method: 'get',
  path: '/chapters/:limit/:page',
  func: getAllChapters
}, {
  method: 'get',
  path: '/chapter/:chapterId',
  func: getOneChapter
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
