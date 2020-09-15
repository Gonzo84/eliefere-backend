import fs = require('fs');

import { configService } from '../config/config.service';

const typeOrmConf = configService.getTypeOrmConfig();
// @ts-ignore
typeOrmConf.host = 'localhost';
// @ts-ignore
typeOrmConf.synchronize = false;

fs.writeFileSync('ormconfig.json',
  JSON.stringify(typeOrmConf, null, 2));
