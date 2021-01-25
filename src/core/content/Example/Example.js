/*
 * File: Example
 * Version: 1.0.10
 * Project: spacelibs-javascript
 * Description: Example spacelibs-js module
 * File Created: Wednesday, 20th January 2021 3:13 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Monday, 25th January 2021 10:47 am
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */


 // 1. Each class or module will be exported as a default
 // 2. You can export a class or variable or whatever

 /**
  * 1. Each class or module will be exported as a default
  * 2. You can export a class or variable or whatever
  */
class Example { 

    /**
     * 3. This is a member of Example that returns a string, checkout how we test this simple class in Example.test.js
     * @returns {string} - The word Hello
     */
    test(){
        return "hello";
    }
    
 }
 export default Example;