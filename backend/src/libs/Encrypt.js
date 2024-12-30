'use strict';

const bcrypt = require('bcrypt');

/** Encrypt strings. 
 * @author Samuel Flores
*/
class Encrypt {

  /**
   * @constructor
   * @param {string} str - String to encrypt / compare.
  */
    #saltRounds
    #str
    constructor(str=null) {
        this.#str = str;
        this.#saltRounds = Math.floor(Math.random() * 10);
    }


    /**
     * Setter.
     * @author Samuel Flores
    */
     set set_str(str) {
      this.#str = str;
  }

  /**
     * Encrypt a string.
     * @method
     * @returns {string} -> Operation result.
  */
  encrypt_str = async()=> {

    return await bcrypt.hash(this.#str, this.#saltRounds);

  }

  /**
     * Compare a hash with a string.
     * @method
     * @param {string} currentHash - Hash to compare.
     * @returns {boolean} -> Operation result.
     * @author Samuel Flores
  */
  compare_str = async(currentHash)=> {
    
    return await bcrypt.compare(this.#str,currentHash);

  }

};

module.exports = Encrypt