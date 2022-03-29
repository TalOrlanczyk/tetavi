"use strict";

module.exports = {
	/**
	 * @typedef {import('sequelize').Sequelize} Sequelize
	 * @typedef {import('sequelize').QueryInterface} QueryInterface
	 */

	/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} Sequelize
	 * @returns
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			age: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});

		},
/**
	 * @param {QueryInterface} queryInterface
	 * @param {Sequelize} Sequelize
	 * @returns
	 */
	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users');
	}
};
