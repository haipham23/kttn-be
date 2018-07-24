const Parse = require('parse/node');

const { parseWrapper } = require('../services/util');

const newChapter = async (req, res, next) => {
  const { no, title, content, sessionToken } = req.body;

  parseWrapper(async () => {
    const query = new Parse.Query('Chapter');
    query.equalTo('no', no);

    // check chapter number
    const result = await query.first({ sessionToken });
    if (result) {
      return Promise.reject('chapter number exists');
    }

    // save new chapter
    const chapter = new Parse.Object('Chapter');

    const newChapter = await chapter.save(
      { no, title, content },
      { sessionToken }
    );

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

const getAllChapters = async (req, res) => {
  const { limit, page } = req.params;

  parseWrapper(async () => {
    const query = new Parse.Query('Chapter');
    query.include('no');
    query.include('title');
    query.ascending('no');
    query.limit(Number(limit));
    query.skip(Number(page) * Number(limit));

    const chapters = await query.find();

    return chapters && chapters.length > 0
      ? chapters
      : Promise.reject('there is no chapter within this range');

  }, res);
};

const getOneChapter = async (req, res) => {
  const { chapterId } = req.params;

  parseWrapper(async () => {
    const query = new Parse.Query('Chapter');
    query.equalTo('objectId', chapterId);
    query.include('no');
    query.include('title');
    query.include('content');

    const chapter = await query.first();

    return chapter
      ? chapter
      : Promise.reject('chapter not found');
  }, res);
};

module.exports = {
  newChapter,
  editChapter,
  removeChapter,
  getAllChapters,
  getOneChapter
};
