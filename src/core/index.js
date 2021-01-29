/*
 * File: /src/core/index.js
 * Version: 0.0.1
 * Project: spacelibs-js
 * Description: INSERT DESCRIPTION
 * File Created: Thursday, 28th January 2021 1:35 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 29th January 2021 3:25 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */


import content from './content';
import data from './data';
import forms from './forms';
import security from './security';
import io from './io/index';

export default {
	content: content,
	data: data,
	forms: forms, 
	security: security,
	io: io
}

export {
	content,
	data,
	forms,
	security,
	io
}
