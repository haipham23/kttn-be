const Parse = require('parse/node');

const { parseWrapper } = require('../services/util');

const getChapterById = async (chapterId, sessionToken) => {
  const query = new Parse.Query('Chapter');
  query.equalTo('objectId', chapterId);

  const chapter = await query.first({ sessionToken });

  return chapter;
};

const newQuestion = async (req, res, next) => {
  const {
    content,
    answers,
    answer,
    chapterId,
    sessionToken
  } = req.body;

  parseWrapper(async () => {
    const chapter = await getChapterById(chapterId, sessionToken);

    const question = new Parse.Object('Question');

    const result = await question.save(
      { chapter, content, answers, answer },
      { sessionToken }
    );

    return result;
  }, res);
};

const editQuestion = async (req, res, next) => {
  const {
    content,
    answers,
    answer,
    sessionToken
  } = req.body;
  const { questionId } = req.params;

  parseWrapper(async () => {
    const query = new Parse.Query('Question');
    query.equalTo('objectId', questionId);

    const question = await query.first({ sessionToken });
    question.set('content', content);
    question.set('answers', answers);
    question.set('answer', answer);

    const result = question.save(null, { sessionToken });

    return result;
  }, res);
};

const removeQuestion = async (req, res, next) => {
  const { sessionToken } = req.body;
  const { questionId } = req.params;

  parseWrapper(async () => {
    const query = new Parse.Query('Question');
    query.equalTo('objectId', questionId);

    const question = await query.first({ sessionToken });

    await question.destroy({ sessionToken });

    return 'ok';
  }, res);
};

module.exports = {
  newQuestion,
  editQuestion,
  removeQuestion
};