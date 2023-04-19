const db = require('./DB');
const helper = require('../Helper');
const config = require('../Configurations');
const { query } = require('express');

async function getData(page = 1, user_email){
    const rows = await db.query(
        'select u_id, u_name, u_gmail, u_password, u_lname, gender from users_profile where u_gmail = ?',
        [user_email]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getUserID(page = 1, user_email){
    const rows = await db.query(
        'select u_id from users_profile where u_gmail = ?',
        [user_email]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getGuestID(page = 1, user_id){
    const rows = await db.query(
        'select id from guest where user_id = ?',
        [user_id]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function insertNewUser(newName, newLName, newEmail, newPassword, gender, birthday){
    await db.insert(
        'insert into users_profile (u_name, u_lname, u_gmail, u_password, gender, birthday) values (?, ?, ?, ?, ?, ?)',
        [newName, newLName, newEmail, newPassword, gender, birthday]
    );
}

async function updatePriority(guest_id, user_id){
    await db.update(
        'UPDATE guest SET priority = ? WHERE id = ? and user_id = ?',
        ["vip", guest_id, user_id]
    );
}

async function newGuest(name, lName, email, gender, u_id, event_id){
    await db.insert(
        'insert into guest (Name, LName, email, priority, gender, user_id, event_id) values (?, ?, ?, ?, ?, ?, ?)',
        [name, lName, email, "basic",  gender, u_id, event_id]
    );
}

async function asGuest(page = 1, user_email){
    const rows = await db.query(
        'select * from guest where email = ? and event_id = ?',
        [user_email, 1]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

module.exports = {
    getData,
    insertNewUser,
    newGuest,
    asGuest,
    updatePriority,
    getGuestID,
    getUserID
}