module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false, 
            autoIncrement: true,
            primaryKey: true,
        },
        postId: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
        comment: {
            type: Sequelize.STRING,
        },
    });
    return Comments;
};