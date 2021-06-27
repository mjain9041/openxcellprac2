module.exports = (sequelize, Sequelize) => {
    const Topics = sequelize.define("topics", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.STRING
        },
        topic_name: {
            type: Sequelize.STRING
        }
    });
    return Topics;
};