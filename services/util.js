const parseWrapper = async (func, res) => {
  try {
    const result = await func();

    return res.send(result);
  } catch (e) {
    console.error(`
      error: ${e}
    `);

    return res.send(null);
  }
};

module.exports = {
  parseWrapper
};