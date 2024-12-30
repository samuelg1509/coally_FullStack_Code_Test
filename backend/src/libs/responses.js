'use strict';
const main = {};

/**
 * Ok response parser.
 * @param {*} res
 * @param {*} message
 * @param {*} data
 * @returns
 */
main.ok = (res, cod, message, data = null) => {
    res.set('Content-Type', 'application/vnd.api+json');
    let response = {
        success:true,
        cod_error:'00',
        message
    };
    
    if(data) response['data'] = data;
    
    return res.status(parseInt(cod)).send(response);
};

/**
 * Error parser.
 * @param {*} res
 * @param {*} cod
 * @param {*} message
 * @param {*} data
 * @returns
 */
main.error = (res, cod, message, data = null) => {
    res.set('Content-Type', 'application/vnd.api+json');
    let response = {
        success:false,
        cod_error:cod,
        message
    }

    if(data) response['data'] = data;
    return res.status(parseInt(cod)).send(response);
};
  

module.exports = main;