module.exports = (sequalize, Datatypes) => {
  const Comments = sequalize.define("Comments", {
    commentBody: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    username: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });
  return Comments;
};
