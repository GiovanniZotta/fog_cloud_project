import 'reflect-metadata';
import fs from 'fs';
import shell from 'shelljs';
import { GraphQLSchema, lexicographicSortSchema } from 'graphql';
import { printSchemaWithDirectives } from '@graphql-tools/utils';
import { echoError, echoInfo, echoSuccess } from '@scripts/__utils';

export interface IGenSchema {
  name: string;
  schema: GraphQLSchema;
}

const GENERATED_SCHEMA_WARNING: string = `\
# -------------------------------------------
# !!!    THIS FILE WAS AUTO-GENERATED     !!!
# !!! DO NOT MODIFY THIS FILE BY YOURSELF !!!
# -------------------------------------------

`;

const GENERATED_SCHEMA_DIRECTORY: string = '.generated/graphql';

async function getGenSchemas(): Promise<IGenSchema[]> {
  const schemas: IGenSchema[] = [];

  const servicesDir = fs
    .readdirSync('services')
    .filter((service) => service.startsWith('service-'));

  for (const serviceDir of servicesDir) {
    try {
      const name = serviceDir.replace(/^(service-)/, '');
      const { schema }: { schema: GraphQLSchema } = await import(
        `services/${serviceDir}/graphql/schema`
      );

      schemas.push({ name, schema });
    } catch (error) {
      echoError(`Unable to obtain schema of ${serviceDir}: ${error}`);
      process.exit(1);
    }
  }

  return schemas;
}

export async function genGraphql(): Promise<void> {
  // Create schema definitions directory
  shell.mkdir('-p', GENERATED_SCHEMA_DIRECTORY);
  // Remove old schema definition files
  shell.rm('-rf', `${GENERATED_SCHEMA_DIRECTORY}/*`);

  for (const { name, schema } of await getGenSchemas()) {
    // Schema file path & name
    const schemaFilePath: string = `${GENERATED_SCHEMA_DIRECTORY}/${name}.graphql`;
    // Schema to emit
    const schemaToEmit: string =
      GENERATED_SCHEMA_WARNING + printSchemaWithDirectives(lexicographicSortSchema(schema));

    // Write schema to file
    fs.writeFileSync(schemaFilePath, schemaToEmit);

    echoInfo(`Generated schema definition '${schemaFilePath}' of service '${name}'`);
  }

  echoSuccess(`'gen-graphql' success`);
}

genGraphql();
