/*
 * File: Example
 * Version: 1.0.10
 * Project: spacelibs-javascript
 * Description: Example spacelibs-js module
 * File Created: Wednesday, 20th January 2021 3:13 pm
 * Author: Justin Jeffrey (justin.jeffrey@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 21st January 2021 4:52 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */


 // 1. Each class or module will be exported as a default
 // 2. You can export a class or variable or whatever
 export default class Example { 

    // 3. This is a member of Example that returns a string, checkout how we test this simple class in Example.test.js
    test(){
        return "hello";
    }
    
 }