import request from '@/utils/request'

/**
 * 
 * 学院列表
*/
export function getCollegeRecomentList (page) {
  return request.get('college/recoment/list',{page:page}, {login: false})
}
/**
 * 发布文章
 * @module 
 */
export function collegeArticlePublic (data) {
    return request.post('college/article/public', data, { login: true })
}
/**
 * 创建专题
 * @module 
 */
export function collegeCreateSpecial (data) {
  return request.post('college/column/create', data, { login: true })
}
/**
 * 专题投递
 * @module 
 */
export function deliverArticle (data) {
  return request.post('college/article/deliver', data, { login: true })
}
/**
 * 专题文章列表
 * @module 
 */
export function getColumnArticleList (data) {
  return request.get('college/column/article/list', data, { login: false })
}
/**
 * 专题列表
 *
 */
export function geHomeRecomndColumnList (data) {
  return request.get('college/home/column/list', data, { login: false })
}
/**
 * 专题详情
 *
 */
export function getColumnDetail (id) {
  return request.get('college/column/detail', {column_id:id}, { login: false })
}

/**
 * 文章详情
 *
 */
export function getCollegeArticletDetail (article_id) {
  return request.get('college/article/detail', {article_id: article_id}, { login: false })
}
/**
 * 审核投递专栏文章
 * @module 
 */
export function articleAuditDelivery (id) {
  return request.post('college/article/check/deliver', {id:id}, { login: true })
}
/**
 * 搜索用户文章
 * @module 
 */
export function geUserArticleList (data) {
  return request.post('college/user/article/list', data, { login: false })
}
/**
 * 文章评论
 * @module 
 */
export function articleComment (data) {
  return request.post('college/comment/article', data, { login: true })
}
/**
 *  文章评论列表
 * @param {*} uid 
 */
export function getArticleCommentList (data) {
  return request.get('college/article/comment/list', data, { login: false })
}
/**
 * 学院用户详情
 *
 */
export function getCollegeUserDetail (uid) {
  return request.get('college/user/detail', {uid: uid}, { login: false })
}

/**
 * 文章点赞
 *
 */
export function getLikeArticle (article_id) {
  return request.post('college/like/article', {article_id: article_id}, { login: false })
}
/**
 * 关注接口
 * type	是	int	10=关注用户，20=关注文章
 * business_id	是	int	所关注的用户id或者文章id
 *
 */
export function addFollow (data) {
  return request.post('college/follow', data, { login: true })
}

/**
 * 取消关注
 * type	是	int	10=关注用户，20=关注文章
 * business_id	是	int	所关注的用户id或者文章id
 *
 */
export function delFollow (data) {
  return request.post('college/cancle/follow', data, { login: true })
}
/**
 * 关注列表
 *
 */
export function addFollowList () {
  return request.post('college/user/follow', {}, { login: true })
}
/**
 * 侧边推荐阅读列表
 *
 */
export function recommendedReading () {
  return request.get('college/user/recoment/article/list', {}, { login: false })
}

/**
 * 获取推荐关注用户
 *
 */
export function recommentUserList (data) {
  return request.get('college/recoment/user/list', data, { login: false })
}
/**
 * 文集列表
*/
export function collectedList () {
  return request.get('college/collected/user/list', {}, { login: false })
}
/**
 * 新增文集
*/
export function createCollected (data) {
  return request.post('college/collected/create', data,{ login: true })
}
/**
 * 删除文集 college/collected/delete
*/
export function deleteCollected (id) {
  return request.post('college/collected/delete', {id: id},{ login: true })
}
/**
 * 合集 文章列表
*/
export function collectedArticleList (data) {
  return request.post('college/collected/article/list', data ,{ login: true })
}
/**
 *点赞评论
*/
export function articleCommentLike (comment_id) {
  return request.post('college/article/comment/like', {comment_id:comment_id} ,{ login: true })
}
/**
 *举报文章
*/
export function articleReport (data) {
  return request.post('college/article/inform', data ,{ login: true })
}