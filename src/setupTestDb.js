import { newDb } from "pg-mem";
import { Pool } from 'pg';
import { migrate } from 'node-pg-migrate'
import path from 'path';
import { rootDirectory } from "./utils/getRootDirectory";


export const initTestDb = async () => {
  const db = newDb();
  db.public.registerFunction({
    name: 'geniodb',
    implementation: () => 'test',
  });

  const pool = new Pool({ connectionString: db.adapters.createPg().connectionString });

  await migrate({
    databaseUrl: db.adapters.createPg().connectionString,
    dir: path.join(rootDirectory, 'migrations'),
    direction: 'up',
    log: () => {},
    noLock: true,
  });

  return { db, pool };
};
