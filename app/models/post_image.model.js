module.exports = (sequelize, Sequelize) => {
    const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/'
    const PostImages = sequelize.define("post_images", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false, 
            autoIncrement: true,
            primaryKey: true,
        },
        postId: {
            type: Sequelize.STRING
        },
        image_path: {
            type: Sequelize.STRING,
            get(image_path) {
                const rawValue = this.getDataValue(image_path);
                return rawValue ? `${BASE_URL}${rawValue}` : null;
            }
        }
    });
    return PostImages;
};