module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("posts", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        topicId: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.STRING
        },
        post_title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
    Posts.associate = function (models) {
        Posts.hasMany(models.Comments, { foreignKey: 'postId', as: 'comments' })
    };
    return Posts;
};