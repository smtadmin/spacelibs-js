/*
 * File: /src/core/io/messaging/index.js
 * Version: 0.0.2
 * Project: spacelibs-js
 * Description: index.js files are here to provide easy entry points for use.
 * File Created: Tuesday, 26th July 2022 11:15 pm
 * Author: James Camire (james@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 27th July 2022 11:26 am
 * Modified By: James Camire (james@siliconmtn.com)
 * -----
 * Copyright 2022, Silicon Mountain Technologies, Inc.
 */

import Producer from './Publisher';
import Consumer from './Consumer';

export default {
	Producer: Producer,
	Consumer : Consumer
};

export {
	Producer,
	Consumer
};