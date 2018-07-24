const Parse = require('parse/node');

const { parseWrapper } = require('../services/util');

const newChapter = async (req, res, next) => {
  const { no, title, content, sessionToken } = req.body;

  parseWrapper(async () => {
    const query = new Parse.Query('Chapter');
    query.exists('no', no);

    console.log(1);

    // check chapter number
    const result = await query.find({ sessionToken });
    if (result.length) {
      throw new Error('chapter number exists');
    }

    console.log(2);

    // save new chapter
    const chapter = new Parse.Object('Chapter');

    console.log(3);

    const newChapter = await chapter.save(
      { no, title, content },
      { sessionToken }
    );

    console.log(4);

    return newChapter;
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
