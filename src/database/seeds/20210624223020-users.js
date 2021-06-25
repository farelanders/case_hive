'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: '2a12e17d-d49a-41d8-95af-1b28bbce75d9',
      name: 'Mickey',
      lastname: 'ONeil',
      nickname: 'Mic',
      address: 'caravan',
      bio: 'Do you like Dags?',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '26a4d732-a47a-47c1-8a59-6f5dcdd0c11c',
      name: 'John',
      lastname: 'Cena',
      nickname: 'Cena John',
      address: 'The ring',
      bio: 'AND HIS NAME IS JOHN CENA',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};