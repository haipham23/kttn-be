const Parse = require('parse/node');

const { parseWrapper } = require('../services/util');

const newChapter = async (req, res, next) => {
  const { title, content, sessionToken } = req.body;

  parseWrapper(async () => {
    const chapter = new Parse.Object('Chapter');

    const result = await chapter.save(
      { title, content },
      { sessionToken }
    );

    return result;
  }, res);
};

const editChapter = async (req, res, next) => {
  const { title, content, sessionToken } = req.body;
  const { chapterId } = req.params;

  parseWrapper(async () => {
    const query = new Parse.Query('Chapter');
    query.equalTo('objectId', chapterId);

    const chapter = await query.first({ sessionToken });
    chapter.set('title', title);
    chapter.set('content', content);

    const result = chapter.save(null, { sessionToken });

    return result;
  }, res);
};

const removeChapter = async (req, res, next) => {
  const { sessionToken } = req.body;
  const { chapterId } = req.params;

  parseWrapper(async () => {
    const query = new Parse.Query('Chapter');
    query.equalTo('objectId', chapterId);

    const chapter = await query.first({ sessionToken });

    await chapter.destroy({ sessionToken });

    return 'ok';
  }, res);
};

module.exports = {
  newChapter,
  editChapter,
  removeChapter
};